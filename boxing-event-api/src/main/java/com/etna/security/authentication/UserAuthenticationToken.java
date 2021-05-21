package com.etna.security.authentication;


import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

/**
 * An {@link org.springframework.security.core.Authentication} implementation that is
 * designed for simple presentation of a email and password.
 * <p>
 * All information of <code>UserAuthenticationToken</code> will be use to create the Token given after an authentication
 * <p>
 * In our case <code>UserAuthenticationToken</code> is use two times during the authentication
 * <p>
 * Step 1 "attempt authentication", principal and credentials must be respectively filled with email and password
 * Step 2 "return User data with a token", principal contain the User data and credentials is null
 * <p>
 * The <code>principal</code> and <code>credentials</code> should be set with an
 * <code>Object</code> that provides the respective property via its
 * <code>Object.toString()</code> method. The simplest such <code>Object</code> to use is
 * <code>String</code>.
 */
public class UserAuthenticationToken extends AbstractAuthenticationToken {

    private final Object principal;
    private Object credentials;

    /**
     * Called when we tried to authenticate someone
     *
     * @param principal   At this point it must be the email
     * @param credentials The User's raw password
     */
    public UserAuthenticationToken(Object principal, Object credentials) {
        super(null);

        this.principal = principal;
        this.credentials = credentials;

        setAuthenticated(false);
    }

    /**
     * This constructor should only be used by <code>AuthenticationProvider</code>
     * implementations that are satisfied with
     * producing a trusted (i.e. {@link #isAuthenticated()} = <code>true</code>)
     * authentication token.
     * <p>
     * The user is authenticated
     * We do not need credentials at this point
     * All that we need is in principal
     *
     * @param principal   The User's data that we know it is safe to expose
     * @param authorities The User's role
     */
    public UserAuthenticationToken(Object principal, Collection<? extends GrantedAuthority> authorities) {
        super(authorities);

        this.principal = principal;
        this.credentials = null;

        setAuthenticated(true);
    }

    /*
     * AbstractAuthenticationToken
     * */

    @Override
    public Object getCredentials() {
        return this.credentials;
    }

    @Override
    public Object getPrincipal() {
        return this.principal;
    }

    @Override
    public void eraseCredentials() {
        super.eraseCredentials();
        credentials = null;
    }
}
