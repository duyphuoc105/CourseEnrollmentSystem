import { Link } from "react-router-dom";

function AdminDashboard() {
    return (
        <div className="container mt-5">

            <h2 className="text-center mb-5">
                👨‍💼 Admin Dashboard
            </h2>

            <div className="row">

                <div className="col-md-6 mb-4">

                    <div className="card shadow">

                        <div className="card-body text-center">

                            <h3>📚</h3>

                            <h4>Quản lý khóa học</h4>

                            <p>
                                Thêm, sửa, xóa khóa học.
                            </p>

                            <Link
                                to="/admin/courses"
                                className="btn btn-primary"
                            >
                                Quản lý
                            </Link>

                        </div>

                    </div>

                </div>

                <div className="col-md-6 mb-4">

                    <div className="card shadow">

                        <div className="card-body text-center">

                            <h3>📝</h3>

                            <h4>Danh sách đăng ký</h4>

                            <p>
                                Duyệt khóa học của học viên.
                            </p>

                            <Link
                                to="/admin/enrollments"
                                className="btn btn-success"
                            >
                                Xem
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;