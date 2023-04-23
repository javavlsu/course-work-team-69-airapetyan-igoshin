package ru.theblog.blogplatform.api.model;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@RequiredArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "post")
    private List<Comment> comments;

    @OneToMany(mappedBy = "post")
    private List<Reaction> reactions;

    @NonNull
    @Column(nullable = false)
    private String title;

    private String description;

    @NonNull
    @Column(nullable = false)
    private String content;

    @NonNull
    @Column(nullable = false)
    private LocalDateTime date;

    @Column(name = "reaction_count", nullable = false)
    private int reactionCount;

    @ManyToOne
    @NonNull
    private Blog blog;

    protected Post() { }
}
