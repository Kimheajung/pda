// import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
// import { AllEnterpriseModule, LicenseManager } from 'ag-grid-enterprise';
// ModuleRegistry.registerModules([AllCommunityModule, AllEnterpriseModule]);

import 'ag-grid-enterprise';
import { ModuleRegistry } from 'ag-grid-community';
import { LicenseManager, AllEnterpriseModule } from 'ag-grid-enterprise';

/* 🔥 GitHub Pages / Vite 환경에서 AG Grid License 오류 방지 */
if (typeof window !== 'undefined') {
  try {
    LicenseManager.setLicenseKey(
      'Using_this_{AG_Grid}_Enterprise_key_{AG-105090}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{CIT_CO.,_Ltd}_is_granted_a_{Multiple_Applications}_Developer_License_for_{4}_Front-End_JavaScript_developers___All_Front-End_JavaScript_developers_need_to_be_licensed_in_addition_to_the_ones_working_with_{AG_Grid}_Enterprise___This_key_has_not_been_granted_a_Deployment_License_Add-on___This_key_works_with_{AG_Grid}_Enterprise_versions_released_before_{14_November_2026}____[v3]_[01]_MTc5NDYxNDQwMDAwMA==1195a6d5489c5d8fda25776bfbfb07fb'
    );
    ModuleRegistry.registerModules([AllEnterpriseModule]);
  } catch (e) {
    console.error("AG Grid License error:", e);
  }
}

/* 스타일 import */
import 'react-app-polyfill/ie11';
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

/* 🔥 BrowserRouter는 절대 import 금지 */
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
);
