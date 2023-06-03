package ru.theblog.blogplatform.api.model.dto;

import ru.theblog.blogplatform.api.model.enums.ReactionType;

import java.time.LocalDateTime;

public class PreviewPost {
    public long id;
    public String title;
    public String description;
    public int rating;
    public ReactionType reactionType;
    public LocalDateTime createDate;

    public PreviewPost(long id, String title, String description, int rating, ReactionType reactionType, LocalDateTime createDate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.rating = rating;
        this.reactionType = reactionType;
        this.createDate = createDate;
    }

    public PreviewPost() {

    }
}
