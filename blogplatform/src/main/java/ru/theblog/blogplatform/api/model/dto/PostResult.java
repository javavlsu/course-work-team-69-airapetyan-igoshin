package ru.theblog.blogplatform.api.model.dto;

public class PostResult {
    public Long id;
    public String title;
    public String description;
    public String content;
    public Boolean isDraft;

    public PostResult(long id, String title, String description, String content, Boolean isDraft) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.content = content;
        this.isDraft = isDraft;
    }
}
