import { Link } from "react-router-dom";

function AdminDashboard() {
    return (
        <div className="container-premium py-5">
            <div className="page-header">
                <h1 className="gradient-text animate-fade-in-up">Quản trị hệ thống</h1>
                <p className="animate-fade-in-up stagger-1">
                    Trang tổng quan dành cho quản trị viên. Quản lý khóa học và phê duyệt danh sách đăng ký của học viên.
                </p>
            </div>

            <div className="admin-grid animate-fade-in-up stagger-2" style={{ marginTop: "20px" }}>
                <div className="admin-card courses">
                    <div className="admin-card-icon">
                        📚
                    </div>
                    <h3>Quản lý khóa học</h3>
                    <p>
                        Xem danh sách, thêm mới các khóa học, cập nhật thông tin chi tiết hoặc gỡ bỏ các khóa học khỏi hệ thống.
                    </p>
                    <Link
                        to="/admin/courses"
                        className="btn-premium btn-gradient w-100"
                    >
                        Đi tới Quản lý
                    </Link>
                </div>

                <div className="admin-card enrollments">
                    <div className="admin-card-icon">
                        📝
                    </div>
                    <h3>Danh sách đăng ký</h3>
                    <p>
                        Theo dõi yêu cầu tham gia khóa học của học viên, phê duyệt hoặc từ chối các lượt đăng ký mới.
                    </p>
                    <Link
                        to="/admin/enrollments"
                        className="btn-premium btn-success-premium w-100"
                    >
                        Xem danh sách
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;