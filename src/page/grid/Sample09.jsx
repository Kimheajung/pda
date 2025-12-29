import { useRef, useState } from 'react';
import CustomAgGrid from '@components/aggrid/CustomAgGrid';
import MOCK_DATA4 from '@components/aggrid/MOCK_DATA4.json';
import { BorderBottom } from 'react-bootstrap-icons';

const Sample09 = () => {
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
            <h2>납품서 조회</h2>
            <div className="flex items-center">
                아이콘
            </div>
        </div>

        <div className="grid_wrap flex-wrap flex-1">
             <div className=" w-full bg-blue-100">
            그리드ㅡㄴ 여기에..이지롱
            그리드ㅡㄴ 여기에..이지롱
            그리드ㅡㄴ 여기에..이지롱
            그리드ㅡㄴ 여기에..이지롱
            그리드ㅡㄴ 여기에..이지롱
            </div>

            <div className="flex w-full bg-red-100 overflow-auto">
                그리드ㅡㄴ 여기에..이지롱
                그리드ㅡㄴ 여기에..이지롱
                그리드ㅡㄴ 여기에..이지롱
                그리드ㅡㄴ 여기에..이지롱
                그리드ㅡㄴ 여기에..이지롱
            </div>
        </div>
        



      
    </div> 
  );
};

export default Sample09;
