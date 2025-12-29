import { useRef, useState } from 'react';
import CustomAgGrid from '@components/aggrid/CustomAgGrid';
import MOCK_DATA4 from '@components/aggrid/MOCK_DATA4.json';
import { Button } from 'primereact/button';

const Sample06 = () => {
  const gridRef = useRef(null);
  const [rowData] = useState(MOCK_DATA4);

  const ynFlag = [
    { label: 'Y', value: 'Y' },
    { label: 'N', value: 'N' },
  ];

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
      headerName: 'yn1',
      type: ['textField_center'],
    },
    {
      field: 'yn2',
      headerName: 'yn2',
      type: ['textField_center', 'editableCell'],
      editable: true,
      cellEditor: 'agRichSelectCellEditor',
      valueFormatter: (p) => {
        const yn = ynFlag.find((c) => c.value === p.value);
        return yn ? yn.label : p.value;
      },
      valueParser: (p) => {
        return p.newValue.value;
      },
      cellEditorParams: {
        formatValue: (v) => {
          return v.label;
        },
        values: ynFlag,
        valueListMaxHeight: 220,
      },
    },
    {
      field: 'yn3',
      headerName: 'yn3',
      type: ['textField_center'],
      cellRenderer: (params) => {
        return (
          <div className="flex items-center justify-center h-full">
            <spanc
              className={`border border-gray-400 rounded-md w-[30px] h-[30px] bg-white flex items-center justify-center
          ${params.value === 'N' ? 'text-red-500' : 'text-black'}
        `}
            >
              {params.value}
            </spanc>
          </div>
        );
      },
    },
    {
      field: 'yn4',
      headerName: 'yn4',
      type: ['textField_center'],
      cellRenderer: (params) => {
        return (
          <div className="flex items-center justify-center h-full">
            <span className="border border-gray-400 rounded-md w-[30px] h-[30px] bg-white flex items-center justify-center">
              {params.value}
            </span>
          </div>
        );
      },
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
              onGridReady={(params) => params.api.autoSizeAllColumns()}
              // 필요 시 옵션 추가
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sample06;
