import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "./ToastContext";

function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();
    const toast = useToast();

    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const loggedIn = localStorage.getItem("access");
    const username = localStorage.getItem("username");
    const isAdmin = username === "admin";

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    const logout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("username");

        toast.success("Đăng xuất thành công!");

        navigate("/login");
    };

    const isActive = (path) => {
        if (path === "/admin") {
            return location.pathname.startsWith("/admin");
        }
        return location.pathname === path;
    };

    return (

        <nav className={`premium-navbar ${scrolled ? "scrolled" : ""}`}>

            <div className="navbar-container">

                <Link
                    className="navbar-brand-premium"
                    to="/"
                >
                    <span className="brand-icon">📚</span>
                    CourseHub
                </Link>

                <button
                    className={`nav-toggle ${menuOpen ? "open" : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <div className={`navbar-menu ${menuOpen ? "open" : ""}`}>

                    <ul className="navbar-links">

                        <li>
                            <Link
                                className={`nav-link-premium ${isActive("/") ? "active" : ""}`}
                                to="/"
                            >
                                Trang chủ
                            </Link>
                        </li>

                        <li>
                            <Link
                                className={`nav-link-premium ${isActive("/courses") ? "active" : ""}`}
                                to="/courses"
                            >
                                Khóa học
                            </Link>
                        </li>

                        {loggedIn ? (

                            <>

                                <li>
                                    <Link
                                        className={`nav-link-premium ${isActive("/my-enrollments") ? "active" : ""}`}
                                        to="/my-enrollments"
                                    >
                                        Đã đăng ký
                                    </Link>
                                </li>

                                {isAdmin && (
                                    <li>
                                        <Link
                                            className={`nav-link-premium ${isActive("/admin") ? "active" : ""}`}
                                            to="/admin"
                                        >
                                            Quản trị
                                        </Link>
                                    </li>
                                )}

                            </>

                        ) : (

                            <>

                                <li>
                                    <Link
                                        className={`nav-link-premium ${isActive("/login") ? "active" : ""}`}
                                        to="/login"
                                    >
                                        Đăng nhập
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        className="btn-premium btn-gradient btn-sm-premium"
                                        to="/register"
                                    >
                                        Đăng ký
                                    </Link>
                                </li>

                            </>

                        )}

                    </ul>

                    {loggedIn && (

                        <div className="nav-user-section">

                            <div className="user-avatar">
                                {username ? username.charAt(0) : "U"}
                            </div>

                            <button
                                className="btn-logout"
                                onClick={logout}
                            >
                                Đăng xuất
                            </button>

                        </div>

                    )}

                </div>

            </div>

        </nav>

    );

}

export default Navbar;