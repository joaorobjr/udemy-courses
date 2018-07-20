package com.udemy.helpdesk.api.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.udemy.helpdesk.api.entity.User;
import com.udemy.helpdesk.api.repository.UserRepository;
import com.udemy.helpdesk.api.service.UserService;

@Service 
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public User findByEmail(String email) {
		return userRepository.findByEmail(email);
		
	}

	@Override
	public User createOrUpdate(User user) {
		return userRepository.save(user);
	}

	@Override
	public Optional<User> findById(String id) {
		return userRepository.findById(id);
	}

	@Override
	public void delete(String id) {
		userRepository.deleteById(id);
	}

	@Override
	@SuppressWarnings("deprecation")
	public Page<User> findAll(int page, int count) {
		Pageable pages = new PageRequest(page, count);
		return userRepository.findAll(pages);
	}
}
