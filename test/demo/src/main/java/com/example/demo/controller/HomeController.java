package com.example.demo.controller;

import java.util.HashMap;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.kakaoAPI.KakaoAPI;

@Controller
public class HomeController {
	@RequestMapping("/")
    public String index() {
        
        return "main";
    }
    
    @RequestMapping("login")
    public void login(@RequestParam("code") String code, Model model) {
    	 String access_Token = KakaoAPI.getAccessToken(code);
         System.out.println("controller access_token : " + access_Token);
         HashMap<String,Object> map=KakaoAPI.getUserInfo(access_Token);
         System.out.println(map);
         model.addAttribute("access_Token", access_Token);
    }
    
    @RequestMapping("withdraw")
    public String withdraw(String access_Token) {
    	System.out.println(KakaoAPI.withdrawUser(access_Token));
    	return "main";
    }
}
