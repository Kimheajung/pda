import { useCallback, useMemo, useRef, useState } from 'react';
import CustomAgGrid from '@components/aggrid/CustomAgGrid';
import MOCK_DATA3 from '@components/aggrid/MOCK_DATA3.json';
import { exportToExcel } from '@components/aggrid/AgGridUtils';
import { Button } from 'primereact/button';
import reactLogo from '@assets/react.svg';

const Sample05 = () => {
  const gridRef = useRef(null);
  const [selectedRows, setSelectedRows] = useState([]);

  const [rowData] = useState(MOCK_DATA3);

  const [colDefs] = useState([
    {
      field: 'rowId',
      headerName: 'No',
      type: ['numberField_center', 'c_redText'],
    },
    {
      field: 'text1',
      headerName: 'text1',
      type: ['textField_center'],
    },

    {
      field: 'text2',
      headerName: 'text2',
      type: ['textField_left', 'link'],
    },
    {
      field: 'yn1',
      headerName: 'yn1',
      cellRenderer: (params) => {
        if (params.value === true) {
          return (
            <div className="flex items-center justify-center h-full">
              <img src={reactLogo} className="w-5 h-5" alt="" />
            </div>
          );
        }
        return null;
      },
    },
    // {
    //   field: 'yn1',
    //   headerName: 'yn1',
    //   type: ['imageRenderer'],
    //   cellRendererParams: {
    //     onClick: handleOpenModal,
    //     image: reactLogo,
    //   },
    // },
    {
      field: 'text4',
      headerName: 'text4',
      type: ['textField_center'],
    },
    {
      field: 'date1',
      headerName: 'date1',
      type: ['dateField'],
    },

    {
      field: 'number1',
      headerName: 'number1',
      type: ['numberField_center'],
    },
  ]);

  return (
    <div className="grid">
      <div className="col-12 xl:col-12">
        <div className="card mb-0">
          <span>1. 기본형 그리드 (CRUD형)</span>
          <div className="h-[79vh]">
            <CustomAgGrid
              gridId="grid1" // 필수 입력
              rowId="ROW_ID" // 필수 입력
              ref={gridRef} // 필수 입력
              rowData={rowData} // 필수 입력
              colDefs={colDefs} // 필수 입력
              overrideRowClicked={() => {
                return null;
              }}
              overrideRowSelection={() => {
                return null;
              }}
              onGridReady={(params) => params.api.autoSizeAllColumns()}
              // 필요 시 옵션 추가
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sample05;
