import { useRef, useState } from 'react';
import CustomAgGrid from '@components/aggrid/CustomAgGrid';
import MOCK_DATA from '@components/aggrid/MOCK_DATA.json';

const Sample04 = () => {
  const gridRef = useRef(null);
  const [rowData] = useState(MOCK_DATA);

  const [colDefs] = useState([
    {
      field: 'first_name',
      headerName: '링크',
      type: ['textField_center'],
      spanRows: true,
      // cellClass: 'flex items-center justify-center',
    },
    {
      field: 'last_name',
      headerName: '필수 입력',
      type: ['textField_center'],
      spanRows: true,
      // cellClass: 'flex items-center justify-center',
    },
    {
      field: 'email',
      headerName: '글씨 색 변경',
      type: ['textField_left'],
    },
    // {
    //   field: 'gender',
    //   headerName: 'gender',
    //   type: ['filterText'],
    // },
    // {
    //   field: 'phone',
    //   headerName: 'phone',
    //   type: ['filterText'],
    // },
    {
      field: 'birth_date',
      headerName: 'birth_date',
      type: ['dateField'],
    },

    {
      field: 'number1',
      headerName: '%추가',
      type: ['numberField_right', 'percent'],
    },
    {
      field: 'number2',
      headerName: ', 찍기',
      type: ['numberField_right', 'numberFormat'],
    },
  ]);

  return (
    <div className="grid">
      <div className="col-12 xl:col-12">
        <div className="card mb-0">
          <span>1. 기본형 그리드 (참고 - rowspan형(세로병합))</span>
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

export default Sample04;
