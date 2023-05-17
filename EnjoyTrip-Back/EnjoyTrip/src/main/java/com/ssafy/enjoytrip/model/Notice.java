package com.ssafy.enjoytrip.model;

import java.util.List;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(value = "NoticeDescription : 공지사항 정보", description = "공지사항 정보")
public class Notice {
	@ApiModelProperty(value = "공지사항 아이디")
	private int noticeId;
	@ApiModelProperty(value = "공지사항 제목")
	private String title;
	@ApiModelProperty(value = "공지사항 내용")
	private String content;
	@ApiModelProperty(value = "공지사항 작성일")
	private String createDate;
	@ApiModelProperty(value = "공지사항 조회수")
	private int views;
	@ApiModelProperty(value = "공지사항 첨부파일")
	private FileInfoDto fileInfo;

	public int getNoticeId() {
		return noticeId;
	}

	public void setNoticeId(int noticeId) {
		this.noticeId = noticeId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public int getViews() {
		return views;
	}

	public void setViews(int views) {
		this.views = views;
	}

	public FileInfoDto getFileInfo() {
		return fileInfo;
	}

	public void setFileInfo(FileInfoDto fileInfo) {
		this.fileInfo = fileInfo;
	}


}
