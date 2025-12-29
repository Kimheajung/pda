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
import { restoreGridState, saveGridState } from './AgGridUtils';
import { debounce } from 'lodash';
import { defaultColumnWidths } from './DefaultColumnWidths';
import {
  DatePickerEditor,
  MonthPickerEditor,
  ImageRenderer,
} from './CustomCellEditors';

const CustomAgGrid = forwardRef(
  (
    {
      pageId, // 페이지를 구분하기 위한 ID
      gridId = 'grid1', // 같은 페이지 내 그리드를 구분하기 위한 ID
      rowId = 'ROW_ID',
      rowData,
      colDefs,
      sumFields = [],
      pinnedBottomConfig = [], // 새로운 prop 추가
      onCellClicked = () => {},
      onRowClicked = () => {}, // 페이지에서 추가 동작 가능
      overrideRowClicked, // RowClicked를 override함
      onGridReady = () => {}, // 페이지에서 추가 동작 가능
      overrideRowSelection, // RowSelection을 override함
      overrideDefaultColDef, // DefaultColDef을 override함
      addGridOptions = {}, // 그리드 옵션 추가
      themeOverrides = {},
      defaultColDef = {},
      onSelectionChanged = () => {},
      ...restProps
    },
    ref
  ) => {
    const gridRef = useRef();
    const location = useLocation();

    const USER_ID = useSelector((state) => state.userInfo.USER_ID) || '?????';
    const PAGE_ID = pageId || location.pathname.replace(/\//g, '') || '?????';

    // gridRef를 부모로 노출
    useImperativeHandle(ref, () => ({
      api: gridRef.current?.api,
      columnApi: gridRef.current?.columnApi,
    }));

    // useImperativeHandle(ref, () => gridRef.current); // 전체 노출

    // getRowId 설정
    const getRowId = useCallback(
      (params) => {
        if (!params.data[rowId]) {
          return params.node
            ? String(params.node.id)
            : `temp-${Date.now()}-${Math.random()}`; // node 없으면 임시 ID
        }
        // return params.data[rowId];
        return params.data[rowId];
      },
      [rowId]
    );

    // colDefs에 공통 너비 적용
    const enhancedColDefs = useMemo(() => {
      return colDefs.map((col) => {
        // 컬럼에 width가 명시되어 있으면 그대로 사용
        if (col.width !== undefined) {
          return col;
        }
        // headerName으로 공통 너비 조회
        const defaultWidth = defaultColumnWidths[col.headerName];
        // width가 없으면 생략 = auto
        return defaultWidth ? { ...col, width: defaultWidth } : col;
      });
    }, [colDefs]);

    // 테마
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
        ...themeOverrides,
      });
    }, [themeOverrides]);

    // 기본 컬럼 속성
    const handleDefaultColDef = useMemo(() => {
      if (overrideDefaultColDef) {
        return overrideDefaultColDef; // overrideDefaultColDef가 있으면 전체 대체
      }
      return {
        resizable: true,
        sortable: true,
        filter: true,
        floatingFilter: false,
        enableRowGroup: true,
        singleClickEdit: true,
        headerClass: 'ag-center-aligned-header h-group-center', // 모든 그리드 헤더 가운데 정렬
        ...defaultColDef, // 사용 페이지에서 추가한 옵션
      };
    }, [overrideDefaultColDef, defaultColDef]);

    // 컬럼 타입 grid.css에 정의하여 사용
    // colDefs 옵션 사용 가능
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
        // y/n => 체크 박스로 렌더링 및 가운데 정렬
        checkbox: {
          headerClass: 'ag-center-aligned-header',
          cellClass: 'flex justify-center items-center',
          cellDataType: 'boolean',
          cellRenderer: 'agCheckboxCellRenderer',
        },
        // 링크 컬럼
        link: {
          cellClass:
            'cursor-pointer text-blue-600 hover:text-red-500 hover:border-b hover:border-red-500',
        },
        editableCell: {
          cellStyle: { backgroundColor: '#fffacd6a' },
          // cellClass: 'bg-yellow-100/30',
        },

        dateField: {
          cellClass: 'text-center',
          filter: 'agMultiColumnFilter',
          filterParams: {
            filters: [
              { filter: 'agDateColumnFilter' },
              { filter: 'agSetColumnFilter' },
            ],
          },
        },

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

        numberField_center: {
          cellClass: 'text-center',
          filter: 'agMultiColumnFilter',
          filterParams: {
            filters: [
              { filter: 'agNumberColumnFilter' },
              { filter: 'agSetColumnFilter' },
            ],
          },
        },

        numberField_right: {
          cellClass: 'text-right',
          filter: 'agMultiColumnFilter',
          filterParams: {
            filters: [
              { filter: 'agNumberColumnFilter' },
              { filter: 'agSetColumnFilter' },
            ],
          },
        },

        filterText: {
          filter: 'agMultiColumnFilter',
          filterParams: {
            filters: [
              { filter: 'agTextColumnFilter' },
              { filter: 'agSetColumnFilter' },
            ],
          },
        },

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
        // 셀 벨류 뒤에 % 표기
        percent: {
          // cellClass: 'text-right',
          valueFormatter: (params) => {
            const value = params.value;
            return value != null ? `${value}%` : '';
          },
        },

        //  숫자 천단위 콤마 타입
        numberFormat: {
          // cellClass: 'text-right',
          valueFormatter: (params) => {
            const value = params.value;
            return value != null
              ? new Intl.NumberFormat('ko-KR').format(value)
              : '';
          },
        },

        // 날짜 에디터 타입 추가
        datePickerEditor: {
          cellEditor: DatePickerEditor,
        },
        monthPickerEditor: {
          cellEditor: MonthPickerEditor,
        },
        imageRenderer: {
          // cellClass: 'ag-center-aligned-cell',
          cellRenderer: ImageRenderer,
        },
      };
    }, []);

    // 행 선택 모드
    const rowSelection = useMemo(() => {
      if (overrideRowSelection) {
        return overrideRowSelection;
      }
      return {
        mode: 'multiRow',
        
      };
    }, [overrideRowSelection]);

    // 디바운스된 saveState
    const debouncedSaveState = useCallback(
      debounce(() => {
        saveGridState(gridRef, USER_ID, PAGE_ID, gridId);
        // console.log('저장');
      }, 500), // 0.5초 지연 호출
      [USER_ID, PAGE_ID, gridId]
    );

    // 상태 저장
    const saveState = useCallback(() => {
      saveGridState(gridRef, USER_ID, PAGE_ID, gridId);
    }, [USER_ID, PAGE_ID, gridId]);

    // 그리드 준비 시 상태 복원 + 페이지별 추가 동작
    const handleGridReady = useCallback(
      (params) => {
        restoreGridState(params, USER_ID, PAGE_ID, gridId); // 디폴트: 상태 복원
        onGridReady(params); // 페이지에서 받은 추가 동작 호출
      },
      [USER_ID, PAGE_ID, gridId, onGridReady]
    );

    // 선택 변경 핸들러
    const handleSelectionChanged = useCallback(
      (params) => {
        onSelectionChanged(params); // params 직접 전달
      },
      [onSelectionChanged]
    );

    // 행 클릭 시 디폴트 동작 + 페이지별 추가 동작
    const handleRowClicked = useCallback(
      (params) => {
        if (overrideRowClicked) {
          overrideRowClicked(params); // 디폴트 무시, 커스텀만
          return;
        }
        const node = params.node;
        node.setSelected(!node.isSelected());
        onRowClicked(params); // 페이지에서 받은 추가 동작 호출
      },
      [overrideRowClicked, onRowClicked]
    );

    // 그리드 옵션
    const gridOptions2 = {
      getRowId,
      // onColumnMoved: debouncedSaveState,
      // onColumnResized: debouncedSaveState,
      // onColumnVisible: debouncedSaveState,
      // onColumnPinned: debouncedSaveState,
      // onSelectionChanged: handleSelectionChanged,
      rowModelType: 'clientSide', // 효과 모르겠음
      rowBuffer: 25, // 효과 모르겠음
      domLayout: 'normal', // 효과 모르겠음
      enableCellSpan: true,
      // invalidEditValueMode: 'block', // 수정시 유효한 값이 들어올때까지 편집기를 못닫게함
      ...addGridOptions,
    };

    // 그리드 옵션
    const gridOptions = useMemo(() => {
      return {
        getRowId,
        // onColumnMoved: debouncedSaveState,
        // onColumnResized: debouncedSaveState,
        // onColumnVisible: debouncedSaveState,
        // onColumnPinned: debouncedSaveState,
        // onSelectionChanged: handleSelectionChanged,
        rowModelType: 'clientSide',
        rowBuffer: 25,
        domLayout: 'normal',
        enableCellSpan: true,
        ...addGridOptions, // 여기서 모든 옵션이 적용됨
      };
    }, [getRowId, addGridOptions]);

    // 메뉴 추가
    const getMainMenuItems = useCallback(
      (params) => {
        return [
          ...params.defaultItems,
          'separator',
          // {
          //   name: floatingFilter ? '필터 닫기' : '필터 열기',
          //   action: () => {
          //     const newValue = !floatingFilter;
          //     setFloatingFilter(newValue);
          //     // setFloatingFilter((prev) => !prev);
          //     console.log('gridRef', gridRef);

          //     if (gridRef.current?.api) {
          //       // 각 컬럼에 floatingFilter 적용
          //       gridRef.current.api.getAllGridColumns().forEach((column) => {
          //         const colDef = column.getColDef();
          //         colDef.floatingFilter = newValue;
          //       });

          //       // 그리드 새로고침
          //       gridRef.current.api.refreshHeader();
          //     }
          //   },
          // },
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

    const pinnedBottomRowData2 = useMemo(() => {
      // if (!rowData?.length) return [];
      if (!sumFields || sumFields.length === 0) {
        return undefined;
      }
      const sumRow = {};

      // // 모든 컬럼 초기화 (빈 문자열 또는 0)
      // rowData[0] &&
      //   Object.keys(rowData[0]).forEach((key) => {
      //     sumRow[key] = '';
      //   });

      // sumFields에 해당하는 컬럼만 합계 계산
      sumFields.forEach((field) => {
        const sum = rowData.reduce((acc, row) => {
          const value = row[field];
          return acc + (typeof value === 'number' ? value : 0);
        }, 0);
        sumRow[field] = sum;
      });

      return [sumRow];
    }, [rowData, sumFields]);

    // 합계
    const pinnedBottomRowData = useMemo(() => {
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

          // 레이블 설정
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

      // 기존 sumFields 로직
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
    return (
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        // columnDefs={colDefs}
        columnDefs={enhancedColDefs}
        columnTypes={columnTypes}
        defaultColDef={handleDefaultColDef}
        rowSelection={rowSelection}
        theme={myTheme}
        gridOptions={gridOptions}
        onGridReady={handleGridReady}
        onRowClicked={handleRowClicked}
        onCellClicked={onCellClicked}
        onSelectionChanged={handleSelectionChanged}
        getMainMenuItems={getMainMenuItems}
        // getContextMenuItems={getContextMenuItems}
        pinnedBottomRowData={pinnedBottomRowData}
        localeText={AG_GRID_LOCALE_KR}
        {...restProps}
      />
    );
  }
);

export default CustomAgGrid;
