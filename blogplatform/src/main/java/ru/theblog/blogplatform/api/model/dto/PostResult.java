package ru.theblog.blogplatform.api.model.dto;

import ru.theblog.blogplatform.api.model.enums.ReactionType;

import java.time.LocalDateTime;

public class PostResult {
    public Long id;
    public String title;
    public String description;
    public LocalDateTime createDate;
    public String content;
    public Boolean isDraft;
    public Long blogId;
    public String blogName;
    public int rating;
    public ReactionType reactionType;

    public PostResult(long id, String title, String description, String content, Boolean isDraft, long blogId, String blogName, int rating, ReactionType reactionType, LocalDateTime createDate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.content = content;
        this.isDraft = isDraft;
        this.blogId = blogId;
        this.blogName = blogName;
        this.rating = rating;
        this.reactionType = reactionType;
        this.createDate = createDate;
    }
}
