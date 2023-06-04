package ru.theblog.blogplatform.api.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.theblog.blogplatform.api.model.User;
import ru.theblog.blogplatform.api.model.params.form.UserPutForm;
import ru.theblog.blogplatform.api.repository.UserRepository;
import ru.theblog.blogplatform.api.service.UserService;

import javax.security.sasl.AuthenticationException;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository repository;
    private final PasswordEncoder encoder;

    public User getUserByEmail(String email) {
        return repository.findByEmail(email);
    }

    @Override
    public void updateUser(UserPutForm userPF, Authentication auth) throws AuthenticationException {
        var user = repository.findByEmail(auth.getName());
        if (user == null) {
            throw new AuthenticationException();
        }

        if (userPF.birthdate != null)
            user.setBirthdate(userPF.birthdate);
        if (userPF.name != null)
            user.setName(userPF.name);
        if (userPF.status != null)
            user.setStatus(userPF.status);
        if (userPF.email != null && userPF.password != null) {
            user.setEmail(userPF.email);
            user.setPassword(encoder.encode(userPF.password));
        }
    }
}
