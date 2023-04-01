package ru.theblog.blogplatform.api.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import ru.theblog.blogplatform.api.model.User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class UserInfoDetail implements UserDetails {

    private final String name;
    private final String password;
    private final List<GrantedAuthority> authorities = new ArrayList();

    public UserInfoDetail(User user){
        name = user.getName();
        password = user.getPassword();
        authorities.add(new SimpleGrantedAuthority(user.getRole().getName()));
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return name;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
