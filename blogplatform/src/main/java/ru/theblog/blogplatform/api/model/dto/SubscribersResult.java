package ru.theblog.blogplatform.api.model.dto;

public class SubscribersResult {
    public Long id;
    public String name;
    public boolean isCollaborator;

    public SubscribersResult(Long id, String name, boolean isCollaborator) {
        this.id = id;
        this.name = name;
        this.isCollaborator = isCollaborator;
    }
}
