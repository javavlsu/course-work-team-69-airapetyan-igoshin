package ru.theblog.blogplatform.api.service;

import ru.theblog.blogplatform.api.model.Post;
import ru.theblog.blogplatform.api.model.params.PostBody;
import ru.theblog.blogplatform.api.model.params.PostUpdateBody;

import java.time.LocalDateTime;
import java.util.List;

public interface PostService {
    Long createPost(PostBody postBody);
    Post getPost(Long id);
    List<Post> getPosts(LocalDateTime from, LocalDateTime to);
    List<Post> getBlogPosts(long blogId);
    void updatePost(PostUpdateBody postBody, Post post);
    void deletePost(Long postId);
    void updateStatus(Long postId, boolean isDraft);
}
