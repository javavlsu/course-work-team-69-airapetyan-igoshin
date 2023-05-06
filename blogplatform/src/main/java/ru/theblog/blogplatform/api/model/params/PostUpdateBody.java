package ru.theblog.blogplatform.api.model.params;

import jakarta.validation.constraints.NotNull;

public class PostUpdateBody {
    @NotNull
    public Long id;
    @NotNull
    public String title;
    @NotNull
    public String description;
    @NotNull
    public String content;
    @NotNull
    public Boolean isDraft;
}
