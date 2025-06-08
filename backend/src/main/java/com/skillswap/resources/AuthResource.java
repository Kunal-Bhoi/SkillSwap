package com.skillswap.resources;

import com.skillswap.config.SkillSwapConfiguration;
import com.skillswap.model.User;
import com.skillswap.service.AuthService;
import io.dropwizard.auth.Auth;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import org.jdbi.v3.core.Jdbi;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Path("/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthResource {
    private final AuthService authService;

    public AuthResource(Jdbi jdbi, SkillSwapConfiguration config) {
        this.authService = new AuthService(jdbi, config);
    }

    @POST
    @Path("/signup")
    public Response signup(@Valid SignupRequest request) {
        try {
            User user = authService.createUser(
                request.getEmail(),
                request.getPassword(),
                request.getFirstName(),
                request.getLastName()
            );

            String token = authService.generateToken(user);
            return Response.ok(createAuthResponse(user, token)).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                .entity(Map.of("error", e.getMessage()))
                .build();
        }
    }

    @POST
    @Path("/login")
    public Response login(@Valid LoginRequest request) {
        Optional<User> user = authService.authenticateUser(request.getEmail(), request.getPassword());
        
        if (user.isPresent()) {
            String token = authService.generateToken(user.get());
            return Response.ok(createAuthResponse(user.get(), token)).build();
        }

        return Response.status(Response.Status.UNAUTHORIZED)
            .entity(Map.of("error", "Invalid credentials"))
            .build();
    }

    @POST
    @Path("/logout")
    public Response logout(@Context SecurityContext securityContext) {
        // Since we're using JWT, we don't need to do anything server-side for logout
        // The client should remove the token
        return Response.ok().build();
    }

    private Map<String, Object> createAuthResponse(User user, String token) {
        Map<String, Object> response = new HashMap<>();
        response.put("user", user);
        response.put("token", token);
        return response;
    }

    public static class SignupRequest {
        private String email;
        private String password;
        private String firstName;
        private String lastName;

        // Getters and setters
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getFirstName() { return firstName; }
        public void setFirstName(String firstName) { this.firstName = firstName; }
        public String getLastName() { return lastName; }
        public void setLastName(String lastName) { this.lastName = lastName; }
    }

    public static class LoginRequest {
        private String email;
        private String password;

        // Getters and setters
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
} 