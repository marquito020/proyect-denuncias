import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { LoginCustomForm } from "../../interfaces/auth.interface";
import { useLogin } from "../../hooks/useAuth";
import { createUser } from "../../redux/states/user.state";
import { PrivateRoutes } from "../../constants/routes";

function Login() {
  const dispatch = useDispatch();
  const { loginUser, isMutating } = useLogin();
  const navigate = useNavigate();
  const [messageError, setMessageError] = useState("");

  const handleSubmit = async (e: FormEvent<LoginCustomForm>) => {
    e.preventDefault();
    const elements = e.currentTarget.elements;

    const email = elements.email.value;
    const password = elements.password.value;

    try {
      const response = await loginUser({ email, password });
      if (response?.email) {
        setMessageError("");
        dispatch(createUser(response));
        navigate(PrivateRoutes.PRIVATE, { replace: true });
      } else if (response && "message" in response) {
        setMessageError(response.message as string);
      }
    } catch (error) {
      setMessageError("Ocurrio un error en el server");
      console.log(error);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        {/* <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div> */}
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit} className="card-body">
            <p className="text-red-500">{messageError}</p>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                name="email"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            {/* <div className="form-control mt-6">
              <button className="btn btn-neutral">Login</button>
            </div> */}
            <button
              className="btn text-white bg-green-700 hover:bg-green-600"
              disabled={isMutating}
            >
              {isMutating ? (
                <span className="loading loading-spinner"></span>
              ) : null}
              Iniciar sesión
            </button>
          </form>
          <div className="flex justify-center items-center mb-2">
            <label className="label text-center">
              <Link to={"/"} className="label-text-alt link link-hover">
                Ir al inicio
              </Link>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
