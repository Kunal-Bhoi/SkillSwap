package com.skillswap.resources;

import com.skillswap.config.SkillSwapConfiguration;
import com.skillswap.model.User;
import com.skillswap.service.AuthService;
import io.dropwizard.auth.Auth;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;
import jakarta.ws.rs.core.Response;
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
            return createAuthResponse(user, token);
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
            return createAuthResponse(user.get(), token);
        }

        return Response.status(Response.Status.UNAUTHORIZED)
            .entity(Map.of("error", "Invalid credentials"))
            .build();
    }

    @POST
    @Path("/logout")
    public Response logout() {
        return Response.ok()
            .cookie(new NewCookie("jwt", "", "/", null, null, 0, true, true))
            .build();
    }

    @GET
    @Path("/me")
    public Response getCurrentUser(@Auth User user) {
        return Response.ok(user).build();
    }

    private Response createAuthResponse(User user, String token) {
        Map<String, Object> response = new HashMap<>();
        response.put("user", user);
        response.put("token", token);

        return Response.ok(response)
            .cookie(new NewCookie("jwt", token, "/", null, null, 86400, true, true))
            .build();
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