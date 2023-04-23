package ru.theblog.blogplatform.api.security;

import jakarta.servlet.http.Cookie;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    //authentication
    public UserDetailsService userDetailsService() {
        return new UserInfoDetailService();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
         return http.csrf().disable()
                 .authorizeHttpRequests()
                 .requestMatchers("/**").permitAll()
                 .and().logout(logout -> logout
                         .deleteCookies("Role")
                         .logoutUrl("/api/logout"))

                 .formLogin()
                         .loginProcessingUrl("/api/login")
                         //.usernameParameter("email")
                         .successHandler((request, response, authentication) ->
                                 {
                                     var c = new Cookie("Role",
                                             authentication.getAuthorities().stream().findFirst().get().getAuthority());
                                     c.setPath("/");
                                     c.setHttpOnly(false);
                                     response.addCookie(c);
                                 }
                         )

                 .and()
                 .cors().and()
                 .build();
                 //.authorizeHttpRequests().requestMatchers("/blog/**").authenticated()
                 //.and().formLogin()
                 //.and().build();

    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        var provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService());
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }
}
