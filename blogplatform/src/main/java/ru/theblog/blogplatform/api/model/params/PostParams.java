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
    private LocalDate dateFrom = LocalDate.ofYearDay(100,1);
    private LocalDate dateTo = LocalDate.ofYearDay(4000, 1);
    private Boolean reversed = false;
    private Integer postsPerPart = 10;
}
