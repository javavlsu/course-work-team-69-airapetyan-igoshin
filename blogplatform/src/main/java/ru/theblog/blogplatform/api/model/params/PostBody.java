package ru.theblog.blogplatform.api.model.params;

import jakarta.validation.constraints.NotNull;

public class PostBody {
    @NotNull
    public Long blogId;
    @NotNull
    public String title;
    @NotNull
    public String description;
    @NotNull
    public String content;
    @NotNull
    public Boolean isDraft;
}
