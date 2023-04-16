package ru.theblog.blogplatform.api.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ru.theblog.blogplatform.api.controller.params.PostParams;
import ru.theblog.blogplatform.api.controller.params.UserForm;
import ru.theblog.blogplatform.api.model.Post;
import ru.theblog.blogplatform.api.model.dto.ProfileResult;
import ru.theblog.blogplatform.api.service.BlogService;
import ru.theblog.blogplatform.api.service.PostService;
import ru.theblog.blogplatform.api.service.UserService;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AppController {

    private final BlogService _blogService;
    private final PostService _postService;
    private final UserService _userService;

    @GetMapping("/getPosts")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public List<Post> getPosts(@Valid PostParams s) {
        return _postService.getPosts(s.getFrom(), s.getTo());
    }

    @PostMapping("/registration")
    public String registration(@RequestBody UserForm user, Principal auth) {
        _blogService.addUser(user);
        return "Successful";
    }

    @GetMapping("/profile")
    public ResponseEntity<ProfileResult> profile(Authentication auth) {
        if (auth == null)
            return new ResponseEntity<>(HttpStatusCode.valueOf(403));

        var user = _userService.getUserByEmail(auth.getName());
        var result = new ProfileResult();
        result.name = user.getName();
        result.birthdate = user.getBirthdate();
        result.status = user.getStatus();
        result.email = user.getEmail();
        result.blogs = _blogService.getUserBlogs(user);

        return new ResponseEntity<>(result, HttpStatusCode.valueOf(200));
    }
}
