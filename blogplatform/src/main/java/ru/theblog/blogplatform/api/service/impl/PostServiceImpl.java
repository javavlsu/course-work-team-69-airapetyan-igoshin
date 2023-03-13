package ru.theblog.blogplatform.api.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.theblog.blogplatform.api.model.Post;
import ru.theblog.blogplatform.api.repository.PostRepository;
import ru.theblog.blogplatform.api.service.PostService;

@Service
@RequiredArgsConstructor
@Transactional
public class PostServiceImpl implements PostService {

    private final PostRepository repository;

    @Override
    public void create(Post post) {
        repository.saveAndFlush(post);
    }

    @Override
    public Post getPost(Long id) {
        return repository.findById(id).get();
    }
}
