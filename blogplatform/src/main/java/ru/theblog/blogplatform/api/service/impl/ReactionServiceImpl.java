package ru.theblog.blogplatform.api.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import ru.theblog.blogplatform.api.model.Reaction;
import ru.theblog.blogplatform.api.model.enums.ReactionType;
import ru.theblog.blogplatform.api.repository.PostRepository;
import ru.theblog.blogplatform.api.repository.ReactionRepository;
import ru.theblog.blogplatform.api.repository.UserRepository;
import ru.theblog.blogplatform.api.service.ReactionService;

@Service
@RequiredArgsConstructor
@Transactional
public class ReactionServiceImpl implements ReactionService {

    private final ReactionRepository reactionRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public static final String POST_NOT_EXIST = "Post doesn't exist";

    @Override
    public void createReaction(long postId, Authentication auth, ReactionType reactionType) throws Exception {
        var post = postRepository.findById(postId).orElse(null);
        if (post == null) {
            throw new Exception(POST_NOT_EXIST);
        }

        var user = userRepository.findByEmail(auth.getName());

        var reaction = reactionRepository.findByUser_IdAndPost_Id(user.getId(), postId).orElse(null);
        if (reaction != null) {
            if (reactionType == null) {
                post.setRating(post.getRating() + (reaction.getReactionType() == ReactionType.Upvote ? -1 : 1));
                reactionRepository.delete(reaction);
                postRepository.saveAndFlush(post);
                return;
            }

            if (reaction.getReactionType() != reactionType) {
                reaction.setReactionType(reactionType);
                post.setRating(post.getRating() + (reactionType == ReactionType.Upvote ? 1 : -1));
                reactionRepository.saveAndFlush(reaction);
                postRepository.saveAndFlush(post);
            }
            return;
        } else if (reactionType == null) {
            return;
        }

        reaction = new Reaction(user, post, reactionType);
        post.setRating(post.getRating() + (reactionType == ReactionType.Upvote ? 1 : -1));
        postRepository.saveAndFlush(post);
        reactionRepository.saveAndFlush(reaction);
    }
}
