package ru.theblog.blogplatform.api.model.dto;

public class PreviewPost {
    public long id;
    public long blogId;
    public String title;
    public String description;
    public int rating;

    public PreviewPost(long id, long blogId, String title, String description, int rating) {
        this.id = id;
        this.blogId = blogId;
        this.title = title;
        this.description = description;
        this.rating = rating;
    }
}
