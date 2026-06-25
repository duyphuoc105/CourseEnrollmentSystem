import { useEffect, useState } from "react";
import api from "../api/axios";

function MyEnrollments() {

    const [enrollments, setEnrollments] = useState([]);
    const [status, setStatus] = useState("");

    useEffect(() => {
        loadEnrollments();
    }, [status]);

    const loadEnrollments = async () => {

        try {

            let url = "enrollments/";

            if (status !== "") {
                url += `?status=${status}`;
            }

            const response = await api.get(url);

            setEnrollments(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const getStatusBadge = (status) => {

        switch (status) {

            case "approved":
                return (
                    <span className="badge bg-success">
                        Đã duyệt
                    </span>
                );

            case "rejected":
                return (
                    <span className="badge bg-danger">
                        Từ chối
                    </span>
                );

            default:
                return (
                    <span className="badge bg-warning text-dark">
                        Đang chờ
                    </span>
                );
        }

    };

    return (

        <div className="container py-5">

            <div className="text-center mb-5">

                <h1 className="text-primary fw-bold">
                    🎓 Khóa học của tôi
                </h1>

                <p className="text-muted">
                    Theo dõi trạng thái các khóa học đã đăng ký.
                </p>

            </div>

            <div className="row mb-4">

                <div className="col-md-4">

                    <select
                        className="form-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >

                        <option value="">
                            Tất cả trạng thái
                        </option>

                        <option value="pending">
                            Pending
                        </option>

                        <option value="approved">
                            Approved
                        </option>

                        <option value="rejected">
                            Rejected
                        </option>

                    </select>

                </div>

            </div>

            {

                enrollments.length === 0 ?

                    <div className="alert alert-warning text-center">

                        Bạn chưa đăng ký khóa học nào.

                    </div>

                    :

                    <div className="row">

                        {

                            enrollments.map(item => (

                                <div
                                    className="col-md-6 col-lg-4 mb-4"
                                    key={item.id}
                                >

                                    <div className="card h-100 shadow border-0">

                                        <div className="card-body">

                                            <h4 className="text-primary">

                                                📚 {item.course_title}

                                            </h4>

                                            <hr />

                                            <p>

                                                👨‍🏫

                                                <strong>

                                                    Giảng viên

                                                </strong>

                                                <br />

                                                {item.instructor}

                                            </p>

                                            <p>

                                                💰

                                                <strong>

                                                    Học phí

                                                </strong>

                                                <br />

                                                {Number(item.course_price).toLocaleString("vi-VN")} VNĐ

                                            </p>

                                            <p>

                                                📅

                                                <strong>

                                                    Ngày đăng ký

                                                </strong>

                                                <br />

                                                {new Date(item.enroll_date).toLocaleDateString("vi-VN")}

                                            </p>

                                            <p>

                                                <strong>

                                                    Trạng thái

                                                </strong>

                                                <br />

                                                {getStatusBadge(item.status)}

                                            </p>

                                        </div>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

            }

        </div>

    );

}

export default MyEnrollments;