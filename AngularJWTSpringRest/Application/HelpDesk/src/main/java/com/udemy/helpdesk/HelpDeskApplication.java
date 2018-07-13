package com.udemy.helpdesk;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.udemy.helpdesk.api.entity.User;
import com.udemy.helpdesk.api.enums.ProfileEnum;
import com.udemy.helpdesk.api.repository.UserRepository;

@SpringBootApplication
public class HelpDeskApplication {

	private void initUsers(UserRepository userRepository, PasswordEncoder passwordEncoder){
		User admin = new User();
		admin.setEmail("admin@helpdesk.com");
		admin.setPassword("123456");
		admin.setProfile(ProfileEnum.ROLE_ADMIN);
		
		User find = userRepository.findByEmail("admin@helpdesk.com");
		if(find == null){
			userRepository.save(admin);
		}
	}
	
	@Bean
	CommandLineRunner init(UserRepository userRepository, PasswordEncoder passwordEncoder){
		return args -> {
			initUsers(userRepository, passwordEncoder);
		};
	}
	
	public static void main(String[] args) {
		SpringApplication.run(HelpDeskApplication.class, args);
	}
}