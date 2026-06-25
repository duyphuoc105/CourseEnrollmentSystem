import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleRegister = async (e) => {

        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {

            alert("Mật khẩu xác nhận không khớp!");

            return;

        }

        try {

            await api.post("accounts/register/", {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });

            alert("Đăng ký thành công!");

            navigate("/login");

        } catch (error) {

            console.log(error);

            alert("Đăng ký thất bại!");

        }

    };

    return (

        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-md-6 col-lg-5">

                    <div className="card shadow-lg border-0">

                        <div className="card-body p-4">

                            <div className="text-center mb-4">

                                <h1 className="text-success">
                                    📝
                                </h1>

                                <h3 className="fw-bold">
                                    Đăng ký tài khoản
                                </h3>

                                <p className="text-muted">
                                    Course Enrollment System
                                </p>

                            </div>

                            <form onSubmit={handleRegister}>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Tên đăng nhập
                                    </label>

                                    <input
                                        className="form-control"
                                        name="username"
                                        placeholder="Nhập tên đăng nhập"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder="Nhập email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Mật khẩu
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        placeholder="Nhập mật khẩu"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-4">

                                    <label className="form-label">
                                        Xác nhận mật khẩu
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        name="confirmPassword"
                                        placeholder="Nhập lại mật khẩu"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <button
                                    className="btn btn-success w-100"
                                >
                                    Đăng ký
                                </button>

                            </form>

                            <hr />

                            <p className="text-center mb-0">

                                Đã có tài khoản?

                                <Link
                                    to="/login"
                                    className="ms-2"
                                >
                                    Đăng nhập
                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Register;