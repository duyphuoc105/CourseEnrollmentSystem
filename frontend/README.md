# 💻 CourseHub — Frontend React Application

Ứng dụng Frontend của hệ thống **CourseHub**, xây dựng trên nền tảng **React.js** sử dụng bộ đóng gói cực nhanh **Vite**.

## 🎨 Điểm Nhấn Thiết Kế
*   **Premium Light Theme**: Giao diện sáng Off-white kết hợp các hiệu ứng kính mờ (Glassmorphism), bóng đổ đa lớp và gradient sống động mang lại nét tinh tế, sang trọng.
*   **Custom Toast API**: Hệ thống thông báo tự dựng (`ToastProvider`) không chặn luồng tương tác của người dùng, tích hợp thanh thời gian đếm ngược trực quan.
*   **Routing Bảo Mật**: Sử dụng `ProtectedRoute` để kiểm soát quyền truy cập của khách truy cập, học viên và quản trị viên.

## 🛠️ Cài Đặt và Sử Dụng

### Khởi chạy môi trường Phát triển (Development)
```bash
# Cài đặt các gói phụ thuộc
npm install

# Khởi chạy dự án local
npm run dev
```

### Biên dịch dự án chạy Production
```bash
npm run build
```
Bản build tĩnh sau khi biên dịch xong sẽ nằm trong thư mục `dist/` để sẵn sàng đẩy lên các nền tảng tĩnh như Vercel, Netlify hoặc Hostinger.

### Triển khai Vercel
Dự án đã tích hợp sẵn tệp cấu hình [vercel.json](vercel.json) để xử lý việc chuyển hướng URL (Rewrites) của Router Client, tránh tình trạng gặp lỗi 404 khi tải lại trang con trên Vercel.
