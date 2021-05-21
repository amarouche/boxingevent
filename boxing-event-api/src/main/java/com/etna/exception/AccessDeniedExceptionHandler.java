package com.etna.exception;


import com.etna.security.config.SecurityTokenConfig;
import com.etna.utils.HttpServletUtils;
import com.google.gson.Gson;
import com.etna.dto.ErrorDetailsResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.access.AccessDeniedHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

/**
 * @see SecurityTokenConfig
 * <p>
 * Add the following line in the SecurityTokenConfig to attempt to enabled this handler
 * <p>
 * .accessDeniedHandler(new AccessDeniedExceptionHandler())
 */
public class AccessDeniedExceptionHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException)
            throws IOException {

        // Make sure user won't be authenticated
        SecurityContextHolder.clearContext();

        ErrorDetailsResponse error = new ErrorDetailsResponse(new Date(), "Must be authenticated",
                accessDeniedException.getLocalizedMessage(), HttpServletResponse.SC_FORBIDDEN);

        HttpServletUtils.writeStringJsonOnResponseBody(response, new Gson().toJson(error), HttpServletResponse.SC_FORBIDDEN);
    }
}

