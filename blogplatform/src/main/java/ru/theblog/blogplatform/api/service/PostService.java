package ru.theblog.blogplatform.api.service;

import jakarta.validation.constraints.NotNull;
import org.springframework.security.core.Authentication;
import ru.theblog.blogplatform.api.model.Post;
import ru.theblog.blogplatform.api.model.dto.PostResult;
import ru.theblog.blogplatform.api.model.dto.PreviewPost;
import ru.theblog.blogplatform.api.model.enums.FeedType;
import ru.theblog.blogplatform.api.model.params.PostBody;
import ru.theblog.blogplatform.api.model.params.PostUpdateBody;

import java.time.LocalDateTime;
import java.util.List;

public interface PostService {
    Long createPost(PostBody postBody);
    Post getPost(Long id);
    PostResult getPostForPage(Long id, Authentication auth);
    List<PreviewPost> getPostPreviews(FeedType feedType, boolean onlySubscription, @NotNull Integer part, Integer postsPerPart, Boolean reversed, LocalDateTime dateFrom, LocalDateTime from, Authentication auth);
    List<Post> getBlogPosts(long blogId);
    void updatePost(PostUpdateBody postBody, Post post);
    void deletePost(Long postId);
    void updateStatus(Long postId, boolean isDraft);
    List<PreviewPost> search(String query, Authentication auth);
}
