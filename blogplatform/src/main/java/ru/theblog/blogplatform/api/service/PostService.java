package ru.theblog.blogplatform.api.service;

import ru.theblog.blogplatform.api.model.Post;

import java.time.LocalDateTime;
import java.util.List;

public interface PostService {
    void create(Post post);
    Post getPost(Long id);
    List<Post> getPosts(LocalDateTime from, LocalDateTime to);
    List<Post> getBlogPosts(long blogId);
}
