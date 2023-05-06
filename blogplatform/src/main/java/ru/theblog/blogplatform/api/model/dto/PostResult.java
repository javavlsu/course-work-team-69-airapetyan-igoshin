package ru.theblog.blogplatform.api.model.dto;

public class PostResult {
    public Long id;
    public String title;
    public String description;
    public String content;
    public Boolean isDraft;
    public Long blogId;
    public String blogName;

    public PostResult(long id, String title, String description, String content, Boolean isDraft, long blogId, String blogName) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.content = content;
        this.isDraft = isDraft;
        this.blogId = blogId;
        this.blogName = blogName;
    }
}
