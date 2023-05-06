package ru.theblog.blogplatform.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.theblog.blogplatform.api.model.Blog;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {
}
