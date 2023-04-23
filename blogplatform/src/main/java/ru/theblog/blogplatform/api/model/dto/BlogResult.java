package ru.theblog.blogplatform.api.model.dto;

import ru.theblog.blogplatform.api.model.enums.BlogRole;

import java.util.List;

public class BlogResult {
    public String name;
    public String description;
    public BlogRole userRole;
    public int subscribers;
    public int rating;
    public int postAmount;
    public List<FeedPostResult> posts;
}
