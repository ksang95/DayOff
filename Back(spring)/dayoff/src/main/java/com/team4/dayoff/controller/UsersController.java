package com.team4.dayoff.controller;


import java.util.ArrayList;
import java.util.List;

import com.team4.dayoff.entity.Users;
import com.team4.dayoff.repository.UsersRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class UsersController {

	@Autowired
	UsersRepository urepo;
//	@GetMapping(value = "/list")
//	public JSONArray getMembers() {
//		JSONObject job = new JSONObject();
//		JSONArray jar = new JSONArray();
//		storesS.findAll2().forEach(i -> {
//			job.put("id", i.getId());
//			job.put("social_Id", i.getSocial_Id());
//			job.put("name", i.getName());
//			job.put("birth", i.getBirth());
//			job.put("sex", i.getSex());
//			job.put("height", i.getHeight());
//			job.put("weight", i.getWeight());
//			job.put("phone", i.getPhone());
//			job.put("accrue", i.getAccrue());
//			job.put("level", i.getLevel());
//			job.put("role", i.getRole());
//			job.put("sign_Up_Date", i.getSign_Up_Date());
//			job.put("access_Token", i.getAccess_Token());
//			job.put("refresh_Token", i.getRefresh_Token());
//			job.put("total_Emoney", i.getTotal_Emoney());
//			jar.add(job);
//		});
//		System.out.println(jar);
//		return jar;
//	}
//	@GetMapping(value = "/lsm1")
//	
//	public JSONArray getMembers1() {
//	JSONObject job = new JSONObject();
//	JSONArray jar = new JSONArray();
//	storesS.findAll2().forEach(i -> {
//		job.put("id", i.getId());
//		job.put("name", i.getName());
//		job.put("location", i.getLocation());
//		jar.add(job);
//	});
//	return jar;
//}
//	@RequestMapping("lsm")
//	public String lsmlsm() {
//		storesS.lsm();
//		return "lsm good";
//	}
	@GetMapping(value = "/list1")
	public List<com.team4.dayoff.entity.Users> UserList() {
		List<com.team4.dayoff.entity.Users> st = new ArrayList<Users>();
		st = urepo.findAll();
		System.out.println(st);
		return st;
	}
}