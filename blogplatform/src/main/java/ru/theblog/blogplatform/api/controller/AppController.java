package ru.theblog.blogplatform.api.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ru.theblog.blogplatform.api.model.Post;
import ru.theblog.blogplatform.api.model.User;
import ru.theblog.blogplatform.api.model.dto.BlogResult;
import ru.theblog.blogplatform.api.model.dto.FeedPostResult;
import ru.theblog.blogplatform.api.model.dto.ProfileResult;
import ru.theblog.blogplatform.api.model.enums.BlogRole;
import ru.theblog.blogplatform.api.model.params.*;
import ru.theblog.blogplatform.api.model.params.form.BlogForm;
import ru.theblog.blogplatform.api.model.params.form.BlogUpdateForm;
import ru.theblog.blogplatform.api.model.params.form.UserForm;
import ru.theblog.blogplatform.api.service.BlogService;
import ru.theblog.blogplatform.api.service.PostService;
import ru.theblog.blogplatform.api.service.UserService;

import java.security.Principal;
import java.util.ArrayList;
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

    @GetMapping("/blog/{blogId}")
    public BlogResult blog(@PathVariable long blogId, @Valid BlogParams params, Authentication auth) {
        var blog = _blogService.getBlog(blogId);
        var posts = _postService.getBlogPosts(blogId);
        User user = null;
        if (auth != null){
            user = _userService.getUserByEmail(auth.getName());
        }

        var result = new BlogResult();
        result.name = blog.getName();
        result.description = blog.getDescription();
        result.subscribers = _blogService.getSubscribersCount(blogId);
        result.userRole = user != null ? _blogService.getUserBlogRole(user.getId(), blogId) : null;
        result.postAmount = posts.size();
        result.rating = _blogService.getRating(blogId);
        result.posts = new ArrayList<>();

        for (var post : posts) {
            var feedPost = new FeedPostResult();
            feedPost.id = post.getId();
            feedPost.title = post.getTitle();
            feedPost.description = post.getDescription();
            feedPost.rating = post.getReactionCount();
            result.posts.add(feedPost);
        }

        return result;
    }

    @PostMapping("/blog")
    public ResponseEntity blog(@RequestBody BlogForm blog, Authentication auth) {
        try {
            if (auth == null) {
                return new ResponseEntity<>(HttpStatusCode.valueOf(403));
            }
            _blogService.create(blog, auth);
            return new ResponseEntity<>(HttpStatusCode.valueOf(200));
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(500));
        }
    }

    @PutMapping("/blog")
    public ResponseEntity blog(@RequestBody BlogUpdateForm blog, Authentication auth) {
        try {
            if (blog.name == null || blog.name.isEmpty()) {
                return new ResponseEntity<>(HttpStatusCode.valueOf(400));
            }
            if (auth == null) {
                return new ResponseEntity<>(HttpStatusCode.valueOf(403));
            }

            var user = _userService.getUserByEmail(auth.getName());
            var role = _blogService.getUserBlogRole(user.getId(), blog.id);
            if (role != BlogRole.Creator) {
                return new ResponseEntity<>(HttpStatusCode.valueOf(403));
            }

            _blogService.update(blog, auth);
            return new ResponseEntity<>(HttpStatusCode.valueOf(200));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatusCode.valueOf(500));
        }
    }

    @DeleteMapping("/blog/{blogId}")
    public ResponseEntity blog(@PathVariable long blogId, Authentication auth) {
        try {
            if (auth == null) {
                return new ResponseEntity<>(HttpStatusCode.valueOf(403));
            }

            var user = _userService.getUserByEmail(auth.getName());
            var role = _blogService.getUserBlogRole(user.getId(), blogId);
            if (role != BlogRole.Creator) {
                return new ResponseEntity<>(HttpStatusCode.valueOf(403));
            }

            _blogService.deleteBlog(blogId);
            return new ResponseEntity<>(HttpStatusCode.valueOf(200));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatusCode.valueOf(500));
        }
    }
}
