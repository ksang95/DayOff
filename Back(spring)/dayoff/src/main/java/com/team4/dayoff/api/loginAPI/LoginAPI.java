package com.team4.dayoff.api.loginAPI;

import java.util.Map;

/**
 * LoginAPI
 */
public interface LoginAPI {
    Map<String,String> getToken(String code);
    Map<String,Object> getUserInfo(String accessToken);
    int withdrawUser(String accessToken);
    //int logoutUser(String accessToken);
    //Map<String,String> renewAccessToken(String accessToken);
    
}