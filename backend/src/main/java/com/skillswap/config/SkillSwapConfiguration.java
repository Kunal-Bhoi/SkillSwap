package com.skillswap.config;

import io.dropwizard.core.Configuration;
import io.dropwizard.db.DataSourceFactory;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

public class SkillSwapConfiguration extends Configuration {
    @Valid
    @NotNull
    private DataSourceFactory database = new DataSourceFactory();

    @Valid
    @NotNull
    private JwtConfig jwtConfig = new JwtConfig();

    @Valid
    @NotNull
    private MigrationsConfig migrationsConfig = new MigrationsConfig();

    @JsonProperty("database")
    public DataSourceFactory getDataSourceFactory() {
        return database;
    }

    @JsonProperty("database")
    public void setDataSourceFactory(DataSourceFactory factory) {
        this.database = factory;
    }

    @JsonProperty("jwt")
    public JwtConfig getJwtConfig() {
        return jwtConfig;
    }

    @JsonProperty("jwt")
    public void setJwtConfig(JwtConfig jwtConfig) {
        this.jwtConfig = jwtConfig;
    }

    @JsonProperty("migrations")
    public MigrationsConfig getMigrationsConfig() {
        return migrationsConfig;
    }

    @JsonProperty("migrations")
    public void setMigrationsConfig(MigrationsConfig migrationsConfig) {
        this.migrationsConfig = migrationsConfig;
    }

    public static class JwtConfig {
        @NotNull
        private String secret;

        @NotNull
        private long expiration;

        @JsonProperty
        public String getSecret() {
            return secret;
        }

        @JsonProperty
        public void setSecret(String secret) {
            this.secret = secret;
        }

        @JsonProperty
        public long getExpiration() {
            return expiration;
        }

        @JsonProperty
        public void setExpiration(long expiration) {
            this.expiration = expiration;
        }
    }

    public static class MigrationsConfig {
        @NotNull
        private boolean enabled;

        @NotNull
        private String locations;

        @JsonProperty
        public boolean isEnabled() {
            return enabled;
        }

        @JsonProperty
        public void setEnabled(boolean enabled) {
            this.enabled = enabled;
        }

        @JsonProperty
        public String getLocations() {
            return locations;
        }

        @JsonProperty
        public void setLocations(String locations) {
            this.locations = locations;
        }
    }
} 