# AI MV Tools Mini

AI MV Tools Mini là một static web tool giúp biến lyrics thành kế hoạch sản xuất MV AI. Tool chạy hoàn toàn trên trình duyệt, không cần backend, không cần build step và không cần đăng nhập.

## Tính năng

- Tạo AI MV plan từ lyrics.
- Tự chia lyrics thành các scene 2 dòng.
- Sinh shotlist, prompt ảnh, prompt video, thumbnail prompt, YouTube caption, Facebook caption và production checklist.
- Chọn mood và visual style.
- Chọn aspect ratio: `16:9`, `1:1`, `9:16`.
- Chọn ngôn ngữ output: Vietnamese hoặc English.
- Download output dạng Markdown (`.md`).
- Export shotlist dạng CSV.
- Copy output nhanh.
- Clear toàn bộ form và kết quả.

## Cách dùng

1. Mở `index.html` bằng trình duyệt.
2. Nhập tên bài hát và nghệ sĩ.
3. Chọn mood, style hình ảnh, aspect ratio và ngôn ngữ output.
4. Dán lyrics vào ô `Lyrics`.
5. Bấm `Generate MV Plan`.
6. Dùng các nút:
   - `Download .md` để tải toàn bộ kế hoạch.
   - `Export CSV` để tải shotlist/prompt theo từng scene.
   - `Copy Output` để copy nội dung kết quả.
   - `Clear` để làm mới form.

## Chạy local

Vì đây là static web app, bạn có thể mở trực tiếp file:

```text
index.html
```

Nếu muốn chạy qua local server, có thể dùng một trong các lệnh sau tại thư mục repo:

```bash
python -m http.server 8000
```

Sau đó mở:

```text
http://localhost:8000
```

## Deploy GitHub Pages

1. Push toàn bộ repo lên GitHub.
2. Vào repository trên GitHub.
3. Mở `Settings`.
4. Chọn `Pages`.
5. Trong phần `Build and deployment`, chọn:
   - `Source`: `Deploy from a branch`
   - `Branch`: `main`
   - Folder: `/root`
6. Bấm `Save`.
7. Chờ GitHub Pages build xong, sau đó mở URL được GitHub cung cấp.

Repo cần có `index.html` ở root để GitHub Pages tự nhận diện trang chủ.

## Cấu trúc file

```text
.
├── index.html   # Markup UI
├── style.css    # Giao diện
├── app.js       # Logic generate, export, copy, clear
├── README.md    # Hướng dẫn
└── LICENSE
```

## License

MIT
