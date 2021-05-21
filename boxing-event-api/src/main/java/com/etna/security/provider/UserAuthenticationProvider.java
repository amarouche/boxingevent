package com.etna.security.provider;


import com.etna.security.authentication.UserAuthenticationToken;
import com.etna.service.UserService;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

public class UserAuthenticationProvider implements AuthenticationProvider {

    private UserService userService;

    public UserAuthenticationProvider(UserService userService) {
        this.userService = userService;
    }

    /**
     * Delegate the authentication to the <code>UserService</>
     * @see UserService#authenticate(String, String)
     *
     * @param authentication Must be an <code>UserAuthenticationToken</>
     *
     * @throws RuntimeException When authentication failed
     */
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        try {
            return userService.authenticate(authentication.getName(), (String) authentication.getCredentials());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication != null && authentication.equals(UserAuthenticationToken.class);
    }
}
