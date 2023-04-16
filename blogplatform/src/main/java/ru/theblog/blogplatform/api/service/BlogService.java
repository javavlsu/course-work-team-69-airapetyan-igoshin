package ru.theblog.blogplatform.api.service;

import ru.theblog.blogplatform.api.controller.params.UserForm;
import ru.theblog.blogplatform.api.model.Blog;
import ru.theblog.blogplatform.api.model.User;
import ru.theblog.blogplatform.api.model.dto.BlogUserResult;

import java.util.List;

public interface BlogService {
    void create(Blog blog);
    Blog getBlog(Long id);
    void addUser(UserForm user);
    List<BlogUserResult> getUserBlogs(User user);
}
