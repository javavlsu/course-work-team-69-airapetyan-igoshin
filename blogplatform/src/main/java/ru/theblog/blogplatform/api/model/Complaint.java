package ru.theblog.blogplatform.api.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import ru.theblog.blogplatform.api.model.enums.ComplaintStatus;
import ru.theblog.blogplatform.api.model.enums.ContentType;

import java.time.LocalDateTime;

@Entity
@Data
@RequiredArgsConstructor
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User informer;

    @NonNull
    @Column(name = "content_type", nullable = false)
    private ContentType contentType;

    @NonNull
    @Column(name = "source_id", nullable = false)
    private Long sourceId;

    @NonNull
    @Column(nullable = false)
    private ComplaintStatus status;

    @NonNull
    private String message;

    @NonNull
    @Column(nullable = false)
    private LocalDateTime date;

    protected Complaint() { }
}
