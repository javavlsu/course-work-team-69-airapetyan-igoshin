package ru.theblog.blogplatform.api.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.theblog.blogplatform.api.model.Blog;
import ru.theblog.blogplatform.api.repository.BlogRepository;
import ru.theblog.blogplatform.api.service.BlogService;

@Service
@RequiredArgsConstructor
@Transactional
public class BlogServiceImpl implements BlogService {

    private final BlogRepository repository;

    @Override
    public void create(Blog blog) {
        repository.saveAndFlush(blog);
    }

    @Override
    public Blog getBlog(Long id) {
        return repository.findById(id).get();
    }
}
