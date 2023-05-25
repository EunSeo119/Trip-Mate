package com.ssafy.enjoytrip.model.mapper;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.enjoytrip.model.Plan;
import com.ssafy.enjoytrip.model.TravelStatus;
import com.ssafy.enjoytrip.model.User;

@Mapper
public interface UserMapper {
	
	public User login(User user) throws SQLException;
	
	public User userInfo(String userId) throws SQLException;
	
    User selectUserLogin(User user) throws SQLException;

    int insertUser(User user) throws SQLException;

    List<User> selectUserList();

    Map<String, Object> selectDetailUser(String user);
    
	int modifyUser(User user) throws SQLException;

	public List<TravelStatus> selectLikeUser(String userId) throws SQLException;
	
	public List<Plan> selectPlanUser(String userId) throws SQLException;
}
