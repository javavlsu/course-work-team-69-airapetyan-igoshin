package ru.theblog.blogplatform.api.service;

import org.springframework.security.core.Authentication;
import ru.theblog.blogplatform.api.model.Post;
import ru.theblog.blogplatform.api.model.dto.PostDropdown;
import ru.theblog.blogplatform.api.model.dto.PreviewPost;
import ru.theblog.blogplatform.api.model.enums.FeedType;
import ru.theblog.blogplatform.api.model.params.PostBody;
import ru.theblog.blogplatform.api.model.params.PostUpdateBody;

import java.util.List;

public interface PostService {
    Long createPost(PostBody postBody);
    Post getPost(Long id);
    List<PreviewPost> getPostPreviews(FeedType feedType, boolean onlySubscription, Authentication auth);
    List<Post> getBlogPosts(long blogId);
    void updatePost(PostUpdateBody postBody, Post post);
    void deletePost(Long postId);
    void updateStatus(Long postId, boolean isDraft);
    List<PostDropdown> search(String query);
}
