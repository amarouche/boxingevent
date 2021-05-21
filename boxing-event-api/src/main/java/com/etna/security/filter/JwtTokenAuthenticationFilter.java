package com.etna.security.filter;

import com.etna.security.authentication.UserAuthenticationToken;
import com.etna.security.config.JwtConfig;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

/**
 * An {@link org.springframework.web.filter.OncePerRequestFilter} implementation that is
 * designed for authentication using JWT
 */
public class JwtTokenAuthenticationFilter extends OncePerRequestFilter {

    private final JwtConfig jwtConfig;

    public JwtTokenAuthenticationFilter(JwtConfig jwtConfig) {
        this.jwtConfig = jwtConfig;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        Claims claims = validateToken(request, response, chain);
        authenticate(claims);

        logger.info("doFilterInternal|Token was validate - go to the next filter");
        chain.doFilter(request, response);
    }

    private Claims validateToken(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        String token = retrieveTokenFromHeader(request, response, chain);

        // Validate the token, throw Exception otherwise
        Claims claims = Jwts.parser()
                .setSigningKey(jwtConfig.getSecret().getBytes())
                .parseClaimsJws(token)
                .getBody();

        String email = claims.getSubject();

        if (email == null) {
            logger.info("doFilterInternal|validateToken|Failed to retrieve email in Token");
            throw new RuntimeException("Failed to retrieve email in Token");
        }

        return claims;
    }

    private String retrieveTokenFromHeader(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        String header = request.getHeader(jwtConfig.getHeader());

        if (header == null || !header.startsWith(jwtConfig.getPrefix())) {
            logger.info("doFilterInternal|retrieveTokenFromHeader|Failed to retrieve header - go to the next filter");
            chain.doFilter(request, response);
            return null;
        }

        return header.replace(jwtConfig.getPrefix(), "");
    }

    private void authenticate(Claims claims) {

        @SuppressWarnings("unchecked")
        List<String> authorities = claims.get("authorities", List.class);

        UserAuthenticationToken auth = new UserAuthenticationToken(
                claims.getSubject(), authorities.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList()));

        SecurityContextHolder.getContext().setAuthentication(auth);
    }
}
