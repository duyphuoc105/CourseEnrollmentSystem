# 📚 CourseHub — Course Enrollment System

Hệ thống đăng ký khóa học trực tuyến và quản lý lớp học chuyên nghiệp, được xây dựng với cấu trúc tách biệt giữa **Backend (Django REST Framework)** và **Frontend (React.js + Vite)**. Giao diện được tối ưu hóa theo phong cách **Premium Light-Theme Glassmorphism** hiện đại, mượt mà và trực quan.

---

## 🌟 Tính Năng Nổi Bật

### 🎓 Dành Cho Học Viên
*   **Đăng ký & Đăng nhập**: Bảo mật tài khoản sử dụng chuẩn mã hóa mật khẩu và xác thực Token JWT.
*   **Tìm kiếm & Đăng ký khóa học**: Duyệt danh sách các khóa học hiện có, tìm kiếm nhanh và đăng ký học với phản hồi tức thì qua hệ thống Toast.
*   **Quản lý Khóa học đã đăng ký**: Theo dõi trạng thái duyệt học (`Đang chờ`, `Đã duyệt`, `Từ chối`) trực quan bằng các bộ lọc Pills.
*   **Xem danh sách lớp (Roster)**: Xem danh sách những bạn học cùng lớp đã được ban quản trị phê duyệt chính thức.

### 👨‍💼 Dành Cho Quản Trị Viên (Admin)
*   **Bảng điều khiển (Admin Dashboard)**: Trang tổng quan quản trị nhanh gọn và trực quan.
*   **Quản lý khóa học**: Thêm mới, cập nhật thông tin chi tiết (học phí, thời lượng, ngày bắt đầu/kết thúc) hoặc xóa khóa học.
*   **Quản lý Roster & Phê duyệt**: Xem toàn bộ các lượt đăng ký khóa học, bộ lọc Pills theo trạng thái và thực hiện phê duyệt (`Approve`) hoặc từ chối (`Reject`) lượt đăng ký.

### 🎨 Trải Nghiệm Người Dùng (UX) Premium
*   **Premium Light-Theme**: Thiết kế kính mờ (Glassmorphism) trên nền sáng Off-white thanh lịch, giảm mỏi mắt, tăng độ tương phản của chữ.
*   **Hệ thống Toast Notification**: Thay thế hoàn toàn hộp thoại `alert()` truyền thống bằng các thông báo Toast trượt mượt mà kèm thanh thời gian đếm ngược.
*   **Skeleton Loading & Spinners**: Trải nghiệm tải dữ liệu không gián đoạn, mượt mà và trực quan.

---

## 🛠️ Stack Công Nghệ

*   **Backend**: Django 6.0.6, Django REST Framework, djangorestframework-simplejwt (Xác thực JWT), CORS headers, SQLite (Development) / PostgreSQL (Production).
*   **Frontend**: React.js, Vite 8.1.0, React Router DOM, Axios (HTTP Client), Vanilla CSS.

---

## 📂 Cấu Trúc Thư Mục Dự Án

```text
CourseEnrollmentSystem/
├── backend/            # Cấu hình chính của Django (settings, urls, wsgi)
├── courses/            # App quản lý Mô hình và API Khóa học
├── enrollments/        # App quản lý Đăng ký khóa học và Danh sách lớp (Roster)
├── accounts/           # App quản lý đăng ký người dùng
├── requirements.txt    # Danh sách các gói thư viện Python
├── db.sqlite3          # Cơ sở dữ liệu phát triển local
├── manage.py           # File điều khiển lệnh Django
└── frontend/           # Ứng dụng Frontend React.js
    ├── index.html      # Tệp HTML chính (cấu hình Google Font Inter, SEO)
    ├── vercel.json     # Cấu hình URL Rewrites phục vụ deploy Vercel
    └── src/
        ├── api/        # Cấu hình Axios kết nối API
        ├── components/ # Component dùng chung (Navbar, Toast, ProtectedRoute)
        ├── pages/      # Các trang giao diện chính
        ├── App.jsx     # Quản lý định tuyến Routes
        └── index.css   # Hệ thống Design System màu sáng (Light Theme)
```

---

## 🚀 Hướng Dẫn Khởi Chạy Local

### 1. Khởi Chạy Backend (Django REST Framework)
Mở một terminal mới tại thư mục gốc:
```bash
# Tạo và kích hoạt môi trường ảo
python -m venv venv
venv\Scripts\activate       # Trên Windows
source venv/bin/activate    # Trên macOS/Linux

# Cài đặt thư viện
pip install -r requirements.txt

# Tạo cơ sở dữ liệu và khởi chạy máy chủ
python manage.py migrate
python manage.py runserver
```
*   Backend API chạy tại: `http://127.0.0.1:8000/api/`
*   Tài khoản Admin mặc định: `admin` / `password123` *(hoặc tự tạo bằng lệnh `python manage.py createsuperuser`)*

### 2. Khởi Chạy Frontend (React/Vite)
Mở một terminal thứ hai tại thư mục `frontend`:
```bash
# Di chuyển vào thư mục frontend
cd frontend

# Cài đặt thư viện & khởi chạy dự án
npm install
npm run dev
```
*   Giao diện người dùng chạy tại: `http://localhost:5173/`

---

