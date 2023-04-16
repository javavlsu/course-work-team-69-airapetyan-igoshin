package ru.theblog.blogplatform.api.model.dto;

import java.time.LocalDate;
import java.util.List;

public class ProfileResult {
    public String name;
    public String profileImage; // Is empty for now
    public LocalDate birthdate;
    public String status; //Empty for now
    public String email;
    public List<BlogUserResult> blogs;
}
