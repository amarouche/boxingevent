package com.etna.security.config;

import com.etna.security.provider.UserAuthenticationProvider;
import com.etna.exception.AuthenticationExceptionHandler;
import com.etna.security.filter.JwtAuthenticationFilter;
import com.etna.security.filter.JwtTokenAuthenticationFilter;
import com.etna.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Order(-1)
@EnableWebSecurity
public class SecurityTokenConfig extends WebSecurityConfigurerAdapter {

    private final UserService userService;
    private final JwtConfig jwtConfig;

    @Autowired
    public SecurityTokenConfig(UserService userService, JwtConfig jwtConfig) {
        this.userService = userService;
        this.jwtConfig = jwtConfig;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors().and()
                // stateless : session won't be used to store user's state.
                .csrf()
                .disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and()
                .exceptionHandling()
                .authenticationEntryPoint(new AuthenticationExceptionHandler())

                .and()
                .addFilterAfter(new JwtAuthenticationFilter(authenticationManager(), jwtConfig), BasicAuthenticationFilter.class)
                .addFilterAfter(new JwtTokenAuthenticationFilter(jwtConfig), JwtAuthenticationFilter.class)

                .authorizeRequests()
                .antMatchers(HttpMethod.GET, "/slide-articles").permitAll()
                .antMatchers(HttpMethod.GET, "/test").permitAll()
                .antMatchers(HttpMethod.OPTIONS, "/test").permitAll()
                .antMatchers(HttpMethod.OPTIONS, jwtConfig.getAuthUri()).permitAll()
                .antMatchers(HttpMethod.POST, jwtConfig.getAuthUri()).permitAll()
                .antMatchers(HttpMethod.POST, jwtConfig.getRegisterUri()).permitAll()
                .anyRequest().authenticated();
    }

    @Override
    public void configure(WebSecurity web) {
        web
                .ignoring()
                .antMatchers(HttpMethod.POST, jwtConfig.getRegisterUri())
                .antMatchers(HttpMethod.GET, "/slide-articles")
                .antMatchers(HttpMethod.GET, "/test")
                .antMatchers(HttpMethod.OPTIONS, "/test")
        ;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(new UserAuthenticationProvider(userService));
    }


    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        //configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "OPTIONS"));
        configuration.addAllowedOrigin("*");
        configuration.addAllowedHeader("*");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
