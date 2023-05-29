package ru.theblog.blogplatform.api.service;

import org.springframework.security.core.Authentication;
import ru.theblog.blogplatform.api.model.Blog;
import ru.theblog.blogplatform.api.model.User;
import ru.theblog.blogplatform.api.model.dto.BlogResult;
import ru.theblog.blogplatform.api.model.dto.BlogUserResult;
import ru.theblog.blogplatform.api.model.enums.BlogRole;
import ru.theblog.blogplatform.api.model.params.form.BlogForm;
import ru.theblog.blogplatform.api.model.params.form.BlogUpdateForm;
import ru.theblog.blogplatform.api.model.params.form.UserForm;

import java.util.List;

public interface BlogService {
    Long create(BlogForm blog, Authentication auth);
    Blog getBlog(Long id);
    void addUser(UserForm user);
    List<BlogUserResult> getUserBlogs(User user);
    int getSubscribersCount(long blogId);
    BlogRole getUserBlogRole(long userId, long blogId);
    int getRating(long blogId);
    void update(BlogUpdateForm blog);
    void deleteBlog(long blogId);
    void createSubscription(Long blogId, Boolean subscribe, Authentication auth);
    BlogResult getBlogPage(long blogId, Authentication auth);
}
