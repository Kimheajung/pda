// AG Grid Enterprise 설정


/* 1️⃣ Polyfill */
import 'react-app-polyfill/ie11';

/* 2️⃣ 글로벌 스타일 */
import './tailwind.css';

import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

import '@components/aggrid/grid.css';
import 'prismjs/themes/prism-coy.css';

import './assets/layout/layout.scss';
import './App.scss';
import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

/* 🔥 GitHub Pages에서는 HashRouter만 사용 */
import { HashRouter } from 'react-router-dom';

import ScrollTop from './ScrollTop.jsx';

import { createStore } from 'redux';
import persistStore from 'redux-persist/es/persistStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import rootReducer from './store/reducers/index.jsx';
import { TabProvider } from './util/TabContext.jsx';

const store = createStore(rootReducer);
const persistor = persistStore(store);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <HashRouter>
          <ScrollTop />
          <TabProvider>
            <App />
          </TabProvider>
        </HashRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
