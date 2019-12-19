package com.team4.dayoff.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.client.endpoint.NimbusAuthorizationCodeTokenResponseClient;
import org.springframework.security.oauth2.client.endpoint.OAuth2AccessTokenResponseClient;
import org.springframework.security.oauth2.client.endpoint.OAuth2AuthorizationCodeGrantRequest;
import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
import org.springframework.security.oauth2.client.web.HttpSessionOAuth2AuthorizationRequestRepository;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
 
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
        .csrf().disable()
        .authorizeRequests()
        .antMatchers("/mapping","/login")
        .permitAll()
        .antMatchers("/path")
        .hasRole("ADMIN")
        .anyRequest()
        .authenticated()
        .and()
        .oauth2Login()
        .tokenEndpoint()
        .accessTokenResponseClient(accessTokenResponseClient())
        .and()
        .defaultSuccessUrl("/loginSuccess")
        .failureUrl("/loginFailure")
        .loginPage("/loginReal")
        .and()
        .exceptionHandling()
        .accessDeniedPage("/deny")
        .and()
        .logout()
        .logoutUrl("/logoutReal")
        .logoutSuccessUrl("/login");
    }
    @Bean
public AuthorizationRequestRepository<OAuth2AuthorizationRequest> 
  authorizationRequestRepository() {
  
    return new HttpSessionOAuth2AuthorizationRequestRepository();
}
@Bean
public OAuth2AccessTokenResponseClient<OAuth2AuthorizationCodeGrantRequest> 
  accessTokenResponseClient() {
  
    return new NimbusAuthorizationCodeTokenResponseClient();
}

}