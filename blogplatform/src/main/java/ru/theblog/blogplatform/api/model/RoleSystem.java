package ru.theblog.blogplatform.api.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Entity
@Table(name = "role_system")
@Data
@RequiredArgsConstructor
public class RoleSystem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "role")
    private List<User> users;

    public RoleSystem(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    protected RoleSystem() { }
}
