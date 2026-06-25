import { useEffect, useState } from "react";
import api from "../api/axios";

function ManageEnrollments() {

    const [enrollments, setEnrollments] = useState([]);
    const [status, setStatus] = useState("");

    useEffect(() => {
        loadEnrollments();
    }, [status]);

    const loadEnrollments = async () => {

        try {

            let url = "enrollments/";

            if (status !== "") {
                url += `?status=${status}`;
            }

            const response = await api.get(url);

            setEnrollments(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const updateStatus = async (id, newStatus) => {

        try {

            const enrollment = enrollments.find(
                item => item.id === id
            );

            await api.patch(`enrollments/${id}/`, {
                user: enrollment.user,
                course: enrollment.course,
                status: newStatus,
            });

            alert("Cập nhật thành công!");

            loadEnrollments();

        } catch (error) {

            console.log(error);

            alert("Không thể cập nhật.");

        }

    };

    return (

        <div className="container mt-4">

            <h2 className="text-center mb-4">
                📝 Danh sách đăng ký khóa học
            </h2>

            <div className="row mb-4">

                <div className="col-md-4">

                    <select
                        className="form-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >

                        <option value="">
                            Tất cả
                        </option>

                        <option value="pending">
                            Pending
                        </option>

                        <option value="approved">
                            Approved
                        </option>

                        <option value="rejected">
                            Rejected
                        </option>

                    </select>

                </div>

            </div>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>

                        <th>Học viên</th>

                        <th>Khóa học</th>

                        <th>Giảng viên</th>

                        <th>Trạng thái</th>

                        <th>Ngày đăng ký</th>

                        <th width="220">
                            Thao tác
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {
                        enrollments.map((item) => (

                            <tr key={item.id}>

                                <td>{item.id}</td>

                                <td>{item.username}</td>

                                <td>{item.course_title}</td>

                                <td>{item.instructor}</td>

                                <td>

                                    {
                                        item.status === "approved"

                                            ?

                                            <span className="badge bg-success">
                                                Approved
                                            </span>

                                            :

                                            item.status === "rejected"

                                                ?

                                                <span className="badge bg-danger">
                                                    Rejected
                                                </span>

                                                :

                                                <span className="badge bg-warning text-dark">
                                                    Pending
                                                </span>

                                    }

                                </td>

                                <td>

                                    {
                                        new Date(
                                            item.enroll_date
                                        ).toLocaleString()
                                    }

                                </td>

                                <td>

                                    <button
                                        className="btn btn-success btn-sm me-2"
                                        onClick={() =>
                                            updateStatus(
                                                item.id,
                                                "approved"
                                            )
                                        }
                                    >
                                        ✔ Duyệt
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            updateStatus(
                                                item.id,
                                                "rejected"
                                            )
                                        }
                                    >
                                        ✖ Từ chối
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

export default ManageEnrollments;