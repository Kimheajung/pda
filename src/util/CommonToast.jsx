import { useRef, useCallback } from 'react';
import { Toast } from 'primereact/toast';

export default function CommonToast({
  position = 'top-right',
  baseZIndex = 10000,
} = {}) {
  const ref = useRef(null);
  const show = useCallback((severity, summary, detail, life = 2000) => {
    ref.current?.show({ severity, summary, detail, life });
  }, []);
  const toastEl = (
    <Toast ref={ref} position={position} baseZIndex={baseZIndex} />
  );
  return { toastEl, show, ref };
}
