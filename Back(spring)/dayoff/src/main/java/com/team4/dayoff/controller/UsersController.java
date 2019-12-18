package com.team4.dayoff.controller;

import java.security.Principal;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.team4.dayoff.api.loginAPI.KakaoAPI;
import com.team4.dayoff.api.loginAPI.LoginAPI;
import com.team4.dayoff.entity.Code;
import com.team4.dayoff.entity.LoginHistory;
import com.team4.dayoff.entity.Users;
import com.team4.dayoff.entity.WithdrawHistory;
import com.team4.dayoff.repository.CodeRepository;
import com.team4.dayoff.repository.LoginHistoryRepository;
import com.team4.dayoff.repository.UsersRepository;
import com.team4.dayoff.repository.WithdrawHistoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UsersController {

	@Autowired
	UsersRepository usersRepository;

	@Autowired
	LoginHistoryRepository loginHistoryRepository;

	@Autowired
	WithdrawHistoryRepository withdrawHistoryRepository;

	@Autowired
	CodeRepository codeRepository;

	@GetMapping(value = "/list1")
	public List<Users> userList() {
		List<Users> st = null;
		st = usersRepository.findAll();
		System.out.println(st);
		return st;
	}

	@PostMapping("/login")
	public Users loginUsers(@RequestParam String code, @RequestParam String socialType) {
		LoginAPI login = null;
		switch (socialType) {
		case "kakao":
			login = new KakaoAPI();
			break;
		case "naver":
			break;
		case "google":
			break;
		}
		Map<String, String> token = login.getToken(code);
		String accessToken = token.get("access_token");
		String refreshToken = token.get("refresh_token");

		Map<String, Object> map = login.getUserInfo(accessToken);
		System.out.println(map);
		String socialId = socialType + "_" + map.get("id");
		Users users = usersRepository.findBySocialIdAndRoleNot(socialId, "withdraw");
		System.out.println("db:" + users);
		if (users != null) {
			users.setAccessToken(accessToken);
			users.setRefreshToken(refreshToken);
			usersRepository.save(users);
			LoginHistory loginHistory = new LoginHistory();
			loginHistory.setUsers(users);
			loginHistoryRepository.save(loginHistory);
			// 세션 객체 생성
			return users;
		}
		String sex = (String) map.get("sex");
		Date birth = (Date) map.get("birth");
		String name = (String) map.get("name");

		users = new Users();
		users.setAccessToken(accessToken);
		users.setRefreshToken(refreshToken);
		users.setSex(sex);
		users.setBirth(birth);
		users.setName(name);
		users.setSocialId(socialId);
		System.out.println("new:" + users);

		return users;
	}

	@PostMapping("/signUp")
	public Users signUpProcess(@RequestBody Users users) {

		Users savedUsers = usersRepository.save(users);
		System.out.println(savedUsers);
		LoginHistory loginHistory = new LoginHistory();
		loginHistory.setUsers(savedUsers);
		loginHistoryRepository.save(loginHistory);
		// 세션 객체 생성
		return savedUsers;
	}

	@GetMapping("/withdraw")
	public List<Code> withdrawUsers() {
		List<Code> list = codeRepository.findByCodeLike("02%");
		return list;
	}

	@PostMapping("/withdrawProcess")
	public void withdrawUsersProcess(Principal principal, Code code, @RequestParam("userId") Integer id) {
		//int id = Integer.parseInt(principal.getName());
		Users users = usersRepository.findById(id).get();
		String socialId=users.getSocialId();
		LoginAPI login=null;
		switch(socialId.substring(0,socialId.indexOf('_'))){
		case "kakao":
		login=new KakaoAPI();
		break;
		case "naver":
		break;
		case "google":
		break;
		}
		System.out.println(login.withdrawUser(users.getAccessToken()));
		usersRepository.withdrawUser(id);
		WithdrawHistory withdrawHistory = new WithdrawHistory();
		withdrawHistory.setCode(code);
		withdrawHistory.setUsers(users);
		withdrawHistoryRepository.save(withdrawHistory);
		// 세션 객체 삭제

	}

	@PostMapping("/logout")
	public void logoutUsers(Principal principal, @RequestParam("userId") Integer id) {
		//int id = Integer.parseInt(principal.getName());
		// Users users = usersRepository.findById(id).get();
		// String socialId = users.getSocialId();
		// LoginAPI login = null;
		// switch (socialId.substring(0, socialId.indexOf('_'))) {
		// case "kakao":
		// 	login = new KakaoAPI(); //로그아웃시켜도 로그인할때 아이디 비번 입력 창은 다시 나오지 않음. 왜?? 안나오면 굳이 api쓰는 의미가 없음
		// 	break;
		// case "naver":
		// 	// 네이버는 로그아웃 api가 없는 걸로 알고있음. 여기서 로그아웃 불가하다고 네이버 가서 로그아웃하라고 메시지 뿌리던가 하자.
		// 	break;
		// case "google":
		// 	break;
		// }
		// System.out.println(login.logoutUser(users.getAccessToken()));
		// 세션 객체 삭제

	}
}