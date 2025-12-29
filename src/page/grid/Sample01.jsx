import { useRef, useState } from 'react';
import CustomAgGrid from '@components/aggrid/CustomAgGrid';
import MOCK_DATA3 from '@components/aggrid/MOCK_DATA3.json';

const Sample01 = () => {
  const gridRef = useRef(null);
  const [rowData] = useState(MOCK_DATA3);
  const [colDefs] = useState([
    {
      field: 'date1',
      headerName: 'date',
      type: ['filterDate'],
    },
    {
      field: 'text1',
      headerName: 'text',
      type: ['textField_center'],
    },
    {
      field: 'text2',
      headerName: 'textarea',
      type: ['textField_left'],
    },
    {
      field: 'number1',
      headerName: 'number1',
      type: ['numberField_center'],
    },
    {
      field: 'number2',
      headerName: 'number2',
      type: ['numberField_right', 'numberFormat'],
    },
    {
      field: 'yn1',
      headerName: '체크박스',
      type: ['checkbox'],
    },
  ]);

  return (
    <div className="grid">
      <div className="col-12 xl:col-12">
        <div className="card mb-0">
          <span>1. 기본형 그리드 - 기본 유형</span>
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

export default Sample01;
