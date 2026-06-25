import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Courses() {
    const [courses, setCourses] = useState([]);
    const [myCourses, setMyCourses] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

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
            alert("Bạn cần đăng nhập trước!");
            navigate("/login");
            return;
        }

        try {

            await api.post("enrollments/", {
                course: courseId
            });

            alert("Đăng ký khóa học thành công!");

            loadEnrollments();

        } catch (error) {

            if (error.response?.data?.detail) {
                alert(error.response.data.detail);
            } else {
                alert("Đăng ký thất bại.");
            }

        }
    };

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <h3>Đang tải danh sách khóa học...</h3>
            </div>
        );
    }

    return (
        <div className="container py-5">

            <div className="text-center mb-5">

                <h1 className="fw-bold text-primary">
                    📚 Danh sách khóa học
                </h1>

                <p className="text-muted">
                    Chọn khóa học phù hợp và đăng ký ngay.
                </p>

            </div>

            <div className="row justify-content-center mb-4">

                <div className="col-md-6">

                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="🔍 Tìm kiếm khóa học..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

            </div>

            <div className="row">

                {
                    filteredCourses.length === 0 ?

                        <div className="col-12">

                            <div className="alert alert-warning text-center">
                                Không tìm thấy khóa học.
                            </div>

                        </div>

                        :

                        filteredCourses.map(course => (

                            <div
                                className="col-md-6 col-lg-4 mb-4"
                                key={course.id}
                            >

                                <div className="card h-100 shadow border-0">

                                    <div className="card-body d-flex flex-column">

                                        <h4 className="text-primary">
                                            📖 {course.title}
                                        </h4>

                                        <p className="text-muted">
                                            {course.description}
                                        </p>

                                        <hr />

                                        <p>
                                            👨‍🏫 <strong>Giảng viên:</strong><br />
                                            {course.instructor}
                                        </p>

                                        <p>
                                            💰 <strong>Học phí:</strong><br />
                                            {Number(course.price).toLocaleString("vi-VN")} VNĐ
                                        </p>

                                        <div className="mt-auto">

                                            {
                                                myCourses.includes(course.id)

                                                    ?

                                                    <button
                                                        className="btn btn-secondary w-100"
                                                        disabled
                                                    >
                                                        ✓ Đã đăng ký
                                                    </button>

                                                    :

                                                    <button
                                                        className="btn btn-success w-100"
                                                        onClick={() => enrollCourse(course.id)}
                                                    >
                                                        Đăng ký khóa học
                                                    </button>

                                            }

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))
                }

            </div>

        </div>
    );
}

export default Courses;