package ru.theblog.blogplatform.api.service;

import ru.theblog.blogplatform.api.controller.params.UserForm;
import ru.theblog.blogplatform.api.model.Blog;

public interface BlogService {
    void create(Blog blog);
    Blog getBlog(Long id);
    void addUser(UserForm user);
}
