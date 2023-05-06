package ru.theblog.blogplatform.api.model;

import jakarta.validation.constraints.NotNull;
import ru.theblog.blogplatform.api.model.enums.ReactionType;

public class ReactionBody {
    @NotNull
    public Long postId;
    public ReactionType reactionType;
}
