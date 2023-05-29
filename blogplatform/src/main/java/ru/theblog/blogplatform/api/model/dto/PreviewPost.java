package ru.theblog.blogplatform.api.model.dto;

import ru.theblog.blogplatform.api.model.enums.ReactionType;

public class PreviewPost {
    public long id;
    public String title;
    public String description;
    public int rating;
    public ReactionType reactionType;

    public PreviewPost(long id, String title, String description, int rating, ReactionType reactionType) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.rating = rating;
        this.reactionType = reactionType;
    }

    public PreviewPost() {

    }
}
