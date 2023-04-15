package ru.theblog.blogplatform.api.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@Table(name = "users")
@RequiredArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Column(nullable = false)
    private String name;

    @Column(nullable = true)
    private LocalDate birthdate;

    @NonNull
    @Column(nullable = false)
    private String email;

    @NonNull
    @Column(nullable = false)
    private String password;

    @NonNull
    @Column(name="registration_date", nullable = false)
    private LocalDate registrationDate;

    @OneToMany(mappedBy = "informer")
    private List<Complaint> complaints;

    @ManyToOne
    private RoleSystem role;

    @OneToMany(mappedBy = "user")
    private List<Comment> comments;

    @OneToMany(mappedBy = "user")
    private List<Reaction> reactions;

    @OneToMany(mappedBy = "user")
    private List<UserBlogRole> userBlogRoles;

    protected User() { }

    public User(@NonNull String name, LocalDate birthdate, @NonNull String email, @NonNull String password, @NonNull LocalDate registrationDate) {
        this.name = name;
        this.birthdate = birthdate;
        this.email = email;
        this.password = password;
        this.registrationDate = registrationDate;
    }
}
