package ru.theblog.blogplatform.api.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import ru.theblog.blogplatform.api.model.Post;
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
    public List<PreviewPost> getPostPreviews(FeedType feedType, Authentication auth) {
        if (feedType == FeedType.Latest){
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

        if (feedType == FeedType.Popular) {
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

        if (feedType == FeedType.Subscriptions && auth != null) {
            var user = userRepository.findByEmail(auth.getName());
            var subscriptions = userBRRepository.findAllByUser(user);
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
}
