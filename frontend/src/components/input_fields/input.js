import React from "react";

export default Object.assign({
  name: function () {
    return (
      <h2>
        Điền tên của bạn: <input type="text" />
      </h2>
    );
  },
  password: function () {
    return (
      <h2>
        Điền mật khẩu của bạn: <input type="password" />
      </h2>
    );
  },
});
