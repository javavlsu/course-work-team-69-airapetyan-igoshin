package ru.theblog.blogplatform.api.model.dto;

import java.util.List;

public class UserData {
    public String username;
    public String systemRole;
    public List<UserBlogData> blogs;
}
