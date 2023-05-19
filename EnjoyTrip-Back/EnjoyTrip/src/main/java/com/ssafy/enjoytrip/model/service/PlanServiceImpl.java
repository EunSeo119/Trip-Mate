package com.ssafy.enjoytrip.model.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.enjoytrip.model.Plan;
import com.ssafy.enjoytrip.model.PlanTravel;
import com.ssafy.enjoytrip.model.mapper.PlanMapper;

@Service
public class PlanServiceImpl implements PlanService{
	private final PlanMapper planMapper;

	public PlanServiceImpl(PlanMapper planMapper) {
		super();
		this.planMapper = planMapper;
	}

	@Override
	public void registPlan(Plan plan) {
		System.out.println("여행계획 됨됨됨??????!?!?!?!!1111111");
		planMapper.insertPlan(plan);
//		planMapper.getPlanId(plan);
		System.out.println(plan.getPlanId());
		List<PlanTravel> planTravels = new ArrayList<PlanTravel>();
		System.out.println("여행계획 됨됨됨??????!?!?!?!!2222222");
		for(int i = 0; i < plan.getPlanTravels().size(); i++) {
			PlanTravel planTravel = new PlanTravel();
			planTravel.setNo(i);
			planTravel.setTravelInfoId(plan.getPlanTravels().get(i).getTravelInfoId());
			System.out.println(plan.getPlanTravels().get(i).getTravelInfoId());
			planTravels.add(planTravel);
//			plan.setPlanTravels(planTravels);
		}
//		plan.setPlanTravels(planTravels);
		System.out.println("여행계획 됨됨됨??????!?!?!?!!3333333");
		System.out.println(plan.getPlanTravels().get(0).getTravelInfoId());
		planMapper.insertPlanTravels(plan.getPlanId(), planTravels);
	}

	@Override
	public List<Plan> getPlanAll() throws Exception {
		return planMapper.selectGetAll();
	}

	@Override
	public Plan getPlanDetail(int planId) throws Exception {
		return planMapper.selectGetDetail(planId);
	}

	@Override
	public void deletePlan(int planId) throws Exception {
		planMapper.deletePlan(planId);
	}
	
}
