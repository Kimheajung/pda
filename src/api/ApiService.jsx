/* eslint-disable */
import { Get, GetDownload, GetList, Post, Postfile } from '../CommonCall';

/**
 * @postLogin : 로그인 인증
 * @author : 이주환
 * @version : 1.0.0
 * @dto : email : 사원이메일 , password : 사원비밀번호
 * @since : 2024. 08. 09
 */
export const postLogin = (dto, loadingRef) => {
  return Post(`/cygnusin/v1/api/sm/login`, dto, loadingRef);
};

/**
 * @postLogin : 시스템 설정 조회
 * @author : 양주호
 * @version : 1.0.0
 * @since : 2024. 08. 12.
 */
export const getSystemSetting = (dto, loadingRef) => {
  //return Get(`/cygnusin/v1/api/sm/systemConfigViewer`, dto, loadingRef);
};

/**
 * @postLogin : 시스템 설정 업데이트
 * @author : 양주호
 * @version : 1.0.0
 * @dto : pw_change_cycle : 비번교체주기, min_length : 최소자리수, mix_yn : 문자조합, upper_value_yn : 대문자, numeric_value_yn : 숫자, special_value_yn : 특수문자, global_time : 시간대설정
 * @dto : smtp_port : smtp포트, smtp_id : smtp아이디, smtp_password : smtp비밀번호, smtp_send_mail : 발송메일, system_title : 시스템명, system_logo : 시스템로그이미지, remarks : 비고
 * @since : 2024. 08. 09.
 */
export const postSystemSetting = (dto, loadingRef) => {
  console.log('apiservice 36'); 
  return Post(`/cygnusin/v1/api/sm/systemSetting`, dto, loadingRef);
};

/**
 * @postLogin : 신규사용자 로그인 설정 / 비밀번호 90일 만료 변경시
 * @author : 이주환
 * @version : 1.0.0
 * @dto : userId : 사원번호 , userPwd : 사원비밀번호 , userNm : 사원이름 , userNewPwd , 사원비밀번호확인
 * @since : 2024. 06. 25.
 */
export const postPwd = (dto, loadingRef) => {
  return Post(`/cygnusin/v1/api/sm/login/setting/pwd`, dto, loadingRef);
};

/**
 * @postLogin : 비밀번호 찾기 이메일 보내기
 * @author : 이주환
 * @version : 1.0.0
 * @dto : userId : 사원번호 , userNm : 이름
 * @since : 2024. 06. 26.
 */
export const postPwdFind = (dto, loadingRef) => {
  return Post(`/cygnusin/v1/api/sm/login/find/pwd`, dto, loadingRef);
};

export const getLogout = (loadingRef) => {
  return Get(`/cygnusin/v1/api/sm/logout`, {}, loadingRef);
};

/**
 * @getDashboard : 사업부 고객불만관리현황
 * @author : 이주환
 * @version : 1.0.0
 * @dto : {}
 * @return : 사업부 고객불만관리현황 차트 조회
 * @since : 2023. 11. 08.
 */
export const getDashboard = (loadingRef) => {
  return Post(
    `/cygnusin/v1/api/sm/statistics/Statistics/paging`,
    {},
    loadingRef
  );
};

/**
 * @getProgress : 진행별 현황
 * @author : 이주환
 * @version : 1.0.0
 * @query : vsubCode : 사업장 , startDate : 시작일자 , endDate : 종료일자
 * @return : 진행별 현황 리스트 조회
 * @since : 2023. 11. 08.
 */
export const getProgress = (dto, loadingRef) => {
  return Get(
    `/cygnusin/v1/api/sm/statistics/proceeding?vSubCode=${dto.vsubCode}&startDate=${dto.startDate}&endDate=${dto.endDate}`,
    { dto },
    loadingRef
  );
};

/**
 * @getUnProgress : 미처리 현황
 * @author : 이주환
 * @version : 1.0.0
 * @dto :  vsubCode : 사업장 , startDate : 시작일자 , endDate : 종료일자
 * @return : 미처리 현황 리스트 조회
 * @since : 2023. 11. 07.
 */
export const getUnProgress = (dto, loadingRef) => {
  return Get(
    `/cygnusin/v1/api/sm/statistics/UnProcessed?vSubCode=${dto.vsubCode}&startDate=${dto.startDate}&endDate=${dto.endDate}`,
    { dto },
    loadingRef
  );
};

/**
 * @getCause : 원인별 현황
 * @author : 이주환
 * @version : 1.0.0
 * @dto :  vsubCode : 사업장 , startDate : 시작일자 , endDate : 종료일자
 * @return : 원인별 현황 리스트 조회
 * @since : 2023. 11. 07.
 */
export const getCause = (dto, loadingRef) => {
  return Get(
    `/cygnusin/v1/api/sm/statistics/Reason?vSubCode=${dto.vsubCode}&startDate=${dto.startDate}&endDate=${dto.endDate}`,
    { dto },
    loadingRef
  );
};

/**
 * @getPaymentmade : 결제함
 * @author : 이주환
 * @version : 1.0.0
 * @dto :
 * @return : 결제함 리스트 조회
 * @since : 2023. 11. 10.
 */
export const getPaymentmade = (loadingRef) => {
  return Get(`/cygnusin/v1/api/sm/approval/list`, {}, loadingRef);
};

/**
 * @getDivision : 사업부 선택에 따른 고객 불만 조회 조건1
 * @author : 이주환
 * @version : 1.0.0
 * @dto : workPlaceValue : 사업부
 * @return : 고객불만조회조건1 List 를 출력한다.
 * @since : 2023. 11. 10.
 */
export const getDivision = (workPlaceValue, loadingRef) => {
  return Get(
    `/cygnusin/v1/api/sm/claim/filter1/list?vSubCode=${workPlaceValue}`,
    {},
    loadingRef
  );
};

/**
 * @getDivision1 : 사업부 및 고객 불만 조회 조건1 선택 에 따른 고객 불만 조회 조건2
 * @author : 이주환
 * @version : 1.0.0
 * @dto : workPlaceValue : 사업부 , conditionFirstValue : 조건1
 * @return : 고객불만조회조건2 List 를 출력한다.
 * @since : 2023. 11. 10.
 */
export const getDivision1 = (
  workPlaceValue,
  conditionFirstValue,
  loadingRef
) => {
  return Get(
    `/cygnusin/v1/api/sm/claim/filter2/list?vSubCode1=${workPlaceValue}&vSubCode2=${conditionFirstValue}`,
    {},
    loadingRef
  );
};

/**
 * @getDivision2 : 제품규격내용을 출력한다.
 * @author : 이주환
 * @version : 1.0.0
 * @dto :
 * @return : 제품규격 List 를 출력한다.
 * @since : 2023. 11. 10.
 */
export const getDivision2 = (loadingRef) => {
  return Get(`/cygnusin/v1/api/sm/claim/item/spec/list`, {}, loadingRef);
};

/**
 * @getDivision3 : 규격1의 내용을 출력한다.
 * @author : 이주환
 * @version : 1.0.0
 * @dto :
 * @return : 규격1 List 를 출력한다.
 * @since : 2023. 11. 10.
 */
export const getDivision3 = (workPlaceValue, loadingRef) => {
  return Get(
    `/cygnusin/v1/api/sm/claim/item/list?vSubCode=${workPlaceValue}`,
    {},
    loadingRef
  );
};

/**
 * @getDivision4 : 구분의 내용을 출력한다.
 * @author : 이주환
 * @version : 1.0.0
 * @dto :
 * @return : 구분 List 를 출력한다.
 * @since : 2023. 11. 10.
 */
export const getDivision4 = (loadingRef) => {
  return Get(`/cygnusin/v1/api/sm/claim/type`, {}, loadingRef);
};

/**
 * @getComplaintsList : 고객불만 조회를 출력한다.
 * @author : 이주환
 * @version : 1.0.0
 * @dto :
 * @return : 고객 불만 List 를 출력한다.
 * @since : 2023. 11. 10.
 */
export const getComplaintsList = (dto, loadingRef) => {
  return Post(`/cygnusin/v1/api/sm/claim/list`, dto, loadingRef);
};

/**
 * @getComplaintsRowData : 고객불만 상세조회/수정 화면을 출력한다.
 * @author : 이주환
 * @version : 1.0.0
 * @dto :
 * @return : 고객불만 상세조회/수정 화면을 출력한다.
 * @since : 2023. 11. 29.
 */
export const getComplaintsRowData = (nCcmId, loadingRef) => {
  return Get(
    `/cygnusin/v1/api/sm/claim/claim-spec?nCcmId=${nCcmId}`,
    {},
    loadingRef
  );
};

/**
 * @getApproverDeptList : 부서 조회를 출력한다
 * @author : 이주환
 * @version : 1.0.0
 * @dto :
 * @return : 부서 List 를 출력한다.
 * @since : 2023. 11. 15.
 */
export const getApproverDeptList = () => {
  return GetList(`/cygnusin/v1/api/sm/claim/dept/list`, {});
};

/**
 * @getApproverList : 결재자 조회를 출력한다
 * @author : 이주환
 * @version : 1.0.0
 * @dto :
 * @return : 결재자 List 를 출력한다.
 * @since : 2023. 11. 15.
 */
export const getApproverList = (dept) => {
  return GetList(
    `/cygnusin/v1/api/sm/claim/dept/user/list?vDeptCD=${dept}`,
    {}
  );
};

/**
 * @getStandardList : 사업장 선택에 따른 규격 , 검색조건 Select Data 를 출력한다.
 * @author : 이주환
 * @version : 1.0.0
 * @dto :
 * @return : 규격 , 검색조건 List 를 출력한다.
 * @since : 2023. 11. 15.
 */
export const getStandardList = (cd, loadingRef) => {
  return Get(
    `/cygnusin/v1/api/sm/claim/search_with_standard/list?vDeptCD=${cd}`,
    {},
    loadingRef
  );
};

/**
 * @getStandardList4 : 규격1을 선택하면 규격4 List를 출력한다
 * @author : 이주환
 * @version : 1.0.0
 * @dto :
 * @return : 규격 4를 List를 출력한다.
 * @since : 2023. 11. 15.
 */
export const getStandardList4 = (cd, loadingRef) => {
  return Get(
    `/cygnusin/v1/api/sm/claim/standard4/list?ITSpec4=${cd}`,
    {},
    loadingRef
  );
};

/**
 * @postRegisterAdd : 고객 불만을 등록한다.
 * @author : 이주환
 * @version : 1.0.0
 * @dto :
 * @return : 고객 불만을 등록한다.
 * @since : 2023. 11. 21.
 */
export const postRegisterAdd = (params, loadingRef) => {
  return Postfile(`/cygnusin/v1/api/sm/claim/register`, params, loadingRef);
};

/**
 * @getUserList : 거래처 리스트를 출력한다.
 * @author : 이주환
 * @version : 1.0.0
 * @dto :
 * @return : 거래처 리스트를 출력한다.
 * @since : 2023. 11. 21.
 */
export const getUserList = (paging, row, loadingRef) => {
  return Get(
    `/cygnusin/v1/api/sm/claim/customer/list?paging=${paging}&row=${row}`,
    {},
    loadingRef
  );
};

/**
 * @getFileDownload : 파일을 다운로드 한다.
 * @author : 이주환
 * @version : 1.0.0
 * @dto :
 * @return : 고객불만등록한 리스트의 수정 파일을 다운로드한다.
 * @since : 2023. 11. 29
 */
export const getFileDownload = (fileId, fileName) => {
  return GetDownload(`/cygnusin/v1/api/mm/download/${fileName}`, {});
};

/**
 * @getApprovalBtn : 고객불만등록 등록/수정 결제요청 을 한다.
 * @author : 이주환
 * @version : 1.0.0
 * @dto :
 * @return : 고객불만등록 등록/수정 결제요청 을 한다.
 * @since : 2023. 11. 29
 */
export const getApprovalBtn = (dto, loadingRef) => {
  return Get(
    `/cygnusin/v1/api/sm/claim/apprbtn?vStatus=${dto.vStatus}&nCcmid=${dto.nCcmid}`,
    {},
    loadingRef
  );
};

/**
 * @PostApprStatusBtn : 고객불만등록 수정에 승인/반려 한다.
 * @author : 이주환
 * @version : 1.0.0
 * @dto :
 * @return : 고객불만등록 수정에 승인/반려 한다.
 * @since : 2023. 11. 29
 */
export const PostApprStatusBtn = (params, loadingRef) => {
  return Postfile(
    `/cygnusin/v1/api/sm/claim/appr-status-btn`,
    params,
    loadingRef
  );
};

/**
 * @getModifyExcel : 고객불만등록 수정에서 엑셀을 출력한다.
 * @author : 이주환
 * @version : 1.0.0
 * @dto :
 * @return : 고객불만등록 수정에서 엑셀을 출력한다.
 * @since : 2023. 12. 01
 */
export const getModifyExcel = (id, token, loadingRef) => {
  return Get(
    `/cygnusin/v1/api/sm/excelDownloadDetail?nCcmId=${id}&token=${token}`,
    {},
    loadingRef
  );
};

/**
 * @getListExcel : 미처리현황 목록에서 엑셀을 출력한다.
 * @author : 이주환
 * @version : 1.0.0
 * @dto :
 * @return : 미처리현황 목록에서 엑셀을 출력한다.
 * @since : 2023. 12. 01
 */
export const getListExcel = (dto, loadingRef) => {
  return Get(
    `/cygnusin/v1/api/sm/excelDownloadList?vSubCode=${dto.vSubCode}&token=${dto.token}&startDate=${dto.startDate}&endDate=${dto.endDate}`,
    {},
    loadingRef
  );
};

/**
 * @postRegisterModify : 고객불만등록 수정한다
 * @author : 이주환
 * @version : 1.0.0
 * @dto :
 * @return : 고객불만등록 수정한다
 * @since : 2023. 12. 05
 */
export const postRegisterModify = (params, loadingRef) => {
  return Postfile(`/cygnusin/v1/api/sm/claim/claim-edit`, params, loadingRef);
};

/**
 * @getExmComplete : 시행완료를 한다.
 * @author : 이주환
 * @version : 1.0.0
 * @dto :
 * @return : 시행완료를 한다.
 * @since : 2023. 12. 05
 */
export const getExmComplete = (id, loadingRef) => {
  return Get(
    `/cygnusin/v1/api/sm/claim/exm-complete?nCcmId=${id}`,
    {},
    loadingRef
  );
};

/**
 * @getExmComplete : 불만을 삭제한다.
 * @author : 이주환
 * @version : 1.0.0
 * @dto :
 * @return : 선택한 데이터의 불만작성내용을 삭제한다.
 * @since : 2023. 12. 13
 */
export const getDelete = (id, loadingRef) => {
  return Get(
    `/cygnusin/v1/api/sm/claim/claim-delete?nCcmId=${id}`,
    {},
    loadingRef
  );
};

export const getProduct = () => {
  return GetList(`/cygnusin/v1/api/sm/claim/item_name/list`, {});
};
