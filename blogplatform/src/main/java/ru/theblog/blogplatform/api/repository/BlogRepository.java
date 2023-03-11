package ru.theblog.blogplatform.api.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.theblog.blogplatform.api.model.Blog;

@Repository
@Transactional
public interface BlogRepository extends JpaRepository<Blog, Long> {
}
