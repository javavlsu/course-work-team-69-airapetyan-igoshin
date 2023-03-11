package ru.theblog.blogplatform.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BlogController {

    @GetMapping("/")
    public String sample() {
        return "Sample";
    }
}
