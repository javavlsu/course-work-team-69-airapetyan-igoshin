package ru.theblog.blogplatform.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.theblog.blogplatform.api.model.Post;

import java.time.LocalDateTime;
import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByDateAfterAndDateBefore(LocalDateTime from, LocalDateTime to);
}
