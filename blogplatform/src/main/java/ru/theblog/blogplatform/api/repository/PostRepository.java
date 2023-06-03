package ru.theblog.blogplatform.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.theblog.blogplatform.api.model.Post;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByOrderByCreateDateDesc();
    List<Post> findAllByOrderByCreateDateAsc();
    List<Post> findAllByOrderByRatingDesc();
    List<Post> findByBlog_Id(long blogId);
    @Query("SELECT SUM(p.rating) FROM Post p WHERE p.blog.id = :blogId")
    Integer getTotalReputation(@Param("blogId")long blogId);
    @Query("SELECT p FROM Post p WHERE LOWER(p.title) LIKE LOWER(CONCAT('%', :query, '%')) ORDER BY p.createDate DESC")
    List<Post> getAllByTitle(@Param("query")String query);

    @Query(value =
            "SELECT p.* " +
                    "FROM post p " +
                    "JOIN user_blog_role ubr ON p.blog_id = ubr.blog_id " +
                    "WHERE ubr.user_id = :userId " +
                    "AND :dateFrom <= p.create_date AND p.create_date <= :dateTo " +
                    "ORDER BY CASE WHEN :reversed = false AND :popular = false THEN p.create_date END DESC, " +
                    "         CASE WHEN :reversed = true AND :popular = false THEN p.create_date END ASC, " +
                    "         CASE WHEN :reversed = false AND :popular = true THEN p.rating END DESC, " +
                    "         CASE WHEN :reversed = true AND :popular = true THEN p.rating END ASC " +
                    "OFFSET :part " +
                    "LIMIT :postsPerPart",
            nativeQuery = true
    )
    List<Post> findForFeedByUserId(@Param("userId")long userId,
                                   @Param("part")Integer part,
                                   @Param("postsPerPart")Integer postsPerPart,
                                   @Param("dateFrom")LocalDate dateFrom,
                                   @Param("dateTo")LocalDate dateTo,
                                   @Param("reversed")Boolean reversed,
                                   @Param("popular")Boolean isPopular

    );

    @Query(value =
            "SELECT p.* " +
                    "FROM post p " +
                    "WHERE :dateFrom <= p.create_date AND p.create_date <= :dateTo " +
                    "ORDER BY CASE WHEN :reversed = false AND :popular = false THEN p.create_date END DESC, " +
                    "         CASE WHEN :reversed = true AND :popular = false THEN p.create_date END ASC, " +
                    "         CASE WHEN :reversed = false AND :popular = true THEN p.rating END DESC, " +
                    "         CASE WHEN :reversed = true AND :popular = true THEN p.rating END ASC " +
                    "OFFSET :part " +
                    "LIMIT :postsPerPart",
            nativeQuery = true
    )
    List<Post> findForFeed(@Param("part")Integer part,
                           @Param("postsPerPart")Integer postsPerPart,
                           @Param("dateFrom")LocalDate dateFrom,
                           @Param("dateTo")LocalDate dateTo,
                           @Param("reversed")Boolean reversed,
                           @Param("popular")Boolean isPopular

    );
}
