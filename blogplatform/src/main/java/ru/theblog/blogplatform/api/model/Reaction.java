package ru.theblog.blogplatform.api.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import ru.theblog.blogplatform.api.model.enums.ReactionType;

@Entity
@Data
@RequiredArgsConstructor
public class Reaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Post post;

    @NonNull
    @Column(name = "reaction_type", nullable = false)
    private ReactionType reactionType;

    public Reaction() { }

    public Reaction(User user, Post post, ReactionType reactionType) {
        this.user = user;
        this.post = post;
        this.reactionType = reactionType;
    }
}
