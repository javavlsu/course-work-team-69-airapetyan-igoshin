package ru.theblog.blogplatform.api.controller.Params;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PostParams {
    @NotNull
    private LocalDateTime from;

    @NotNull
    private LocalDateTime to;
}
