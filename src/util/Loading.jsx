/* eslint-disable */
import React, {
  forwardRef,
  useState,
  useEffect,
  useImperativeHandle,
  useCallback,
} from 'react';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProgressSpinner } from 'primereact/progressspinner';

const Loading = forwardRef(({}, ref) => {
  const style = {
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    top: '0',
    left: '0',
    // background : '#ccccccb7' ,
    background: '#ffffffb7',
    zIndex: '999',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const [isLoading, setIsLoading] = useState(false);
  useImperativeHandle(ref, () => ({
    open() {
      setIsLoading(true);
    },
    close() {
      setIsLoading(false);
    },
  }));

  return (
    <>
      {isLoading && (
        <div style={style}>
          <ProgressSpinner
            style={{ width: '50px', height: '50px' }}
            strokeWidth="8"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        </div>
      )}
    </>
  );
});

export default Loading;
