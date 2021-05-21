package com.etna.exception;


import com.etna.dto.ErrorDetailsResponse;
import com.etna.utils.HttpServletUtils;
import com.google.gson.Gson;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

public class AuthenticationExceptionHandler implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
            throws IOException {

        ErrorDetailsResponse error = new ErrorDetailsResponse(new Date(), "Authentication failed",
                authException.getLocalizedMessage(), HttpServletResponse.SC_UNAUTHORIZED);

        HttpServletUtils.writeStringJsonOnResponseBody(response, new Gson().toJson(error), HttpServletResponse.SC_UNAUTHORIZED);
    }
}
