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
import ru.theblog.blogplatform.api.model.dto.BlogUserResult;
import ru.theblog.blogplatform.api.model.enums.BlogRole;
import ru.theblog.blogplatform.api.model.params.form.BlogForm;
import ru.theblog.blogplatform.api.model.params.form.BlogUpdateForm;
import ru.theblog.blogplatform.api.model.params.form.UserForm;
import ru.theblog.blogplatform.api.repository.BlogRepository;
import ru.theblog.blogplatform.api.repository.PostRepository;
import ru.theblog.blogplatform.api.repository.UserBlogRoleRepository;
import ru.theblog.blogplatform.api.repository.UserRepository;
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
    private final UserBlogRoleRepository userBlogRoleRepository;
    private final PostRepository postRepository;

    private final PasswordEncoder encoder;

    @Override
    public void create(BlogForm blogForm, Authentication auth) {
        var blog = new Blog(blogForm.name, blogForm.description);
        var user = userRepository.findByEmail(auth.getName());

        blogRepository.saveAndFlush(blog);
        userBlogRoleRepository.saveAndFlush(new UserBlogRole(blog, user, BlogRole.Creator));
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
        var roles = userBlogRoleRepository.findAllByUser(user);

        var result = new ArrayList<BlogUserResult>();
        for (var role : roles) {
            var rItem = new BlogUserResult();
            var blog = blogRepository.findById(role.getBlog().getId()).get();
            rItem.id = blog.getId();
            rItem.description = blog.getDescription();
            rItem.name = blog.getName();
            rItem.role = role.getRole().name();
            //rItem.subscribers
            result.add(rItem);
        }

        return result;
    }

    @Override
    public int getSubscribersCount(long blogId) {
        return userBlogRoleRepository.countAllByBlog_Id(blogId);
    }

    @Override
    public BlogRole getUserBlogRole(long userId, long blogId) {
        var role = userBlogRoleRepository.findByUser_IdAndBlog_Id(userId, blogId);
        return role != null ? role.getRole() : null;
    }

    @Override
    public int getRating(long blogId) {
        var reputation = postRepository.getTotalReputation(blogId);
        return reputation != null ? reputation : 0;
    }

    @Override
    public void update(BlogUpdateForm blog, Authentication auth) {
        var user = userRepository.findByEmail(auth.getName());
        var role = userBlogRoleRepository.findByUser_IdAndBlog_Id(user.getId(), blog.id);
        if (role.getRole() != BlogRole.Creator) {
            return;
        }

        blogRepository.saveAndFlush(new Blog(blog.id, blog.name, blog.description));
    }

    @Override
    public void deleteBlog(long blogId) {
        blogRepository.deleteById(blogId);
    }

}
