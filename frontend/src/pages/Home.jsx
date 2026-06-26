import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            {/* Hero Section */}
            <section className="hero-section">

                <div className="container-premium">

                    <div className="hero-badge">
                        ✨ Nền tảng học tập hàng đầu
                    </div>

                    <h1 className="hero-title">
                        <span className="gradient-text">Course Enrollment</span>
                        <br />
                        System
                    </h1>

                    <p className="hero-description">
                        Hệ thống đăng ký khóa học trực tuyến được xây dựng với
                        <strong> ReactJS</strong> và <strong>Django REST Framework</strong>.
                        Dễ dàng quản lý, đăng ký và theo dõi khóa học.
                    </p>

                    <div className="hero-actions">

                        <Link
                            to="/courses"
                            className="btn-premium btn-gradient btn-lg-premium"
                        >
                            Khám phá khóa học
                            <span>→</span>
                        </Link>

                        <Link
                            to="/register"
                            className="btn-premium btn-glass btn-lg-premium"
                        >
                            Tạo tài khoản
                        </Link>

                    </div>

                </div>

            </section>

            {/* Features */}
            <section className="features-grid">

                <div className="feature-card animate-fade-in-up stagger-1">

                    <div className="feature-icon blue">
                        📖
                    </div>

                    <h3>Xem khóa học</h3>

                    <p>
                        Duyệt toàn bộ danh sách khóa học chất lượng cao, được quản lý bởi đội ngũ chuyên nghiệp.
                    </p>

                </div>

                <div className="feature-card animate-fade-in-up stagger-2">

                    <div className="feature-icon violet">
                        ⚡
                    </div>

                    <h3>Đăng ký nhanh chóng</h3>

                    <p>
                        Đăng ký khóa học chỉ với một cú nhấp chuột. Nhanh gọn, tiện lợi, không phức tạp.
                    </p>

                </div>

                <div className="feature-card animate-fade-in-up stagger-3">

                    <div className="feature-icon green">
                        ✅
                    </div>

                    <h3>Theo dõi trạng thái</h3>

                    <p>
                        Kiểm tra trạng thái đăng ký theo thời gian thực — Pending, Approved hoặc Rejected.
                    </p>

                </div>

            </section>
        </>
    );
}

export default Home;