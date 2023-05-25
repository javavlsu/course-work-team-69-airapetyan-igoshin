package ru.theblog.blogplatform.api.model.params;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import ru.theblog.blogplatform.api.model.enums.FeedType;

@Data
public class PostParams {
    @NotNull
    private FeedType feedType;
    @NotNull
    private boolean onlySubscription;
}
