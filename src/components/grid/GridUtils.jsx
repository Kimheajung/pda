/**
 * AG-Grid - 그리드 상태 저장
 * - 그리드의 헤더 메뉴에서 `그리드 상태 저장` 클릭 시 그리드 상태를 저장
 * - localStorage => db로 저장위치 바뀔 예정
 *
 * @example
 * saveGridState(gridRef, USER_ID, PAGE_ID, gridId);
 *
 * @param {refObject} gridRef - 그리드 ref
 * @param {string} userId - 로그인한 userId
 * @param {string} pageId - 저장하는 페이지의 id
 * @param {string} gridId - 저장하는 그리드의 id (같은 페이지에 그리드가 여러 개 일때)
 */
export const saveGridState = (gridRef, userId, pageId, gridId) => {
  try {
    if (gridRef.current && gridRef.current.api) {
      const columnState = gridRef.current.api.getColumnState();
      const stateData = JSON.stringify({ columnState });
      localStorage.setItem(
        `GridState_${userId}_${pageId}_${gridId}`,
        stateData
      ); // 추후 DB로 변경
    }
  } catch (error) {
    console.error('saveGridState 에러 : ', error);
  }
};

/**
 * AG-Grid - 그리드 저장한 상태 반영
 * - 그리드 랜더링시 저장한 상태를 불러와 반영
 * - `onGridReady`(handleGridReady)에서 사용
 * - localStorage => db로 저장위치 바뀔 예정
 *
 * @example
 * restoreGridState(params, USER_ID, PAGE_ID, gridId);
 *
 * @param {object} params - AG-Grid가 전달하는 parmas
 * @param {string} userId - 로그인한 userId
 * @param {string} pageId - 저장한 페이지의 id
 * @param {string} gridId - 저장한 그리드의 id (같은 페이지에 그리드가 여러 개 일때)
 */
export const restoreGridState = (params, userId, pageId, gridId) => {
  try {
    const savedState = localStorage.getItem(
      `GridState_${userId}_${pageId}_${gridId}`
    ); // 추후 DB로 변경
    if (savedState) {
      const { columnState } = JSON.parse(savedState);
      if (columnState && Array.isArray(columnState)) {
        params.api.applyColumnState({ state: columnState, applyOrder: true });
      }
    }
  } catch (error) {
    console.error('restoreGridState 에러 : ', error);
  }
};

/**
 * AG-Grid - 그리드 데이터를 Excel로 다운로드
 *
 * @example
 * exportToExcel('Sample1', 'Sample1_List', gridRef, colDefs);
 *
 * @param {string} fileName - Excel 파일 이름
 * @param {string} sheetName - Excel 시트 이름
 * @param {refObject} gridRef - 그리드 ref
 * @param {Array<Object>} colDefs - 저장할 컬럼 설정에 사용할 데이터
 */
export const exportToExcel = (fileName, sheetName, gridRef, colDefs) => {
  try {
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const defaultExportOptions = {
      fileName: `${fileName}_${today}.xlsx`,
      sheetName: sheetName,
      // columnKeys: colDefs
      //   .filter((col) => col.headerName !== '#'),
      //   .map((col) => col.field)
      //   .filter(Boolean), // '#' 제외, field 있는 컬럼만
      rowHeight: 20, // 행 높이 조정
      headerRowHeight: 30, // 헤더 높이 조정
      includeHiddenColumns: false, // 숨겨진 컬럼 제외
    };
    gridRef?.current?.api?.exportDataAsExcel(defaultExportOptions);
  } catch (error) {
    console.error('exportToExcel 에러 : ', error);
    // throw error;
  }
};
