package ru.theblog.blogplatform.api.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.theblog.blogplatform.api.model.Post;
import ru.theblog.blogplatform.api.model.params.PostBody;
import ru.theblog.blogplatform.api.model.params.PostUpdateBody;
import ru.theblog.blogplatform.api.repository.BlogRepository;
import ru.theblog.blogplatform.api.repository.PostRepository;
import ru.theblog.blogplatform.api.service.PostService;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final BlogRepository blogRepository;

    @Override
    public void createPost(PostBody postBody) {
        var blog = blogRepository.findById(postBody.blogId).get();
        var post = new Post(postBody.title, postBody.description, postBody.content, LocalDateTime.now(), 0, postBody.isDraft, blog);
        postRepository.saveAndFlush(post);
    }

    @Override
    public Post getPost(Long id) {
        var post = postRepository.findById(id);
        return post.orElse(null);
    }

    @Override
    public List<Post> getPosts(LocalDateTime from, LocalDateTime to) {
        return postRepository.findByCreateDateAfterAndCreateDateBefore(from, to);
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
