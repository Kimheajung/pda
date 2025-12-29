import { useState } from 'react';
import { Button } from 'primereact/button';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Link } from 'react-router-dom';
import { Sidebar } from 'primereact/sidebar';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

import CustomCalendar from "@/components/form/CustomCalendar";

const Page1502 = () => {
  /* 검색영역 */
  const [activeIndex, setActiveIndex] = useState(null);
  const [value, setValue] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);

  const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ];

  //달력 일정추가 예시화면
  const [events, setEvents] = useState([
    "2025-12-05",
    "2025-12-12",
    "2025-12-25",
    "2025-12-12",
    "2025-12-25",
    "2025-12-12",
    "2025-12-25",
    "2025-12-12",
    "2025-12-25",
    "2025-12-12",
    "2025-12-25",
    "2025-12-12",
    "2025-12-25",
    "2025-12-12",
    "2025-12-25",
    "2025-12-12",
    "2025-12-25",
    "2025-12-12",
    "2025-12-25",
    "2025-12-12",
    "2025-12-25",
  ]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [holidayName, setHolidayName] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const handleSelectDate = (dateStr) => {
    setSelectedDate(dateStr);
    setShowDialog(true);
  };

  const addHoliday = () => {
    if (!holidayName.trim()) return;

    setEvents((prev) => [...prev, selectedDate]);

    setHolidayName("");
    setShowDialog(false);
  };


  /* 즐겨찾기/도움말 */
  const [filled, setFilled] = useState(false);
  const [visibleRight, setVisibleRight] = useState(false);

  /* Breadcrumb */
  const items = [
    { label: '여신관리' },
    {
      label: 'InputText',
      template: () => <Link to="/inputtext" className="p-breadcrumb_now">현재페이지</Link>,
    },
  ];
  const home = { icon: 'pi pi-home', url: '#' };

  

  return (
    <div className="card height-03">

      {/* Title */}
      <div className="title-container">
        <div className="flex gap-2">
          <h2>시스템관리 &gt; 휴일관리</h2>

          <Button
            icon="pi pi-external-link"
            className="layout-newwindow-button"
            aria-label="New Windows"
            text
            tooltip="윈도우 새창"
            tooltipOptions={{ position: "bottom" }}
            onClick={() => window.open(window.location.href, "_blank")}
          />

          <Button
            icon={filled ? "pi pi-star-fill" : "pi pi-star"}
            className="layout-Favorite-button"
            onClick={() => setFilled((prev) => !prev)}
            aria-label="Favorite"
            text
          />
        </div>

        <div className="flex items-center">
          <BreadCrumb model={items} home={home} />
          <button
            className="layout-BreadCrumb-button"
            onClick={() => setVisibleRight(true)}
          >
            <i className="pi pi-exclamation-circle" />
          </button>
        </div>
      </div>

      {/* Sidebar 도움말 */}
      <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
        <h2>업무영역별 도움말</h2>
        <p>여기에 이미지 + 설명을 넣을 수 있습니다.</p>
      </Sidebar>

      {/* Content 영역 */}
      <div className="hugreen_grid flex-1 flex flex-wrap md:flex-row">



        {/* 버튼영역 */}
        <div className="hugreen_aggridbtn_hwrap">
          <div className="flex">
            <span className="InfoText">달력 일자를 클릭하시어 휴일을 등록해주세요.</span>
          </div>
          <div className="flex gap-2">
            <Button label="저장" className="btn-28-master" severity="secondary" />
          </div>
        </div>

        {/* 달력 + 리스트 */}
        <div className="hugreen_aggrid_hwrap h-full">
            {/* Calendar 2/3 */}
            <div className="flex gap-4 w-full h-full flex-col md:flex-row">

                {/* 달력 */}
                <div className="w-full md:w-2/3">
                    <CustomCalendar events={events} onSelect={handleSelectDate} />
                </div>

                {/* 오른쪽 리스트 */}
                <div className="w-full md:!w-1/3 h-full">
                <h3 className="text-lg font-bold mb-3">등록된 휴일</h3>

                <div className="flex">
                        <Dropdown
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.value)}
                        options={cities}
                        className='w-full'
                        optionLabel="name"
                        placeholder="년도별 검색을 하세요"
                        />
                </div>
                <div className="favorite-list overflow-y-auto " style={{height: "400px"}}>
                    
                    {events.map((d, idx) => (
                    <div
                        key={idx}
                        className="favorite-item">
                        {/* 앞 블릿 + 날짜 */}
                        <div className="flex  gap-2">
                          <span>{d}</span>
                        </div>

                        <Button
                        icon="pi pi-times"
                        className="favorite-del-btn p-button-text p-button-plain no-theme"
                            onClick={() => setEvents((prev) => prev.filter((e) => e !== d))}
                        unstyled
                        />
                    </div>
                    ))}
                </div>
                </div>

                {/* 휴일 등록 Dialog */}
                <Dialog
                    header="휴일 등록"
                    visible={showDialog}
                    style={{ width: "400px" }}
                    onHide={() => setShowDialog(false)}
                >
                    <p className="mb-3">선택한 날짜: <b>{selectedDate}</b></p>

                    <InputText
                    className="w-full mb-3"
                    placeholder="휴일명 입력"
                    value={holidayName}
                    onChange={(e) => setHolidayName(e.target.value)}
                    />

                    <div className="flex justify-end gap-2 mt-3">
                    <Button label="취소" outlined onClick={() => setShowDialog(false)} />
                    <Button label="저장" onClick={addHoliday} />
                    </div>
                </Dialog>


                </div>
                

        </div>

      </div>

    </div>
  );
};

export default Page1502;
