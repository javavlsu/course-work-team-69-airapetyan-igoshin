package ru.theblog.blogplatform.api.controller;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ru.theblog.blogplatform.api.model.ReactionBody;
import ru.theblog.blogplatform.api.model.dto.*;
import ru.theblog.blogplatform.api.model.enums.BlogRole;
import ru.theblog.blogplatform.api.model.params.*;
import ru.theblog.blogplatform.api.model.params.form.BlogForm;
import ru.theblog.blogplatform.api.model.params.form.BlogUpdateForm;
import ru.theblog.blogplatform.api.model.params.form.UserForm;
import ru.theblog.blogplatform.api.service.BlogService;
import ru.theblog.blogplatform.api.service.PostService;
import ru.theblog.blogplatform.api.service.ReactionService;
import ru.theblog.blogplatform.api.service.UserService;
import ru.theblog.blogplatform.api.service.impl.BlogServiceImpl;
import ru.theblog.blogplatform.api.service.impl.ReactionServiceImpl;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AppController {

    private final BlogService _blogService;
    private final PostService _postService;
    private final UserService _userService;
    private final ReactionService _reactionService;

    @GetMapping("/posts")
    public List<PreviewPost> getPosts(@Valid PostParams s, Authentication auth) {
        return _postService.getPostPreviews(s.getFeedType(), s.isOnlySubscription(), s.getPart(), s.getPostsPerPart(), s.getReversed(), s.getDateFrom(), s.getDateTo(), auth);
    }

    @GetMapping("/search")
    public List<PreviewPost> search(@RequestParam String query, Authentication auth) {
        return _postService.search(query, auth);
    }

    @PostMapping("/subscribe")
    public ResponseEntity subscribe(@RequestBody @Valid SubscribeParams params, Authentication auth) {
        if (auth == null)
            return new ResponseEntity(HttpStatusCode.valueOf(403));

        _blogService.createSubscription(params.blogId, params.subscribe, auth);
        return new ResponseEntity(HttpStatusCode.valueOf(200));
    }

    @PostMapping("/createCollaborator")
    public ResponseEntity createCollaborator(@RequestBody @Valid CollaboratorParams params, Authentication auth) {
        if (auth == null)
            return new ResponseEntity(HttpStatusCode.valueOf(403));

        _blogService.createCollaborator(params.blogId, params.userId, params.create, auth);
        return new ResponseEntity(HttpStatusCode.valueOf(200));
    }

    @GetMapping("/user")
    public UserData getUser(Authentication auth) {
        if (auth == null)
            return null;

        var user = _userService.getUserByEmail(auth.getName());

        var userData = new UserData();
        userData.systemRole = auth.getAuthorities().stream().findFirst().get().getAuthority();
        userData.blogs = new ArrayList<>();
        userData.username = user.getName();
        var blogs = _blogService.getUserBlogs(user);
        for (var blog : blogs) {
            var userBlog = new UserBlogData();
            userBlog.id = blog.id;
            userBlog.name = blog.name;
            userBlog.userRole = blog.userRole;
            userData.blogs.add(userBlog);
        }

        return userData;
    }

    @PostMapping("/registration")
    public String registration(@RequestBody @Valid UserForm user) {
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
    public BlogResult getBlog(@PathVariable long blogId, Authentication auth) {
        return _blogService.getBlogPage(blogId, auth);
    }

    @PostMapping("/blog")
    public ResponseEntity<Object> addBlog(@RequestBody BlogForm blog, Authentication auth) {
        class BlogId { public Long blogId; }

        try {
            if (auth == null) {
                return new ResponseEntity<>(HttpStatusCode.valueOf(403));
            }
            var result = new BlogId();
            result.blogId = _blogService.create(blog, auth);
            return new ResponseEntity<>(result, HttpStatusCode.valueOf(200));
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(500));
        }
    }

    @PutMapping("/blog")
    public ResponseEntity editBlog(@RequestBody BlogUpdateForm blog, Authentication auth) {
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

            _blogService.update(blog);
            return new ResponseEntity<>(HttpStatusCode.valueOf(200));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatusCode.valueOf(500));
        }
    }

    @DeleteMapping("/blog/{blogId}")
    public ResponseEntity deleteBlog(@PathVariable long blogId, Authentication auth) {
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

    @GetMapping("/post/{postId}")
    public PostResult getPost(@PathVariable long postId) {
        var post = _postService.getPost(postId);
        return new PostResult(post.getId(), post.getTitle(), post.getDescription(), post.getContent(), post.isDraft(), post.getBlog().getId(), post.getBlog().getName(), post.getRating());
    }

    @PostMapping("/post")
    public ResponseEntity<Object> createPost(@RequestBody @Valid PostBody postBody, Authentication auth) {
        class PostId { public Long postId; }

        try {
            if (auth == null) {
                return new ResponseEntity<>(HttpStatusCode.valueOf(403));
            }
            var user = _userService.getUserByEmail(auth.getName());
            var userBlogRole = _blogService.getUserBlogRole(user.getId(), postBody.blogId);
            if (userBlogRole == null || userBlogRole == BlogRole.Subscriber) {
                return new ResponseEntity<>(HttpStatusCode.valueOf(403));
            }

            var result = new PostId();
            result.postId = _postService.createPost(postBody);
            return new ResponseEntity<>(result, HttpStatusCode.valueOf(200));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatusCode.valueOf(500));
        }
    }

    @PutMapping("/post")
    public ResponseEntity editPost(@RequestBody @Valid PostUpdateBody postBody, Authentication auth) {
        try {
            if (auth == null) {
                return new ResponseEntity<>(HttpStatusCode.valueOf(403));
            }
            var post = _postService.getPost(postBody.id);

            var user = _userService.getUserByEmail(auth.getName());
            var userBlogRole = _blogService.getUserBlogRole(user.getId(), post.getBlog().getId());
            if (userBlogRole == null || userBlogRole == BlogRole.Subscriber) {
                return new ResponseEntity<>(HttpStatusCode.valueOf(403));
            }

            _postService.updatePost(postBody, post);
            return new ResponseEntity<>(HttpStatusCode.valueOf(200));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatusCode.valueOf(500));
        }
    }

    @DeleteMapping("/post/{postId}")
    public ResponseEntity deletePost(@PathVariable @NotNull Long postId, Authentication auth) {
        try {
            if (auth == null) {
                return new ResponseEntity<>(HttpStatusCode.valueOf(403));
            }
            var post = _postService.getPost(postId);
            if (post == null) {
                return new ResponseEntity<>(HttpStatusCode.valueOf(400));
            }

            var user = _userService.getUserByEmail(auth.getName());
            var userBlogRole = _blogService.getUserBlogRole(user.getId(), post.getBlog().getId());
            if (userBlogRole == null || userBlogRole == BlogRole.Subscriber) {
                return new ResponseEntity<>(HttpStatusCode.valueOf(403));
            }

            _postService.deletePost(postId);
            return new ResponseEntity<>(HttpStatusCode.valueOf(200));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatusCode.valueOf(500));
        }
    }

    @PutMapping("/post/updateStatus")
    public ResponseEntity updatePostStatus(@RequestBody @Valid PostStatusBody postStatusBody, Authentication auth) {
        try {
            if (auth == null) {
                return new ResponseEntity<>(HttpStatusCode.valueOf(403));
            }

            var post = _postService.getPost(postStatusBody.postId);
            if (post == null) {
                return new ResponseEntity<>(HttpStatusCode.valueOf(400));
            }

            var user = _userService.getUserByEmail(auth.getName());
            var userBlogRole = _blogService.getUserBlogRole(user.getId(), post.getBlog().getId());
            if (userBlogRole == null || userBlogRole == BlogRole.Subscriber) {
                return new ResponseEntity<>(HttpStatusCode.valueOf(403));
            }

            _postService.updateStatus(postStatusBody.postId, postStatusBody.isDraft);
            return new ResponseEntity<>(HttpStatusCode.valueOf(200));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatusCode.valueOf(500));
        }
    }

    @PostMapping("/reaction")
    public ResponseEntity createReaction(@RequestBody @Valid ReactionBody reactionBody, Authentication auth) {
        try {
            if (auth == null) {
                return new ResponseEntity<>(HttpStatusCode.valueOf(403));
            }

            _reactionService.createReaction(reactionBody.postId, auth, reactionBody.reactionType);
            return new ResponseEntity<>(HttpStatusCode.valueOf(200));
        } catch (Exception e) {
            e.printStackTrace();
            if (e.getMessage().equals(ReactionServiceImpl.POST_NOT_EXIST)) {
                return new ResponseEntity<>(HttpStatusCode.valueOf(400));
            }

            return new ResponseEntity<>(HttpStatusCode.valueOf(500));
        }
    }

    @GetMapping("/subscribers/{blogId}")
    public ResponseEntity<List<SubscribersResult>> getSubscribers(@PathVariable @NotNull Long blogId, Authentication auth) {
        if (auth == null) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(403));
        }
        try{
            return new ResponseEntity<>(_blogService.getSubscribers(blogId, auth), HttpStatusCode.valueOf(200));
        } catch (Exception e) {
            if (e.getMessage().equals(BlogServiceImpl.FORBIDDEN)){
                return new ResponseEntity<>(HttpStatusCode.valueOf(403));
            }

            return new ResponseEntity<>(HttpStatusCode.valueOf(500));
        }
    }
}
