package ru.theblog.blogplatform.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.theblog.blogplatform.api.model.User;
import ru.theblog.blogplatform.api.model.UserBlogRole;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserBlogRoleRepository extends JpaRepository<UserBlogRole, Long> {
    List<UserBlogRole> findAllByUser(User user);
    int countAllByBlog_Id(long blogId);
    Optional<UserBlogRole> findByUser_IdAndBlog_Id(long userId, long blogId);
    boolean existsByBlog_IdAndUser_Id(long blogId, long userId);
    List<UserBlogRole> findByBlog_Id(long blogId);
}
