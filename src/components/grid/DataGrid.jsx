import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { themeQuartz } from 'ag-grid-community';
import { AG_GRID_LOCALE_KR } from '@ag-grid-community/locale';
import { AgGridReact } from 'ag-grid-react';
import { restoreGridState, saveGridState } from './GridUtils';
import { columnWidths } from './ColumnWidths';
import {
  DatePickerEditor,
  MonthPickerEditor,
  ImageRenderer,
  MonthPickerEditor2,
} from './CellRenderers';

/**
 * AG-Grid 커스텀 컴포넌트
 * @example
 * <DataGrid
     gridId="grid12" // 필수 입력
 *   rowId="rowId" // 필수 입력
 *   ref={gridRef} // 필수 입력
 *   rowData={rowData} // 필수 입력
 *   colDefs={colDefs} // 필수 입력
 * />
 * 
 * @param {string} gridId - 같은 페이지 내 그리드를 구분하기 위한 ID
 * @param {string} rowId - rowId로 사용할 필드명
 * @param {Array<Object>} rowData - 그리드에 사용할 데이터
 * @param {Array<Object>} colDefs - 컬럼 설정 값
 * 
 * @typedef {Object} [GridChangesProps] - 변경사항 객체, 함수 모음
 * @property {Object} changes - 변경사항 객체
 * @property {Set<string|number>} changes.added - 추가된 rowId 집합
 * @property {Set<string|number>} changes.modified - 수정된 rowId 집합
 * @property {Map<string, boolean>} modifiedCells - 수정한 셀
 * 
 * @param {Array<Object>} [sumFields] - 하단 합계 표기할 필드
 * @param {Array<Object>} [pinnedBottomConfig] - 하단 고정 로우 설정
 * 
 * @param {function} [overrideRowSelection] - rowSelection을 override함
 * @param {function} [overrideDefaultColDef] - defaultColDef을 override함
 * 
 * @param {Object} [addRowSelection] - 페이지에서 추가한 rowSelection
 * @param {Object} [addDefaultColDef] - 페이지에서 추가한 defaultColDef
 * @param {Object} [addGridOptions] - 페이지에서 추가한 gridOption
 * @param {function} [addOnGridReady] - 페이지에서 추가한 onGridReady
 * 
 * @param {function} [onSelectionChanged] - 페이지에서 선택한 로우
 * 
 * @param {function|Object} [restProps] - 이외의 설정
 * 
 * @returns {JSX.Element} AG-Grid 컴퍼넌트
 */
const DataGrid = forwardRef(
  (
    {
      gridId = 'grid1', // 같은 페이지 내 그리드를 구분하기 위한 ID
      rowId = 'rowId', // rowId로 사용할 필드명
      rowData, // 그리드에 사용할 데이터
      colDefs, // 컬럼 설정 값

      gridChangesProps = null, // 변경사항 객체, 함수 모음

      sumFields = [], // 합계 표기할 필드
      pinnedBottomConfig = [], // 하단 고정 로우 설정

      overrideRowSelection, // rowSelection을 override함
      overrideDefaultColDef, // defaultColDef을 override함

      addRowSelection = {}, // 페이지에서 추가한 rowSelection
      addDefaultColDef = {}, // 페이지에서 추가한 defaultColDef
      addGridOptions = {}, // 페이지에서 추가한 gridOption
      addOnGridReady, // 페이지에서 추가한 onGridReady

      onSelectionChanged, // 페이지에서 선택한 로우
      ...restProps // 이외의 설정
    },
    ref
  ) => {
    const gridRef = useRef();
    const location = useLocation();

    const USER_ID = useSelector((state) => state.userInfo.USER_ID) || '?????';
    const PAGE_ID = location.pathname.replace(/\//g, '') || '?????';

    // gridChangesProps에서 추출
    const changes = gridChangesProps?.changes;
    const modifiedCells = gridChangesProps?.modifiedCells;

    // gridRef를 부모로 노출
    // useImperativeHandle(ref, () => ({
    //   api: gridRef.current?.api,
    //   columnApi: gridRef.current?.columnApi,
    // }));

    useImperativeHandle(ref, () => gridRef.current); // 전체 노출

    /**
     * getRowId 설정
     */
    const getRowId = useCallback(
      (params) => {
        if (!params.data[rowId]) {
          return params.node
            ? String(params.node.id)
            : `temp-${Date.now()}-${Math.random()}`; // node 없으면 임시 ID
        }
        return String(params.data[rowId]);
      },
      [rowId]
    );

    /**
     * 컬럼의 공통 설정
     */
    const enhancedColDefs = useMemo(() => {
      // colDefs에 공통 너비 적용
      const applyColumnWidths = (col) => {
        // width가 이미 있으면 그대로 사용
        if (col.width !== undefined) {
          return col;
        }

        // children이 있으면 처리
        if (col.children) {
          return {
            ...col,
            children: col.children.map(applyColumnWidths),
          };
        }

        // headerName으로 공통 너비 조회
        const defaultWidth = columnWidths[col.headerName];
        // width가 없으면 생략 = auto
        return defaultWidth ? { ...col, width: defaultWidth } : col;
      };

      return colDefs.map((col) => {
        const enhanced = applyColumnWidths(col);

        // cellClassRules 자동 반영
        // bg-yellow-200/20 : 수정 가능한 셀
        // bg-orange-100! :수정한 셀
        enhanced.cellClassRules = {
          ...(enhanced.cellClassRules || {}),
          'bg-yellow-200/20': (params) => {
            const rowId = params.data?.rowId;
            if (changes?.added?.has(rowId)) return false;
            return params.colDef.editable === true;
          },
          'bg-orange-100!': (params) => {
            const rowId = params.data?.rowId;
            const field = params.colDef?.field;

            if (!rowId || !field) return false;
            if (changes?.added?.has(rowId)) return false;
            // if (!isActuallyModified?.(rowId)) return false;
            const key = `${rowId}-${field}`;
            return modifiedCells?.has(key);
          },
        };

        return enhanced;
      });
      // return colDefs.map(applyColumnWidths);
    }, [colDefs, changes, modifiedCells]);

    /**
     * 그리드 테마 설정
     */
    const myTheme = useMemo(() => {
      return themeQuartz.withParams({
        browserColorScheme: 'light',
        accentColor: '#F36162',
        backgroundColor: '#FFFFFF',
        foregroundColor: '#181D1F',
        headerBackgroundColor: '#FAFAFA',
        oddRowBackgroundColor: '#8881',
        headerRowBorder: true,
        rowBorder: false,
        columnBorder: false,
        wrapperBorder: true,
        fontFamily: {
          googleFont: 'Open Sans',
        },
        headerFontSize: 13,
        headerTextColor: '#494949ff',
        headerFontWeight: 500,
        fontSize: 13,
        iconSize: 15,
        headerVerticalPaddingScale: 0.8,
        rowVerticalPaddingScale: 0.8,
        borderRadius: 4,
        wrapperBorderRadius: 4,
        // columnBorder: { style: 'dashed', color: '#9696C8' },
      });
    }, []);

    /**
     * 기본 컬럼 속성
     */
    const handleDefaultColDef = useMemo(() => {
      if (overrideDefaultColDef) {
        return overrideDefaultColDef;
      }
      return {
        resizable: true,
        sortable: true,
        filter: true,
        floatingFilter: false,
        enableRowGroup: true,
        headerClass: 'ag-center-aligned-header h-group-center', // 모든 그리드 헤더 가운데 정렬
        ...addDefaultColDef, // 사용 페이지에서 추가한 옵션
      };
    }, [overrideDefaultColDef, addDefaultColDef]);

    /**
     * 컬럼 타입 정의하여 사용
     * colDefs 옵션 사용 가능
     */
    const columnTypes = useMemo(() => {
      return {
        h_redText: {
          headerClass: 'text-red-500',
        },
        h_borderBottom: {
          headerClass: 'border-b border-red-600',
        },
        c_redText: {
          cellClass: 'text-red-500 text-center',
        },
        // 헤더, 라인 가운데 정렬
        h_centerAligned: {
          headerClass: 'ag-center-aligned-header',
        },
        c_centerAligned: {
          cellClass: 'text-center',
        },

        // y/n || boolean => 체크 박스로 렌더링 및 가운데 정렬
        checkbox: {
          headerClass: 'ag-center-aligned-header',
          // cellClass: 'flex justify-center items-center',
          cellDataType: 'boolean',
          cellRenderer: 'agCheckboxCellRenderer',
          cellEditor: 'agCheckboxCellEditor',
          cellClass: 'ag-checkbox-center-aligned-cell',
        },

        number: {
          headerClass: 'ag-center-aligned-header',
          cellClass: 'ag-checkbox-center-aligned-cell',
          // cellClass: 'flex justify-center items-center',
          cellDataType: 'boolean',
          cellRenderer: 'agNumberCellRenderer',
          cellEditor: 'agNumberCellEditor',
        },

        // 링크 컬럼
        link: {
          cellClass:
            'cursor-pointer text-blue-600 hover:text-red-500 hover:border-b hover:border-red-500',
        },

        // 수정 가능한 셀
        editableCell: {
          // cellStyle: { backgroundColor: '#fffacd6a' },
          // cellClass: 'bg-yellow-100/30',
          cellClassRules: {
            // 수정 가능한 셀
            'bg-yellow-200/20': (params) => {
              const rowId = params.data?.rowId;
              if (changes?.added?.has(rowId)) return false;
              return params.colDef.editable === true;
            },
            // 수정한 셀
            'bg-orange-100!': (params) => {
              const rowId = params.data?.rowId;
              const field = params.colDef?.field;

              if (!rowId || !field) return false;
              if (changes?.added?.has(rowId)) return false;
              // if (!isActuallyModified?.(rowId)) return false;
              const key = `${rowId}-${field}`;
              return modifiedCells?.has(key);
            },
          },
        },

        // 날짜 컬럼 + 가운데 정렬 + 날짜 멀티 필터
        dateField_center: {
          cellClass: 'text-center',
          filter: 'agMultiColumnFilter',
          filterParams: {
            filters: [
              { filter: 'agDateColumnFilter' },
              { filter: 'agSetColumnFilter' },
            ],
          },
        },

        // 날짜 컬럼 + 왼쪽 정렬 + 날짜 멀티 필터
        dateField_left: {
          // cellClass: 'text-center',
          filter: 'agMultiColumnFilter',
          filterParams: {
            filters: [
              { filter: 'agDateColumnFilter' },
              { filter: 'agSetColumnFilter' },
            ],
          },
        },

        // 텍스트컬럼 + 가운데 정렬 + 텍스트 멀티 필터
        textField_center: {
          cellClass: 'text-center flex items-center justify-center',
          filter: 'agMultiColumnFilter',
          filterParams: {
            filters: [
              { filter: 'agTextColumnFilter' },
              { filter: 'agSetColumnFilter' },
            ],
          },
        },

        // 텍스트 컬럼 + 왼쪽 정렬 + 텍스트 멀티 필터
        textField_left: {
          cellClass: 'text-left',
          filter: 'agMultiColumnFilter',
          filterParams: {
            filters: [
              { filter: 'agTextColumnFilter' },
              { filter: 'agSetColumnFilter' },
            ],
          },
        },

        // 숫자 컬럼 + 왼쪽 정렬 + 숫자 멀티 필터
        numberField_left: {
          // cellClass: 'text-center ag-number-center-aligned-cell',
          filter: 'agMultiColumnFilter',
          filterParams: {
            filters: [
              { filter: 'agNumberColumnFilter' },
              { filter: 'agSetColumnFilter' },
            ],
          },
        },

        // 숫자 컬럼 + 가운데 정렬 + 숫자 멀티 필터
        numberField_center: {
          cellClass: 'text-center ag-number-center-aligned-cell',
          filter: 'agMultiColumnFilter',
          filterParams: {
            filters: [
              { filter: 'agNumberColumnFilter' },
              { filter: 'agSetColumnFilter' },
            ],
          },
        },

        // 숫자 컬럼 + 오른쪽 정렬 + 숫자 멀티 필터
        numberField_right: {
          cellClass: 'text-right ag-number-right-aligned-cell',
          filter: 'agMultiColumnFilter',
          filterParams: {
            filters: [
              { filter: 'agNumberColumnFilter' },
              { filter: 'agSetColumnFilter' },
            ],
          },
        },

        // 텍스트 멀티 필터
        filterText: {
          filter: 'agMultiColumnFilter',
          filterParams: {
            filters: [
              { filter: 'agTextColumnFilter' },
              { filter: 'agSetColumnFilter' },
            ],
          },
        },

        // 날짜 멀티 필터
        filterDate: {
          cellClass: 'text-center',
          filter: 'agMultiColumnFilter',
          filterParams: {
            filters: [
              { filter: 'agDateColumnFilter' },
              { filter: 'agSetColumnFilter' },
            ],
          },
        },

        // 필수 입력 헤더에 * 표기
        required: {
          headerClass: 'required-field',
        },

        // 셀 벨류 뒤에 % 표기 + 콤마 추가
        percent: {
          // cellClass: 'text-right',
          valueFormatter: (params) => {
            const value = params.value;
            return value != null ? `${formatNumber(value)}%` : '';
          },
        },

        //  숫자 천단위 콤마 타입
        numberFormat: {
          valueFormatter: (params) => formatNumber(params.value),
        },

        // PrimeReact Calendar 날짜(YYYY-MM-DD) 에디터
        datePickerEditor: {
          cellEditor: DatePickerEditor,
        },

        // PrimeReact Calendar 월(YYYY-MM) 에디터
        monthPickerEditor: {
          cellEditor: MonthPickerEditor,
        },

        // input type='month' 월(YYYY-MM) 에디터
        monthPickerEditor2: {
          cellEditor: MonthPickerEditor2,
          valueFormatter: (params) => {
            if (!params.value) return '';
            return params.value; // 이미 YYYY-MM 형식
          },
        },

        // 셀에 이미지 삽입
        imageRenderer: {
          // cellClass: 'ag-center-aligned-cell',
          cellRenderer: ImageRenderer,
        },
      };
    }, []);

    /**
     * 콤마 찍는 함수
     * @param {string|number} value - 콤마 찍을 원본 값
     * @returns {string}
     */
    const formatNumber = (value) => {
      return value != null ? new Intl.NumberFormat('ko-KR').format(value) : '';
    };

    /**
     * 행 선택 옵션 설정
     */
    const rowSelection = useMemo(() => {
      // null이면 비활성화
      if (overrideRowSelection === null) {
        return undefined;
      }

      if (overrideRowSelection) {
        return overrideRowSelection;
      }

      return {
        mode: 'multiRow',
        enableClickSelection: true, // 체크박스뿐만이 아니라 셀을 클릭했을때도 체크
        enableSelectionWithoutKeys: true, // 셀을 클릭했을때 멀티로 체크
        // checkboxes: false, // 로우 체크박스
        // headerCheckbox: false, //헤더 체크박스
        ...addRowSelection,
      };
    }, [overrideRowSelection, addRowSelection]);

    /**
     * 그리드 준비 시 실행
     */
    const handleGridReady = useCallback(
      (params) => {
        restoreGridState(params, USER_ID, PAGE_ID, gridId); // 그리드 상태 복원
        addOnGridReady?.(params); // 페이지에서 받은 추가 동작 호출
      },
      [USER_ID, PAGE_ID, gridId, addOnGridReady]
    );

    /**
     * 로우 선택 핸들러
     */
    const handleSelectionChanged = useCallback(
      (params) => {
        onSelectionChanged?.(params); // params 직접 전달
      },
      [onSelectionChanged]
    );

    /**
     * 조건에 따라 row class 추가
     */
    const rowClassRules = useMemo(() => {
      return {
        'bg-green-100/30!': (params) => {
          const rowId = params.data?.rowId;
          return rowId && changes?.added?.has(rowId);
        },
      };
    }, [changes]);

    /**
     * 그리드 옵션 설정
     */
    const gridOptions = useMemo(() => {
      return {
        getRowId,
        rowHeight: 36, // 그리드 렌더링 최적화
        rowBuffer: 40, // 그리드 위 아래로 40개의 행을 준비 => 최적화
        enableCellSpan: true,
        singleClickEdit: true,
        // stopEditingWhenCellsLoseFocus: true, // 에디팅 시 포커스 잃으면 수정 종료
        // columnHoverHighlight: true, // 컬럼 호버 하이라이트
        // invalidEditValueMode: 'block', // 수정시 유효한 값이 들어올때까지 편집기를 못닫게함
        ...addGridOptions, // 추가한 그리드 옵션
      };
    }, [getRowId, addGridOptions]);

    /**
     * 그리드 헤더 메뉴 설정
     */
    const getMainMenuItems = useCallback(
      (params) => {
        return [
          ...params.defaultItems,
          'separator',
          {
            name: '그리드 상태 저장',
            action: () => {
              saveGridState(gridRef, USER_ID, PAGE_ID, gridId);
            },
          },
        ];
      },
      [gridRef, USER_ID, PAGE_ID, gridId]
    );

    // 우클릭
    // const getContextMenuItems = useCallback((params) => {
    //   return [
    //     ...(params.defaultItems || []),
    //     'separator',
    //     {
    //       name: 'Click Alert Button and Close Menu',
    //       menuItem: munuItem,
    //       menuItemParams: {
    //         buttonValue: 'Alert',
    //       },
    //     },
    //     {
    //       name: 'Click Alert Button and Keep Menu Open',
    //       suppressCloseOnSelect: true,
    //       menuItem: munuItem,
    //       menuItemParams: {
    //         buttonValue: 'Alert',
    //       },
    //     },
    //   ];
    // }, []);

    /**
     * 그리드 하단 공정 로우 설정 (합계)
     */
    const pinnedBottomRowData = useMemo(() => {
      // console.log('rowData', rowData);
      if (pinnedBottomConfig && pinnedBottomConfig.length > 0) {
        const rows = [];

        // 1단계: 각 행의 합계 계산
        pinnedBottomConfig.forEach((config) => {
          const row = {};

          // 합계 계산
          if (config.sumFields && config.sumFields.length > 0) {
            config.sumFields.forEach((field) => {
              const sum = rowData.reduce((acc, rowItem) => {
                const value = rowItem[field];
                return acc + (typeof value === 'number' ? value : 0);
              }, 0);
              row[field] = sum;
            });
          }
          console.log('row', row);

          // label 설정
          if (config.label) {
            if (Array.isArray(config.label)) {
              config.label.forEach((labelItem) => {
                row[labelItem.field] = labelItem.value;
              });
            } else {
              row[config.label.field] = config.label.value;
            }
          }

          rows.push(row);
        });

        // 2단계: 계산된 필드 처리 (다른 행 참조 가능)
        pinnedBottomConfig.forEach((config, index) => {
          if (config.calculatedFields && config.calculatedFields.length > 0) {
            config.calculatedFields.forEach((calc) => {
              // calc.formula는 함수: (rows, currentRowIndex) => value
              rows[index][calc.field] = calc.formula(rows, index);
            });
          }
        });

        return rows;
      }

      // sumFields 로직 (합계)
      if (!sumFields || sumFields.length === 0) {
        return undefined;
      }

      const sumRow = {};
      sumFields.forEach((field) => {
        const sum = rowData.reduce((acc, row) => {
          const value = row[field];
          return acc + (typeof value === 'number' ? value : 0);
        }, 0);
        sumRow[field] = sum;
      });

      return [sumRow];
    }, [rowData, sumFields, pinnedBottomConfig]);

    /**
     * 셀 선택시 해당 셀의 헤더 하이라이트
     */
    const cellSelection = useMemo(() => {
      return {
        enableHeaderHighlight: true,
      };
    }, []);

    return (
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={enhancedColDefs}
        columnTypes={columnTypes}
        defaultColDef={handleDefaultColDef}
        rowSelection={rowSelection}
        theme={myTheme}
        gridOptions={gridOptions}
        onGridReady={handleGridReady}
        onSelectionChanged={handleSelectionChanged}
        getMainMenuItems={getMainMenuItems}
        // getContextMenuItems={getContextMenuItems}
        pinnedBottomRowData={pinnedBottomRowData}
        localeText={AG_GRID_LOCALE_KR}
        // cellSelection={cellSelection}
        rowClassRules={rowClassRules}
        {...restProps}
      />
    );
  }
);

export default DataGrid;
