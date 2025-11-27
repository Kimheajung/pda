// src/AppRoute.jsx
import { Routes, Route } from 'react-router-dom';
import MainLayout from './MainLayout.jsx';
import DashboardMain from './page/dashboard/DashboardMain.jsx';
import Tailwind from './Tailwind.jsx';
import Example from './page/example/Example.jsx';
import Example02 from './page/example/Example02.jsx';
import Example03 from './page/example/Example03.jsx';
import Example04 from './page/example/Example04.jsx';
import Sample00 from './page/grid/Sample00.jsx';
import Sample01 from './page/grid/Sample01.jsx';
import Sample02 from './page/grid/Sample02.jsx';
import Sample03 from './page/grid/Sample03.jsx';
import Sample04 from './page/grid/Sample04.jsx';
import Sample05 from './page/grid/Sample05.jsx';
import Sample06 from './page/grid/Sample06.jsx';
import FormLayoutDemo from './page/formLayout/FormLayoutDemo.jsx';
import Sample07 from './page/grid/Sample07.jsx';
import Dashboard from './page/dashboard/Dashboard.jsx';
import Sample08 from './page/grid/Sample08.jsx';
import Sample09 from './page/grid/Sample09.jsx';
import Layout01 from './page/example/layout01.jsx';
import Layout02 from './page/example/layout02.jsx';
import Layout03 from './page/example/layout03.jsx';
import Layout04 from './page/example/layout04.jsx';
import Layout05 from './page/example/layout05.jsx';
import Layout06 from './page/example/layout06.jsx';
import Layout07 from './page/example/layout07.jsx';
import Layout08 from './page/example/layout08.jsx';
import Layout09 from './page/example/layout09.jsx';
import Layout09write from './page/example/layout09write.jsx';
import Layout09view from './page/example/layout09view.jsx';
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
        path="/sample00"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Sample00 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/sample01"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Sample01 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/sample02"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Sample02 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/sample03"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Sample03 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/sample04"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Sample04 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/sample05"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Sample05 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/sample06"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Sample06 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/sample07"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Sample07 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/sample08"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Sample08 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/sample09"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Sample09 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/example"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Example />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/example02"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Example02 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/example03"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Example03 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/example04"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Example04 />
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
        path="/layout02"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Layout02 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/layout03"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Layout03 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/layout04"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Layout04 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/layout05"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Layout05 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/layout06"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Layout06 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/layout07"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Layout07 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/layout08"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Layout08 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/layout09"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Layout09 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/layout09write"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Layout09write />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/layout09view"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Layout09view />
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
