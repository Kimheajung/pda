import { useCallback, useMemo, useRef, useState } from 'react';
import UseModalHook from '../../components/modal/UseModalHook';
import UseDataModalHook from '../../components/modal/UseDataModalHook';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { ProgressBar } from 'primereact/progressbar';
import { Tag } from 'primereact/tag';
import FileUploader from '../../util/FileUploader';
import CommonToast from '../../util/CommonToast';
import {
  DtPicker,
  FormAutoComplete,
  FormAutoCompleteMulti,
  FormDropdown,
  FormEditor,
  FormInputNumber,
  FormInputText,
  FormPassword,
  FormTextArea,
  MonthPicker,
  YearPicker,
} from '../../components/form/UseFormControl';

const Example = () => {
  //토스트 알람------------------------
  const { toastEl, show } = CommonToast();
  //----------------------------------

  //단순 알람창------------------------
  const alertRef = useRef();
  const [aitem, setaItem] = useState({
    cn: '', //내용
    fnName: '', //제목
    width: ``, //width 값
    // height: ``, //height 값 (자동 높이 조절이 되는것으로 보아 일시 사용 안함\)
    url: ``, // 확인 버튼 이후 어디론가 이동하길 원할때
  });
  
  function aAlert(cn, fnName, width, url) {
    alertRef.current.getVisible();
    setaItem({
      content: cn,
      fnName: fnName,
      width: width,
      // height: height,
      url: url,
    });
  }
  //----------------------------------

  //데이터 알람창
  const dataAlertRef = useRef();
  const [dataItem, setDataItem] = useState({
    cn: '',
    fnName: '',
    width: ``,
    url: ``,
  });

  function dataAlert(cn, fnName, width, url) {
    dataAlertRef.current.getVisible();
    setDataItem({
      content: cn,
      fnName: fnName,
      width: width,
      url: url,
    });
  }
  //----------------------------------

  // 파일 업로드
  const [files, setFiles] = useState([]);
  const upRef = useRef(null);

  const save = async () => {
    if (!files.length) return;
    console.log(files);
    upRef.current.clear();
  };
  //----------------------------------

  // Form Control
  // 1.DatePiker
  const [month, setMonth] = useState(null); // 월
  const [year, setYear] = useState(null); // 년

  // 2.Editor
  const [text, setText] = useState('');

  // 3.Dropdown
  const [value, setValue] = useState('');
  const options = [
    { label: 'Seoul', value: 'SEO' },
    { label: 'Busan', value: 'BUS' },
    { label: 'Incheon', value: 'INC' },
    // ...
  ];
  // 4. password
  const [password, setPassword] = useState('');
  // 5. InputText
  const [inputText, setInputText] = useState('');
  // 6. InputNumber
  const [inputNumber, setInputNumber] = useState(0);
  // 7. InputText
  const [textArea, setTextArea] = useState('');
  // 8. autocomplete
  const [autoValue, setAutoValue] = useState('');
  const [items, setItems] = useState([]);

  const search = (event) => {
    let _items = [...Array(10).keys()];
    setItems(
      event.query
        ? [...Array(10).keys()].map((item) => event.query + '-' + item)
        : _items
    );
  };

  // 9. autoComplete Multi
  const allOptions = useMemo(
    () => ['사과', '배', '포도', '수박', '참외', '딸기', '복숭아'],
    []
  );

  const [autoValueMulti, setAutoValueMulti] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const inputRef = useRef(null);

  const completeMethod = useCallback(
    (e) => {
      const q = (e.query || '').toLowerCase();
      const next = allOptions
        .filter((opt) => !value.includes(opt))
        .filter((opt) => opt.toLowerCase().includes(q));
      setSuggestions(next);
    },
    [allOptions, value]
  );

  const fnCheck = () => {
    console.log(options);
    console.log(password);
    console.log(inputNumber);
  };
  return (
    <div className="grid flex flex-col">
      {toastEl}
      <div>
        <h3>----알람창------</h3>
        <div>
          <Button
            label="데이터 알람창"
            className="p-button-danger"
            style={{ color: 'white' }}
            onClick={() => {
              dataAlert(
                '데이터가 확인되지 않습니다 \n 정상 등록 하시겠습니까?',
              );
            }}
          />
        </div>
        <div className="my-[10px]">
          <Button
            label="단순 알람창"
            icon="pi pi-trash"
            className="p-button-danger"
            style={{ color: 'white' }}
            onClick={() => {
              aAlert('단순알람창', '알림', '30vh', '');
            }}
          />
        </div>
      </div>
      <div>
        <div className="my-[10px]">
          {' '}
          <h3>----드래그앤드롭------</h3>
        </div>
        <div className="flex flex-column gap-3">
          <FileUploader
            ref={upRef}
            value={files}
            onChange={setFiles}
            // accept="image/*"
            accept=".png,.jpg,.xlsx,.xls,.ppt,.pptx"
            maxSize={10000000}
          />
          <div className="flex gap-2">
            <Button
              label="저장"
              icon="pi pi-save"
              className="p-button-text"
              onClick={() => {
                if (files.length === 0) {
                  show('warn', '알림', '파일을 선택하세요', 2000);
                  return;
                }
                save();
              }}
            />
            <Button
              label="초기화"
              className="p-button-text"
              onClick={() => upRef.current.clear()}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="my-[10px]">
          {' '}
          <h3>----토스트------</h3>
        </div>
        <div className="flex flex-column gap-3">
          <div className="flex gap-2">
            <Button
              label="토스트"
              className="p-button-text"
              onClick={() => {
                show('success', '알림', '토스트란다', 2000);
                fnCheck();
              }}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="my-[10px]">
          {' '}
          <h3>----Form------</h3>
        </div>
        <div className="flex flex-column gap-3">
          <h4>1. DatePicker</h4>
          <div className="flex gap-2">
            <DtPicker
              value={month}
              onChange={setMonth}
              placeholder="년/월/일 선택"
            />
            <MonthPicker
              value={month}
              onChange={setMonth}
              placeholder="월 선택"
            />
            <YearPicker
              value={year}
              onChange={setYear}
              placeholder="년도 선택"
            />
          </div>
        </div>
        <div className="flex flex-column gap-3 my-10">
          <h4>2. Editor</h4>
          <div className="flex gap-2">
            <FormEditor value={text} onChange={setText} />
          </div>
        </div>
        <div className="flex flex-column gap-3 my-20">
          <h4>3. Dropdown</h4>
          <div className="flex gap-2">
            <FormDropdown
              value={value}
              onChange={setValue}
              options={options}
              placeholder="선택"
            />
          </div>
        </div>
        <div className="flex flex-column gap-3 my-20">
          <h4>4. Password</h4>
          <div className="flex gap-2">
            <FormPassword
              value={password}
              onChange={setPassword}
              placeholder="비밀번호를 입력하세요"
            />
          </div>
        </div>
        <div className="flex flex-column gap-3 my-20">
          <h4>5. InputText</h4>
          <div className="flex gap-2">
            <FormInputText
              value={inputText}
              onChange={setInputText}
              placeholder="텍스트를 입력하세요"
              // className="p-inputtext-sm"
              // small : p-inputtext-sm / large : p-inputtext-lg / nomal : 없음
            />
          </div>
        </div>
        <div className="flex flex-column gap-3 my-20">
          <h4>6. InputNumber</h4>
          <div className="flex gap-2">
            <FormInputNumber
              value={inputNumber}
              onChange={setInputNumber}
              placeholder="텍스트를 입력하세요"
              // className="p-inputtext-sm"
              // small : p-inputtext-sm / large : p-inputtext-lg / nomal : 없음
            />
          </div>
        </div>
        <div className="flex flex-column gap-3 my-20">
          <h4>7. TextArea</h4>
          <div className="flex gap-2">
            <FormTextArea
              value={textArea}
              onChange={setTextArea}
              placeholder="텍스트를 입력하세요"
              // className="p-inputtext-sm"
              // small : p-inputtext-sm / large : p-inputtext-lg / nomal : 없음
            />
          </div>
        </div>{' '}
        <div className="flex flex-column gap-3 my-20">
          <h4>8. AutoComplete</h4>
          <div className="flex gap-2">
            <FormAutoComplete
              value={autoValue}
              onChange={setAutoValue}
              suggestions={items}
              completeMethod={search}
              placeholder="자동완성"
              // className="p-inputtext-sm"
              // small : p-inputtext-sm / large : p-inputtext-lg / nomal : 없음
            />
          </div>
        </div>
        <div className="flex flex-column gap-3 my-20">
          <h4>9. AutoCompleteMulti</h4>
          <div className="flex gap-2">
            <FormAutoCompleteMulti
              // className="w-[160px] ac-fixed"
              value={autoValueMulti}
              onChange={setAutoValueMulti}
              suggestions={suggestions}
              completeMethod={completeMethod}
              placeholder=""
              inputRef={inputRef}
            />
          </div>
        </div>
      </div>

      <UseModalHook props={aitem} ref={alertRef} />
      <UseDataModalHook props={dataItem} ref={dataAlertRef} />
    </div>
  );
};

export default Example;
