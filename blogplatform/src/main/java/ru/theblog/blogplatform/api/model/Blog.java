package ru.theblog.blogplatform.api.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Entity
@Data
@RequiredArgsConstructor
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Column(nullable = false)
    private String name;

    @Column
    private String description;

    @OneToMany(mappedBy = "blog", cascade = CascadeType.REMOVE)
    private List<UserBlogRole> userBlogRoles;

    @OneToMany(mappedBy = "blog", cascade = CascadeType.REMOVE)
    private List<Post> posts;

    protected Blog() { }

    public Blog(long id, @NonNull String name, String description) {
        this(name, description);
        this.id = id;
    }

    public Blog(@NonNull String name, String description) {
        this.name = name;
        this.description = description;
    }
}
