import { useEffect, useState } from "react";
import api from "../api/axios";
import { useToast } from "../components/ToastContext";

function ManageCourses() {
    const toast = useToast();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Roster modal states
    const [selectedCourseForRoster, setSelectedCourseForRoster] = useState(null);
    const [roster, setRoster] = useState([]);
    const [rosterLoading, setRosterLoading] = useState(false);

    const [form, setForm] = useState({
        title: "",
        description: "",
        instructor: "",
        duration: "",
        price: "",
        start_date: "",
        end_date: "",
        status: "active",
    });

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
        setLoading(true);
        try {
            const res = await api.get("courses/");
            setCourses(res.data);
        } catch (err) {
            console.error(err);
            toast.error("Không thể tải danh sách khóa học!");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const resetForm = () => {
        setEditingId(null);
        setForm({
            title: "",
            description: "",
            instructor: "",
            duration: "",
            price: "",
            start_date: "",
            end_date: "",
            status: "active",
        });
    };

    const saveCourse = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            if (editingId) {
                await api.put(`courses/${editingId}/`, form);
                toast.success("Cập nhật khóa học thành công!");
            } else {
                await api.post("courses/", form);
                toast.success("Đã thêm khóa học mới!");
            }
            resetForm();
            loadCourses();
        } catch (err) {
            console.error(err);
            toast.error("Lưu thông tin thất bại!");
        } finally {
            setSubmitting(false);
        }
    };

    const editCourse = (course) => {
        setEditingId(course.id);
        setForm({
            title: course.title,
            description: course.description || "",
            instructor: course.instructor,
            duration: course.duration || "",
            price: course.price,
            start_date: course.start_date || "",
            end_date: course.end_date || "",
            status: course.status || "active",
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const deleteCourse = async (id) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa khóa học này?")) {
            return;
        }

        try {
            await api.delete(`courses/${id}/`);
            toast.success("Đã xóa khóa học thành công!");
            loadCourses();
        } catch (err) {
            console.error(err);
            toast.error("Không thể xóa khóa học này!");
        }
    };

    const openRoster = async (course) => {
        setSelectedCourseForRoster(course);
        setRosterLoading(true);

        try {
            const response = await api.get(`enrollments/?course=${course.id}`);
            // Admin có thể xem tất cả đăng ký (gồm cả Approved, Pending, Rejected)
            setRoster(response.data);
        } catch (error) {
            console.error(error);
            toast.error("Không thể tải danh sách học viên.");
        } finally {
            setRosterLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "approved":
                return (
                    <span className="badge-premium badge-success" style={{ padding: "4px 10px", fontSize: "11px" }}>
                        Approved
                    </span>
                );
            case "rejected":
                return (
                    <span className="badge-premium badge-danger" style={{ padding: "4px 10px", fontSize: "11px" }}>
                        Rejected
                    </span>
                );
            default:
                return (
                    <span className="badge-premium badge-warning" style={{ padding: "4px 10px", fontSize: "11px" }}>
                        Pending
                    </span>
                );
        }
    };

    return (
        <div className="container-premium py-5">
            <div className="page-header">
                <h1 className="gradient-text animate-fade-in-up">Quản lý khóa học</h1>
                <p className="animate-fade-in-up stagger-1">
                    Thêm mới, sửa đổi thông tin hoặc gỡ bỏ các khóa học trên hệ thống.
                </p>
            </div>

            {/* Form Section */}
            <div className="glass-card p-4 mb-5 animate-fade-in-up stagger-2" style={{ maxWidth: "800px", margin: "0 auto 40px" }}>
                <h3 className="mb-4 gradient-text" style={{ fontWeight: 700 }}>
                    {editingId ? "✏️ Cập nhật khóa học" : "➕ Thêm khóa học mới"}
                </h3>
                
                <form onSubmit={saveCourse}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                        <div className="form-group">
                            <label className="form-label-premium">Tên khóa học</label>
                            <input
                                className="input-premium"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="Nhập tên khóa học"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label-premium">Giảng viên</label>
                            <input
                                className="input-premium"
                                name="instructor"
                                value={form.instructor}
                                onChange={handleChange}
                                placeholder="Tên giảng viên"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label-premium">Mô tả khóa học</label>
                        <textarea
                            rows="3"
                            className="textarea-premium"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Mô tả nội dung, mục tiêu khóa học..."
                        />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "20px" }}>
                        <div className="form-group">
                            <label className="form-label-premium">Thời lượng (giờ)</label>
                            <input
                                type="number"
                                className="input-premium"
                                name="duration"
                                value={form.duration}
                                onChange={handleChange}
                                placeholder="Số giờ"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label-premium">Học phí (VNĐ)</label>
                            <input
                                type="number"
                                className="input-premium"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                placeholder="Học phí"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label-premium">Ngày bắt đầu</label>
                            <input
                                type="date"
                                className="input-premium"
                                name="start_date"
                                value={form.start_date}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label-premium">Ngày kết thúc</label>
                            <input
                                type="date"
                                className="input-premium"
                                name="end_date"
                                value={form.end_date}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
                        <button
                            type="submit"
                            className={`btn-premium ${editingId ? "btn-warning-premium" : "btn-gradient"}`}
                            disabled={submitting}
                        >
                            {submitting ? "Đang lưu..." : editingId ? "Cập nhật" : "Thêm khóa học"}
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                className="btn-premium btn-glass"
                                onClick={resetForm}
                            >
                                Hủy chỉnh sửa
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Table Section */}
            <div className="animate-fade-in-up stagger-3">
                <h3 className="mb-4" style={{ fontWeight: 700, color: "var(--text-heading)" }}>
                    📚 Danh sách hiện tại
                </h3>

                {loading && courses.length === 0 ? (
                    <div className="loading-container">
                        <div className="spinner-premium" />
                        <p>Đang tải danh sách khóa học...</p>
                    </div>
                ) : courses.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">📚</div>
                        <h3>Chưa có khóa học nào</h3>
                        <p>Hãy thêm khóa học đầu tiên bằng biểu mẫu phía trên.</p>
                    </div>
                ) : (
                    <div className="table-premium-wrapper">
                        <table className="table-premium">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tên khóa học</th>
                                    <th>Giảng viên</th>
                                    <th>Thời lượng</th>
                                    <th>Học phí</th>
                                    <th style={{ textAlign: "right", minWidth: "260px" }}>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map((course) => (
                                    <tr key={course.id}>
                                        <td>{course.id}</td>
                                        <td style={{ fontWeight: 600, color: "var(--text-heading)" }}>{course.title}</td>
                                        <td>{course.instructor}</td>
                                        <td>{course.duration ? `${course.duration} giờ` : "N/A"}</td>
                                        <td style={{ color: "var(--success)", fontWeight: 600 }}>
                                            {Number(course.price).toLocaleString("vi-VN")} VNĐ
                                        </td>
                                        <td style={{ textAlign: "right" }}>
                                            <button
                                                className="btn-premium btn-glass btn-sm-premium"
                                                onClick={() => openRoster(course)}
                                                style={{ marginRight: "8px" }}
                                            >
                                                👥 Học viên
                                            </button>
                                            <button
                                                className="btn-premium btn-warning-premium btn-sm-premium"
                                                onClick={() => editCourse(course)}
                                                style={{ marginRight: "8px" }}
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                className="btn-premium btn-danger-premium btn-sm-premium"
                                                onClick={() => deleteCourse(course.id)}
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Roster Modal for Admin */}
            {selectedCourseForRoster && (
                <div className="modal-overlay-premium" onClick={() => setSelectedCourseForRoster(null)}>
                    <div className="modal-content-premium" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header-premium">
                            <h3 className="gradient-text">Danh sách lớp: {selectedCourseForRoster.title}</h3>
                            <button className="modal-close-premium" onClick={() => setSelectedCourseForRoster(null)}>
                                ✕
                            </button>
                        </div>
                        <div className="modal-body-premium">
                            {rosterLoading ? (
                                <div className="loading-container" style={{ padding: "40px 0" }}>
                                    <div className="spinner-premium" />
                                    <p>Đang tải danh sách học viên...</p>
                                </div>
                            ) : roster.length === 0 ? (
                                <div className="empty-state" style={{ padding: "40px 0" }}>
                                    <div className="empty-state-icon">👥</div>
                                    <h3>Chưa có lượt đăng ký nào</h3>
                                    <p>Khóa học này hiện chưa nhận được lượt đăng ký nào.</p>
                                </div>
                            ) : (
                                <ul className="roster-list">
                                    {roster.map((enrollment) => (
                                        <li key={enrollment.id} className="roster-item animate-fade-in">
                                            <div className="roster-user-info">
                                                <div className="roster-user-avatar">
                                                    {enrollment.username ? enrollment.username.charAt(0) : "U"}
                                                </div>
                                                <div>
                                                    <div className="roster-username">{enrollment.username}</div>
                                                    <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>
                                                        Đăng ký: {new Date(enrollment.enroll_date).toLocaleDateString("vi-VN")}
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                {getStatusBadge(enrollment.status)}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManageCourses;