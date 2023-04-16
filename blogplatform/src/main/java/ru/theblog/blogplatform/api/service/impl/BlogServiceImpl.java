package ru.theblog.blogplatform.api.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.theblog.blogplatform.api.controller.params.UserForm;
import ru.theblog.blogplatform.api.model.Blog;
import ru.theblog.blogplatform.api.model.RoleSystem;
import ru.theblog.blogplatform.api.model.User;
import ru.theblog.blogplatform.api.model.dto.BlogUserResult;
import ru.theblog.blogplatform.api.repository.BlogRepository;
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

    private final PasswordEncoder encoder;

    @Override
    public void create(Blog blog) {
        blogRepository.saveAndFlush(blog);
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
            rItem.role = role.getRole().getName();
            //rItem.subscribers
            result.add(rItem);
        }

        return result;
    }

}
