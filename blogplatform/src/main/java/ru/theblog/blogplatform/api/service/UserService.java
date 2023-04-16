package ru.theblog.blogplatform.api.service;

import ru.theblog.blogplatform.api.model.User;

public interface UserService {
    User getUserByEmail(String email);
}
