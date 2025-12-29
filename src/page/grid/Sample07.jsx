import { useRef, useState } from 'react';
import CustomAgGrid from '@components/aggrid/CustomAgGrid';
import MOCK_DATA4 from '@components/aggrid/MOCK_DATA4.json';

const Sample07 = () => {
  const gridRef = useRef(null);
  const [rowData] = useState(MOCK_DATA4);

  const [colDefs] = useState([
    {
      field: 'text1',
      headerName: 'text',
      type: ['textField_center'],
    },
    {
      field: 'text2',
      headerName: 'textarea',
      type: ['textField_left'],
    },
    {
      headerName: '그룹 1',
      children: [
        {
          field: 'number1',
          headerName: 'number1',
          type: ['numberField_right', 'numberFormat'],
        },
        {
          field: 'number2',
          headerName: 'number2',
          type: ['numberField_right', 'numberFormat'],
        },
        {
          field: 'number3',
          headerName: 'number3',
          type: ['numberField_right', 'numberFormat'],
        },
        {
          field: 'number4',
          headerName: 'number4',
          type: ['numberField_right', 'numberFormat'],
        },
      ],
    },

    {
      headerName: '그룹 2',
      children: [
        {
          field: 'number5',
          headerName: 'number5',
          type: ['numberField_right', 'numberFormat'],
        },
        {
          field: 'number6',
          headerName: 'number6',
          type: ['numberField_right'],
          /* 
          하단 고정 행에서 label: { field: 'number6', value: '미수금액' } 설정이 
          value는 string인데 number6 컬럼의 데이터 타입이 number이므로 sting을 표기할 수 없음 
          */
          valueFormatter: (params) => {
            const value = params.value;
            // 문자열이면 그대로, 숫자면 포맷팅
            if (typeof value === 'string') return value;
            return value != null
              ? new Intl.NumberFormat('ko-KR').format(value)
              : '';
          },
        },
        {
          field: 'number7',
          headerName: 'number7',
          type: ['numberField_right', 'numberFormat'],
        },
        {
          field: 'number8',
          headerName: 'number8',
          type: ['numberField_right', 'numberFormat'],
        },
      ],
    },
  ]);

  return (
    <div className="grid">
      <div className="col-12 xl:col-12">
        <div className="card mb-0">
          <span>3. 멀티header + 금액 유형 (참고유형2)</span>
          <div className="h-[79vh]">
            <CustomAgGrid
              gridId="grid1" // 필수 입력
              rowId="ROW_ID" // 필수 입력
              ref={gridRef} // 필수 입력
              rowData={rowData} // 필수 입력
              colDefs={colDefs} // 필수 입력
              // sumFields={['number1', 'number2', 'number3', 'number4']}
              pinnedBottomConfig={[
                {
                  label: [
                    { field: 'text1', value: '합계' },
                    { field: 'number6', value: '수금액' },
                  ],
                  sumFields: [
                    'number1',
                    'number2',
                    'number3',
                    'number4',
                    // 'number6',
                    'number7',
                    'number8',
                  ],
                },
                // {
                //   label: { field: 'number6', value: '미수금액' },
                //   sumFields: ['number6', 'number7', 'number8'],
                // },
                {
                  label: { field: 'number6', value: '미수금액' },
                  calculatedFields: [
                    {
                      field: 'number7',
                      formula: (rows) => {
                        // 첫 번째 행(rows[0])의 number4 - number8
                        const num4 = rows[0]?.number4 || 0;
                        const num8 = rows[0]?.number8 || 0;
                        return num4 - num8;
                      },
                    },
                  ],
                },
              ]}
              overrideRowClicked={() => {
                return null;
              }}
              onGridReady={(params) => params.api.autoSizeAllColumns()}
              // 필요 시 옵션 추가
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sample07;
