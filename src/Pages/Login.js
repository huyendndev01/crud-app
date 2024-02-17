import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { loginApi } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const navigate = useNavigate();

  const { loginContext } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    setShowLoading(true);
    const res = await loginApi(name.trim(), password);
    if (res && res.token) {
      loginContext(name, res.token);
      toast.success("Login is successed");
      setShowLoading(false);

      navigate("/");
    } else {
      // error
      if (res && res.status === 400) {
        setName("");
        setPassword("");
        toast.error(res.data.error);
        setShowLoading(false);
      }
    }
  };

  return (
    <>
      <div className="login-container col-12 col-md-6 col-lg-5">
        <h3>Log in</h3>
        <form className="form">
          <label className="label">User name( eve.holt@reqres.in )</label>
          <input
            value={name}
            type="text"
            placeholder="Tên người dùng"
            onChange={(e) => setName(e.target.value)}
          />
          <label className="label">Password</label>
          <div className="position">
            <input
              value={password}
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="icon-input-pass"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? (
                <i className="fa-regular fa-eye-slash"></i>
              ) : (
                <i className="fa-regular fa-eye"></i>
              )}
            </span>
          </div>
          <button
            type="submit"
            className={name && password ? "btn-succ" : "btn-notallowed"}
            disabled={!name || !password ? true : false}
            onClick={(e) => handleLogin(e)}
          >
            {showLoading && <i className="fas fa-sync fa-spin"></i>}
            &nbsp; Đăng Nhập
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
