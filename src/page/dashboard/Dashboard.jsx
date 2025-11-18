import { AgGridReact } from 'ag-grid-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AG_GRID_LOCALE_KR } from '@ag-grid-community/locale';
import {
  ClientSideRowModelModule,
  DateFilterModule,
  ModuleRegistry,
  NumberFilterModule,
  TextFilterModule,
  ValidationModule,
  AllCommunityModule,
} from 'ag-grid-community';
{/* 
import {
  ColumnMenuModule,
  ContextMenuModule,
  MultiFilterModule,
  SetFilterModule,
} from 'ag-grid-enterprise';
import { AllEnterpriseModule } from 'ag-grid-enterprise';*/}
import { useSelector } from 'react-redux';
import { Get } from '../../api/CommonCall';
import Loading from '../../util/Loading';
import UseModalHook from '../../components/modal/UseModalHook';
import * as commonFunction from '../../util/CommonFunction';
import PurchaserOrderAddSelectModal from './PurchaserOrderAddSelectModal';
import { useNavigate } from 'react-router-dom';
function Dashboard() {
  const navigate = useNavigate();
  const editedCellsRef = useRef(new Set()); // 편집할때 색상 컨트롤 ref
  const changedIdsRef = useRef(new Set()); // 수정된 행 ID 모음
  const detailEditedCellsRef = useRef(new Set()); // 편집할때 색상 컨트롤 ref

  const [mainData, setMainData] = useState([]);

  const store = useSelector((state) => state);
  const [areaList, setAreaList] = useState([]); //지역
  const agGridRef = useRef(null); // aggridref 위에꺼

  const detailAgGridRef = useRef(null); // aggridref 2번째꺼
  const [detailList, setDetailList] = useState([]);
  const detailAgGridRef2 = useRef(null); // aggridref 3번째꺼
  const [detailList2, setDetailList2] = useState([]);

  const agGridPopRef = useRef(null); // 팝업 ref
  const loadingRef = useRef();
  const alertRef = useRef();
  const [aitem, setaItem] = useState({
    cn: '',
    url: ``,
  });
  function aAlert(cn, fnName, url) {
    alertRef.current.getVisible();
    setaItem({
      content: cn,
      url: url,
    });
  }

  const purchaseSelectModalRef = useRef();
  const [purchaseSelectModalModalItem, setPurchaseSelectModalModalItem] =
    useState({
      title: '',
      data: {},
    });

  function purchaseSelectModalAlert(title, data) {
    purchaseSelectModalRef.current.getVisible();
    setPurchaseSelectModalModalItem({
      title,
      data,
    });
  }

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      let areaFilter = store.commonList.filter(
        (item) => item.COMMON_GROUP_CODE === 'AREA'
      );
      areaFilter &&
        areaFilter.map((item) => {
          item.label = item.COMMON_NAME;
          item.value = item.COMMON_CODE;
        });
      setAreaList(areaFilter);
    }
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fnMainData('start');
    }
    return () => {
      mounted = false;
    };
  }, []);

  const fnMainData = async (type) => {
    let params = new URLSearchParams();
    if (type === 'start') {
      setDetailList([]);
      setDetailList2([]);
      params.append('FG_DATE', 'Req');
      params.append('FROM_DATE', '2025-07-01');
      params.append('TO_DATE', '2025-09-23');
    }
    const result = await Get(
      `/cygnusin/v1/api/sd/SHIPMENT_REQUEST_LIST`,
      { params },
      loadingRef
    );
    if (commonFunction.resultCheck(result, loadingRef, aAlert)) {
      let data = result.data.body.data;
      data &&
        data.map((item) => {
          item.CHECK_YN = '';
          item.CAR_SEQ = '';
        });
      setMainData(data);
    }
  };

  const fnCall = (p) => {
    return (
      <>
        {/* <button onClick={() => window.alert('action')}>+</button> */}
        {p.value}
      </>
    );
  };

  //  areaList를 코드/라벨 맵으로 가공
  const areaCodeToName = useMemo(() => {
    const m = new Map();
    (areaList || []).forEach((x) => m.set(String(x.value), String(x.label)));
    return m;
  }, [areaList]);

  const areaValues = useMemo(
    () => (areaList || []).map((x) => String(x.value)),
    [areaList]
  );

  //  날짜 포맷 유틸(값이 Date거나 문자열일 때 모두 케어)
  const toYmd = (v) => {
    if (!v) return '';
    if (typeof v === 'string') return v.slice(0, 10); // 'YYYY-MM-DD...' → 'YYYY-MM-DD'
    const d = new Date(v);
    if (Number.isNaN(+d)) return '';
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mm}-${dd}`;
  };

  const rowClassRules = useMemo(() => ({
    'red-row': (p) => p.data.make == 'Toyota',
  }));

  const rowSelection = useMemo(() => {
    return {
      mode: 'multiRow',
      enableClickSelection: true, // 체크박스뿐만이 아니라 셀을 클릭했을때도 체크되게끔
      enableSelectionWithoutKeys: true, // 셀을 클릭했을때 멀티로 체크 하고 싶은 경우
    };
  }, []);

  const rowKey = (row) =>
    row.DELIVERY_REQUEST_LINE_ID ?? row.SALES_ORDER_NO ?? JSON.stringify(row);

  const getContextMenuItems = useCallback(
    (params) => {
      const api = params.api;

      // 현재 선택된 행들
      const selectedNodes = api.getSelectedNodes();

      const apis = agGridRef.current.api;
      let rows = apis.getSelectedRows(); // 체크박스로 선택된 데이터 가져오기
      const n = rows.length;
      // 선택이 없으면 우클릭한 행만
      return [
        {
          name: `${n}건 배차적용`,
          disabled: n === 0,
          action: () => {
            // 1) detailList에 추가(중복 방지)
            setDetailList((prev) => {
              const merged = [...prev];
              const seen = new Set(merged.map(rowKey));
              rows.forEach((r) => {
                const k = rowKey(r);
                if (!seen.has(k)) {
                  merged.push({ ...r, DISPATCH_QTY: 0 }); // 기본값
                  seen.add(k);
                }
              });
              return merged;
            });

            // 2) mainData에서 제거하고 그리드에서도 사라지게 하기
            setMainData((prev) => {
              const removeKeys = new Set(rows.map(rowKey));
              return prev.filter((item) => !removeKeys.has(rowKey(item)));
            });

            // 3) 선택/강조 정리(선택 해제 + 편집완료 표시 제거)
            api.deselectAll();
            // editedCellsRef 정리(선택 행들만)
            const removeNodeIds = new Set(
              (selectedNodes.length ? selectedNodes : [params.node]).map(
                (n) => n.id
              )
            );
            for (const key of [...editedCellsRef.current]) {
              const [nodeId] = key.split('|');
              if (removeNodeIds.has(nodeId)) editedCellsRef.current.delete(key);
            }
            // 화면 리프레시
            api.refreshCells({ force: true });
          },
        },
        'separator',
        'copy',
        'export',
      ];
    },
    [setDetailList, setMainData]
  );

  return (
    <div className="grid">
      <div className="w-4 h-4 bg-blue-500">
        <button
          onClick={() => {
            navigate('/tailwind');
          }}
        >
          tailwind
        </button>
      </div>
      {/* 테마 클래스 + 명시적 높이 필수 */}
      <div
        className="ag-theme-material"
        style={{ height: 500, width: '100%', border: '1px solid #5f5f5f' }}
      >
        <AgGridReact
          suppressRowClickSelection={true}
          ref={agGridRef}
          rowData={mainData}
          popupParent={document.body} // ✅ 팝업이 그리드 밖으로 자연스럽게
          suppressScrollWhenPopupsAreOpen={true} // 팝업 열릴 때 스크롤 방지
          stopEditingWhenCellsLoseFocus={true}
          singleClickEdit={true}
          localeText={AG_GRID_LOCALE_KR} // 한국어 버전으로 하고싶은경우
          rowSelection={rowSelection}
          suppressCellFocus={true}
          enableRangeSelection={false}
          theme="legacy"
          getContextMenuItems={getContextMenuItems}
          // 우클릭이 선택 상태를 바꾸지 않게 하고 싶으면 ↓ (선택 유지)
          suppressContextMenu={false}
          onRowDoubleClicked={(e) => {
            let data = e.data;
            let arr = [];
            arr.push(data);
            const ddd = arr.reduce((acc, item) => {
              const key = item.ROW_ID;
              if (!acc[key]) {
                acc[key] = [];
              }
              acc[key].push(item);
              return acc;
            }, {});

            const data2 = {};
            Object.entries(ddd).forEach(([carSeq, items]) => {
              const address = [
                ...new Set(items.map((item) => item.ADDRESS.trim())),
              ];
              const via = `${address.length}착`;
              data2[carSeq] = items.map((item) => ({
                ...item,
                REQUEST_DETAIL_VIA: via,
              }));
            });

            const result = Object.entries(data2).map(([lines]) => ({
              REQUEST_NO: lines[0].REQUEST_NO,
              ROW_ID: lines[0].ROW_ID,
              UNIQUE_ID: lines[0].UNIQUE_ID,
              REQUEST_DATE: lines[0].REQUEST_DATE,
              SHIP_FROM_AREA: lines[0].SHIP_FROM_AREA,
              INCO_TERMS: lines[0].INCO_TERMS,
              REQUEST_DETAIL_VIA: lines[0].REQUEST_DETAIL_VIA,
              LINES: lines,
            }));

            if (result.length > 0) {
              if (result[0].INCO_TERMS === '') {
                aAlert('인도조건을 선택해주세요.', '알림');
                return;
              }
            }

            const dData = [...detailList, ...result];
            setDetailList(dData);
            const mainFilter = mainData.filter(
              (item) => item.ROW_ID !== e.data.ROW_ID
            );
            setMainData(mainFilter);
          }}
          onCellValueChanged={(e) => {
            // 값이 실제로 변경된 경우만 처리
            if (e.newValue !== e.oldValue) {
              const key = `${e.node.id}|${e.colDef.field}`;
              editedCellsRef.current.add(key);
              // 이 셀만 강제 리프레시 → cellClass 재평가
              e.api.refreshCells({
                rowNodes: [e.node],
                columns: [e.colDef.field],
                force: true,
              });
            }
          }}
          columnDefs={[
            {
              // headerStyle: { color: 'white', backgroundColor: '#0067A3' }, //헤더의 색상을 따로 주고싶은경우 ~
              headerName: '수주번호',
              field: 'SALES_ORDER_NO',
              cellRenderer: fnCall,
              editable: false,
              // cellEditorParams: { values: ['TESIA', 'FORD'] },
            },
            {
              headerName: '상차지',
              editable: true,
              field: 'SHIP_TO_AREA_NAME',
              // filter: 'agSetColumnFilter',
              cellEditor: 'agRichSelectCellEditor',
              cellEditorPopup: true,
              cellEditorPopupPosition: 'under',
              cellEditorParams: {
                values: areaValues, // ['K-410', '...'] 같은 코드 배열
                allowTyping: true,
                // 팝업 안의 표시 라벨
                formatValue: (code) => areaCodeToName.get(code) ?? code,
              },
              // 그리드 셀에 표시되는 라벨
              valueFormatter: (item) =>
                areaCodeToName.get(item.value) ?? item.value,
              // 코드가 바뀌면 이름 필드도 함께 갱신
              valueSetter: (item) => {
                const code = item.newValue;
                item.data.SHIP_TO_AREA = code;
                item.data.SHIP_TO_AREA_NAME = areaCodeToName.get(code) ?? '';
                return true;
              },
              // filter: 'agSetColumnFilter',
            },
            {
              headerName: '출하의뢰일',
              field: 'REQUEST_DATE',
              editable: true,
              cellEditor: 'agDateStringCellEditor',
              // min/max 필요하면 추가: cellEditorParams: { min:'2024-01-01', max:'2030-12-31' }
              valueFormatter: (p) => toYmd(p.value),
              valueParser: (p) => toYmd(p.newValue),
              filter: 'agTextColumnFilter', // 기본옵션은 select filter 로 되어있지만 사용자가 출하의뢰일은 텍스트로 원할 경우 이렇게 별도로 주면 된다
            },
            {
              headerName: '수주유형',
              field: 'ORDER_TYPE_NAME',
              editable: false,
              // cellEditorParams: { values: ['TESIA', 'FORD'] },
            },

            {
              headerName: '도착',
              // headerStyle: { color: 'white', backgroundColor: 'cadetblue' }, 헤더의 색상을 따로 주고 싶은경우
              children: [
                {
                  headerName: '매출처',
                  field: 'BILL_TO_BP_NAME',
                  editable: false,
                },
                {
                  headerName: '납품처',
                  field: 'SHIP_TO_BP_NAME',
                  editable: false,
                },
              ],
            },
          ]}
          defaultColDef={{
            floatingFilter: true,
            editable: true,
            filter: 'agSetColumnFilter', // select filter 이다.
            suppressHeaderMenuButton: true,
            suppressHeaderContextMenu: true,
            //클래스 부여 규칙: 편집완료 셀 > 편집가능 셀
            cellClass: (p) => {
              const key = `${p.node.id}|${p.colDef.field}`;
              if (editedCellsRef.current.has(key)) return 'edited-cell';
              return p.colDef.editable ? 'editable-cell' : undefined;
            },
          }}
        />
      </div>
      <button
        onClick={() => {
          // console.log(rowData);
          console.log(mainData);
          const api = agGridRef.current.api;
          const selectedRows = api.getSelectedRows(); // 체크박스로 선택된 데이터 가져오기
          const orderNos = selectedRows.map((r) => r.SALES_ORDER_NO); //수주번호만 가져오기
          console.log('selectedRows:', selectedRows);
          console.log('orderNos:', orderNos);
        }}
      >
        적용
      </button>

      <div
        className="ag-theme-material"
        style={{ height: 300, width: '100%', border: '1px solid #5f5f5f' }}
      >
        <AgGridReact
          popupParent={document.body} // 팝업이 그리드 밖으로 자연스럽게
          suppressScrollWhenPopupsAreOpen={true} // 팝업 열릴 때 스크롤 방지
          rowHeight={43} // 행 높이를 에디터보다 살짝 크게
          headerHeight={42}
          ref={detailAgGridRef}
          localeText={AG_GRID_LOCALE_KR} // 한국어 버전으로 하고싶은경우
          rowClassRules={rowClassRules} //어느 특정항목 row 에 별도 색상을 주고 싶은 경우
          rowSelection={rowSelection}
          rowData={detailList}
          suppressCellFocus={true}
          theme="legacy"
          onCellValueChanged={(e) => {
            // 값이 실제로 변경된 경우만 처리
            if (e.newValue !== e.oldValue) {
              const key = `${e.node.id}|${e.colDef.field}`;
              detailEditedCellsRef.current.add(key);
              // 이 셀만 강제 리프레시 → cellClass 재평가
              e.api.refreshCells({
                rowNodes: [e.node],
                columns: [e.colDef.field],
                force: true,
              });

              //바뀐 셀 데이터의 ID 가져오기
              changedIdsRef.current.add(e.data.id);
              // 옵션: 데이터에 플래그를 심어 표시용으로 쓰기
              // data.__dirty = true;
            }
          }}
          columnDefs={[
            {
              // headerStyle: { color: 'white', backgroundColor: '#0067A3' }, //헤더의 색상을 따로 주고싶은경우 ~
              headerName: '수주번호',
              field: 'SALES_ORDER_NO',
              cellRenderer: fnCall,
              editable: false,
              // cellEditorParams: { values: ['TESIA', 'FORD'] },
            },
            {
              headerName: '상차지',
              field: 'SHIP_TO_AREA_NAME',
              // filter: 'agSetColumnFilter',
              cellEditor: 'agRichSelectCellEditor',
              cellEditorPopup: true,
              cellEditorPopupPosition: 'under',
              cellEditorParams: {
                values: areaValues, // ['K-410', '...'] 같은 코드 배열
                allowTyping: true,
                // 팝업 안의 표시 라벨
                formatValue: (code) => areaCodeToName.get(code) ?? code,
              },
              // 그리드 셀에 표시되는 라벨
              valueFormatter: (item) =>
                areaCodeToName.get(item.value) ?? item.value,
              // 코드가 바뀌면 이름 필드도 함께 갱신
              valueSetter: (item) => {
                const code = item.newValue;
                item.data.SHIP_TO_AREA = code;
                item.data.SHIP_TO_AREA_NAME = areaCodeToName.get(code) ?? '';
                return true;
              },
              // filter: 'agSetColumnFilter',
            },
            {
              headerName: '출하의뢰일',
              field: 'REQUEST_DATE',
              cellEditorPopup: true,
              cellEditorPopupPosition: 'under',
              editable: true,
              cellEditor: 'agDateStringCellEditor',
              // min/max 필요하면 추가: cellEditorParams: { min:'2024-01-01', max:'2030-12-31' }
              valueFormatter: (p) => toYmd(p.value),
              valueParser: (p) => toYmd(p.newValue),
              filter: 'agTextColumnFilter', // 기본옵션은 select filter 로 되어있지만 사용자가 출하의뢰일은 텍스트로 원할 경우 이렇게 별도로 주면 된다
            },
            {
              headerName: '수주유형',
              field: 'ORDER_TYPE_NAME',
              editable: false,
              // cellEditorParams: { values: ['TESIA', 'FORD'] },
            },

            {
              headerName: '도착',
              // headerStyle: { color: 'white', backgroundColor: 'cadetblue' }, 헤더의 색상을 따로 주고 싶은경우
              children: [
                {
                  headerName: '매출처',
                  field: 'BILL_TO_BP_NAME',
                  editable: false,
                },
                {
                  headerName: '납품처',
                  field: 'SHIP_TO_BP_NAME',
                  editable: false,
                },
              ],
            },
          ]}
          defaultColDef={{
            floatingFilter: true,
            editable: true,
            filter: 'agSetColumnFilter', // select filter 이다.
            suppressHeaderMenuButton: true,
            suppressHeaderContextMenu: true,
            //클래스 부여 규칙: 편집완료 셀 > 편집가능 셀
            cellClass: (p) => {
              const key = `${p.node.id}|${p.colDef.field}`;
              if (detailEditedCellsRef.current.has(key)) return 'edited-cell';
              return p.colDef.editable ? 'editable-cell' : undefined;
            },
          }}
        />
      </div>
      <button
        onClick={() => {
          purchaseSelectModalAlert('품목선택');
        }}
      >
        품목선택
      </button>
      <div
        className="ag-theme-material"
        style={{ height: 300, width: '100%', border: '1px solid #5f5f5f' }}
      >
        <AgGridReact
          ref={detailAgGridRef2}
          localeText={AG_GRID_LOCALE_KR} // 한국어 버전으로 하고싶은경우
          rowClassRules={rowClassRules} //어느 특정항목 row 에 별도 색상을 주고 싶은 경우
          rowSelection={rowSelection}
          rowData={detailList2}
          suppressCellFocus={true}
          enableRangeSelection={false}
          theme="legacy"
          onCellValueChanged={(e) => {
            // 값이 실제로 변경된 경우만 처리
            if (e.newValue !== e.oldValue) {
              const key = `${e.node.id}|${e.colDef.field}`;
              detailEditedCellsRef.current.add(key);
              // 이 셀만 강제 리프레시 → cellClass 재평가
              e.api.refreshCells({
                rowNodes: [e.node],
                columns: [e.colDef.field],
                force: true,
              });
            }
          }}
          columnDefs={[
            {
              // headerStyle: { color: 'white', backgroundColor: '#0067A3' }, //헤더의 색상을 따로 주고싶은경우 ~
              headerName: '품목명',
              field: 'ITEM_NAME',
              editable: true,
              // cellEditorParams: { values: ['TESIA', 'FORD'] },
            },
            {
              // headerStyle: { color: 'white', backgroundColor: '#0067A3' }, //헤더의 색상을 따로 주고싶은경우 ~
              headerName: '품목ID',
              field: 'ITEM_ID',
              editable: false,
              // cellEditorParams: { values: ['TESIA', 'FORD'] },
            },
          ]}
          defaultColDef={{
            floatingFilter: true,
            // editable: true,
            filter: 'agSetColumnFilter', // select filter 이다.
            suppressHeaderMenuButton: true,
            suppressHeaderContextMenu: true,

            //클래스 부여 규칙: 편집완료 셀 > 편집가능 셀
            cellClass: (p) => {
              const key = `${p.node.id}|${p.colDef.field}`;
              if (detailEditedCellsRef.current.has(key)) return 'edited-cell';
              return p.colDef.editable ? 'editable-cell' : undefined;
            },
          }}
        />
      </div>
      <Loading ref={loadingRef} />
      <UseModalHook props={aitem} ref={alertRef} />
      <PurchaserOrderAddSelectModal
        ref={purchaseSelectModalRef}
        props={purchaseSelectModalModalItem}
        detailList2={detailList2}
        setDetailList2={setDetailList2}
        agGridPopRef={agGridPopRef}
      />
    </div>
  );
}

export default Dashboard;
