package com.ssafy.enjoytrip.model.service;

import com.ssafy.enjoytrip.model.Gugun;
import com.ssafy.enjoytrip.model.TravelInfo;
import com.ssafy.enjoytrip.model.TravelStatus;
import com.ssafy.enjoytrip.model.mapper.TravelMapper;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
public class TravelServiceImpl implements TravelService {

    private final TravelMapper travelMapper;

    public TravelServiceImpl(TravelMapper travelMapper) {
        this.travelMapper = travelMapper;
    }

    @Override
    public List<TravelInfo> getTravelAll() throws Exception {
        return travelMapper.selectGetAll();
    }

    @Override
    public List<Gugun> getGugun(int sidoCode) throws Exception {
        return travelMapper.selectGugun(sidoCode);
    }

    @Override
    public List<TravelInfo> getTravel(Integer sidoCode, Integer gugunCode, Integer travelTypeId, String searchString) throws Exception {
    	List<TravelInfo> temp = travelMapper.selectBySidoCodeGugunCode(sidoCode, gugunCode, travelTypeId, searchString);
    	System.out.println(searchString);
    	if(temp.size()>30) {
    		return temp.subList(0, 33);
    	}
        return temp;
    }

    @Override
    public int updateLike(String userId, Integer travelInfoId, Integer like) {
        return travelMapper.updateLike(userId, travelInfoId, like);
    }

    @Override
    public TravelStatus getTravelStatus(TravelStatus travelStatus) {
        return travelMapper.selectTravelStatus(travelStatus);
    }

    @Override
    public void registLike(TravelStatus travelStatus) {
        travelMapper.insertLike(travelStatus);
    }

    @Override
    public void registStar(TravelStatus travelStatus) {
        travelMapper.insertStar(travelStatus);
    }

    @Override
    public int updateStar(TravelStatus travelStatus) {
        System.out.println(travelStatus.getStar());
        return travelMapper.updateStar(travelStatus);
    }

	@Override
	public TravelInfo getTravelDetail(int travelInfoId) throws SQLException {
		System.out.println("이거 찍힘?"+travelInfoId);
		TravelInfo t = travelMapper.selectGetDetail(travelInfoId);
		System.out.println("이거 나옴?" + t.getTitle());
		t.setOverview(travelMapper.selectGetDetailOverview(travelInfoId)); 
		return t;
//		return travelMapper.selectGetDetail(travelInfoId);
	}
}
