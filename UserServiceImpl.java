package com.rk.service.impl;

import com.rk.entity.User;
import com.rk.repositories.UserRepo;
import com.rk.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;

    public UserServiceImpl(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public User addUser(User user) {
        return userRepo.save(user);
    }

    @Override
    public User loginUser(User useRequest) {
        return userRepo.findByEmailAndPassword(useRequest.getEmail(), useRequest.getPassword());
    }
}
