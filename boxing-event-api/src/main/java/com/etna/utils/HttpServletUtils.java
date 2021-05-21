package com.etna.utils;

import org.springframework.http.MediaType;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class HttpServletUtils {

    public static void writeStringJsonOnResponseBody(HttpServletResponse response, String data, int status) throws IOException {
        response.setStatus(status);
        response.setContentType(MediaType.APPLICATION_JSON.getType());
        response.getWriter().write(data);
        response.getWriter().flush();
        response.getWriter().close();
    }
}
