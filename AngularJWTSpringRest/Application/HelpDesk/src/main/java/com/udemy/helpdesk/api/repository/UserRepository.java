package com.udemy.helpdesk.api.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.udemy.helpdesk.api.entity.User;

public interface UserRepository extends MongoRepository<User, String> {

	public User findByEmail(String email);
}
