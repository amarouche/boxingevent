package com.etna.security.filter;

import com.etna.Application;
import com.etna.dto.UserDto;
import com.etna.entity.User;
import com.etna.security.authentication.UserAuthenticationToken;
import com.etna.security.config.JwtConfig;
import com.etna.utils.HttpServletUtils;
import com.google.gson.Gson;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.stream.Collectors;

public class JwtAuthenticationFilter extends AbstractAuthenticationProcessingFilter {

    private static Logger logger = LoggerFactory.getLogger(Application.class);

    private final Gson gson = new Gson();

    private final AuthenticationManager authManager;
    private final JwtConfig jwtConfig;

    public JwtAuthenticationFilter(AuthenticationManager authManager, JwtConfig jwtConfig) {
        super(jwtConfig.getAuthUri());

        this.authManager = authManager;
        this.jwtConfig = jwtConfig;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {

        try {
            User user = gson.fromJson(request.getReader(), User.class);

            UserAuthenticationToken authToken = new UserAuthenticationToken(
                    user.getEmail(), user.getPassword());

            return authManager.authenticate(authToken);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
                                            Authentication auth) throws IOException {

        Long now = System.currentTimeMillis();

        UserDto userDto = (UserDto) auth.getPrincipal();

        String token = Jwts.builder()
                .setSubject(userDto.getEmail())
                .claim("authorities", auth.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(now + jwtConfig.getExpiration()))
                .signWith(Keys.hmacShaKeyFor(jwtConfig.getSecret().getBytes()), SignatureAlgorithm.HS512)
                .compact();

        userDto.setToken(token);

        HttpServletUtils.writeStringJsonOnResponseBody(response, userDto.toString(), HttpServletResponse.SC_OK);
    }
}
