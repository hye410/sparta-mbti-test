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
import { AuthProvider, useAuth } from "../context/AuthContext";
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const Test = lazy(() => import("../pages/Test"));
const MyPage = lazy(() => import("../pages/MyPage"));
const Result = lazy(() => import("../pages/Result"));

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <Navigate to="/login" replace /> : <Outlet />;
};

export default function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/test" element={<Test />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/result" element={<Result />} />
              </Route>
            </Routes>
          </Suspense>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}
