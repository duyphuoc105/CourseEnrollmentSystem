import { useEffect, useState } from "react";
import api from "../api/axios";
import { useToast } from "../components/ToastContext";

function ManageEnrollments() {
    const toast = useToast();
    const [enrollments, setEnrollments] = useState([]);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);

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
            console.error(error);
            toast.error("Không thể tải danh sách đăng ký!");
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, newStatus) => {
        setProcessingId(id);
        try {
            const enrollment = enrollments.find(item => item.id === id);
            await api.patch(`enrollments/${id}/`, {
                user: enrollment.user,
                course: enrollment.course,
                status: newStatus,
            });

            toast.success(newStatus === "approved" ? "Đã phê duyệt đăng ký!" : "Đã từ chối đăng ký!");
            loadEnrollments();
        } catch (error) {
            console.error(error);
            toast.error("Không thể cập nhật trạng thái đăng ký!");
        } finally {
            setProcessingId(null);
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "approved":
                return (
                    <span className="badge-premium badge-success">
                        <span className="status-dot success" />
                        Approved
                    </span>
                );
            case "rejected":
                return (
                    <span className="badge-premium badge-danger">
                        <span className="status-dot danger" />
                        Rejected
                    </span>
                );
            default:
                return (
                    <span className="badge-premium badge-warning">
                        <span className="status-dot warning" />
                        Pending
                    </span>
                );
        }
    };

    const filterOptions = [
        { label: "Tất cả", value: "" },
        { label: "Pending", value: "pending" },
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" }
    ];

    return (
        <div className="container-premium py-5">
            <div className="page-header">
                <h1 className="gradient-text animate-fade-in-up">Danh sách đăng ký khóa học</h1>
                <p className="animate-fade-in-up stagger-1">
                    Xem và phê duyệt các yêu cầu đăng ký khóa học từ học viên.
                </p>
            </div>

            {/* Filter Pills */}
            <div className="row mb-4 animate-fade-in-up stagger-2" style={{ display: "flex", justifyContent: "center" }}>
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

            {/* Table or Empty state */}
            <div className="animate-fade-in-up stagger-3">
                {loading && enrollments.length === 0 ? (
                    <div className="loading-container">
                        <div className="spinner-premium" />
                        <p>Đang tải danh sách đăng ký...</p>
                    </div>
                ) : enrollments.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">📝</div>
                        <h3>Không tìm thấy đăng ký nào</h3>
                        <p>Không có yêu cầu đăng ký khóa học nào ở trạng thái này.</p>
                    </div>
                ) : (
                    <div className="table-premium-wrapper">
                        <table className="table-premium">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Học viên</th>
                                    <th>Khóa học</th>
                                    <th>Giảng viên</th>
                                    <th>Trạng thái</th>
                                    <th>Ngày đăng ký</th>
                                    <th style={{ textAlign: "right", minWidth: "200px" }}>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {enrollments.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td style={{ fontWeight: 600, color: "var(--text-heading)" }}>{item.username}</td>
                                        <td>{item.course_title}</td>
                                        <td>{item.instructor}</td>
                                        <td>{getStatusBadge(item.status)}</td>
                                        <td style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                                            {new Date(item.enroll_date).toLocaleString("vi-VN")}
                                        </td>
                                        <td style={{ textAlign: "right" }}>
                                            {item.status === "pending" ? (
                                                <>
                                                    <button
                                                        className="btn-premium btn-success-premium btn-sm-premium"
                                                        onClick={() => updateStatus(item.id, "approved")}
                                                        disabled={processingId === item.id}
                                                        style={{ marginRight: "8px" }}
                                                    >
                                                        ✔ Duyệt
                                                    </button>
                                                    <button
                                                        className="btn-premium btn-danger-premium btn-sm-premium"
                                                        onClick={() => updateStatus(item.id, "rejected")}
                                                        disabled={processingId === item.id}
                                                    >
                                                        ✖ Từ chối
                                                    </button>
                                                </>
                                            ) : (
                                                <span style={{ fontSize: "13px", color: "var(--text-muted)", fontStyle: "italic" }}>
                                                    Đã xử lý
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ManageEnrollments;