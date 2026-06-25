import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();

    const loggedIn = localStorage.getItem("access");

    // Tạm thời xác định admin theo username
    const username = localStorage.getItem("username");
    const isAdmin = username === "admin";

    const logout = () => {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("username");

        alert("Đăng xuất thành công!");

        navigate("/login");
    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">

            <div className="container">

                <Link
                    className="navbar-brand fw-bold"
                    to="/"
                >
                    📚 Course Enrollment
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >

                    <ul className="navbar-nav ms-auto align-items-center">

                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === "/" ? "active fw-bold" : ""}`}
                                to="/"
                            >
                                🏠 Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === "/courses" ? "active fw-bold" : ""}`}
                                to="/courses"
                            >
                                📖 Courses
                            </Link>
                        </li>

                        {loggedIn ? (

                            <>

                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${location.pathname === "/my-enrollments" ? "active fw-bold" : ""}`}
                                        to="/my-enrollments"
                                    >
                                        🎓 My Courses
                                    </Link>
                                </li>

                                {/* Menu Admin */}
                                {isAdmin && (
                                    <li className="nav-item">
                                        <Link
                                            className={`nav-link ${location.pathname.startsWith("/admin") ? "active fw-bold" : ""}`}
                                            to="/admin"
                                        >
                                            ⚙️ Admin
                                        </Link>
                                    </li>
                                )}

                                <li className="nav-item ms-2">
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={logout}
                                    >
                                        🚪 Logout
                                    </button>
                                </li>

                            </>

                        ) : (

                            <>

                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${location.pathname === "/login" ? "active fw-bold" : ""}`}
                                        to="/login"
                                    >
                                        Login
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${location.pathname === "/register" ? "active fw-bold" : ""}`}
                                        to="/register"
                                    >
                                        Register
                                    </Link>
                                </li>

                            </>

                        )}

                    </ul>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;