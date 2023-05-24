package com.ssafy.enjoytrip.model.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

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
		planMapper.insertPlan(plan);
		List<PlanTravel> planTravels = new ArrayList<PlanTravel>();
		for(int i = 0; i < plan.getPlanTravels().size(); i++) {
			PlanTravel planTravel = new PlanTravel();
			planTravel.setNo(i);
			planTravel.setTravelInfoId(plan.getPlanTravels().get(i).getTravelInfoId());
			System.out.println(plan.getPlanTravels().get(i).getTravelInfoId());
			planTravels.add(planTravel);
		}
		planMapper.insertPlanTravels(plan.getPlanId(), planTravels);
	}

	@Override
	public List<Plan> getPlanAll() throws Exception {
		return planMapper.selectGetAll();
	}

	@Override
	public Plan getPlanDetail(int planId) throws Exception {
//		return planMapper.selectGetDetail(planId);
		Plan plan = planMapper.selectGetDetail(planId);
		List<PlanTravel> sortedTravels = plan.getPlanTravels()
		        .stream()
		        .sorted(Comparator.comparingInt(PlanTravel::getNo))
		        .collect(Collectors.toList());
		    plan.setPlanTravels(sortedTravels);
		plan.setViews(plan.getViews()+1);
		planMapper.updateViewCount(planId, plan.getViews());
//		System.out.println(plan.getPlanTravels().get(0).getNo());
		return plan;
	}

	@Override
	public void deletePlan(int planId) throws Exception {
		planMapper.deletePlan(planId);
	}

	@Override
	public List<Plan> getPlanTop6() throws Exception {
		return planMapper.selectGetTop6();
	}
	
}
