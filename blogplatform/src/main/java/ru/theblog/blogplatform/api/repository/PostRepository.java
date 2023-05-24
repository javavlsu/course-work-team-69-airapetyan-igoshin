package ru.theblog.blogplatform.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.theblog.blogplatform.api.model.Post;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByOrderByCreateDateDesc();
    List<Post> findAllByOrderByRatingDesc();
    List<Post> findByBlog_Id(long blogId);
    @Query("SELECT SUM(p.rating) FROM Post p WHERE p.blog.id = :blogId")
    Integer getTotalReputation(@Param("blogId")long blogId);
}
