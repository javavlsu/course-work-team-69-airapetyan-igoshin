package ru.theblog.blogplatform;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BlogplatformApplication {

	public static void main(String[] args) {
		SpringApplication.run(BlogplatformApplication.class, args);
	}

}

/*
@Configuration
class WebConfiguration implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/api/**").allowedOrigins("*").allowedMethods("*");
	}
}
*/
