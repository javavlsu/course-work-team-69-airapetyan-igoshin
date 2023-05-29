package ru.theblog.blogplatform.api.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import ru.theblog.blogplatform.api.model.Post;
import ru.theblog.blogplatform.api.model.User;
import ru.theblog.blogplatform.api.model.UserBlogRole;
import ru.theblog.blogplatform.api.model.dto.PreviewPost;
import ru.theblog.blogplatform.api.model.enums.FeedType;
import ru.theblog.blogplatform.api.model.enums.ReactionType;
import ru.theblog.blogplatform.api.model.params.PostBody;
import ru.theblog.blogplatform.api.model.params.PostUpdateBody;
import ru.theblog.blogplatform.api.repository.*;
import ru.theblog.blogplatform.api.service.PostService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
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
    public List<PreviewPost> getPostPreviews(FeedType feedType, boolean onlySubscription, Authentication auth) {
        List<UserBlogRole> subscriptions = null;
        User user = null;
        if (auth != null) {
            user = userRepository.findByEmail(auth.getName());
            subscriptions = userBRRepository.findAllByUser(user);
        }

        if (feedType == FeedType.Latest){
            if (onlySubscription && subscriptions != null){
                var result = new ArrayList<PreviewPost>();
                for (var subscription : subscriptions) {
                    var posts = postRepository.findByBlog_Id(subscription.getBlog().getId());
                    User finalUser = user;
                    result.addAll(posts.stream()
                            .sorted((o1, o2) -> o2.getCreateDate().compareTo(o1.getCreateDate()))
                            .map(p -> new PreviewPost(
                                            p.getId(),
                                            p.getTitle(),
                                            p.getDescription(),
                                            p.getRating(),
                                            finalUser != null ? getUserPostReaction(finalUser.getId(), p.getId()) : null
                                            )
                            ).toList()
                    );
                }
                return result;
            } else {
                User finalUser1 = user;
                return postRepository.findAllByOrderByCreateDateDesc()
                        .stream()
                        .map(p -> new PreviewPost(
                                        p.getId(),
                                        p.getTitle(),
                                        p.getDescription(),
                                        p.getRating(),
                                        finalUser1 != null ? getUserPostReaction(finalUser1.getId(), p.getId()) : null
                                        )
                        ).toList();
            }
        }

        if (feedType == FeedType.Popular) {
            if (onlySubscription && subscriptions != null){
                var result = new ArrayList<PreviewPost>();
                for (var subscription : subscriptions) {
                    var posts = postRepository.findByBlog_Id(subscription.getBlog().getId());
                    User finalUser2 = user;
                    result.addAll(posts.stream()
                            .sorted(Comparator.comparingInt(Post::getRating).reversed())
                            .map(p -> new PreviewPost(
                                            p.getId(),
                                            p.getTitle(),
                                            p.getDescription(),
                                            p.getRating(),
                                            finalUser2 != null ? getUserPostReaction(finalUser2.getId(), p.getId()) : null
                                            )
                            ).toList()
                    );
                }
                return result;
            } else {
                User finalUser3 = user;
                return postRepository.findAllByOrderByRatingDesc()
                        .stream()
                        .map(p -> new PreviewPost(
                                        p.getId(),
                                        p.getTitle(),
                                        p.getDescription(),
                                        p.getRating(),
                                        finalUser3 != null ? getUserPostReaction(finalUser3.getId(), p.getId()) : null
                                        )
                        ).toList();
            }
        }

        return null;
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
    public List<PreviewPost> search(String query) {
        return postRepository.getAllByTitle(query).stream().map(p -> new PreviewPost(p.getId(), p.getTitle(), p.getDescription(), p.getRating(), ReactionType.Upvote)).toList();
    }
}
