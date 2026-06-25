import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {

            const response = await api.post("token/", {
                username,
                password,
            });

            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);
            localStorage.setItem("username", username);

            alert("Đăng nhập thành công!");

            navigate("/courses");

        } catch (error) {

            alert("Sai tài khoản hoặc mật khẩu!");

        }
    };

    return (

        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-md-6 col-lg-5">

                    <div className="card shadow-lg border-0">

                        <div className="card-body p-4">

                            <div className="text-center mb-4">

                                <h1 className="text-primary">
                                    🔐
                                </h1>

                                <h3 className="fw-bold">
                                    Đăng nhập
                                </h3>

                                <p className="text-muted">
                                    Course Enrollment System
                                </p>

                            </div>

                            <form onSubmit={handleLogin}>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Tên đăng nhập
                                    </label>

                                    <input
                                        className="form-control"
                                        placeholder="Nhập tên đăng nhập"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />

                                </div>

                                <div className="mb-4">

                                    <label className="form-label">
                                        Mật khẩu
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Nhập mật khẩu"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />

                                </div>

                                <button
                                    className="btn btn-primary w-100"
                                >
                                    Đăng nhập
                                </button>

                            </form>

                            <hr />

                            <p className="text-center mb-0">

                                Chưa có tài khoản?

                                <Link
                                    to="/register"
                                    className="ms-2"
                                >
                                    Đăng ký ngay
                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;