import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { useToast } from "../components/ToastContext";

function Login() {

    const navigate = useNavigate();
    const toast = useToast();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        setSubmitting(true);

        try {

            const response = await api.post("token/", {
                username,
                password,
            });

            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);
            localStorage.setItem("username", username);

            toast.success("Đăng nhập thành công!");

            navigate("/courses");

        } catch (error) {

            toast.error("Sai tài khoản hoặc mật khẩu!");

        } finally {
            setSubmitting(false);
        }
    };

    return (

        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-icon">
                    🔐
                </div>

                <h2 className="auth-title">
                    Đăng nhập
                </h2>

                <p className="auth-subtitle">
                    Chào mừng bạn quay trở lại CourseHub
                </p>

                <form onSubmit={handleLogin}>

                    <div className="form-group">

                        <label className="form-label-premium">
                            Tên đăng nhập
                        </label>

                        <input
                            className="input-premium"
                            placeholder="Nhập tên đăng nhập"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoComplete="username"
                        />

                    </div>

                    <div className="form-group" style={{ position: "relative" }}>

                        <label className="form-label-premium">
                            Mật khẩu
                        </label>

                        <input
                            type={showPassword ? "text" : "password"}
                            className="input-premium"
                            style={{ paddingRight: "48px" }}
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: "absolute",
                                right: "14px",
                                top: "40px",
                                background: "none",
                                border: "none",
                                color: "var(--text-muted)",
                                cursor: "pointer",
                                fontSize: "16px",
                                padding: "4px",
                            }}
                            tabIndex={-1}
                        >
                            {showPassword ? "🙈" : "👁"}
                        </button>

                    </div>

                    <button
                        className="btn-premium btn-gradient"
                        style={{ width: "100%", marginTop: "8px" }}
                        disabled={submitting}
                    >
                        {submitting ? (
                            <>
                                <span className="spinner-premium" style={{ width: 18, height: 18, borderWidth: 2 }} />
                                Đang xử lý...
                            </>
                        ) : (
                            "Đăng nhập"
                        )}
                    </button>

                </form>

                <hr className="auth-divider" />

                <p className="auth-footer">
                    Chưa có tài khoản?{" "}
                    <Link to="/register">
                        Đăng ký ngay
                    </Link>
                </p>

            </div>

        </div>

    );

}

export default Login;