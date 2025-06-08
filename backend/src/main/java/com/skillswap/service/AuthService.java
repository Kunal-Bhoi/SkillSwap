package com.skillswap.service;

import com.skillswap.config.SkillSwapConfiguration;
import com.skillswap.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.jdbi.v3.core.Jdbi;
import org.mindrot.jbcrypt.BCrypt;

import java.security.Key;
import java.util.Date;
import java.util.Optional;

public class AuthService {
    private final Jdbi jdbi;
    private final Key key;
    private final long tokenExpiration;

    public AuthService(Jdbi jdbi, SkillSwapConfiguration config) {
        this.jdbi = jdbi;
        this.key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
        this.tokenExpiration = config.getJwtConfig().getExpiration();
    }

    private static byte[] hexStringToByteArray(String s) {
        int len = s.length();
        byte[] data = new byte[len / 2];
        for (int i = 0; i < len; i += 2) {
            data[i / 2] = (byte) ((Character.digit(s.charAt(i), 16) << 4)
                                 + Character.digit(s.charAt(i+1), 16));
        }
        return data;
    }

    public User createUser(String email, String password, String firstName, String lastName) {
        String passwordHash = BCrypt.hashpw(password, BCrypt.gensalt());
        
        return jdbi.withHandle(handle -> {
            handle.execute(
                "INSERT INTO users (email, password_hash, first_name, last_name, created_at, updated_at) " +
                "VALUES (?, ?, ?, ?, ?, ?)",
                email, passwordHash, firstName, lastName, new Date(), new Date()
            );

            return handle.createQuery("SELECT * FROM users WHERE email = ?")
                .bind(0, email)
                .mapToBean(User.class)
                .findOne()
                .orElseThrow(() -> new RuntimeException("Failed to create user"));
        });
    }

    public Optional<User> authenticateUser(String email, String password) {
        return jdbi.withHandle(handle -> {
            Optional<User> user = handle.createQuery("SELECT * FROM users WHERE email = ?")
                .bind(0, email)
                .mapToBean(User.class)
                .findOne();

            if (user.isPresent() && BCrypt.checkpw(password, user.get().getPasswordHash())) {
                return user;
            }
            return Optional.empty();
        });
    }

    public String generateToken(User user) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + tokenExpiration);

        return Jwts.builder()
            .setSubject(String.valueOf(user.getId()))
            .setIssuedAt(now)
            .setExpiration(expiryDate)
            .signWith(key, SignatureAlgorithm.HS512)
            .compact();
    }

    public Optional<Long> validateToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

            return Optional.of(Long.parseLong(claims.getSubject()));
        } catch (Exception e) {
            return Optional.empty();
        }
    }
} 