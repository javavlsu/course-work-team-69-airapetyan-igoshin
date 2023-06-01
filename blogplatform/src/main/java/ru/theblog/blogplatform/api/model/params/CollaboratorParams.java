package ru.theblog.blogplatform.api.model.params;

import jakarta.validation.constraints.NotNull;

public class CollaboratorParams {
    @NotNull
    public Long blogId;
    @NotNull
    public Long userId;
    @NotNull
    public Boolean create;
}
