/* eslint-disable */
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import UseModalHook from '../../components/modal/UseModalHook';
import * as commonFunction from '../../util/CommonFunction'
import { Get } from '../../api/CommonCall';
import Loading from '../../util/Loading';
import { useSelector } from 'react-redux';
import { Input, Select, Space } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import styled from 'styled-components';
import { AG_GRID_LOCALE_KR } from '@ag-grid-community/locale';
const StyledModal = styled(Modal)`
  .modal-xl.modal-dialog-centered {
    max-width: 90%;
    width: 100%;
    min-width: 1890px;
    height: 90vh;
  }
`;

const PurchaserOrderAddSelectModal = forwardRef(
  ({ props, callBack, detailList2, setDetailList2, agGridPopRef }, ref) => {
    const [mainData, setMainData] = useState([]);
    const mainRef = useRef();
    const loadingRef = useRef();
    const dateLabel = { 'aria-label': 'Date' };
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [visible, setVisible] = useState(false);
    const [itemName, setItemName] = useState(''); // 품목입력
    const [itemCondition, setItemCondition] = useState([]); //수지 선택시 값 세팅
    const toastRef = useRef();
    const [fixedRowKeys, setFixedRowKeys] = useState([]);
    const handleInfo = () => {};
    const editedCellsRef = useRef(new Set()); // 편집할때 색상 컨트롤 ref
    //품목 입력
    const handleChangeItem = (value) => {
      setItemName(value);
      if (value.length > 0) {
        setItemCondition([value]);
        // setItemCondition(['ITEM_NAME', '=', `${value}`]);
      } else {
        setItemCondition([]);
      }
    };

    useImperativeHandle(ref, () => ({
      getVisible() {
        setVisible(true);
      },
    }));

    useEffect(() => {
      if (visible) {
        fnMainData(); // 팝업이 열릴 때 데이터를 호출
      }
    }, [visible]);

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

    const reset = () => {
      setItemName('');
      setItemCondition([]);
    };

    const normalizeSelection = (model) => {
      if (Array.isArray(model)) return model;
      if (model instanceof Set) return Array.from(model);
      if (model == null) return [];
      return [model];
    };

    useEffect(() => {
      if (!visible) return;
      if (!agGridPopRef.current?.api) return;
      if (!Array.isArray(mainData) || mainData.length === 0) return;

      const api = agGridPopRef.current.api;
      const selectedKeys = new Set(
        (detailList2 || []).map((x) => String(x.ITEM_ID))
      );

      api.forEachNode((node) => {
        const k = String(node.data?.ITEM_ID);
        node.setSelected(selectedKeys.has(k));
      });
    }, [visible, mainData, detailList2]);

    const fnMainData = async () => {
      let params = new URLSearchParams();
      params.append('BP_ID', '');
      if (itemName !== '') {
        params.append('ITEM_CODE', itemName);
      }
      const result = await Get(
        `/cygnusin/v1/api/sm/ITEM_LIST`,
        { params },
        loadingRef
      );
      if (commonFunction.resultCheck(result, loadingRef, aAlert)) {
        let data = result.data.body.data;
        setMainData(data);
        if (data.length === 0) {
          aAlert('데이터가 존재하지 않습니다.', '알림');
        }
      }
    };

    const confirm = () => {
      const api = agGridPopRef.current.api;
      const selectedRows = api.getSelectedRows(); // 체크박스로 선택된 데이터 가져오기
      if (!selectedRows?.length) {
        toastRef.current?.showToast?.('선택된 항목이 없습니다', 'warning');
        return;
      }

      setDetailList2((prevDetailList) => {
        const updatedDetailList = [...prevDetailList];
        const finalData = [];
        selectedRows.forEach((newItemCode) => {
          const newItem = mainData.find(
            (item) => item.ITEM_ID === newItemCode.ITEM_ID
          );
          const existsInPrevList = prevDetailList.some(
            (item) => item.ITEM_ID === newItemCode.ITEM_ID
          );
          if (newItem && !existsInPrevList) {
            console.log('newItem111', newItem);
            newItem.QTY = 0;
            newItem.STORAGE_NAME = '';
            newItem.STORAGE_ID = '';
            newItem.label = '';
            newItem.value = '';
            newItem.UNIT_PRICE = Number(newItem.PURCHASE_UNIT_PRICE);
            console.log('newItem222', newItem);
            updatedDetailList.push(newItem);
            // newItem.ORDER_REQUEST_QTY = 0;
          }
        });

        let uniqueArr = [
          ...new Map(
            updatedDetailList.map((item) => [item.ITEM_ID, item])
          ).values(),
        ];

        selectedRows.forEach((item) => {
          let dodo = uniqueArr.find((data) => data.ITEM_ID === item.ITEM_ID);
          finalData.push(dodo);
        });
        console.log(`${selectedRows.length} 건 선택`);
        return finalData;
      });
      reset();
      setVisible(false);
      // setDetailList2((prevDetailList) => {
      //   const updatedDetailList = [...prevDetailList];
      //   const finalData = [];
      //   selectedRowsDataPopup.forEach((newItemCode) => {
      //     const newItem = mainData.find(
      //       (item) => item.ITEM_ID === newItemCode.ITEM_ID
      //     );
      //     const existsInPrevList = prevDetailList.some(
      //       (item) => item.ITEM_ID === newItemCode.ITEM_ID
      //     );
      //     if (newItem && !existsInPrevList) {
      //       console.log('newItem111', newItem);
      //       newItem.QTY = 0;
      //       newItem.STORAGE_NAME = '';
      //       newItem.STORAGE_ID = '';
      //       newItem.label = '';
      //       newItem.value = '';
      //       newItem.UNIT_PRICE = Number(newItem.PURCHASE_UNIT_PRICE);
      //       console.log('newItem222', newItem);
      //       updatedDetailList.push(newItem);
      //       // newItem.ORDER_REQUEST_QTY = 0;
      //     }
      //   });

      //   let uniqueArr = [
      //     ...new Map(
      //       updatedDetailList.map((item) => [item.ITEM_ID, item])
      //     ).values(),
      //   ];

      //   selectedRowsDataPopup.forEach((item) => {
      //     let dodo = uniqueArr.find((data) => data.ITEM_ID === item.ITEM_ID);
      //     finalData.push(dodo);
      //   });
      //   toastRef.current.showToast(
      //     selectedRowsDataPopup.length === 0
      //       ? `선택된 항목이 없습니다`
      //       : `${selectedRowsDataPopup.length} 건이 선택 되었습니다.`,
      //     'warning'
      //   );
      //   return finalData;
      // });

      // reset();
      // setVisible(false);
    };

    // const confirm = () => {
    //   const api = agGridPopRef.current.api;
    //   const selectedRows = api.getSelectedRows(); // ✅ 체크한 품목들
    //   if (!selectedRows?.length) {
    //     toastRef.current?.showToast?.('선택된 항목이 없습니다', 'warning');
    //     return;
    //   }

    //   // ✅ detailList에 병합 (ITEM_ID 기준 중복 제거) + 기본값 세팅
    //   setDetailList2((prev) => {
    //     const merged = [...prev];
    //     const seen = new Set(prev.map((x) => String(x.ITEM_ID)));

    //     selectedRows.forEach((r) => {
    //       const key = String(r.ITEM_ID);
    //       if (!seen.has(key)) {
    //         merged.push({
    //           ...r,
    //           QTY: 0,
    //           STORAGE_NAME: '',
    //           STORAGE_ID: '',
    //           UNIT_PRICE: Number(r.PURCHASE_UNIT_PRICE ?? r.UNIT_PRICE ?? 0),
    //         });
    //         seen.add(key);
    //       }
    //     });

    //     // 토스트(선택 건수 안내)
    //     toastRef.current?.showToast?.(
    //       `${selectedRows.length} 건이 선택 되었습니다.`,
    //       'warning'
    //     );
    //     return merged;
    //   });

    //   // 선택 초기화 & 닫기
    //   api.deselectAll();
    //   reset();
    //   setVisible(false);
    // };

    //닫기 버튼
    const cencle = () => {
      reset();
      setVisible(false);
    };

    const rowSelection = useMemo(() => {
      return {
        mode: 'multiRow',
        enableClickSelection: true, // 체크박스뿐만이 아니라 셀을 클릭했을때도 체크되게끔
        enableSelectionWithoutKeys: true, // 셀을 클릭했을때 멀티로 체크 하고 싶은 경우
      };
    }, []);

    return (
      <div>
        {visible && (
          <Modal
            show={visible}
            onHide={handleClose}
            animation={false}
            centered={true}
            fullscreen={true}
            size="xl"
          >
            <Modal.Body
              style={{
                marginTop: '10px',
              }}
            >
              <div className="mypage-main-title">
                <section className="mypge-main-title-section">
                  <div className="mypage-main-title-section-div">
                    <div
                      className="mypage-main-title-section-div-div"
                      style={{ marginLeft: '10px' }}
                    >
                      {props.title}
                    </div>
                  </div>
                </section>
              </div>

              <div
                className="card-body"
                style={{
                  background: '#fff',
                  height: '75vh',
                  overflow: 'auto',
                }}
              >
                <div className="mypage-grid-banner">
                  {/* <div className="mypage-select-banner-title">
                    <span>품목</span>
                  </div> */}
                  <div>
                    <p>품목</p>
                    <Input
                      style={{ height: '35px', width: '180px' }}
                      value={itemName || ''}
                      inputMode="text"
                      allowClear={true}
                      onChange={(e) => {
                        handleChangeItem(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          fnMainData();
                        }
                      }}
                    />
                  </div>
                  <div>
                    <p></p>
                    <button
                      className="mypage-button"
                      onClick={() => {
                        fnMainData();
                      }}
                    >
                      검색
                    </button>
                    {/* <button
                      className="mypage-button"
                      style={{ fontSize: '13px' }}
                      onClick={() => {
                        setItemName('');
                        setItemCondition([]);
                      }}
                    >
                      초기화
                    </button> */}
                  </div>
                </div>

                <div className="mypage-select-main">
                  <div
                    className="ag-theme-material"
                    style={{
                      height: 500,
                      width: '100%',
                      border: '1px solid #5f5f5f',
                    }}
                  >
                    <AgGridReact
                      ref={agGridPopRef}
                      localeText={AG_GRID_LOCALE_KR} // 한국어 버전으로 하고싶은경우
                      rowSelection={rowSelection}
                      rowData={mainData}
                      suppressCellFocus={true}
                      theme="legacy"
                      getRowId={(p) => String(p.data.ITEM_ID)}
                      // onCellValueChanged={(e) => {
                      //   // 값이 실제로 변경된 경우만 처리
                      //   if (e.newValue !== e.oldValue) {
                      //     const key = `${e.node.id}|${e.colDef.field}`;
                      //     editedCellsRef.current.add(key);
                      //     // 이 셀만 강제 리프레시 → cellClass 재평가
                      //     e.api.refreshCells({
                      //       rowNodes: [e.node],
                      //       columns: [e.colDef.field],
                      //       force: true,
                      //     });
                      //   }
                      // }}
                      columnDefs={[
                        {
                          // headerStyle: { color: 'white', backgroundColor: '#0067A3' }, //헤더의 색상을 따로 주고싶은경우 ~
                          headerName: '품목명',
                          field: 'ITEM_NAME',
                          editable: false,
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
                        filter: true,
                        floatingFilter: true,
                        editable: true,
                        filter: 'agSetColumnFilter', // select filter 이다.
                        suppressHeaderMenuButton: true,
                        suppressHeaderContextMenu: true,

                        //클래스 부여 규칙: 편집완료 셀 > 편집가능 셀
                        cellClass: (p) => {
                          const key = `${p.node.id}|${p.colDef.field}`;
                          if (editedCellsRef.current.has(key))
                            return 'edited-cell';
                          return p.colDef.editable
                            ? 'editable-cell'
                            : undefined;
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="modal-footer">
              <button className="login-footer-ok" onClick={confirm}>
                선택
              </button>
              <button className="login-footer-cancel" onClick={cencle}>
                닫기
              </button>
            </Modal.Footer>
          </Modal>
        )}
        <Loading ref={loadingRef} />
        <UseModalHook props={aitem} ref={alertRef} />
      </div>
    );
  }
);

export default PurchaserOrderAddSelectModal;
