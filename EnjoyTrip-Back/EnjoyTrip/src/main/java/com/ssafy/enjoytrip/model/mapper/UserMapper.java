package com.ssafy.enjoytrip.model.mapper;

import com.ssafy.enjoytrip.model.User;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Mapper
public interface UserMapper {
	
	public User login(User user) throws SQLException;
	public User userInfo(String userId) throws SQLException;
	
    User selectUserLogin(User user) throws SQLException;

    int insertUser(User user) throws SQLException;

    List<User> selectUserList();

    Map<String, Object> selectDetailUser(String user);
}
