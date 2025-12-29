import { useState } from 'react';
import { Button } from 'primereact/button';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Link } from 'react-router-dom';
import { Sidebar } from 'primereact/sidebar';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Dialog } from "primereact/dialog";

const Page1503 = () => {

  /* ===========================
      검색
  ============================ */
  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
    { name: '2025년', code: '2025' },
    { name: '2026년', code: '2026' }
  ];

  /* ===========================
      마감 기간 상태
  ============================ */
  const [rangeValue, setRangeValue] = useState(null);   // 달력에서 선택된 range
  const [deadlines, setDeadlines] = useState([
    { start: "2025-12-12", end: "2026-01-13" },
  ]);

  const [showDialog, setShowDialog] = useState(false);
  const [tempStart, setTempStart] = useState("");
  const [tempEnd, setTempEnd] = useState("");

  /* 날짜 포맷 */
  const formatDate = (d) => {
    if (!d) return "";
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  /* ===========================
      달력에서 날짜 선택 (range)
  ============================ */
  const onRangeSelect = (value) => {
    setRangeValue(value);

    // value = [startDate, endDate]
    if (Array.isArray(value) && value[0] && value[1]) {
      const start = formatDate(value[0]);
      const end = formatDate(value[1]);

      setTempStart(start);
      setTempEnd(end);

      setShowDialog(true); // 종료일 선택 시 모달 자동 오픈
    }
  };

  /* ===========================
      기간 등록 처리
  ============================ */
  const addDeadline = () => {
    if (!tempStart || !tempEnd) return;

    setDeadlines(prev => [...prev, { start: tempStart, end: tempEnd }]);

    // 초기화
    setRangeValue(null);
    setShowDialog(false);
  };

  /* 기간 삭제 */
  const deleteDeadline = (idx) => {
    setDeadlines(prev => prev.filter((_, i) => i !== idx));
  };

  /* ===========================
      Breadcrumb
  ============================ */
  const [filled, setFilled] = useState(false);
  const [visibleRight, setVisibleRight] = useState(false);

  const items = [
    { label: '시스템관리' },
    {
      label: '마감관리',
      template: () => <Link to="/page1503" className="p-breadcrumb_now">현재페이지</Link>
    }
  ];
  const home = { icon: 'pi pi-home', url: '#' };

  return (
    <div className="card height-03">

      {/* ===========================
          Title
      ============================ */}
      <div className="title-container">
        <div className="flex gap-2">
          <h2>시스템관리 &gt; 마감관리</h2>

          <Button icon="pi pi-external-link" className="layout-newwindow-button" text />

          <Button
            icon={filled ? "pi pi-star-fill" : "pi pi-star"}
            className="layout-Favorite-button"
            onClick={() => setFilled(prev => !prev)}
            text
          />
        </div>

        <div className="flex items-center">
          <BreadCrumb model={items} home={home} />
          <button className="layout-BreadCrumb-button" onClick={() => setVisibleRight(true)}>
            <i className="pi pi-exclamation-circle" />
          </button>
        </div>
      </div>

      {/* 도움말 Sidebar*/}
      <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
        <h2>업무영역 도움말</h2>
        <p>여기에 마감관리 설명을 넣을 수 있습니다.</p>
      </Sidebar>

      {/*  Content */}
      <div className="hugreen_grid flex-1 flex flex-wrap">

        {/* 버튼 영역 */}
        <div className="hugreen_aggridbtn_hwrap">
          <span className="InfoText">달력에서 기간(시작일~종료일)을 선택하여 마감기간을 등록하세요.</span>
          <div className="flex gap-2">
            <Button 
              label="저장" 
              className="btn-28-master"
              onClick={() => console.log("전체 저장")}
            />
          </div>
        </div>

        {/* 달력 + 리스트 */}
        <div className="hugreen_aggrid_hwrap h-full">

          <div className="flex flex-col md:flex-row gap-4 w-full h-full">

            {/* -------- 달력 -------- */}
            <div className="w-full md:!w-2/3 h-full">
              <Calendar
                value={rangeValue}
                onChange={(e) => onRangeSelect(e.value)}
                selectionMode="range"
                inline
                showWeek
                className="w-full h-full page1503-calendar"
              />
              <style>{`
                /* Page1503 전용 달력 FULL HEIGHT 강제 적용 */
                .page1503-calendar,
                .page1503-calendar .p-datepicker,
                .page1503-calendar .p-datepicker-inline,
                .page1503-calendar .p-datepicker-group {
                    height: 100% !important;
                    width: 100% !important;
                }

                
                

                /* 셀 높이를 강제로 늘려서 FULL로 보이게 */
                @media (min-width: 768px) {
                    .page1503-calendar .p-datepicker-calendar td {
                        height: 80px !important;
                        width:80px !important;
                    }
                    .page1503-calendar .p-datepicker-calendar td > span {
                                width: 75%;
                        }
                    .page1503-calendar .p-datepicker-calendar td > span {
                        height: 100%;
                        display: flex !important;
                        align-items: center;
                        justify-content: center;
                    }
                }
                `}
              </style>
            </div>

            {/* -------- 오른쪽 리스트 -------- */}
            <div className="w-full md:!w-1/3 h-full flex flex-col">
              <h3 className="text-lg font-bold mb-3">등록된 마감기간</h3>

              <Dropdown
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.value)}
                options={cities}
                optionLabel="name"
                className="mb-3 w-full"
                placeholder="년도별 검색"
              />

              <div className="favorite-list overflow-y-auto">
                {deadlines.map((d, idx) => (
                <div key={idx} className="favorite-item">
                    <div className="flex  gap-2">
                        <span> {d.start} ~ {d.end} </span>
                    </div>

                    <Button
                        icon="pi pi-times"
                        className="favorite-del-btn p-button-text p-button-plain no-theme"
                            onClick={() => deleteDeadline(idx)}
                        unstyled
                        />
                </div>
                ))}
              </div>
            </div>
          </div>

          {/*  모달 (기간 등록)*/}
          <Dialog
            header="마감 기간 등록"
            visible={showDialog}
            style={{ width: "420px" }}
            onHide={() => setShowDialog(false)}>
            <p className="mb-2">달력에서 선택한 기간입니다.</p>

            <div className="flex justify-center h-[100px] mt-4" >
                <div >
                <strong>시작일:</strong> {tempStart}
                </div>
                <span className='pl-4 pr-4'> ~ </span>
                <div className="mb-3">
                <strong>종료일:</strong> {tempEnd}
                </div>
            </div>

            {/* 버튼 */}
            <div className="flex justify-end gap-2 mt-4">
                <Button label="취소" outlined onClick={() => setShowDialog(false)} />
                <Button label="등록" onClick={addDeadline} />
            </div>
           
          </Dialog>

        </div>
      </div>

    </div>
  );
};

export default Page1503;
