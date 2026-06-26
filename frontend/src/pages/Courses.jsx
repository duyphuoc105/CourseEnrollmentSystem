import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useToast } from "../components/ToastContext";

function Courses() {
    const [courses, setCourses] = useState([]);
    const [myCourses, setMyCourses] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [enrollingId, setEnrollingId] = useState(null);

    // Roster modal states
    const [selectedCourseForRoster, setSelectedCourseForRoster] = useState(null);
    const [roster, setRoster] = useState([]);
    const [rosterLoading, setRosterLoading] = useState(false);

    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        loadCourses();

        if (localStorage.getItem("access")) {
            loadEnrollments();
        }
    }, []);

    const loadCourses = async () => {
        try {
            const response = await api.get("courses/");
            setCourses(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const loadEnrollments = async () => {
        try {
            const response = await api.get("enrollments/");
            setMyCourses(response.data.map(item => item.course));
        } catch (error) {
            console.log(error);
        }
    };

    const enrollCourse = async (courseId) => {
        if (!localStorage.getItem("access")) {
            toast.warning("Bạn cần đăng nhập trước!");
            navigate("/login");
            return;
        }

        setEnrollingId(courseId);

        try {
            await api.post("enrollments/", {
                course: courseId
            });

            toast.success("Đăng ký khóa học thành công!");
            loadEnrollments();
        } catch (error) {
            if (error.response?.data?.detail) {
                toast.error(error.response.data.detail);
            } else {
                toast.error("Đăng ký thất bại.");
            }
        } finally {
            setEnrollingId(null);
        }
    };

    const openRoster = async (course) => {
        if (!localStorage.getItem("access")) {
            toast.warning("Bạn cần đăng nhập để xem danh sách lớp!");
            navigate("/login");
            return;
        }

        setSelectedCourseForRoster(course);
        setRosterLoading(true);

        try {
            const response = await api.get(`enrollments/?course=${course.id}`);
            // Chỉ hiển thị học viên đã được Approved học lớp đó
            const approvedStudents = response.data.filter(item => item.status === "approved");
            setRoster(approvedStudents);
        } catch (error) {
            console.error(error);
            toast.error("Không thể tải danh sách học viên của lớp.");
        } finally {
            setRosterLoading(false);
        }
    };

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div className="container-premium">
                <div className="page-header">
                    <h1 className="gradient-text">Danh sách khóa học</h1>
                    <p>Đang tải dữ liệu...</p>
                </div>
                <div className="course-grid">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="skeleton skeleton-card" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="container-premium">
            <div className="page-header">
                <h1 className="gradient-text">Danh sách khóa học</h1>
                <p>Chọn khóa học phù hợp và đăng ký ngay hôm nay</p>
            </div>

            <div className="search-bar-premium">
                <span className="search-icon">🔍</span>
                <input
                    type="text"
                    placeholder="Tìm kiếm khóa học..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {filteredCourses.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">📭</div>
                    <h3>Không tìm thấy khóa học</h3>
                    <p>Thử tìm kiếm với từ khóa khác</p>
                </div>
            ) : (
                <div className="course-grid">
                    {filteredCourses.map((course, index) => (
                        <div
                            className="course-card animate-fade-in-up"
                            key={course.id}
                            style={{ animationDelay: `${index * 0.08}s` }}
                        >
                            <div className="course-card-body">
                                <h3 className="course-card-title">{course.title}</h3>
                                <p className="course-card-desc">{course.description}</p>

                                <div className="course-card-meta">
                                    <div className="course-meta-item">
                                        <div className="course-meta-icon instructor">👨‍🏫</div>
                                        <div>
                                            <div className="course-meta-label">Giảng viên</div>
                                            <div className="course-meta-value">{course.instructor}</div>
                                        </div>
                                    </div>

                                    <div className="course-meta-item">
                                        <div className="course-meta-icon price">💰</div>
                                        <div>
                                            <div className="course-meta-label">Học phí</div>
                                            <div className="course-meta-value">
                                                {Number(course.price).toLocaleString("vi-VN")} VNĐ
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="course-card-footer" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                {myCourses.includes(course.id) ? (
                                    <button
                                        className="btn-premium btn-disabled"
                                        style={{ width: "100%" }}
                                        disabled
                                    >
                                        ✓ Đã đăng ký
                                    </button>
                                ) : (
                                    <button
                                        className="btn-premium btn-gradient"
                                        style={{ width: "100%" }}
                                        onClick={() => enrollCourse(course.id)}
                                        disabled={enrollingId === course.id}
                                    >
                                        {enrollingId === course.id ? (
                                            <>
                                                <span className="spinner-premium" style={{ width: 18, height: 18, borderWidth: 2, marginRight: 8 }} />
                                                Đang xử lý...
                                            </>
                                        ) : (
                                            "Đăng ký khóa học"
                                        )}
                                    </button>
                                )}

                                <button
                                    className="btn-premium btn-glass"
                                    style={{ width: "100%" }}
                                    onClick={() => openRoster(course)}
                                >
                                    👥 Xem danh sách lớp
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Roster Modal */}
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
                                    <h3>Chưa có học viên chính thức</h3>
                                    <p>Lớp này hiện chưa có học viên nào được duyệt tham gia học.</p>
                                </div>
                            ) : (
                                <ul className="roster-list">
                                    {roster.map((enrollment) => (
                                        <li key={enrollment.id} className="roster-item animate-fade-in">
                                            <div className="roster-user-info">
                                                <div className="roster-user-avatar">
                                                    {enrollment.username ? enrollment.username.charAt(0) : "U"}
                                                </div>
                                                <span className="roster-username">{enrollment.username}</span>
                                            </div>
                                            <span className="roster-date">
                                                Đăng ký: {new Date(enrollment.enroll_date).toLocaleDateString("vi-VN")}
                                            </span>
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

export default Courses;