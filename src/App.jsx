import { useEffect, useState } from 'react';
import AppRoute from './AppRoute';
import { Spinner } from 'react-bootstrap';
import { ProgressSpinner } from 'primereact/progressspinner';
function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Data clean 작업
    let mounted = true;
    if (mounted) {
      // 1초뒤 로딩바 비활성화
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
    return function cleanup() {
      setLoading(true);
      mounted = false;
    };
  }, []);

  //로딩 style
  const style = {
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    top: '0',
    left: '0',
    // background : 'unset' ,
    background: '#ffffffb7',
    zIndex: '999',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <>
      {loading && (
        <div style={style}>
          <ProgressSpinner
            style={{ width: '40px', height: '40px' }}
            strokeWidth="4"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        </div>
      )}
      <div className='w_full hugreen'>
        <AppRoute />
      </div>
    </>
  );
}

export default App;
