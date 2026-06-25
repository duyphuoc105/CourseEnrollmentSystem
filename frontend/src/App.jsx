import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyEnrollments from "./pages/MyEnrollments";

import AdminDashboard from "./pages/AdminDashboard";
import ManageCourses from "./pages/ManageCourses";
import ManageEnrollments from "./pages/ManageEnrollments";

function App() {

  return (
    <>
      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/courses" element={<Courses />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/my-enrollments"
          element={<MyEnrollments />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/courses"
          element={<ManageCourses />}
        />

        <Route
          path="/admin/enrollments"
          element={<ManageEnrollments />}
        />

      </Routes>

    </>
  );
}

export default App;