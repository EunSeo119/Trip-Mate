package com.ssafy.enjoytrip.model.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.enjoytrip.model.Notice;
import com.ssafy.enjoytrip.model.mapper.BoardMapper;

@Service
public class BoardServiceImpl implements BoardService {

	private final BoardMapper boardMapper;
	
	public BoardServiceImpl(BoardMapper boardMapper) {
		this.boardMapper = boardMapper;
	}

	@Override
	public List<Notice> getNoticeAll() throws Exception {
		return boardMapper.selectGetAll();
	}

	@Override
	public void writeNotice(Notice notice) {
		boardMapper.insertNotice(notice);
	}

	@Override
	public Notice getNoticeDetail(int noticeId) throws Exception {
		Notice notice = boardMapper.selectGetDetail(noticeId);
		notice.setViews(notice.getViews()+1);
		boardMapper.updateViewCount(noticeId, notice.getViews());
		return notice;
	}

	@Override
	public void modifyNotice(Notice notice) {
		boardMapper.modifyNotice(notice);
	}

}
