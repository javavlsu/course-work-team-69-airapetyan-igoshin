package ru.theblog.blogplatform.api.service;

import ru.theblog.blogplatform.api.model.Post;

public interface PostService {
    void create(Post post);
    Post getPost(Long id);
}
