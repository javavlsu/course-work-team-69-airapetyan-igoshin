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
    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @NonNull
    @Column(name = "create_date", nullable = false)
    private LocalDateTime createDate;

    @NonNull
    @Column(name = "update_date", nullable = false)
    private LocalDateTime updateDate;

    @Column(name = "reaction_count", nullable = false)
    private int reactionCount;

    @Column(name = "is_draft", nullable = false)
    private boolean isDraft;

    @ManyToOne
    @NonNull
    private Blog blog;

    protected Post() { }

    public Post(@NonNull String title, String description, @NonNull String content, @NonNull LocalDateTime createDate, int reactionCount, boolean isDraft, @NonNull Blog blog) {
        this.title = title;
        this.description = description;
        this.content = content;
        this.createDate = createDate;
        this.updateDate = createDate;
        this.reactionCount = reactionCount;
        this.isDraft = isDraft;
        this.blog = blog;
    }

    public Post(@NonNull Long id, @NonNull String title, String description, @NonNull String content, @NonNull LocalDateTime createDate, @NonNull LocalDateTime updateDate, int reactionCount, boolean isDraft, @NonNull Blog blog) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.content = content;
        this.createDate = createDate;
        this.updateDate = updateDate;
        this.reactionCount = reactionCount;
        this.isDraft = isDraft;
        this.blog = blog;
    }
}
