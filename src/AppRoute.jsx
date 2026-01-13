// src/AppRoute.jsx
import { Routes, Route } from 'react-router-dom';
import MainLayout from './MainLayout.jsx';
import DashboardMain from './page/dashboard/DashboardMain.jsx';
import Tailwind from './Tailwind.jsx';
import Dashboard from './page/dashboard/Dashboard.jsx';
import Layout01 from './page/example/layout01.jsx';
import LoginSample from "./page/example/LoginSample.jsx";
import Login from "./page/login/Login.jsx";
import In01 from './page/example/In01.jsx';
import In02 from './page/example/In02.jsx';
import In03 from './page/example/In03.jsx';
import In04 from './page/example/In04.jsx';
import In05 from './page/example/In05.jsx';
import In06 from './page/example/In06.jsx';
import In07 from './page/example/In07.jsx';
import In08 from './page/example/In08.jsx';
import In09 from './page/example/In09.jsx';
import In10 from './page/example/In10.jsx';
import In11 from './page/example/In11.jsx';
import In12 from './page/example/In12.jsx';


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
        path="/Login"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Login />
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
        path="/in04"
        element={
          <Forbidden
            component={
              <MainLayout>
                <In04 />
              </MainLayout>
            }
          />
        }
      />
        <Route
        path="/in05"
        element={
          <Forbidden
            component={
              <MainLayout>
                <In05 />
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
        path="/in07"
        element={
          <Forbidden
            component={
              <MainLayout>
                <In07 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/in08"
        element={
          <Forbidden
            component={
              <MainLayout>
                <In08 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/in09"
        element={
          <Forbidden
            component={
              <MainLayout>
                <In09 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/in10"
        element={
          <Forbidden
            component={
              <MainLayout>
                <In10 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/in11"
        element={
          <Forbidden
            component={
              <MainLayout>
                <In11 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/in12"
        element={
          <Forbidden
            component={
              <MainLayout>
                <In12 />
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
