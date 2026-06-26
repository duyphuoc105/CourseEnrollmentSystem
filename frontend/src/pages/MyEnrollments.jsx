import { useEffect, useState } from "react";
import api from "../api/axios";

function MyEnrollments() {
    const [enrollments, setEnrollments] = useState([]);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEnrollments();
    }, [status]);

    const loadEnrollments = async () => {
        setLoading(true);
        try {
            let url = "enrollments/";
            if (status !== "") {
                url += `?status=${status}`;
            }
            const response = await api.get(url);
            setEnrollments(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "approved":
                return (
                    <span className="badge-premium badge-success">
                        <span className="status-dot success" />
                        Đã duyệt
                    </span>
                );
            case "rejected":
                return (
                    <span className="badge-premium badge-danger">
                        <span className="status-dot danger" />
                        Từ chối
                    </span>
                );
            default:
                return (
                    <span className="badge-premium badge-warning">
                        <span className="status-dot warning" />
                        Đang chờ
                    </span>
                );
        }
    };

    const filterOptions = [
        { label: "Tất cả trạng thái", value: "" },
        { label: "Đang chờ", value: "pending" },
        { label: "Đã duyệt", value: "approved" },
        { label: "Từ chối", value: "rejected" }
    ];

    return (
        <div className="container-premium py-5">
            <div className="page-header">
                <h1 className="gradient-text animate-fade-in-up">Khóa học của tôi</h1>
                <p className="animate-fade-in-up stagger-1">
                    Theo dõi trạng thái các khóa học bạn đã đăng ký tham gia học tập.
                </p>
            </div>

            <div className="row mb-5 animate-fade-in-up stagger-2" style={{ display: "flex", justifyContent: "center" }}>
                <div className="filter-pills">
                    {filterOptions.map((opt) => (
                        <button
                            key={opt.value}
                            className={`filter-pill ${status === opt.value ? "active" : ""}`}
                            onClick={() => setStatus(opt.value)}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="course-grid">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="skeleton skeleton-card" />
                    ))}
                </div>
            ) : enrollments.length === 0 ? (
                <div className="empty-state animate-fade-in">
                    <div className="empty-state-icon">🎓</div>
                    <h3>Không tìm thấy đăng ký nào</h3>
                    <p>Bạn chưa đăng ký khóa học nào ở trạng thái này hoặc chưa tham gia khóa học nào.</p>
                </div>
            ) : (
                <div className="course-grid">
                    {enrollments.map((item, idx) => (
                        <div
                            className={`enrollment-card animate-fade-in-up stagger-${(idx % 3) + 1}`}
                            key={item.id}
                        >
                            <h3 className="enrollment-card-title">
                                {item.course_title}
                            </h3>

                            <hr className="enrollment-card-divider" />

                            <div className="enrollment-meta-row">
                                <div className="icon" style={{ background: "rgba(99, 102, 241, 0.1)", color: "var(--accent-3)" }}>
                                    👨‍🏫
                                </div>
                                <div className="label">Giảng viên</div>
                                <div className="value">{item.instructor}</div>
                            </div>

                            <div className="enrollment-meta-row">
                                <div className="icon" style={{ background: "var(--success-bg)", color: "var(--success)" }}>
                                    💰
                                </div>
                                <div className="label">Học phí</div>
                                <div className="value">
                                    {Number(item.course_price).toLocaleString("vi-VN")} VNĐ
                                </div>
                            </div>

                            <div className="enrollment-meta-row">
                                <div className="icon" style={{ background: "var(--info-bg)", color: "var(--info)" }}>
                                    📅
                                </div>
                                <div className="label">Ngày đăng ký</div>
                                <div className="value">
                                    {new Date(item.enroll_date).toLocaleDateString("vi-VN")}
                                </div>
                            </div>

                            <div className="enrollment-meta-row" style={{ marginTop: "20px" }}>
                                <div className="icon" style={{ background: "var(--bg-glass)", color: "var(--text-secondary)" }}>
                                    ⚙️
                                </div>
                                <div className="label">Trạng thái</div>
                                <div className="value">{getStatusBadge(item.status)}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyEnrollments;