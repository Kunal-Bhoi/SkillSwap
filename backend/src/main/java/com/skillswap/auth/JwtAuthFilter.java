package com.skillswap.auth;

import com.skillswap.model.User;
import com.skillswap.service.AuthService;
import io.dropwizard.auth.Authenticator;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.SecurityContext;
import jakarta.ws.rs.ext.Provider;
import org.jdbi.v3.core.Jdbi;

import java.security.Principal;
import java.util.Optional;

@Provider
public class JwtAuthFilter implements ContainerRequestFilter {
    private final AuthService authService;
    private final Jdbi jdbi;

    public JwtAuthFilter(AuthService authService, Jdbi jdbi) {
        this.authService = authService;
        this.jdbi = jdbi;
    }

    @Override
    public void filter(ContainerRequestContext requestContext) {
        String authHeader = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);
        
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring("Bearer ".length());
            Optional<Long> userId = authService.validateToken(token);

            if (userId.isPresent()) {
                Optional<User> user = jdbi.withHandle(handle ->
                    handle.createQuery("SELECT * FROM users WHERE id = ?")
                        .bind(0, userId.get())
                        .mapToBean(User.class)
                        .findOne()
                );

                if (user.isPresent()) {
                    requestContext.setSecurityContext(new SecurityContext() {
                        @Override
                        public Principal getUserPrincipal() {
                            return user.get();
                        }

                        @Override
                        public boolean isUserInRole(String role) {
                            return false;
                        }

                        @Override
                        public boolean isSecure() {
                            return requestContext.getUriInfo().getBaseUri().getScheme().equals("https");
                        }

                        @Override
                        public String getAuthenticationScheme() {
                            return "Bearer";
                        }
                    });
                }
            }
        }
    }
} 