package ru.theblog.blogplatform.api.model.params;

import jakarta.validation.constraints.NotNull;

public class SubscribeParams {
    @NotNull
    public Long blogId;
    @NotNull
    public Boolean subscribe;
}
