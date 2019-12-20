package com.team4.dayoff.Security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.oauth2.client.OAuth2ClientProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.oauth2.client.CommonOAuth2Provider;
import org.springframework.security.oauth2.client.endpoint.DefaultRefreshTokenTokenResponseClient;
import org.springframework.security.oauth2.client.endpoint.NimbusAuthorizationCodeTokenResponseClient;
import org.springframework.security.oauth2.client.endpoint.OAuth2AccessTokenResponseClient;
import org.springframework.security.oauth2.client.endpoint.OAuth2AuthorizationCodeGrantRequest;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
import org.springframework.security.oauth2.client.web.HttpSessionOAuth2AuthorizationRequestRepository;
import org.springframework.security.oauth2.core.OAuth2RefreshToken;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    System.out.println(1);

    // http
    // .portMapper()
    // .http(8080).mapsTo(8443);
    http
    .csrf().disable().authorizeRequests().antMatchers("/mapping", "/login").permitAll().antMatchers("/path")
        .hasRole("ADMIN").anyRequest().authenticated().and().oauth2Login().loginPage("/login").tokenEndpoint()
        .accessTokenResponseClient(accessTokenResponseClient()).and().defaultSuccessUrl("/loginSuccess")
        .failureUrl("/loginFailure").and().exceptionHandling().accessDeniedPage("/deny").and().logout()
        .logoutUrl("/logoutReal").logoutSuccessUrl("/login");
  }

  @Bean
  public AuthorizationRequestRepository<OAuth2AuthorizationRequest> authorizationRequestRepository() {

    return new HttpSessionOAuth2AuthorizationRequestRepository();
  }

  @Bean
  public OAuth2AccessTokenResponseClient<OAuth2AuthorizationCodeGrantRequest> accessTokenResponseClient() {

    return new NimbusAuthorizationCodeTokenResponseClient();
  }



@Bean
public ClientRegistrationRepository clientRegistrationRepository(OAuth2ClientProperties oAuth2ClientProperties, @Value("") String kakaoClientId, @Value("") String kakaoClientSecret){
  List<ClientRegistration> registrations=new ArrayList<ClientRegistration>();
  registrations.add(CustomOAuth2Provider.KAKAO.getBuilder("kakao")
  .clientId(kakaoClientId)
  .clientSecret(kakaoClientSecret)
  .jwkSetUri("temp")
  .build());
  registrations.add(CommonOAuth2Provider.GOOGLE.getBuilder("google")
<<<<<<< HEAD
  .clientId("191899458571-uk5f9j3d6hpt2vkds51301tvg263ueoh.apps.googleusercontent.com")
  .clientSecret("w_fZV-FqQ_QSalCrpSscLLTg")
  .scope("email","profile","https://www.googleapis.com/auth/user.birthday.read", "https://www.googleapis.com/auth/user.phonenumbers.read")
  .build());
  registrations.add(CommonOAuth2Provider.FACEBOOK.getBuilder("facebook")
  .clientId("2473764549612950")
  .clientSecret("2dd047a9afaf5fe157e09d41f8676ae1")
  .redirectUriTemplate("https://localhost:8080/login/oauth2/code/facebook")
=======
  .clientId("")
  .clientSecret("")
  .scope("email","profile")
  .build());
  registrations.add(CommonOAuth2Provider.FACEBOOK.getBuilder("facebook")
  .clientId("")
  .clientSecret("")
>>>>>>> 8c5be1fed77e7c579677489d2d7c51c4f9a24f9c
  .userInfoUri("https://graph.facebook.com/me?fields=id,name,email,link")
  .scope("email")
  .build());


  return new InMemoryClientRegistrationRepository(registrations);
}


}