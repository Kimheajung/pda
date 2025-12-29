import { useCallback, useMemo, useRef, useState } from 'react';
import CustomAgGrid from '@components/aggrid/CustomAgGrid';
import MOCK_DATA from '@components/aggrid/MOCK_DATA.json';
import { exportToExcel } from '@components/aggrid/AgGridUtils';
import { Button } from 'primereact/button';

const Sample00 = () => {
  const gridRef = useRef(null);
  const [selectedRows, setSelectedRows] = useState([]);

  const [rowData] = useState(MOCK_DATA);

  const [colDefs] = useState([
    {
      headerName: '#', // 컬럼 헤더
      valueGetter: (params) => {
        if (params.node.rowPinned) {
          return '';
        }
        return params.node.rowIndex !== undefined
          ? params.node.rowIndex + 1
          : '';
      },
      pinned: 'left', // 왼쪽 고정
      sortable: false, // 정렬 비활성화
      filter: false, // 필터 비활성화
      editable: false, // 편집 비활성화
      resizable: false, // width 편집 비활성화
      suppressHeaderMenuButton: true, // 메뉴 버튼 비활성화
      // type: ['centerAligned'],
      type: 'rightAligned', // 오른쪽 정렬
    },
    // {
    //   headerName: 'A shared prop for all Groups',
    //   wrapHeaderText: true, // headerName
    //   // autoHeaderHeight: true,
    //   children: [
    //     { columnGroupShow: 'closed', field: 'total' },
    //     { columnGroupShow: 'open', field: 'gold' },
    //     { columnGroupShow: 'open', field: 'silver' },
    //     { columnGroupShow: 'open', field: 'bronze' },
    //   ],
    // },

    {
      headerName: '그룹',
      // marryChildren: true, // 컬럼 이동시 그룹이 같이 이동
      children: [
        {
          field: 'first_name',
          headerName: 'first_name',
          type: ['textField_center'],
          // colSpan: (params) => (params.data.last_name === 'Abbie' ? 3 : 1),
        },
        {
          field: 'last_name',
          headerName: 'last_name',
          type: ['textField_center'],
        },
      ],
    },

    {
      field: 'first_name',
      headerName: 'rowspan',
      type: ['textField_center'],
      spanRows: true,
      // onCellClicked: (params) => {
      // 링크 클릭시 이벤트
      // },
    },
    {
      field: 'first_name',
      headerName: '링크',
      type: ['link', 'filterText'],
      // spanRows: true,
      // onCellClicked: (params) => {
      // 링크 클릭시 이벤트
      // },
    },
    {
      field: 'last_name',
      headerName: '필수 입력',
      type: ['textField_center', 'required'],
    },
    {
      field: 'email',
      headerName: '글씨 색 변경',
      type: ['textField_left'],
      cellClass: 'text-red-500',
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
    // {
    //   field: 'address',
    //   headerName: 'address',
    //   type: ['filterText'],
    // },
    // {
    //   field: 'city',
    //   headerName: 'city',
    //   type: ['filterText'],
    // },
    // {
    //   field: 'country',
    //   headerName: 'country',
    //   type: ['filterText'],
    // },
    // {
    //   field: 'ip_address',
    //   headerName: 'ip_address',
    //   type: ['filterText'],
    // },
    {
      field: 'number1',
      headerName: '%추가',
      type: ['numberField_right', 'percent'],
    },
    {
      field: 'number2',
      headerName: '숫자 표기',
      type: ['numberField_right', 'numberFormat'],
    },
    // {
    //   field: 'flight_number',
    //   headerName: 'flight_number',
    //   type: ['filterText'],
    // },
  ]);

  // 셀 클릭 이벤트
  const onCellClicked = useCallback((params) => {
    if (params.colDef.field === 'MENU_NAME' && params.data) {
      // menuModifyRef.current.getVisible(params.data, 'MODIFY');
      // menuModifyModalAlert('메뉴 수정', params.data);
    }
  }, []);

  // 행 선택
  const onSelectionChanged = useCallback((params) => {
    const selectedRows = params.api.getSelectedRows();
    // const selectedKeys = params.api.getSelectedNodes().map(node => node.data.row_key);
    setSelectedRows(selectedRows);
    console.log('선택된 행:', selectedRows);
  }, []);

  // Excel 내보내기 버튼
  const onBtnExportDataAsExcel = useCallback(() => {
    // exportToExcel( '파일명', '시트명', gridRef, colDefs )
    exportToExcel('Sample1', 'Sample1_List', gridRef.current.api, colDefs);
  }, [colDefs]);

  return (
    <div className="grid">
      <div className="col-12 xl:col-12">
        <div className="card mb-0">
          
          <span>1. 기본형 그리드 - </span>
          {/* <Button label="Exel" onClick={onBtnExportDataAsExcel} /> */}
          <div className="h-[79vh]">
            <CustomAgGrid
              gridId="grid1" // 필수 입력
              rowId="ROW_ID" // 필수 입력
              ref={gridRef} // 필수 입력
              rowData={rowData} // 필수 입력
              colDefs={colDefs} // 필수 입력
              sumFields={['number2', 'number1']}
              // onCellClicked={onCellClicked}
              onSelectionChanged={onSelectionChanged}
              // pinnedBottomRowData={pinnedBottomRowData}

              // 필요 시 옵션 추가
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sample00;
