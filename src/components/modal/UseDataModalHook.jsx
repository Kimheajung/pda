/* eslint-disable */
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

const UseDataModalHook = forwardRef(({ props, callBack }, ref) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false); //닫기
  const handleShow = () => setShow(true); //열기
  const [visible, setVisible] = useState(false); //알람창을 활성화할것인지에 대한 여부
  const [contentArr, setContentArr] = useState([]); //줄바꿈
  const [headerTitle, setHeaderTitle] = useState('');
  const navigate = useNavigate();
  const toast = useRef(null);

  useImperativeHandle(ref, () => ({
    getVisible() {
      setVisible(true);
    },
  }));

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (
        (props.content !== '' && props.content !== undefined) ||
        (props.cn !== '' && props.cn !== undefined)
      ) {
        onload();
      }
    }
    return function cleanup() {
      mounted = false;
    };
  }, [props.content]);

  const onload = () => {
    let contentArr = [];
    let content = props.content;
    if (content.indexOf('\n') !== -1) {
      contentArr = props.content.split('\n');
    } else if (content.indexOf('<br/>') !== -1) {
      contentArr = props.content.split('<br/>');
    } else if (content.indexOf('<br />') !== -1) {
      contentArr = props.content.split('<br />');
    } else {
      contentArr = props.content.split('<br/>');
    }
    setContentArr(contentArr);
    let title = props.fnName;
    setHeaderTitle(title);
    setVisible(true);
  };

  // const confirm = () => {
  //   props.alertCheck = true;
  //   // props.InformationPopupModalAlert('팝업', '');
  //   setVisible(false);
  //   if (props.url !== undefined) {
  //     if (props.url === 'reload') {
  //       window.location.reload();
  //     } else {
  //       if (props.data) {
  //         navigate(props.url, { state: props.data });
  //       } else {
  //         if (props.navigateData) {
  //           navigate(props.url, { state: props.navigateData });
  //         } else {
  //           navigate(props.url, { state: 'effect' });
  //         }
  //       }
  //     }
  //   }
  // };

  const accept = () => {
    toast.current.show({
      severity: 'info',
      summary: '확인',
      detail: '확인 클릭',
      life: 2000,
    });
    // 필요 시 이동
    if (url === 'reload') location.reload();
    else if (url) navigate(url);
    setVisible(false);
  };

  const reject = () => {
    toast.current.show({
      severity: 'warn',
      summary: '닫기',
      detail: '닫기 클릭',
      life: 2000,
    });
    setVisible(false);
  };

  const confirm = () => {
    toast.current.show({
      severity: 'success',
      summary: '확인',
      detail: '토스트창 내용 보이기.',
      life: 2000,
    });
    setVisible(false);
  };

  const confirmationDialogFooter = (
    <>
      <Button
        type="button"
        label="확인"
        icon="pi pi-check"
        onClick={confirm}
        className="p-button-text"
        autoFocus
      />
      <Button
        type="button"
        label="닫기"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="p-button-text"
      />
    </>
  );

  return (
    <div
      className=""
      style={{
        width: '100%',
      }}
    >
      <Toast ref={toast} />
      {visible && (
        <Dialog
          header={headerTitle}
          visible={visible}
          onHide={() => setVisible(false)}
          modal
          footer={confirmationDialogFooter}
          style={{
            width: `${props.width ?? '40vh'}`,
            // height: `${props.height ?? '30vh'}`,
          }}
        >
          <div className="flex flex-column align-items-center justify-content-center">
            {contentArr &&
              contentArr.map((item, index) => (
                <p
                  key={index}
                  style={{
                    fontWeight: '600',
                    fontSize: '15px',
                  }}
                >
                  {item}
                </p>
              ))}
          </div>
        </Dialog>
      )}
    </div>
  );
});
export default UseDataModalHook;
