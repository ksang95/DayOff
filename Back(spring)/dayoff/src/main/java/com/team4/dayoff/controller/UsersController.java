package com.team4.dayoff.controller;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.team4.dayoff.api.loginAPI.FacebookAPI;
import com.team4.dayoff.api.loginAPI.GoogleAPI;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.ui.Model;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.ModelAndView;

@CrossOrigin("*")
@RestController
public class UsersController {

	@Autowired
	private UsersRepository usersRepository;

	@Autowired
	private LoginHistoryRepository loginHistoryRepository;

	@Autowired
	private WithdrawHistoryRepository withdrawHistoryRepository;

	@Autowired
	private CodeRepository codeRepository;

	@Autowired
	private OAuth2AuthorizedClientService authorizedClientService;

	@GetMapping(value = "/getUserList")
	public Page<Users> userList(
			@PageableDefault(page = 0, size = 3, sort = "id", direction = Direction.DESC) Pageable pageable,
			Boolean include, String keyword, String search) {
		// 페이징 처리 보기 위해서 size 작게 했으니 size 수정할것!!!!!!!!!
		Page<Users> st = null;
		if (search.length()>0) {

			switch (keyword) {
			case "id":
				st = usersRepository.findById(pageable, Integer.parseInt(search));
				break;
			case "name":
				if(include){
					st = usersRepository.findByName(pageable, search);
				}else{
					st=usersRepository.findByNameRoleNotUser(pageable, search);
				}
				break;
			}
		} else {
			if (include)
				st = usersRepository.findAll(pageable);
			else
				st = usersRepository.findAllRoleNotUser(pageable);
		}

		return st;
	}

	@GetMapping("/getUser")
	public Users getUser(OAuth2AuthenticationToken token) {
		System.out.println(token.getAuthorizedClientRegistrationId());
		// System.out.println(token2.getCredentials());
		// System.out.println(token2.getPrincipal());
		Users users = usersRepository.findBySocialIdAndRoleNot(
				token.getAuthorizedClientRegistrationId() + "_" + token.getName(), "withdraw");
		// Users users2 = usersRepository.findBySocialId2(authentication.getName());
		// int idx = users2.getSocialId().indexOf("_");
		// String socialType= users2.getSocialId().substring(0,idx);
		// System.out.println(socialType);
		// String socialId=socialType+"_"+(authentication.getName());
		// Users users=usersRepository.findBySocialIdAndRoleNot(socialId,"withdraw");

		Authentication authentication = null;
		List<GrantedAuthority> updatedAuthorities = new ArrayList<>(token.getAuthorities());
		System.out.println(token.getAuthorities());
		if (users.getRole().equals("user") || users.getRole().equals("admin")) {

			updatedAuthorities.add(new SimpleGrantedAuthority("ROLE_REALUSER"));
		}
		if (users.getRole().equals("admin")) {
			updatedAuthorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
		}
		authentication = new OAuth2AuthenticationToken(token.getPrincipal(), updatedAuthorities,
				token.getAuthorizedClientRegistrationId());
		SecurityContextHolder.getContext().setAuthentication(authentication);

		return users;
	}

	@GetMapping("/signUp")
	public Users signUp(OAuth2AuthenticationToken authenticationToken) {
		OAuth2AuthorizedClient client = authorizedClientService.loadAuthorizedClient(
				authenticationToken.getAuthorizedClientRegistrationId(), authenticationToken.getPrincipal().getName());
		String socialType = authenticationToken.getAuthorizedClientRegistrationId();
		LoginAPI login = null;
		switch (socialType) {
		case "kakao":
			login = new KakaoAPI();
			break;
		case "facebook": 
			login = new FacebookAPI();
			break;
		case "google":
			login = new GoogleAPI();
			break;
		}
		String accessToken = client.getAccessToken().getTokenValue();
		System.out.println(client.getAccessToken().getTokenValue());
		String refreshToken = client.getRefreshToken() != null ? client.getRefreshToken().getTokenValue() : null;

		Users users = new Users();
		Users userInfo = login.getUserInfo(accessToken,client.getPrincipalName());
		System.out.println(userInfo);
		users = userInfo;
	users.setAccessToken(accessToken);
	users.setRefreshToken(refreshToken);
	System.out.println("new:" + users);

		return users;
	}

	@PostMapping("/signUpProcess")
	public Users signUpProcess(@RequestBody Users users, OAuth2AuthenticationToken authenticationToken) {

		Users savedUsers = usersRepository.save(users);
		System.out.println(savedUsers);
		LoginHistory loginHistory = new LoginHistory();
		loginHistory.setUsers(savedUsers);
		loginHistoryRepository.save(loginHistory);

		// 시큐리티 role업뎃

		// Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		List<GrantedAuthority> updatedAuthorities = new ArrayList<>(authenticationToken.getAuthorities());
		updatedAuthorities.add(new SimpleGrantedAuthority("ROLE_REALUSER"));
		// authentication = new UsernamePasswordAuthenticationToken(auth.getPrincipal(),
		// auth.getCredentials(),
		// updatedAuthorities);
		Authentication authentication = new OAuth2AuthenticationToken(authenticationToken.getPrincipal(),
				updatedAuthorities, authenticationToken.getAuthorizedClientRegistrationId());
		SecurityContextHolder.getContext().setAuthentication(authentication);
		System.out.println(authentication.getAuthorities() + "1245");

		return savedUsers;
	}

	@GetMapping("/withdraw")
	public List<Code> withdrawUsers() {
		List<Code> list = codeRepository.findByCodeLikeOrderByCode("02%");
		return list;
	}

	@PostMapping("/withdrawProcess")
	public void withdrawUsersProcess(OAuth2AuthenticationToken token, @RequestBody Code code) {
		OAuth2AuthorizedClient client = authorizedClientService.loadAuthorizedClient(
				token.getAuthorizedClientRegistrationId(), token.getPrincipal().getName());
		System.out.println("=========================================================1");
		// Users users2 = usersRepository.findBySocialId2(authentication.getName());
		// int idx = users2.getSocialId().indexOf("_");

		// String socialType= users2.getSocialId().substring(0,idx);
		// System.out.println(socialType);
		// String socialId=socialType+"_"+(authentication.getName());
		// Users users = usersRepository.findBySocialIdAndRoleNot(socialId, "withdraw");
		System.out.println(token.getAuthorizedClientRegistrationId());
		String socialType = token.getAuthorizedClientRegistrationId();
		Users users = usersRepository.findBySocialIdAndRoleNot(socialType + "_" + token.getName(), "withdraw");
		System.out.println("=========================================================2");
		LoginAPI login = null;
		switch (socialType) {
		case "kakao":
			login = new KakaoAPI();
			break;
		case "facebook":
			login = new FacebookAPI();
			break;
		case "google":
			login = new GoogleAPI();
			break;
		}
		System.out.println("=========================================================3");
		System.out.println(login.withdrawUser(users.getAccessToken(),client.getPrincipalName()));
		usersRepository.withdrawUser(users.getId());
		WithdrawHistory withdrawHistory = new WithdrawHistory();
		withdrawHistory.setCode(code);
		withdrawHistory.setUsers(users);
		withdrawHistoryRepository.save(withdrawHistory);
		authorizedClientService.removeAuthorizedClient(socialType, token.getName());
	}

	@PostMapping("/updateUserProcess")
	public void updateUsersProcess(@RequestBody Users users) {
		Users savedUsers = usersRepository.save(users);
		System.out.println(savedUsers);

	}

	@GetMapping("/loginSuccess")
	public ModelAndView getLoginInfo(Model model, OAuth2AuthenticationToken authenticationToken,
			HttpServletRequest request) {
		// String referer=request.getHeader("referer"); // 이전 페이지 주소

		// 로그인 시 등록된 사용자면 기존의 token 업데이트&loginHistory insert할것!

		String socialType = authenticationToken.getAuthorizedClientRegistrationId();
		System.out.println(socialType); // 소셜 구별용
		System.out.println(authenticationToken.getDetails());

		// String userInfoEndpointUri =
		// client.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUri();

		// System.out.println("test================" +
		// client.getAccessToken().getTokenValue());
		// if (!org.springframework.util.StringUtils.isEmpty(userInfoEndpointUri)) {
		// RestTemplate restTemplate = new RestTemplate();
		// HttpHeaders headers = new HttpHeaders();
		// headers.add(HttpHeaders.AUTHORIZATION, "Bearer " +
		// client.getAccessToken().getTokenValue());
		// HttpEntity entity = new HttpEntity("", headers);
		// ResponseEntity<Map> response = restTemplate.exchange(userInfoEndpointUri,
		// HttpMethod.GET, entity,
		// Map.class);
		// Map userAttributes = response.getBody();
		// System.out.println(headers + "/" + entity + "/////" + response);
		// model.addAttribute("name", userAttributes.get("name"));
		// System.out.println(userAttributes);
		// }

		// System.out.println(authentication);

		// System.out.println(authentication.getAuthorities() + "123"); // 어디서 로그인했는지
		// System.out.println(authentication.getDetails());
		// System.out.println(authentication.getCredentials());
		// System.out.println(authentication.getPrincipal()); // userinfo

		String socialId = authenticationToken.getAuthorizedClientRegistrationId() + "_" + authenticationToken.getName();

		OAuth2AuthorizedClient client = authorizedClientService.loadAuthorizedClient(
				authenticationToken.getAuthorizedClientRegistrationId(), authenticationToken.getPrincipal().getName());

		System.out.println(client.getRefreshToken());
		Users users = usersRepository.findBySocialIdAndRoleNot(socialId, "withdraw");
		if (users == null) {

			return new ModelAndView("redirect:https://localhost:3000/signUp");
		} else {
			String accessToken = client.getAccessToken().getTokenValue();
			String refreshToken = client.getRefreshToken() != null ? client.getRefreshToken().getTokenValue() : null;
			users.setAccessToken(accessToken);
			users.setRefreshToken(refreshToken);
			usersRepository.save(users);
			LoginHistory loginHistory = new LoginHistory();
			loginHistory.setUsers(users);
			loginHistoryRepository.save(loginHistory);

			return new ModelAndView("redirect:https://localhost:3000/loginSuccess");
		}

		// 등록된 사용자면 loginSuccess로, 아니면 signUp으로.
	}

	@GetMapping("/aaa")
	public void testteest() {
		System.out.println("12312312312");
	}

	@GetMapping("/loginPage")
	public void getMethodName2(HttpServletResponse response) {
		System.out.println("로그인필요");
	}

	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public void logout(HttpServletRequest request, HttpServletResponse response) throws Exception {
		System.out.println("로그아웃");
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		System.out.println(request.getHeader("referer"));
		if (auth != null) {
			new SecurityContextLogoutHandler().logout(request, response, auth);
		}
	}

	@RequestMapping("/callback")
	public void GoogleSignCallback(HttpServletRequest request, HttpServletResponse response) throws Exception {
		// TODO Auto-generated method stub
		String code = request.getParameter("code");
		HttpHeaders headers = new HttpHeaders();
		RestTemplate restTemplate = new RestTemplate();
		headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

		MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
		parameters.add("code", code);
		parameters.add("client_id", "191899458571-uk5f9j3d6hpt2vkds51301tvg263ueoh.apps.googleusercontent.com");
		parameters.add("client_secret", "w_fZV-FqQ_QSalCrpSscLLTg");
		parameters.add("redirect_uri", "https://localhost:8443/callback");
		parameters.add("grant_type", "authorization_code");

		HttpEntity<MultiValueMap<String, String>> rest_request = new HttpEntity<>(parameters, headers);

		URI uri = URI.create("https://www.googleapis.com/oauth2/v4/token");

		ResponseEntity<String> rest_reponse;
		rest_reponse = restTemplate.postForEntity(uri, rest_request, String.class);
		String bodys = rest_reponse.getBody();
		System.out.println(bodys);

		response.sendRedirect("https://localhost:8443/loginSuccess");

		return;
	}

	@RequestMapping("/aaa")
	public void aa() {

	}
	// @RequestMapping("/deny")
	// public String deny(Authentication authentication) {
	// System.out.println("access denied");
	// System.out.println(authentication.getAuthorities());
	// Iterator it=authentication.getAuthorities().iterator();
	// while(it.hasNext()){
	// GrantedAuthority authority=(GrantedAuthority)it.next();
	// if(authority.getAuthority().equals("ROLE_REALUSER")){
	// System.out.println("권한없는 user");
	// return "redirect:/loginPage";
	// }
	// }
	// System.out.println("비회원");
	// return "0";
	// }
}
