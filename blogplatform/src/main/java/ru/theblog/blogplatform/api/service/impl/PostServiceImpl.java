package ru.theblog.blogplatform.api.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import ru.theblog.blogplatform.api.model.Post;
import ru.theblog.blogplatform.api.model.UserBlogRole;
import ru.theblog.blogplatform.api.model.dto.PostDropdown;
import ru.theblog.blogplatform.api.model.dto.PreviewPost;
import ru.theblog.blogplatform.api.model.enums.FeedType;
import ru.theblog.blogplatform.api.model.params.PostBody;
import ru.theblog.blogplatform.api.model.params.PostUpdateBody;
import ru.theblog.blogplatform.api.repository.BlogRepository;
import ru.theblog.blogplatform.api.repository.PostRepository;
import ru.theblog.blogplatform.api.repository.UserBlogRoleRepository;
import ru.theblog.blogplatform.api.repository.UserRepository;
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
        if (auth != null && onlySubscription) {
            var user = userRepository.findByEmail(auth.getName());
            subscriptions = userBRRepository.findAllByUser(user);
        }

        if (feedType == FeedType.Latest){
            if (onlySubscription && subscriptions != null){
                var result = new ArrayList<PreviewPost>();
                for (var subscription : subscriptions) {
                    var posts = postRepository.findByBlog_Id(subscription.getBlog().getId());
                    result.addAll(posts.stream()
                            .sorted((o1, o2) -> o2.getCreateDate().compareTo(o1.getCreateDate()))
                            .map(p -> new PreviewPost(
                                            p.getId(),
                                            p.getBlog().getId(),
                                            p.getTitle(),
                                            p.getDescription(),
                                            p.getRating()
                                    )
                            ).toList()
                    );
                }
                return result;
            } else {
                return postRepository.findAllByOrderByCreateDateDesc()
                        .stream()
                        .map(p -> new PreviewPost(
                                        p.getId(),
                                        p.getBlog().getId(),
                                        p.getTitle(),
                                        p.getDescription(),
                                        p.getRating()
                                )
                        ).toList();
            }
        }

        if (feedType == FeedType.Popular) {
            if (onlySubscription && subscriptions != null){
                var result = new ArrayList<PreviewPost>();
                for (var subscription : subscriptions) {
                    var posts = postRepository.findByBlog_Id(subscription.getBlog().getId());
                    result.addAll(posts.stream()
                            .sorted(Comparator.comparingInt(Post::getRating).reversed())
                            .map(p -> new PreviewPost(
                                            p.getId(),
                                            p.getBlog().getId(),
                                            p.getTitle(),
                                            p.getDescription(),
                                            p.getRating()
                                    )
                            ).toList()
                    );
                }
                return result;
            } else {
                return postRepository.findAllByOrderByRatingDesc()
                        .stream()
                        .map(p -> new PreviewPost(
                                        p.getId(),
                                        p.getBlog().getId(),
                                        p.getTitle(),
                                        p.getDescription(),
                                        p.getRating()
                                )
                        ).toList();
            }
        }

        return null;
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
    public List<PostDropdown> search(String query) {
        return postRepository.getAllByTitle(query).stream().map(p -> new PostDropdown(p.getId(), p.getTitle())).toList();
    }
}
