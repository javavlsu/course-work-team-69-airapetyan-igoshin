package ru.theblog.blogplatform.api.service.impl;

import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import ru.theblog.blogplatform.api.model.Post;
import ru.theblog.blogplatform.api.model.User;
import ru.theblog.blogplatform.api.model.dto.PostResult;
import ru.theblog.blogplatform.api.model.dto.PreviewPost;
import ru.theblog.blogplatform.api.model.enums.FeedType;
import ru.theblog.blogplatform.api.model.enums.ReactionType;
import ru.theblog.blogplatform.api.model.params.PostBody;
import ru.theblog.blogplatform.api.model.params.PostUpdateBody;
import ru.theblog.blogplatform.api.repository.*;
import ru.theblog.blogplatform.api.service.PostService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final BlogRepository blogRepository;
    private final UserBlogRoleRepository userBRRepository;
    private final UserRepository userRepository;
    private final ReactionRepository reactionRepository;

    @Override
    public Long createPost(PostBody postBody) {
        var blog = blogRepository.findById(postBody.blogId).get();
        var post = new Post(postBody.title, postBody.description, postBody.content, LocalDateTime.now(), 0, postBody.isDraft, blog);
        postRepository.saveAndFlush(post);
        return post.getId();
    }

    @Override
    public Post getPost(Long id) {
        var post = postRepository.findById(id);
        return post.orElse(null);
    }

    @Override
    public PostResult getPostForPage(Long id, Authentication auth) {
        User user = null;
        if (auth != null)
            user = userRepository.findByEmail(auth.getName());
        var post = getPost(id);
        return new PostResult(post.getId(),
                post.getTitle(),
                post.getDescription(),
                post.getContent(),
                post.isDraft(),
                post.getBlog().getId(),
                post.getBlog().getName(),
                post.getRating(),
                user != null ? getUserPostReaction(user.getId(), post.getId()) : null,
                post.getCreateDate());
    }

    @Override
    public List<PreviewPost> getPostPreviews(
            FeedType feedType,
            boolean onlySubscription,
            @NotNull Integer part,
            Integer postsPerPart,
            Boolean reversed,
            LocalDateTime dateFrom,
            LocalDateTime dateTo,
            Authentication auth) {

        if (part < 0)
            part = 0;
        if (postsPerPart < 0)
            postsPerPart = 0;

        User user = null;
        if (onlySubscription && auth != null)
            user = userRepository.findByEmail(auth.getName());


        List<Post> posts = null;
        if (onlySubscription && user != null) {
            posts = postRepository.findForFeedByUserId(user.getId(),
                    part * postsPerPart,
                    postsPerPart,
                    dateFrom,
                    dateTo,
                    reversed,
                    feedType == FeedType.Popular);
        } else if (!onlySubscription)/*In case unauthorized user tries to send onlySubscription == true*/ {
            posts = postRepository.findForFeed(
                    part * postsPerPart,
                    postsPerPart,
                    dateFrom,
                    dateTo,
                    reversed,
                    feedType == FeedType.Popular
            );
        }

        User finalUser = user;
        return posts != null ? posts.stream().map(p -> new PreviewPost(
                p.getId(),
                p.getTitle(),
                p.getDescription(),
                p.getRating(),
                finalUser != null ? getUserPostReaction(finalUser.getId(), p.getId()) : null,
                p.getCreateDate())).toList()
                : new ArrayList<>(0);
    }

    private ReactionType getUserPostReaction(Long userId, Long postId) {
        var reaction = reactionRepository.findByUser_IdAndPost_Id(userId, postId).orElse(null);
        return reaction != null ? reaction.getReactionType() : null;
    }

    @Override
    public List<Post> getBlogPosts(long blogId) {
        return postRepository.findByBlog_Id(blogId);
    }

    @Override
    public void updatePost(PostUpdateBody postBody, Post post) {
        postRepository.saveAndFlush(new Post(post.getId(), postBody.title, postBody.description, postBody.content, post.getCreateDate(), LocalDateTime.now(), post.getRating(),  postBody.isDraft, post.getBlog()));
    }

    @Override
    public void deletePost(Long postId) {
        postRepository.deleteById(postId);
    }

    @Override
    public void updateStatus(Long postId, boolean isDraft) {
        var post = postRepository.findById(postId).get();
        post.setDraft(isDraft);
        postRepository.saveAndFlush(post);
    }

    @Override
    public List<PreviewPost> search(String query, Authentication auth) {
        if (query.isEmpty() || query.isBlank() || query == null)
            return new ArrayList<>(0);

        User user = null;
        if (auth != null)
            user = userRepository.findByEmail(auth.getName());

        User finalUser = user;
        return postRepository.getAllByTitle(query).stream().map(p -> new PreviewPost(p.getId(),
                p.getTitle(),
                p.getDescription(),
                p.getRating(),
                finalUser != null ? getUserPostReaction(finalUser.getId(), p.getId()) : null,
                p.getCreateDate())).toList();
    }
}
