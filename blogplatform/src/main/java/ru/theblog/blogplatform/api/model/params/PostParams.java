package ru.theblog.blogplatform.api.model.params;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import ru.theblog.blogplatform.api.model.enums.FeedType;

import java.time.LocalDate;

@Data
public class PostParams {
    @NotNull
    private FeedType feedType;
    @NotNull
    private boolean onlySubscription;
    @NotNull
    private Integer part;
    private LocalDate dateFrom;
    private LocalDate dateTo;
    private Boolean reversed;
    private Integer postsPerPart = 10;
}
