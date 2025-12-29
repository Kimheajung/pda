import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { DtPicker, MonthPicker } from '@components/form/UseFormControl';
import { formatter } from '@util/Moment';
import { useRef } from 'react';

/**
 * AG-Grid용 날짜(YYYY.MM.DD) 셀 에디터
 *
 * PrimeReact Calendar(`DtPicker`) 를 이용한 팝업 캘린더
 * - 입력값은 `YYYY.MM.DD` 문자열 형태로 반환
 * - `minDate` / `maxDate` 로 선택 가능한 날짜 범위를 제한
 *
 * @example
 * // AG-Grid 컬럼 정의에 에디터로 등록
 * {
 *   field: 'Date',
 *   cellEditor: DatePickerEditor,
 *   cellEditorParams: {
 *     minDate: '1900.01.01',
 *     maxDate: '2099.12.31',
 *   },
 * }
 *
 * @param {Object} props - AG-Grid가 전달하는 셀 에디터 props
 * @param {string} props.value - 현재 셀에 표시된 값 ('YYYY.MM.DD')
 * @param {string} [props.minDate] - 선택 가능한 최소 날짜 ('YYYY.MM.DD')
 * @param {string} [props.maxDate] - 선택 가능한 최대 날짜 ('YYYY.MM.DD')
 * @param {function} [props.onValueChange] - 값이 변경될 때 호출되는 콜백
 * @param {function} [props.stopEditing] - 편집을 종료하고 셀 포커스를 이동시키는 AG-Grid 내부 함수
 *
 * @param {React.ForwardedRef} ref - `useImperativeHandle` ref
 * @param {function} ref.getValue - 에디터가 최종 반환할 값을 얻는 함수 (필수)
 *
 * @returns {JSX.Element} PrimeReact Calendar 기반 날짜 선택 UI
 */
export const DatePickerEditor = forwardRef((props, ref) => {
  const minDate = props.minDate ? new Date(props.minDate) : undefined;
  const maxDate = props.maxDate ? new Date(props.maxDate) : undefined;
  const [value, setValue] = useState(new Date(props.value));

  useImperativeHandle(ref, () => ({
    getValue: () => value,
  }));

  const handleChange = (newValue) => {
    const formattedValue = formatter(newValue, 'YYYY.MM.DD');
    setValue(formattedValue);
    if (props.onValueChange) {
      props.onValueChange(formattedValue);
    }
    props.stopEditing?.();
  };

  return (
    <DtPicker
      // className="border! border-[#e02525]! rounded-sm size-full text-[#181d1f] outline-none text-[13px] "
      // inputStyle={{
      //   border: 'none',
      // }}
      value={value}
      onChange={handleChange}
      placeholder="년/월/일 선택"
      minDate={minDate}
      maxDate={maxDate}
      autoFocus={true}
      dateFormat={'yy.mm.dd'}
    />
  );
});
DatePickerEditor.displayName = 'DatePickerEditor'; // 에러에 이름 표기

/**
 * AG-Grid용 날짜(YYYY.MM) 셀 에디터
 *
 * PrimeReact Calendar(`MonthPicker`) 를 이용한 팝업 캘린더
 * - 입력값은 `YYYY.MM` 문자열 형태로 반환
 * - `minDate` / `maxDate` 로 선택 가능한 날짜 범위를 제한
 *
 * @example
 * // AG-Grid 컬럼 정의에 에디터로 등록
 * {
 *   field: 'Month',
 *   cellEditor: MonthPickerEditor,
 *   cellEditorParams: {
 *     minDate: '1900.01',
 *     maxDate: '2099.12',
 *   },
 * }
 *
 * @param {Object} props - AG-Grid가 전달하는 셀 에디터 props
 * @param {string} props.value - 현재 셀에 표시된 값 ('YYYY.MM')
 * @param {string} [props.minDate] - 선택 가능한 최소 날짜 ('YYYY.MM')
 * @param {string} [props.maxDate] - 선택 가능한 최대 날짜 ('YYYY.MM')
 * @param {function} [props.onValueChange] - 값이 변경될 때 호출되는 콜백
 * @param {function} [props.stopEditing] - 편집을 종료하고 셀 포커스를 이동시키는 AG-Grid 내부 함수
 *
 * @param {React.ForwardedRef} ref - `useImperativeHandle` ref
 * @param {function} ref.getValue - 에디터가 최종 반환할 값을 얻는 함수 (필수)
 *
 * @returns {JSX.Element} PrimeReact Calendar 기반 날짜 선택 UI
 */
export const MonthPickerEditor = forwardRef((props, ref) => {
  const minDate = props.minDate ? new Date(props.minDate) : undefined;
  const maxDate = props.maxDate ? new Date(props.maxDate) : undefined;
  const [value, setValue] = useState(new Date(props.value));

  useImperativeHandle(ref, () => ({
    getValue: () => value,
  }));

  const handleChange = (newValue) => {
    const formattedValue = formatter(newValue, 'YYYY.MM');
    setValue(formattedValue);
    if (props.onValueChange) {
      // props.node.setDataValue(props.column.colId, formattedValue);
      props.onValueChange(formattedValue);
    }
    props.stopEditing?.();
  };

  return (
    <MonthPicker
      // className="border! border-[#e02525]! rounded-sm size-full text-[#181d1f] outline-none text-[13px] "
      // inputStyle={{
      //   border: 'none',
      // }}
      value={value}
      onChange={handleChange}
      placeholder="월 선택"
      minDate={minDate}
      maxDate={maxDate}
      autoFocus={true}
      dateFormat={'yy.mm'}
    />
  );
});
MonthPickerEditor.displayName = 'MonthPickerEditor';

/**
 * AG-Grid용 날짜(YYYY.MM) 셀 에디터
 *
 * HTML input type="mobth"를 이용한 캘린더
 * - 입력값은 `YYYY.MM` 문자열 형태로 반환
 * - `minDate` / `maxDate` 로 선택 가능한 날짜 범위를 제한
 *
 * @example
 * // AG-Grid 컬럼 정의에 에디터로 등록
 * {
 *   field: 'Month',
 *   cellEditor: MonthPickerEditor2,
 *   cellEditorParams: {
 *     minDate: '1900.01',
 *     maxDate: '2099.12',
 *   },
 * }
 *
 * @param {Object} props - AG-Grid가 전달하는 셀 에디터 props
 * @param {string} props.value - 현재 셀에 표시된 값 ('YYYY.MM')
 * @param {string} [props.minDate] - 선택 가능한 최소 날짜 ('YYYY.MM')
 * @param {string} [props.maxDate] - 선택 가능한 최대 날짜 ('YYYY.MM')
 * @param {function} [props.onValueChange] - 값이 변경될 때 호출되는 콜백
 * @param {function} [props.stopEditing] - 편집을 종료하고 셀 포커스를 이동시키는 AG-Grid 내부 함수
 *
 * @param {React.ForwardedRef} ref - `useImperativeHandle` ref
 * @param {function} ref.getValue - 에디터가 최종 반환할 값을 얻는 함수 (필수)
 *
 * @returns {JSX.Element} input type="month" 날짜 선택 UI
 */
export const MonthPickerEditor2 = forwardRef((props, ref) => {
  const minDate = props.minDate ? new Date(props.minDate) : undefined;
  const maxDate = props.maxDate ? new Date(props.maxDate) : undefined;
  const [value, setValue] = useState(props.value);
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getValue: () => {
      // 년도 4자리 검증
      const [year] = value.split('.');
      if (year && year.length === 4) {
        return value;
      }
      return props.value; // 잘못된 입력이면 원래 값
    },

    afterGuiAttached: () => {
      // aggrid가 준비되었을떄 호출
      inputRef.current?.focus();
      inputRef.current?.select();
    },
  }));

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  const handleChange = (e) => {
    // const formattedValue = e.target.value;
    // setValue(formattedValue);
    // props.onValueChange(formattedValue);
    // props.stopEditing?.();
    const newValue = e.target.value;

    // 년도 4자리 체크
    const [year, month] = newValue.split('.');
    console.log('year', year);
    console.log('month', month);

    if (year && year.length === 4 && month) {
      setValue(newValue);
      props.onValueChange(newValue);
    } else if (year && year.length <= 4) {
      setValue(newValue); // 입력 중에는 허용
      props.onValueChange(newValue);
    }
  };

  const handleKeyDown = (e) => {
    // Enter: 저장
    if (e.key === 'Enter') {
      props.stopEditing?.();
    }

    if (e.key === 'Escape') {
      props.stopEditing?.(true);
    }
  };

  const handleBlur = () => {
    // 포커스 아웃 시 에디팅 종료
    props.stopEditing?.();
  };

  return (
    <input
      // className="border! border-[#e02525]! ounded-sm size-full bg-white pl-[8px] text-[#181d1f]  outline-none text-[13px] "
      // style={{
      //   fontFamily: 'inherit',
      // }}
      ref={inputRef}
      type="month"
      placeholder="년-월 선택"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      min={minDate}
      max={maxDate}
    />
  );
});
DatePickerEditor.displayName = 'DatePickerEditor2'; // 에러에 이름 표기

/**
 * 셀에 이미지로 랜더링(첨부파일 등) 추후 handleClick 구현 필요
 */
export const ImageRenderer = (props) => {
  const { onClick, url, image, value } = props;

  if (value === true) {
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
ImageRenderer.displayName = 'ImageRenderer';
