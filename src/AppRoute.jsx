// src/AppRoute.jsx
import { Routes, Route } from 'react-router-dom';
import MainLayout from './MainLayout.jsx';
import DashboardMain from './page/dashboard/DashboardMain.jsx';
import Tailwind from './Tailwind.jsx';
import Dashboard from './page/dashboard/Dashboard.jsx';
import Layout01 from './page/example/layout01.jsx';
import LoginSample from "./page/example/LoginSample.jsx";
import In01 from './page/example/In01.jsx';
import In02 from './page/example/In02.jsx';
import In03 from './page/example/In03.jsx';
import In06 from './page/example/In06.jsx';
/*
import In03 from './page/example/In03.jsx';
import In04 from './page/example/In04.jsx';
import In05 from './page/example/In05.jsx';
import Out01 from './page/example/Out01.jsx';
import Out02 from './page/example/Out02.jsx';
import Out03 from './page/example/Out03.jsx';
import Out04 from './page/example/Out04.jsx';
import Out05 from './page/example/Out05.jsx';
import Etc01 from './page/example/Etc01.jsx';
import Etc02 from './page/example/Etc02.jsx';
import Etc03 from './page/example/Etc03.jsx';
import Etc04 from './page/example/Etc04.jsx';
import Etc05 from './page/example/Etc05.jsx';
import Etc06 from './page/example/Etc06.jsx';
import Etc07 from './page/example/Etc07.jsx';
import Etc08 from './page/example/Etc08.jsx';
*/

// 임시 Forbidden. 추후 인증 로직 추가 가능.
function Forbidden({ component }) {
  // 조건이 false면 로그인으로 보내는 식으로 확장
  return component;
}

export default function AppRoute() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Forbidden
            component={
              <MainLayout>
                <DashboardMain />
              </MainLayout>
            }
          />
        }
      />
      
      <Route
        path="/LoginSample"
        element={
          <Forbidden
            component={
              <MainLayout>
                <LoginSample />
              </MainLayout>
            }
          />
        }
      />


      
      <Route
        path="/layout01"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Layout01 />
              </MainLayout>
            }
          />
        }
      />
      
      <Route
        path="/in01"
        element={
          <Forbidden
            component={
              <MainLayout>
                <In01 />
              </MainLayout>
            }
          />
        }
      />
        <Route
        path="/in02"
        element={
          <Forbidden
            component={
              <MainLayout>
                <In02 />
              </MainLayout>
            }
          />
        }
      />
        <Route
        path="/in03"
        element={
          <Forbidden
            component={
              <MainLayout>
                <In03 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/in06"
        element={
          <Forbidden
            component={
              <MainLayout>
                <In06 />
              </MainLayout>
            }
          />
        }
      />
     
      <Route
        path="/tailwind"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Tailwind />
              </MainLayout>
            }
          />
        }
      />
    </Routes>
  );
}
