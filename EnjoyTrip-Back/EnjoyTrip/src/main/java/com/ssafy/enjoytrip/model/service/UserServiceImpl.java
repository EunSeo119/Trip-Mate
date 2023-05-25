package com.ssafy.enjoytrip.model.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.ssafy.enjoytrip.controller.UserController;
import com.ssafy.enjoytrip.model.Plan;
import com.ssafy.enjoytrip.model.TravelStatus;
import com.ssafy.enjoytrip.model.User;
import com.ssafy.enjoytrip.model.mapper.UserMapper;

@Service
public class UserServiceImpl implements UserService {
	public static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final UserMapper userMapper;

    public UserServiceImpl(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

//    @Override
//    public User login(User user) throws SQLException {
//        return userMapper.selectUserLogin(user);
//    }
    @Override
	public User login(User user) throws Exception {
		if(user.getUserId() == null || user.getPassword() == null)
			return null;
//		return sqlSession.getMapper(MemberMapper.class).login(memberDto);
		return userMapper.login(user);
	}

	@Override
	public User userInfo(String userId) throws Exception {
//		return sqlSession.getMapper(MemberMapper.class).userInfo(userid);
		logger.debug(userId);
		return userMapper.userInfo(userId);
	}
    
    @Override
    public boolean join(User user) throws SQLException {
        return userMapper.insertUser(user) == 1;
    }

    @Override
    public User findPassword(User map) throws SQLException {
        return userMapper.selectUserLogin(map);
    }

    @Override
    public List<User> userList() {
        return userMapper.selectUserList();
    }

    @Override
    public Map<String, Object> selectUserDetail(String userId) {
        return userMapper.selectDetailUser(userId);
    }

	@Override
	public boolean modify(User user) throws SQLException {
		return userMapper.modifyUser(user) == 1;
	}

	@Override
	public List<TravelStatus> selectUserLikes(String userId) throws SQLException {
		return userMapper.selectLikeUser(userId);
	}
	
	@Override
	public List<Plan> selectUserPlans(String userId) throws SQLException {
		return userMapper.selectPlanUser(userId);
	}
}
