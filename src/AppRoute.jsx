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
import Layout10 from './page/example/layout10.jsx';
import Layout11 from './page/example/layout11.jsx';
import LoginSample from "./page/example/LoginSample.jsx";

import Page01 from './page/example/page01.jsx';
import Page02 from './page/example/page02.jsx';
import Page03 from './page/example/page03.jsx';
import Page04 from './page/example/page04.jsx';
import Page05 from './page/example/page05.jsx';
import Page06 from './page/example/page06.jsx';
import Page07 from './page/example/page07.jsx';
import Page08 from './page/example/page08.jsx';
import Page09 from './page/example/page09.jsx';
import Page10 from './page/example/page10.jsx';
import Page11 from './page/example/page11.jsx';
import Page12 from './page/example/page12.jsx';
import Page13 from './page/example/page13.jsx';
import Page14 from './page/example/page14.jsx';
import Page15 from './page/example/page15.jsx';
import Page1501 from './page/example/page1501.jsx';
import Page1502 from './page/example/page1502.jsx';
import Page1503 from './page/example/page1503.jsx';
import Page16 from './page/example/page16.jsx';
import Page17 from './page/example/page17.jsx';
import Page18 from './page/example/page18.jsx';
import Page19 from './page/example/page19.jsx';
import Page20 from './page/example/page20.jsx';

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
        path="/Page01"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Page01 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/Page02"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Page02 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/Page03"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Page03 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/Page04"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Page04 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/Page05"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Page05 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/Page06"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Page06 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/Page07"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Page07 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/Page08"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Page08 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/Page09"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Page09 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/Page10"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Page10 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/Page11"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Page11 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/Page12"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Page12 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/Page13"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Page13 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/Page14"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Page14 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/Page15"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Page15 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/Page1501"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Page1501 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/Page1502"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Page1502 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/Page1503"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Page1503 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/Page16"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Page16 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/Page17"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Page17 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/Page18"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Page18 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/Page19"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Page19 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/Page20"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Page20 />
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
        path="/layout10"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Layout10 />
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/layout11"
        element={
          <Forbidden
            component={
              <MainLayout>
                <Layout11 />
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
