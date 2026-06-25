import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="container mt-5">

            <div className="p-5 mb-5 bg-light rounded-4 shadow text-center">

                <h1 className="display-4 fw-bold text-primary">
                    📚 Course Enrollment System
                </h1>

                <p className="lead mt-3">
                    Hệ thống đăng ký khóa học trực tuyến được xây dựng bằng
                    <strong> ReactJS </strong>
                    và
                    <strong> Django REST Framework</strong>.
                </p>

                <p className="text-muted">
                    Người dùng có thể xem danh sách khóa học, đăng ký khóa học và theo dõi trạng thái đăng ký.
                </p>

                <Link
                    to="/courses"
                    className="btn btn-primary btn-lg mt-3"
                >
                    Xem danh sách khóa học
                </Link>

            </div>

            <div className="row">

                <div className="col-md-4 mb-4">

                    <div className="card shadow h-100">

                        <div className="card-body text-center">

                            <h2>📖</h2>

                            <h5>Xem khóa học</h5>

                            <p>
                                Xem toàn bộ khóa học được quản lý bởi hệ thống.
                            </p>

                        </div>

                    </div>

                </div>

                <div className="col-md-4 mb-4">

                    <div className="card shadow h-100">

                        <div className="card-body text-center">

                            <h2>📝</h2>

                            <h5>Đăng ký khóa học</h5>

                            <p>
                                Đăng ký nhanh chóng chỉ với một lần nhấn.
                            </p>

                        </div>

                    </div>

                </div>

                <div className="col-md-4 mb-4">

                    <div className="card shadow h-100">

                        <div className="card-body text-center">

                            <h2>✅</h2>

                            <h5>Theo dõi trạng thái</h5>

                            <p>
                                Kiểm tra trạng thái Pending, Approved hoặc Rejected.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Home;