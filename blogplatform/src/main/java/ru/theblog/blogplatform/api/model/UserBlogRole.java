package ru.theblog.blogplatform.api.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import ru.theblog.blogplatform.api.model.enums.RoleBlog;

@Entity
@Data
@RequiredArgsConstructor
public class UserBlogRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @ManyToOne
    private Blog blog;

    @NonNull
    @ManyToOne
    private User user;

    @NonNull
    private RoleBlog role;

    protected UserBlogRole() { }
}
