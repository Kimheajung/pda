import { useState, useEffect, useCallback } from 'react';

/**
 * AG Grid 변경사항 추적 Hook
 * - 행 추가 : 추가한 JSON데이터 확인
 * - 데이터 수정 : 수정한 데이터의 셀 위치 저장, 수정한 셀의 해당 행 JSON데이터 확인
 * - 삭제 : 삭제한 행의 JSON데이터 확인
 *
 * @example
 * const {
 *   rowData,
 *   changes,
 *   addRow,
 *   modifiedCells,
 *   deleteRows,
 *   trackModification,
 *   getChanges,
 *   resetChanges,
 *   hasChanges,
 *   isActuallyModified,
 *   trackCellModification,
 * } = useGridChanges(initialData);
 *
 * @param {Array<Object>} initialData - 초기 데이터
 * @returns {Object} - 그리드 관리 함수들과 상태
 */
const useGridChanges = (initialData = []) => {
  const [rowData, setRowData] = useState([]);
  const [originalData, setOriginalData] = useState(new Map());
  const [changes, setChanges] = useState({
    added: new Set(),
    modified: new Set(),
    // deleted: new Map(),
  });
  // 수정된 셀 추적 (rowId + field)
  const [modifiedCells, setModifiedCells] = useState(new Set());
  // console.log('rowData', rowData);
  // 초기 데이터 설정
  useEffect(() => {
    if (initialData.length === 0) return;
    // console.log('initialData', initialData);
    setRowData(initialData);

    const dataMap = new Map(initialData.map((row) => [row.rowId, { ...row }]));
    setOriginalData(dataMap);
  }, [initialData]);
  // console.log('rowData', rowData);

  /**
   * 새 행 추가
   *
   * @example
   * addRow({
   *    rowId: newRowId,
   *    date1: formatter(new Date(), 'YYYY-MM-DD'),
   *    date2: formatter(new Date(), 'YYYY-MM-DD'),
   *    date3: '',
   *    text1: '',
   *    text2: '',
   *    color1: '',
   *    color2: '',
   *    number1: 0,
   *    number2: 0,
   *    yn1: false,
   *  });
   *
   * @param {Object} newRow - 새 행
   * @returns {Object} 생성된 행
   */
  const addRow = useCallback((newRow) => {
    // if (!newRow.rowId) {
    //   console.warn('rowId가 필요합니다. 사용 페이지에서 생성해주세요.');
    //   return null;
    // }

    // setRowData((prev) => [newRow, ...prev]); // 리스트 처음에에 추가
    setRowData((prev) => [...prev, newRow]); // 리스트 마지막에 추가

    setChanges((prev) => ({
      ...prev,
      added: new Set(prev.added).add(newRow.rowId),
    }));

    return newRow;
  }, []);

  /**
   * 행 삭제
   *
   * @example
   * const selectedIds = selectedRows.map((row) => row.rowId);
   * const existingDeleted = deleteRows(selectedIds);
   *
   * @param {Array} rowIds - 삭제할 rowId 배열
   * @returns {Object} existingDeleted: []
   */
  const deleteRows = useCallback(
    (rowIds) => {
      if (!Array.isArray(rowIds) || rowIds.length === 0) {
        return { addedDeleted: [], existingDeleted: [] };
      }

      const addedDeleted = []; // 추가한 행 중 삭제된 것
      const existingDeleted = []; // 기존 행 중 삭제된 것

      // 삭제할 행 데이터 미리 저장
      const rowsToDelete = rowData.filter((row) => rowIds.includes(row.rowId));

      // changes 업데이트
      setChanges((prev) => {
        const newAdded = new Set(prev.added);
        const newModified = new Set(prev.modified);
        // const newDeleted = new Map(prev.deleted);

        rowsToDelete.forEach((row) => {
          const { rowId } = row;

          if (newAdded.has(rowId)) {
            // 추가된 행 삭제
            newAdded.delete(rowId);
            addedDeleted.push(row);
          } else if (originalData.has(rowId)) {
            // 기존 행 삭제 (deleted에만 추가, rowData는 유지)
            // newDeleted.set(rowId, { ...row });
            existingDeleted.push(row);
          }

          // modified에서는 무조건 제거
          newModified.delete(rowId);
        });

        return {
          added: newAdded,
          modified: newModified,
          // deleted: newDeleted,
        };
      });

      // rowData에서는 추가된 행만 삭제
      setRowData((prev) =>
        prev.filter((row) => !addedDeleted.some((d) => d.rowId === row.rowId))
      );

      return existingDeleted;
    },
    [originalData, rowData]
  );

  /**
   * 실제 변경된 데이터만 필터링 (원본과 비교)
   * - `getChanges`에서 사용
   *
   * @example
   * isActuallyModified(rowId)
   *
   * @param {string|number} rowId
   * @returns {boolean}
   */
  const isActuallyModified = useCallback(
    (rowId) => {
      const original = originalData.get(rowId);
      const current = rowData.find((row) => row.rowId === rowId);

      if (!original || !current) return false;

      // 모든 필드 비교
      return Object.keys(original).some(
        (key) => original[key] !== current[key]
      );
    },
    [originalData, rowData]
  );

  /**
   * 수정 추적
   * - `trackCellModification()`에서 호출
   *
   * @example
   * trackModification(rowId);
   *
   * @param {string|number} rowId - 수정된 rowId
   */
  const trackModification = useCallback(
    (rowId) => {
      // 추가된 행은 수정 추적 안 함
      if (changes.added.has(rowId)) {
        return;
      }
      // console.log('rowId', rowId);
      // 원본 데이터에 있는 경우만 수정으로 간주
      if (originalData.has(rowId)) {
        setChanges((prev) => {
          const newModified = new Set(prev.modified);

          // 실제로 변경되었는지 확인
          if (isActuallyModified(rowId)) {
            // 변경됨 => modified에 추가
            newModified.add(rowId);
          } else {
            // 원상태 복구 => modified에서 제거
            newModified.delete(rowId);

            // 해당 행의 모든 셀도 삭제
            setModifiedCells((prevCells) => {
              const newCells = new Set(prevCells);
              // rowId로 시작하는 모든 key 삭제
              Array.from(newCells.keys()).forEach((key) => {
                if (key.startsWith(`${rowId}-`)) {
                  newCells.delete(key);
                }
              });
              return newCells;
            });
          }

          return {
            ...prev,
            modified: newModified,
          };
        });
      }
    },
    [changes.added, originalData, isActuallyModified]
  );

  /**
   * 수정 셀 추적
   *
   * @example
   * trackCellModification(rowId, field);
   *
   * @param {string|number} rowId - 수정된 rowId
   * @param {String} field - 수정된 field
   */
  const trackCellModification = useCallback(
    (rowId, field) => {
      if (changes.added.has(rowId)) return; // 추가된 행은 셀 추적 안 함

      const key = `${rowId}-${field}`;

      setModifiedCells((prev) => {
        const newKey = new Set(prev);
        newKey.add(key);
        return newKey;
      });

      // trackModification도 호출
      trackModification(rowId);
    },
    [changes.added, trackModification]
  );

  /**
   * 변경사항 가져오기 (실제 변경된 것만)
   *
   * @example
   * const payload = getChanges();
   *
   * @returns {Object} - { added, updated, deleted }
   */
  const getChanges = useCallback(() => {
    // 추가된 행
    const addedRows = rowData.filter((row) => changes.added.has(row.rowId));

    // 수정된 행 (실제로 변경된 것만)
    const modifiedRows = rowData.filter(
      (row) =>
        changes.modified.has(row.rowId) &&
        !changes.added.has(row.rowId) &&
        isActuallyModified(row.rowId)
    );

    // 삭제된 행 (Map → Array 변환)
    // const deletedRows = Array.from(changes.deleted.values());

    return {
      added: addedRows,
      updated: modifiedRows,
      // deleted: deletedRows,
    };
  }, [rowData, changes, isActuallyModified]);

  /**
   * 변경사항 초기화 (저장 후 호출)
   */
  const resetChanges = useCallback(() => {
    // 현재 rowData를 새로운 원본으로 설정
    const dataMap = new Map(rowData.map((row) => [row.rowId, { ...row }]));
    setOriginalData(dataMap);

    // changes 초기화
    setChanges({
      added: new Set(),
      modified: new Set(),
      // deleted: new Map(),
    });
    setModifiedCells(new Map());
  }, [rowData]);

  /**
   * 특정 행 업데이트
   * @param {string|number} rowId
   * @param {Object} updates - 업데이트할 필드들
   */
  const updateRow = useCallback(
    (rowId, updates) => {
      setRowData((prev) =>
        prev.map((row) => (row.rowId === rowId ? { ...row, ...updates } : row))
      );

      trackModification(rowId);
    },
    [trackModification]
  );

  /**
   * 변경사항 존재 여부
   * @returns {boolean}
   */
  const hasChanges2 = useCallback(() => {
    return (
      changes.added.size > 0 || changes.modified.size > 0
      // ||
      // changes.deleted.size > 0
    );
  }, [changes]);

  const hasChanges = useCallback(() => {
    // 추가된 행
    if (changes.added.size > 0) return true;
    // 삭제된 행
    // if (changes.deleted.size > 0) return true;
    // 수정된 행 중 실제로 변경된 것만
    const actuallyModified = Array.from(changes.modified).some((rowId) =>
      isActuallyModified(rowId)
    );

    return actuallyModified;
  }, [changes, isActuallyModified]);

  return {
    // 데이터
    rowData,
    setRowData,
    originalData,
    changes,
    modifiedCells,

    // 함수
    addRow,
    deleteRows,
    trackModification,
    updateRow,
    getChanges,
    resetChanges,
    hasChanges,
    isActuallyModified,
    trackCellModification,

    // 그리드 전달용 객체
    gridChangesProps: {
      changes,
      modifiedCells,
    },
  };
};

export default useGridChanges;
