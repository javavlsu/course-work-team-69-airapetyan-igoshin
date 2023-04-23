package ru.theblog.blogplatform.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.theblog.blogplatform.api.model.User;
import ru.theblog.blogplatform.api.model.UserBlogRole;

import java.util.List;

public interface UserBlogRoleRepository extends JpaRepository<UserBlogRole, Long> {
    List<UserBlogRole> findAllByUser(User user);
    int countAllByBlog_Id(long blogId);
    UserBlogRole findByUser_IdAndBlog_Id(long userId, long blogId);
}