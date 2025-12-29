import { Calendar } from 'primereact/calendar';
import { forwardRef, useCallback, useEffect, useMemo } from 'react';
import { addLocale } from 'primereact/api';
import { Editor } from 'primereact/editor';
import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { AutoComplete } from 'primereact/autocomplete';

// 동일 윈도우 인스턴스 강제
addLocale('ko', {
  firstDayOfWeek: 0,
  dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
});

const onChangePicker = (value) => (e) => value?.(e.value, e);
const onChangePassword = (e) =>
  e?.value !== undefined ? e.value : e?.target?.value;
const onChangeInputText = (e) =>
  e?.value !== undefined ? e.value : e?.target?.value;
const onChangeInputNumber = (e) =>
  e?.value !== undefined ? e.value : e?.target?.value;
const onChangeTextArea = (e) =>
  e?.value !== undefined ? e.value : e?.target?.value;

//전체 날짜
export const DtPicker = forwardRef(function DtPicker(
  { value, onChange, dateFormat = 'yy-mm-dd', showIcon = true, ...rest },
  ref
) {
  return (
    <Calendar
      locale="ko"
      ref={ref}
      value={value}
      onChange={onChangePicker(onChange)}
      readOnlyInput
      {...rest}
      // showIcon={showIcon}
      dateFormat={dateFormat}
    />
  );
});

//날짜(월까지만)
export const MonthPicker = forwardRef(function MonthPicker(
  { value, onChange, dateFormat = 'yy-mm', showIcon = true, ...rest },
  ref
) {
  return (
    <Calendar
      locale="ko"
      ref={ref}
      value={value}
      onChange={onChangePicker(onChange)}
      view="month"
      dateFormat={dateFormat}
      //   showIcon={showIcon}
      readOnlyInput
      {...rest}
    />
  );
});

//날짜(년)
export const YearPicker = forwardRef(function YearPicker(
  { value, onChange, dateFormat = 'yy', showIcon = true, ...rest },
  ref
) {
  return (
    <Calendar
      locale="ko"
      ref={ref}
      value={value}
      onChange={onChangePicker(onChange)}
      view="year"
      dateFormat={dateFormat}
      //   showIcon={showIcon}
      readOnlyInput
      {...rest}
    />
  );
});

//에디터
export const FormEditor = forwardRef(function FormEditor(
  { value, onChange, ...rest },
  ref
) {
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          [
            { align: '' },
            { align: 'center' },
            { align: 'right' },
            { align: 'justify' },
          ],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          ['code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }, 'link'],
          ['clean'],
        ],
      },
    }),
    []
  );

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'code-block',
    'color',
    'background',
    'align',
    'list',
    'indent',
    'link',
    'image',
  ];

  const header = (
    <div className="ql-toolbar-custom flex flex-wrap gap-2">
      <span className="ql-formats">
        <button className="ql-bold" aria-label="Bold" />
        <button className="ql-italic" aria-label="Italic" />
        <button className="ql-underline" aria-label="Underline" />
        <button className="ql-strike" aria-label="Strike" />
        <button className="ql-code" aria-label="Inline code" />
        <button className="ql-clean" aria-label="Clear formats" />
      </span>

      <span className="ql-formats">
        <select className="ql-header" defaultValue="">
          <option value="1" />
          <option value="2" />
          <option value="3" />
          <option value="4" />
          <option value="5" />
          <option value="6" />
          <option value="" />
        </select>
        <select className="ql-font" />
        <select className="ql-size">
          <option value="small" />
          <option value="normal" />
          <option value="large" />
          <option value="huge" />
        </select>
      </span>

      <span className="ql-formats">
        <select className="ql-align" />
      </span>

      <span className="ql-formats">
        <button className="ql-list" value="ordered" aria-label="Ordered list" />
        <button className="ql-list" value="bullet" aria-label="Bullet list" />
        <button className="ql-indent" value="-1" aria-label="Outdent" />
        <button className="ql-indent" value="+1" aria-label="Indent" />
      </span>

      <span className="ql-formats">
        <button className="ql-blockquote" aria-label="Blockquote" />
        <button className="ql-code-block" aria-label="Code block" />
      </span>

      <span className="ql-formats">
        <select className="ql-color" />
        <select className="ql-background" />
      </span>

      <span className="ql-formats">
        <button className="ql-link" aria-label="Link" />
      </span>
    </div>
  );

  const handleTextChange = useCallback(
    (e) => onChange?.(e.htmlValue, e),
    [onChange]
  );

  return (
    <Editor
      headerTemplate={header}
      ref={ref}
      value={value}
      onTextChange={handleTextChange}
      {...rest}
    />
  );
});

//드롭다운
export const FormDropdown = forwardRef(function FormDropdown(
  { options = [], value, onChange, placeholder = '선택', ...rest },
  ref
) {
  const handleChange = useCallback((e) => onChange?.(e.value, e), [onChange]);
  return (
    <Dropdown
      ref={ref}
      value={value}
      onChange={handleChange}
      options={options}
      optionLabel="label"
      optionValue="value"
      placeholder={placeholder}
      filter
      filterBy="label"
      showClear
      className="w-64"
      {...rest}
    />
  );
});

//비밀번호
export const FormPassword = forwardRef(function FormPassword(
  { value, onChange, placeholder = '선택' },
  ref
) {
  const handleChange = useCallback(
    (e) => onChange?.(onChangePassword(e), e),
    [onChange]
  );
  return (
    <Password
      value={value}
      // onChange={handleChange}
      onChange={handleChange}
      placeholder={placeholder}
      toggleMask
      feedback={false}
    />
  );
});

//Input Text
export const FormInputText = forwardRef(function FormInputText(
  { value, onChange, placeholder = '선택', className },
  ref
) {
  const handleChange = useCallback(
    (e) => onChange?.(onChangeInputText(e), e),
    [onChange]
  );
  return (
    <InputText
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={className}
    />
  );
});

//Input Number
export const FormInputNumber = forwardRef(function FormInputNumber(
  { value, onChange, placeholder = '선택', className },
  ref
) {
  const handleChange = useCallback(
    (e) => onChange?.(onChangeInputNumber(e), e),
    [onChange]
  );
  return (
    <InputNumber
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
});

//Input TextArea
export const FormTextArea = forwardRef(function FormTextArea(
  { value, onChange, placeholder = '선택' },
  ref
) {
  const handleChange = useCallback(
    (e) => onChange?.(onChangeTextArea(e), e),
    [onChange]
  );
  return (
    <InputTextarea
      // autoResize
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
});

//자동완성 input 및 드롭다운
export const FormAutoComplete = forwardRef(function FormAutoComplete(
  { value, onChange, placeholder = '선택', suggestions = [], completeMethod },
  ref
) {
  const handleChange = useCallback(
    (e) => onChange?.(onChangeTextArea(e), e),
    [onChange]
  );
  return (
    <AutoComplete
      placeholder={placeholder}
      value={value}
      suggestions={suggestions}
      completeMethod={completeMethod}
      onChange={handleChange}
      dropdown
    />
  );
});

//자동완성 Multi
export const FormAutoCompleteMulti = forwardRef(function FormAutoCompleteMulti(
  {
    className = '',
    value = [],
    onChange,
    placeholder = '선택',
    suggestions = [],
    completeMethod, // (e) => setSuggestions(...)
    inputRef, // useRef(null) 넘겨주세요
    commitKeys = ['Enter', 'Tab', ','], // 직접입력 확정 키
    forceSelection = false, // true면 목록에 없는 값 금지
    allowDuplicates = false, // 중복 허용 여부
  },
  ref
) {
  const handleChange = useCallback((e) => onChange?.(e.value, e), [onChange]);

  const handleKeyDown = useCallback(
    (e) => {
      if (!commitKeys.includes(e.key)) return;

      const raw = inputRef?.current?.value ?? e.target?.value ?? '';
      const token = raw.trim();
      if (!token) return;

      if (forceSelection) {
        // 목록 강제 선택 모드면 직접 입력 막기
        return;
      }

      const exists = value.some((v) => v === token);
      if (!exists || allowDuplicates) {
        onChange?.([...value, token], e);
      }

      if (inputRef?.current) inputRef.current.value = '';
      e.preventDefault();
    },
    [commitKeys, forceSelection, allowDuplicates, value, onChange, inputRef]
  );

  return (
    <AutoComplete
      className={className}
      ref={ref}
      multiple
      dropdown
      value={value}
      suggestions={suggestions}
      completeMethod={completeMethod}
      onChange={handleChange}
      inputRef={inputRef}
      onKeyDown={handleKeyDown}
      forceSelection={false} // 목록 외의 값 허용
      placeholder={placeholder}
    />
  );
});
