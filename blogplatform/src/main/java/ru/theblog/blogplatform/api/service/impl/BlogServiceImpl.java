package ru.theblog.blogplatform.api.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.theblog.blogplatform.api.model.Blog;
import ru.theblog.blogplatform.api.model.RoleSystem;
import ru.theblog.blogplatform.api.model.User;
import ru.theblog.blogplatform.api.model.UserBlogRole;
import ru.theblog.blogplatform.api.model.dto.BlogResult;
import ru.theblog.blogplatform.api.model.dto.BlogUserResult;
import ru.theblog.blogplatform.api.model.dto.PreviewPost;
import ru.theblog.blogplatform.api.model.dto.SubscribersResult;
import ru.theblog.blogplatform.api.model.enums.BlogRole;
import ru.theblog.blogplatform.api.model.enums.ReactionType;
import ru.theblog.blogplatform.api.model.params.form.BlogForm;
import ru.theblog.blogplatform.api.model.params.form.BlogUpdateForm;
import ru.theblog.blogplatform.api.model.params.form.UserForm;
import ru.theblog.blogplatform.api.repository.*;
import ru.theblog.blogplatform.api.service.BlogService;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class BlogServiceImpl implements BlogService {

    private final BlogRepository blogRepository;
    private final UserRepository userRepository;
    private final UserBlogRoleRepository userBRRepository;
    private final PostRepository postRepository;
    private final ReactionRepository reactionRepository;

    private final PasswordEncoder encoder;

    public static final String FORBIDDEN = "Forbidden";

    @Override
    public Long create(BlogForm blogForm, Authentication auth) {
        var blog = new Blog(blogForm.name, blogForm.description, blogForm.config);
        var user = userRepository.findByEmail(auth.getName());

        blogRepository.saveAndFlush(blog);
        userBRRepository.saveAndFlush(new UserBlogRole(blog, user, BlogRole.Creator));
        return blog.getId();
    }

    @Override
    public Blog getBlog(Long id) {
        return blogRepository.findById(id).get();
    }

    @Override
    public void addUser(UserForm userForm) {
        var user = new User(
                userForm.name,
                userForm.birthdate,
                userForm.email,
                encoder.encode(userForm.password),
                LocalDate.now()
        );
        user.setRole(new RoleSystem(1L, "ROLE_USER"));
        userRepository.saveAndFlush(user);
    }

    @Override
    public List<BlogUserResult> getUserBlogs(User user) {
        var roles = userBRRepository.findAllByUser(user);

        var result = new ArrayList<BlogUserResult>();
        for (var role : roles) {
            var rItem = new BlogUserResult();
            var blog = blogRepository.findById(role.getBlog().getId()).get();
            rItem.id = blog.getId();
            rItem.description = blog.getDescription();
            rItem.name = blog.getName();
            rItem.userRole = role.getRole().ordinal();
            rItem.rating = getRating(blog.getId());
            rItem.subscribers = getSubscribersCount(blog.getId());
            result.add(rItem);
        }

        return result;
    }

    @Override
    public int getSubscribersCount(long blogId) {
        return userBRRepository.countAllByBlog_Id(blogId);
    }

    @Override
    public BlogRole getUserBlogRole(long userId, long blogId) {
        var role = userBRRepository.findByUser_IdAndBlog_Id(userId, blogId).orElse(null);
        return role != null ? role.getRole() : null;
    }

    @Override
    public int getRating(long blogId) {
        var reputation = postRepository.getTotalReputation(blogId);
        return reputation != null ? reputation : 0;
    }

    @Override
    public void update(BlogUpdateForm blog) {
        blogRepository.saveAndFlush(new Blog(blog.id, blog.name, blog.description, blog.config));
    }

    @Override
    public void deleteBlog(long blogId) {
        blogRepository.deleteById(blogId);
    }

    @Override
    public void createSubscription(Long blogId, Boolean subscribe, Authentication auth) {
        if (blogId == null || subscribe == null || auth == null)
            throw new IllegalArgumentException();

        var user = userRepository.findByEmail(auth.getName());

        if (blogRepository.existsById(blogId)) {
            var blog = blogRepository.findById(blogId).get();

            if (subscribe && !userBRRepository.existsByBlog_IdAndUser_Id(blogId, user.getId())) {
                userBRRepository.saveAndFlush(new UserBlogRole(blog, user, BlogRole.Subscriber));
            } else if (!subscribe && userBRRepository.existsByBlog_IdAndUser_Id(blogId, user.getId())) {
                var userBR = userBRRepository.findByUser_IdAndBlog_Id(user.getId(), blogId).get();
                userBRRepository.delete(userBR);
            }
        }
    }

    @Override
    public BlogResult getBlogPage(long blogId, Authentication auth) {
        var blog = getBlog(blogId);
        var posts = postRepository.findByBlog_Id(blogId);
        User user = null;
        if (auth != null){
            user = userRepository.findByEmail(auth.getName());
        }

        var result = new BlogResult();
        result.id = blog.getId();
        result.name = blog.getName();
        result.description = blog.getDescription();
        result.config = blog.getConfig();
        result.subscribers = getSubscribersCount(blogId);
        if (user != null) {
            var userblogrole = getUserBlogRole(user.getId(), blogId);
            result.userRole = userblogrole != null ? userblogrole.ordinal() : null;
        }
        result.postAmount = posts.size();
        result.rating = getRating(blogId);
        result.posts = new ArrayList<>();

        for (var post : posts) {
            if (post.isDraft() && (result.userRole == null || result.userRole == 0))
                continue;

            var previewPost = new PreviewPost();
            previewPost.id = post.getId();
            previewPost.title = post.getTitle();
            previewPost.description = post.getDescription();
            previewPost.rating = post.getRating();
            previewPost.reactionType = user != null ? getUserPostReaction(user.getId(), post.getId()) : null;
            previewPost.createDate = post.getCreateDate();
            result.posts.add(previewPost);
        }

        return result;
    }

    @Override
    public List<SubscribersResult> getSubscribers(Long blogId, Authentication auth) throws Exception {
        var user = userRepository.findByEmail(auth.getName());
        var userRole = userBRRepository.findByUser_IdAndBlog_Id(user.getId(), blogId).orElse(null);
        if (userRole == null || userRole.getRole() != BlogRole.Creator) {
            throw new Exception(FORBIDDEN);
        }

        return userBRRepository.findByBlog_Id(blogId)
                .stream()
                .filter(u -> u.getRole() != BlogRole.Creator)
                .map(u -> new SubscribersResult(u.getId(), u.getUser().getName(), u.getRole() == BlogRole.Collaborator))
                .toList();
    }

    @Override
    public void createCollaborator(Long blogId, Long userId, Boolean create, Authentication auth) {
        var admin = userRepository.findByEmail(auth.getName());
        var adminBR = userBRRepository.findByUser_IdAndBlog_Id(admin.getId(), blogId).orElse(null);
        if (adminBR == null || adminBR.getRole() != BlogRole.Creator)
            throw new IllegalArgumentException();

        var userBR = userBRRepository.findByUser_IdAndBlog_Id(userId, blogId).orElse(null);
        if (userBR == null)
            throw new IllegalArgumentException();

        if (create){
            userBR.setRole(BlogRole.Collaborator);
        } else {
            userBR.setRole(BlogRole.Subscriber);
        }
        userBRRepository.saveAndFlush(userBR);
    }

    private ReactionType getUserPostReaction(Long userId, Long postId) {
        var reaction = reactionRepository.findByUser_IdAndPost_Id(userId, postId).orElse(null);
        return reaction != null ? reaction.getReactionType() : null;
    }
}
