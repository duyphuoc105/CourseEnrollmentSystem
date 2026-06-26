import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useToast } from "../components/ToastContext";

function Register() {
    const navigate = useNavigate();
    const toast = useToast();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.warning("Mật khẩu xác nhận không khớp!");
            return;
        }

        setSubmitting(true);

        try {
            await api.post("accounts/register/", {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });

            toast.success("Đăng ký thành công! Hãy đăng nhập.");
            navigate("/login");
        } catch (error) {
            console.error(error);
            const errorMsg = error.response?.data?.username?.[0] || "Đăng ký thất bại! Vui lòng thử lại.";
            toast.error(errorMsg);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-icon">
                    📝
                </div>

                <h2 className="auth-title">
                    Đăng ký
                </h2>

                <p className="auth-subtitle">
                    Tạo tài khoản học tập tại CourseHub
                </p>

                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label className="form-label-premium">
                            Tên đăng nhập
                        </label>
                        <input
                            className="input-premium"
                            name="username"
                            placeholder="Nhập tên đăng nhập"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            autoComplete="username"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label-premium">
                            Email
                        </label>
                        <input
                            type="email"
                            className="input-premium"
                            name="email"
                            placeholder="Nhập email (tùy chọn)"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="email"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label-premium">
                            Mật khẩu
                        </label>
                        <div style={{ position: "relative" }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="input-premium"
                                name="password"
                                placeholder="Nhập mật khẩu"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                autoComplete="new-password"
                                style={{ paddingRight: "50px" }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: "absolute",
                                    right: "16px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    background: "none",
                                    border: "none",
                                    color: "var(--text-secondary)",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                }}
                            >
                                {showPassword ? "👁️" : "👁️‍🗨️"}
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label-premium">
                            Xác nhận mật khẩu
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="input-premium"
                            name="confirmPassword"
                            placeholder="Nhập lại mật khẩu"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            autoComplete="new-password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-premium btn-gradient w-100"
                        disabled={submitting}
                    >
                        {submitting ? "Đang xử lý..." : "Đăng ký"}
                    </button>
                </form>

                <div className="auth-divider" />

                <p className="auth-footer">
                    Đã có tài khoản?{" "}
                    <Link to="/login">
                        Đăng nhập
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;