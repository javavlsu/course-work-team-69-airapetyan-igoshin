package ru.theblog.blogplatform.api.service;

import org.springframework.security.core.Authentication;
import ru.theblog.blogplatform.api.model.enums.ReactionType;

public interface ReactionService {
    void createReaction(long postId, Authentication auth, ReactionType reactionType) throws Exception;
}
