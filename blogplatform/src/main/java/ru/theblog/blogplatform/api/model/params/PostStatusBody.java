package ru.theblog.blogplatform.api.model.params;

import jakarta.validation.constraints.NotNull;

public class PostStatusBody {
    @NotNull
    public Long postId;
    @NotNull
    public Boolean isDraft;
}
