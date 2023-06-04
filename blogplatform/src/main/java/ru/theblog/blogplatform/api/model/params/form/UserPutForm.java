package ru.theblog.blogplatform.api.model.params.form;

import java.time.LocalDate;

public class UserPutForm {
    public String email;
    public String password;
    public String name;
    public String status;
    public LocalDate birthdate;
}
