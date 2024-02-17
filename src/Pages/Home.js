import React from "react";

const Home = () => {
  return (
    <>
      <div className="home-container">
        <div className="mt-3">
          Yêu cầu:
          <br />
          Sử dụng API từ trang web https://reqres.in để tạo trang web.
        </div>
        <div className="mt-3">
          Sử dụng thư viện React để tạo ra một màn hình website cơ bản bao gồm
          các chức năng:
        </div>
        <ul className="mt-3">
          <li>1. Đăng nhập </li>
          <li>2. Thêm User </li>
          <li>3. Sủa User </li>
          <li>4. Xóa User </li>
          <li>5. Hiển thị các User </li>
          <li>6. Tìm kiếm theo user </li>
          <li>7. Sắp xếp theo First Name </li>
          <li>8. Export CSV </li>
          <li>9. Import CSV </li>
        </ul>

        <div>
          <p>
            Tự do tùy chỉnh HTML, CSS để có một website nhẹ nhàng và đẹp. Commit
            đẩy lên Github. Triển khai website lên để demo.
          </p>
        </div>

        <div>
          <b>Result: </b> Thời gian hoàn thành 1-3 ngày và <br />
          Gửi lên Github link tại email này. <br />
          Thời gian từ sau 2 - 3 ngày làm việc kể từ <br />
          ngày nhậc được bài thi. Yêu cầu backend không
          <br /> bắt buộc
        </div>
      </div>
    </>
  );
};

export default Home;
