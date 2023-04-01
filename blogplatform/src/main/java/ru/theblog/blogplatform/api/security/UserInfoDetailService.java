package ru.theblog.blogplatform.api.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import ru.theblog.blogplatform.api.repository.UserRepository;

@Component
public class UserInfoDetailService implements UserDetailsService {

    @Autowired
    private UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        var user = repository.findByEmail(email);
        if (user == null){
            throw new UsernameNotFoundException("User with email " + email + " is not found.");
        }
        return new UserInfoDetail(user);
    }
}
