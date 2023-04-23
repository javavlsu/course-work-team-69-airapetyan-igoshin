INSERT INTO public.role_system (id, name)
VALUES (1, 'ROLE_USER'),
       (2, 'ROLE_ADMIN');

INSERT INTO public.blog (id, description, name)
VALUES (DEFAULT, 'For testing purposes.', 'SampleBlog');

INSERT INTO public.users (id, birthdate, email, name, password, registration_date, status, role_id)
VALUES (DEFAULT, null, 'user@g.com', 'User', '$2a$10$xF5xxLpShRJSzBeniu704eLwpW3wGI7lz9bsnS3aFReJDScD1rFjK',
        '2023-04-23', null, 1);

INSERT INTO public.post (id, content, date, description, reaction_count, title, blog_id)
VALUES (DEFAULT, 'Weeee', '2023-04-23 16:49:50.000000', 'Text', 12, 'SamplePost', 1),
       (DEFAULT, 'Weeee', '2023-04-23 16:49:50.000000', 'Text', 12, 'SamplePost', 1),
       (DEFAULT, 'Weeee', '2023-04-23 16:49:50.000000', 'Text', 12, 'SamplePost', 1);