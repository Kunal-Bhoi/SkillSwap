package com.skillswap;

import com.skillswap.config.SkillSwapConfiguration;
import com.skillswap.health.DatabaseHealthCheck;
import com.skillswap.resources.AuthResource;
import com.skillswap.filters.CORSFilter;
import io.dropwizard.core.Application;
import io.dropwizard.jdbi3.JdbiFactory;
import io.dropwizard.core.setup.Bootstrap;
import io.dropwizard.core.setup.Environment;
import io.dropwizard.migrations.MigrationsBundle;
import io.dropwizard.db.DataSourceFactory;
import org.jdbi.v3.core.Jdbi;
import io.dropwizard.jdbi3.bundles.JdbiExceptionsBundle;

public class SkillSwapApplication extends Application<SkillSwapConfiguration> {

    public static void main(String[] args) throws Exception {
        new SkillSwapApplication().run(args);
    }

    @Override
    public String getName() {
        return "skillswap";
    }

    @Override
    public void initialize(Bootstrap<SkillSwapConfiguration> bootstrap) {
        bootstrap.addBundle(new MigrationsBundle<SkillSwapConfiguration>() {
            @Override
            public DataSourceFactory getDataSourceFactory(SkillSwapConfiguration configuration) {
                return configuration.getDataSourceFactory();
            }
        });
        bootstrap.addBundle(new JdbiExceptionsBundle());
    }

    @Override
    public void run(SkillSwapConfiguration configuration, Environment environment) {
        // Register CORS filter
        environment.jersey().register(new CORSFilter());

        // Set up database
        final JdbiFactory factory = new JdbiFactory();
        final Jdbi jdbi = factory.build(environment, configuration.getDataSourceFactory(), "database");

        // Register health checks
        environment.healthChecks().register("database-health", new DatabaseHealthCheck(jdbi));

        // Register resources
        environment.jersey().register(new AuthResource(jdbi, configuration));
    }
} 