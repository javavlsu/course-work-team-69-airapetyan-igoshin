package ru.theblog.blogplatform.api.model.dto;

public class PostSearch {
    public long id;
    public String title;
    public String description;
    public int rating;

    public PostSearch(long id, String title, String description, int rating) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.rating = rating;
    }
}
