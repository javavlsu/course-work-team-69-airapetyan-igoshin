package ru.theblog.blogplatform.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.theblog.blogplatform.api.model.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
}
