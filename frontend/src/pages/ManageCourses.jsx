import { useEffect, useState } from "react";
import api from "../api/axios";

function ManageCourses() {

    const [courses, setCourses] = useState([]);

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
        try {
            const res = await api.get("courses/");
            setCourses(res.data);
        } catch (err) {
            console.log(err);
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

        try {

            if (editingId) {

                await api.put(
                    `courses/${editingId}/`,
                    form
                );

                alert("Cập nhật thành công!");

            } else {

                await api.post(
                    "courses/",
                    form
                );

                alert("Đã thêm khóa học!");

            }

            resetForm();
            loadCourses();

        } catch (err) {
            console.log(err);
            alert("Có lỗi xảy ra.");
        }
    };

    const editCourse = (course) => {

        setEditingId(course.id);

        setForm({
            title: course.title,
            description: course.description,
            instructor: course.instructor,
            duration: course.duration,
            price: course.price,
            start_date: course.start_date,
            end_date: course.end_date,
            status: course.status,
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    };

    const deleteCourse = async (id) => {

        if (!window.confirm("Bạn muốn xóa khóa học?"))
            return;

        try {

            await api.delete(`courses/${id}/`);

            alert("Đã xóa.");

            loadCourses();

        } catch (err) {

            alert("Không thể xóa.");

        }

    };

    return (

        <div className="container mt-4">

            <h2 className="mb-4 text-center">
                📚 Quản lý khóa học
            </h2>

            <div className="card shadow mb-5">

                <div className="card-body">

                    <form onSubmit={saveCourse}>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label>Tên khóa học</label>

                                <input
                                    className="form-control"
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Giảng viên</label>

                                <input
                                    className="form-control"
                                    name="instructor"
                                    value={form.instructor}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="col-12 mb-3">

                                <label>Mô tả</label>

                                <textarea
                                    rows="3"
                                    className="form-control"
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-3 mb-3">

                                <label>Thời lượng</label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="duration"
                                    value={form.duration}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-3 mb-3">

                                <label>Học phí</label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="price"
                                    value={form.price}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-3 mb-3">

                                <label>Ngày bắt đầu</label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="start_date"
                                    value={form.start_date}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-3 mb-3">

                                <label>Ngày kết thúc</label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="end_date"
                                    value={form.end_date}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                        <button
                            className={`btn ${editingId
                                    ? "btn-warning"
                                    : "btn-success"
                                }`}
                        >
                            {editingId
                                ? "Cập nhật"
                                : "Thêm khóa học"}
                        </button>

                        {
                            editingId && (

                                <button
                                    type="button"
                                    className="btn btn-secondary ms-2"
                                    onClick={resetForm}
                                >
                                    Hủy
                                </button>

                            )
                        }

                    </form>

                </div>

            </div>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>

                        <th>Tên khóa</th>

                        <th>Giảng viên</th>

                        <th>Giá</th>

                        <th width="180">
                            Thao tác
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {
                        courses.map(course => (

                            <tr key={course.id}>

                                <td>{course.id}</td>

                                <td>{course.title}</td>

                                <td>{course.instructor}</td>

                                <td>
                                    {Number(course.price).toLocaleString()} VNĐ
                                </td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => editCourse(course)}
                                    >
                                        Sửa
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteCourse(course.id)}
                                    >
                                        Xóa
                                    </button>

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>

    );

}

export default ManageCourses;