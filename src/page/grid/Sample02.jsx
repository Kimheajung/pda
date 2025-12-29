import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import CustomAgGrid from '@components/aggrid/CustomAgGrid';
import MOCK_DATA3 from '@components/aggrid/MOCK_DATA3.json';
import { exportToExcel } from '@components/aggrid/AgGridUtils';
import { DtPicker, MonthPicker } from '@components/form/UseFormControl';
import { formatter } from '@util/Moment';


const Sample02 = () => {
  const gridRef = useRef(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowData] = useState(MOCK_DATA3);
  const colors = [
    { label: 'Pink', value: '#FFC0CB' },
    { label: 'Purple', value: '#A020F0' },
    { label: 'Blue', value: '#0000FF' },
    { label: 'Green', value: '#008000' },
  ];

  const [colDefs] = useState([
    {
      field: 'rowId',
      headerName: '숫자',
      type: ['numberField_center'],
    },
    {
      field: 'date1',
      headerName: 'aggrid yyyy-mm-dd',
      type: ['dateField'],
      cellEditor: 'agDateStringCellEditor',
      cellEditorParams: {
        min: '2025-10-20',
        max: '2025-12-31',
      },
    },
    {
      field: 'date2',
      headerName: 'prime yyyy-mm-dd',
      type: ['dateField', 'datePickerEditor'],
      // cellEditorParams: {
      //   minDate: '2025-10-15',
      //   maxDate: '2025-10-15',
      // },
      // cellEditor: DatePickerEditor,
      // cellEditorPopup: true, // 팝업으로 표시 (선택사항)
    },
    {
      field: 'date3',
      headerName: 'prime yyyy-mm',
      type: ['dateField', 'monthPickerEditor'],
      // cellEditorParams: {
      //   minDate: '2025-9',
      //   maxDate: '2025-10',
      // },
      // cellEditor: DatePickerEditor2,
    },
    // {
    //   field: 'date4',
    //   headerName: 'date4',
    //   type: ['filterText'],
    // },

    {
      field: 'text1',
      headerName: 'text',
      type: ['textField_center'],
      cellEditor: 'agTextCellEditor',
      cellEditorParams: {
        maxLength: 10,
      },
    },
    {
      field: 'text2',
      headerName: 'textarea',
      type: ['textField_left'],
      cellEditor: 'agLargeTextCellEditor',
      cellEditorPopup: true,
      cellEditorParams: {
        maxLength: 100,
        // rows: 15,
        // cols: 50,
      },
    },
    // {
    //   field: 'text3',
    //   headerName: 'text3',
    //   type: ['filterText'],
    //   cellEditor: 'agTextCellEditor',
    // },
    // {
    //   field: 'text4',
    //   headerName: 'text4',
    //   type: ['filterText'],
    // },

    {
      field: 'color1',
      headerName: 'select',
      type: ['textField_center'],
      cellEditor: 'agRichSelectCellEditor',
      valueFormatter: (p) => {
        const color = colors.find((c) => c.value === p.value);
        return color ? color.label : p.value;
      },
      valueParser: (p) => {
        return p.newValue.value;
      },
      cellEditorParams: {
        formatValue: (v) => {
          return v.label;
        },
        values: colors,
        valueListMaxHeight: 220,
      },
    },
    {
      field: 'color2',
      headerName: 'select+search',
      type: ['textField_center'],
      cellEditor: 'agRichSelectCellEditor',
      valueFormatter: (p) => {
        const color = colors.find((c) => c.value === p.value);
        return color ? color.label : p.value;
      },
      valueParser: (p) => p.newValue.value,
      cellEditorParams: {
        formatValue: (v) => v.label,
        values: colors,
        searchType: 'matchAny',
        allowTyping: true, // 검색기능
        filterList: true, // 입력에 따른 필터
        highlightMatch: true, // 입력과 일치하는 항목 체크
        valueListMaxHeight: 220,
        cellHeight: 30, // 셀 높이
      },
    },
    // {
    //   field: 'color3',
    //   headerName: 'color3',
    //   type: ['filterText'],
    // },
    // {
    //   field: 'color4',
    //   headerName: 'color4',
    //   type: ['filterText'],
    // },
    {
      field: 'number1',
      headerName: 'number1',
      type: ['numberField_right', 'numberFormat'],
      cellEditor: 'agNumberCellEditor',
      cellEditorParams: {
        min: 0,
        max: 1000,
        // preventStepping: true,
        // precision: 2,
        // step: 0.5,
        showStepperButtons: true,
      },
    },
    {
      field: 'number2',
      headerName: 'number2',
      type: ['numberField_right', 'numberFormat'],
      cellEditor: 'agNumberCellEditor',
      cellEditorParams: {
        // min: 0,
        // max: 1000,
      },
    },
    // {
    //   field: 'number3',
    //   headerName: 'number3',
    //   type: ['filterText'],
    // },
    // {
    //   field: 'number4',
    //   headerName: 'number4',
    //   type: ['filterText'],
    // },
    {
      field: 'yn1',
      headerName: '체크박스',
      type: ['checkbox'],
    },
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
          {/* <Button label="Exel" onClick={onBtnExportDataAsExcel} /> */}
          <span>2.그리드 입력형</span>
          <div className="h-[79vh]">
            <CustomAgGrid
              gridId="grid1" // 필수 입력
              rowId="rowId" // 필수 입력
              ref={gridRef} // 필수 입력
              rowData={rowData} // 필수 입력
              colDefs={colDefs} // 필수 입력
              // sumFields={['number2', 'number1']}
              // onCellClicked={onCellClicked}
              onSelectionChanged={onSelectionChanged}
              // pinnedBottomRowData={pinnedBottomRowData}
              overrideRowClicked={() => {
                return null;
              }}
              defaultColDef={{ editable: true }}
              onGridReady={(params) => params.api.autoSizeAllColumns()}
              // 필요 시 옵션 추가
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sample02;
