package com.rk.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.rk.entity.User;

@Service
public interface UserService {

	User addUser(User user);

	User loginUser(User useRequest);

}
