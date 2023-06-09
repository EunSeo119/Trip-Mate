package com.ssafy.enjoytrip.model.service;

import java.util.List;

import com.ssafy.enjoytrip.model.Notice;

public interface BoardService {
	List<Notice> getNoticeAll() throws Exception;
	
	void writeNotice(Notice notice) throws Exception;
	
	Notice getNoticeDetail(int noticeId) throws Exception;
	
	void modifyNotice(Notice notice) throws Exception;

	void deleteNotice(int noticeId) throws Exception;
}
