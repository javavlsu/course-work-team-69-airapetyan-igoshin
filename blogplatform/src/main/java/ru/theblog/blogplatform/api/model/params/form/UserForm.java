package ru.theblog.blogplatform.api.model.params.form;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class UserForm {
    @NotNull
    public String name;
    @NotNull
    public String email;
    @NotNull
    public LocalDate birthdate;
    @NotNull
    public String password;
}
