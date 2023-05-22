package com.ssafy.enjoytrip.model.service;

import com.ssafy.enjoytrip.model.User;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public interface UserService {
	
	User login(User user) throws Exception;
	User userInfo(String userId) throws Exception;
//    User login(User user) throws Exception;

    boolean join(User user) throws SQLException;

    User findPassword(User map) throws SQLException;

    List<User> userList();

    Map<String, Object> selectUserDetail(String user);
    
	boolean modify(User user) throws SQLException;
}
