import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Layout from "../components/Layout";
import { lazy, Suspense } from "react";
import Loading from "../components/Loading";
const { LOGIN, SIGN_UP, TEST, MY_PAGE, RESULT } = PATH;
import { AuthProvider, useAuth } from "../context/AuthContext";
import { PATH } from "../constant/pathConstant";
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const Test = lazy(() => import("../pages/Test"));
const MyPage = lazy(() => import("../pages/MyPage"));
const Result = lazy(() => import("../pages/Result"));

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <Navigate to={LOGIN} replace /> : <Outlet />;
};

export default function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path={LOGIN} element={<Login />} />
              <Route path={SIGN_UP} element={<Signup />} />
              <Route element={<ProtectedRoute />}>
                <Route path={TEST} element={<Test />} />
                <Route path={MY_PAGE} element={<MyPage />} />
                <Route path={RESULT} element={<Result />} />
              </Route>
            </Routes>
          </Suspense>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}
