package ru.theblog.blogplatform.api.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.theblog.blogplatform.api.controller.params.PostParams;
import ru.theblog.blogplatform.api.controller.params.UserForm;
import ru.theblog.blogplatform.api.model.Post;
import ru.theblog.blogplatform.api.service.BlogService;
import ru.theblog.blogplatform.api.service.PostService;

import java.util.List;

@RestController
@RequestMapping("/blog")
@RequiredArgsConstructor
public class BlogController {

    private final BlogService _blogService;
    private final PostService _postService;

    @GetMapping("/getPosts")
    //@PreAuthorize("hasAuthority('ROLE_USER')")
    public List<Post> getPosts(@Valid PostParams s) {
        return _postService.getPosts(s.getFrom(), s.getTo());
    }

    @PostMapping("/addUser")
    public String addUser(@RequestBody UserForm user) {
        _blogService.addUser(user);
        return "Successful";
    }
}
