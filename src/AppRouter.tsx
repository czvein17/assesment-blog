// Example: src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { BlogPage } from "./pages/BlogPage";
import { AllBlogs } from "./components/blog/AllBLogs";
import { BlogView } from "./components/blog/BlogView";
import { Register } from "./pages/Register";
import { MyBlogs } from "./components/blog/MyBlogs";
import { ProtectedRoute } from "./components/ProtectedRoute";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlogPage />}>
          <Route index element={<AllBlogs />} />
          <Route
            path="/my-blogs"
            element={
              <ProtectedRoute>
                <MyBlogs />
              </ProtectedRoute>
            }
          />

          <Route path="/:id" element={<BlogView />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<h1>logout</h1>} />

        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
