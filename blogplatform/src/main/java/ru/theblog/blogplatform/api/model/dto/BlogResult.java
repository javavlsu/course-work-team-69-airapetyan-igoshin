package ru.theblog.blogplatform.api.model.dto;

import java.util.List;

public class BlogResult {
    public long id;
    public String name;
    public String description;
    public String config;
    public Integer userRole;
    public int subscribers;
    public int rating;
    public int postAmount;
    public List<FeedPostResult> posts;
}
