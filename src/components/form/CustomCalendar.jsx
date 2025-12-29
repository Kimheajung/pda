import { useState } from "react";
import { Button } from 'primereact/button';

const CustomCalendar = ({ events = [], onSelect }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = firstDay.getDay();

  const formatDate = (d) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;

  let days = [];
  for (let i = 0; i < startDay; i++) days.push(null);
  for (let i = 1; i <= lastDay.getDate(); i++)
    days.push(new Date(year, month, i));

  return (
    <div className="cg-calendar-container">
      {/* styles */}
      <style>{`
        .cg-calendar-container {
          width: 100%;
          height:100%;
          background: #fff;
          border-radius: 12px;
          padding: 20px;
          border: 1px solid #e6e6e6;
        }
        .cg-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .cg-month-title {
          font-size: 28px;
          font-weight: 600;
        }
        .cg-btn {
          border: none;
          background: transparent;
          font-size: 18px;
          cursor: pointer;
          padding: 4px 8px;
        }
        .cg-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          text-align: center;
        }
        .cg-week {
          font-weight: 600;
          padding-bottom: 8px;
          border-bottom: 1px solid #eee;
        }
        .cg-day {
          position: relative;
          height: 42px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          border-radius: 8px;
        }
        .cg-day:hover {
          background: #f5f5f5;
        }
        .cg-event {
          position: absolute;
          bottom: 3px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ef4444;
        }
        .cg-today {
          background: #eaf3ff !important;
          color: #1d4ed8;
          font-weight: 700;
        }
      `}</style>

      {/* header */}
      <div className="cg-header">
        <button
          className="cg-btn"
          onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
        >
          <i className="pi pi-chevron-left"></i>
        </button>

        <div className="cg-month-title">
          {year}년 {month + 1}월
        </div>

      
        <button
          className="cg-btn"
          onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}>
          <i className="pi pi-chevron-right"></i>
        </button>

      </div>

      {/* week */}
      <div className="cg-grid">
        {["일", "월", "화", "수", "목", "금", "토"].map((w, i) => (
          <div key={i} className="cg-week">{w}</div>
        ))}
      </div>

      {/* days */}
      <div className="cg-grid" style={{ marginTop: "10px", rowGap: "40px"}}>
        {days.map((day, idx) => {
          if (!day) return <div key={idx} className="cg-empty"></div>;

          const dateStr = formatDate(day);
          const hasEvent = events.includes(dateStr);

          return (
            <div
              key={idx}
              className={`cg-day ${dateStr === formatDate(today) ? "cg-today" : ""}`}
              onClick={() => onSelect(dateStr)}
            >
              {day.getDate()}
              {hasEvent && <span className="cg-event"></span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomCalendar;
