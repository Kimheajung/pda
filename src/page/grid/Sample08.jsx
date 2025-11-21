import { useRef, useState } from 'react';
import CustomAgGrid from '@components/aggrid/CustomAgGrid';
import MOCK_DATA4 from '@components/aggrid/MOCK_DATA4.json';
import { BorderBottom } from 'react-bootstrap-icons';

const Sample08 = () => {
  const gridRef = useRef(null);
  const [rowData] = useState(MOCK_DATA4);

  const [colDefs] = useState([
    {
      field: 'text4',
      headerName: 'text4',
      type: ['textField_center'],
      spanRows: true,
      rowGroup: true, // 그룹화 활성화
      hide: false, // true로 하면 컬럼 숨김
      showRowGroup: true, // 그룹 컬럼에 표시
    },
    {
      field: 'text5',
      headerName: 'text5',
      type: ['textField_center'],
    },

    {
      headerName: '그룹1',
      children: [
        {
          field: 'number1',
          headerName: 'number1',
          type: ['numberField_right', 'numberFormat'],
          aggFunc: 'sum',
        },
        {
          field: 'number2',
          headerName: 'number2',
          type: ['numberField_right', 'numberFormat'],
          aggFunc: 'sum',
        },
      ],
    },

    {
      headerName: '그룹2',
      children: [
        {
          field: 'number3',
          headerName: 'number3',
          type: ['numberField_right', 'numberFormat'],
          aggFunc: 'sum',
        },
        {
          field: 'number4',
          headerName: 'number4',
          type: ['numberField_right', 'numberFormat'],
          aggFunc: 'sum',
        },
      ],
    },
  ]);
  console.log('Enterprise?', !!window.agGrid?.LicenseManager?.isEnterprise?.());
  return (
   <div className="card">  

        <div className="flex flex-wrap align-items-center justify-between md:flex-row md:justify-content-between gap-2">
             <h3>02.레이아웃 샘플예제02</h3>   
            <div className="flex items-center">
                아이콘
            </div>
        </div>

        <div className="grid_wrap flex-1 flex flex-col md:flex-row gap-4 h-[79vh]">
             <div className="w-full h-full md:w-1/2 bg-red-100  h-[79vh]">
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
                addGridOptions={{
                  groupDisplayType: 'groupRows', // 'singleColumn', 'multipleColumns', 'groupRows', 'custom'
                  groupTotalRow: 'bottom',
                  groupHideOpenParents: true, // 그룹 헤더 숨김
                  groupDefaultExpanded: -1, // -1: 모두 펼침, 0: 모두 접힘, 1: 1단계만 펼침
                  suppressExpandableCellRenderer: true, // 펼침/접힘 아이콘 제거 (클릭 불가)
                  // 그룹 행 스타일
                  getRowStyle: (params) => {
                    // 그룹 행 (헤더)
                    if (params.node.group && !params.node.footer) {
                      return {
                        fontWeight: 'bold',
                        backgroundColor: '#e3f2fd',
                        // borderTop: '2px solid #1976d2',
                      };
                    }
                    // 소계 행 (footer)
                    if (params.node.footer) {
                      return {
                        fontWeight: 'bold',
                        backgroundColor: '#ffdd9e21',
                        // borderBottom: '1px solid #9e9e9e',
                      };
                    }
                  },

                  // 그룹 행 렌더러
                  // groupRowRendererParams: {
                  //   suppressCount: true,
                  //   innerRenderer: (params) => {
                  //     console.log('params', params);
                  //     // 소계 행일 때
                  //     if (params.node.footer) {
                  //       return '소계'; // 그냥 "소계"만 표시
                  //     }
                  //     // 그룹 헤더 행일 때
                  //     return params.value;
                  //   },
                  // },

                  groupRowRendererParams: {
                    suppressCount: true,
                    innerRenderer: (params) => {
                      console.log('innerRenderer called!', params); // 이 로그 확인!

                      if (params.node.footer) {
                        return '<b>소계</b>';
                      }
                      return params.value || '그룹';
                    },
                  },
                }}
                // 필요 시 옵션 추가
              />
            </div>

            <div className="w-full h-full md:w-1/2 bg-blue-100">
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
              addGridOptions={{
                groupDisplayType: 'groupRows', // 'singleColumn', 'multipleColumns', 'groupRows', 'custom'
                groupTotalRow: 'bottom',
                groupHideOpenParents: true, // 그룹 헤더 숨김
                groupDefaultExpanded: -1, // -1: 모두 펼침, 0: 모두 접힘, 1: 1단계만 펼침
                suppressExpandableCellRenderer: true, // 펼침/접힘 아이콘 제거 (클릭 불가)
                // 그룹 행 스타일
                getRowStyle: (params) => {
                  // 그룹 행 (헤더)
                  if (params.node.group && !params.node.footer) {
                    return {
                      fontWeight: 'bold',
                      backgroundColor: '#e3f2fd',
                      // borderTop: '2px solid #1976d2',
                    };
                  }
                  // 소계 행 (footer)
                  if (params.node.footer) {
                    return {
                      fontWeight: 'bold',
                      backgroundColor: '#ffdd9e21',
                      // borderBottom: '1px solid #9e9e9e',
                    };
                  }
                },

                // 그룹 행 렌더러
                // groupRowRendererParams: {
                //   suppressCount: true,
                //   innerRenderer: (params) => {
                //     console.log('params', params);
                //     // 소계 행일 때
                //     if (params.node.footer) {
                //       return '소계'; // 그냥 "소계"만 표시
                //     }
                //     // 그룹 헤더 행일 때
                //     return params.value;
                //   },
                // },

                groupRowRendererParams: {
                  suppressCount: true,
                  innerRenderer: (params) => {
                    console.log('innerRenderer called!', params); // 이 로그 확인!

                    if (params.node.footer) {
                      return '<b>소계</b>';
                    }
                    return params.value || '그룹';
                  },
                },
              }}
              // 필요 시 옵션 추가
            />
            </div>
        </div>
        
      
    </div> 
  );
};

export default Sample08;
