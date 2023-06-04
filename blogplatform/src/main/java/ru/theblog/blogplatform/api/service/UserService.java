package ru.theblog.blogplatform.api.service;

import org.springframework.security.core.Authentication;
import ru.theblog.blogplatform.api.model.User;
import ru.theblog.blogplatform.api.model.params.form.UserPutForm;

import javax.security.sasl.AuthenticationException;

public interface UserService {
    User getUserByEmail(String email);
    void updateUser(UserPutForm user, Authentication auth) throws AuthenticationException;
}
