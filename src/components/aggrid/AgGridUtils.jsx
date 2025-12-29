
export const saveGridState = (gridRef, userId, pageId, gridId) => {
  if (gridRef.current && gridRef.current.api) {
    const columnState = gridRef.current.api.getColumnState();
    localStorage.setItem(
      `GridState_${userId}_${pageId}_${gridId}`,
      JSON.stringify({ columnState })
    ); // 추후 DB로 변경
  }
};

export const restoreGridState = (params, userId, pageId, gridId) => {
  const savedState = localStorage.getItem(
    `GridState_${userId}_${pageId}_${gridId}`
  ); // 추후 DB로 변경
  if (savedState) {
    const { columnState } = JSON.parse(savedState);
    params.api.applyColumnState({ state: columnState, applyOrder: true });
  }
};

export const exportToExcel = (fileName, sheetName, gridApi, colDefs) => {
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const defaultExportOptions = {
    fileName: `${fileName}_${today}.xlsx`,
    sheetName: sheetName,
    columnKeys: colDefs
      .filter((col) => col.headerName !== '#')
      .map((col) => col.field)
      .filter(Boolean), // '#' 제외, field 있는 컬럼만
    rowHeight: 20, // 행 높이 조정
    headerRowHeight: 30, // 헤더 높이 조정
    includeHiddenColumns: false, // 숨겨진 컬럼 제외
  };
  gridApi.exportDataAsExcel(defaultExportOptions);
};


