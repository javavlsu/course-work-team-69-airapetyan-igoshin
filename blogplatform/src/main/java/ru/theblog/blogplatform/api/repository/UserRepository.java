package ru.theblog.blogplatform.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.theblog.blogplatform.api.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
