package ru.theblog.blogplatform.api.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.theblog.blogplatform.api.model.User;
import ru.theblog.blogplatform.api.repository.UserRepository;
import ru.theblog.blogplatform.api.service.UserService;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository repository;

    public User getUserByEmail(String email) {
        return repository.findByEmail(email);
    }
}
