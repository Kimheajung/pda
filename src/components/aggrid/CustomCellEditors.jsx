import { forwardRef, useImperativeHandle, useState } from 'react';
import { DtPicker, MonthPicker } from '@components/form/UseFormControl';
import { formatter } from '@util/Moment';

export const DatePickerEditor = forwardRef((props, ref) => {
  const minDate = props.minDate ? new Date(props.minDate) : undefined;
  const maxDate = props.maxDate ? new Date(props.maxDate) : undefined;
  const [value, setValue] = useState(props.value || '');
  useImperativeHandle(ref, () => ({
    getValue: () => value,
  }));

  const handleChange = (newValue) => {
    const formattedValue = formatter(newValue, 'YYYY-MM-DD');
    setValue(formattedValue);
    setTimeout(() => {
      if (props.api && props.node) {
        props.node.setDataValue(props.column.colId, formattedValue);
      }
      props.stopEditing?.();
    }, 0);
  };

  return (
    <div className="size-full">
      <DtPicker
        className="size-full border-none"
        value={value}
        onChange={handleChange}
        placeholder="년/월/일 선택"
        minDate={minDate}
        maxDate={maxDate}
      />
    </div>
  );
});

export const MonthPickerEditor = forwardRef((props, ref) => {
  const minDate = props.minDate ? new Date(props.minDate) : undefined;
  const maxDate = props.maxDate ? new Date(props.maxDate) : undefined;
  const [value, setValue] = useState(props.value || '');
  useImperativeHandle(ref, () => ({
    getValue: () => value,
  }));

  const handleChange = (newValue) => {
    const formattedValue = formatter(newValue, 'YYYY-MM');
    setValue(formattedValue);
    setTimeout(() => {
      if (props.api && props.node) {
        props.node.setDataValue(props.column.colId, formattedValue);
      }
      props.stopEditing?.();
    }, 0);
  };

  return (
    <div className="size-full">
      <MonthPicker
        value={value}
        className="size-full border-none"
        onChange={handleChange}
        placeholder="월 선택"
        minDate={minDate}
        maxDate={maxDate}
      />
    </div>
  );
});

// 셀에 이미지로 랜더링(첨부파일 등) 추후 handleClick 구현 필요
export const ImageRenderer = (props) => {
  const { onClick, url, image } = props; 
  
  if (props.value === true) {
    const handleClick = () => {
      if (onClick) {
        onClick(props.data, url); // 행 데이터와 url 전달
      }
    };

    return (
      <div
        className="flex items-center justify-center h-full cursor-pointer"
        onClick={handleClick}
      >
        <img src={image} className="w-5 h-5" alt="" />
      </div>
    );
  }
  return null;
};
