import { Link, useParams } from "react-router-dom";
import { PrivateRoutes } from "../../../../constants/routes";
import { useGetTypeOfComplaint } from "../../../../hooks/useTypeComplaint";

import Loading from "../../../Loading/Loading";

function ShowTypeOfComplaint() {
  const { id } = useParams();
  const { typeComplaint, isLoading, error } = useGetTypeOfComplaint(`${id}`);

  if (isLoading) {
    return <Loading />;
  } else if (error) {
    return <div>Ocurrio un error: {error.message}</div>;
  }

  return (
    <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
      <div className="m-2 mb-0">
        <label className="label text-center text-base">
          <Link
            to={`${PrivateRoutes.PRIVATE}${PrivateRoutes.TYPESOFCOMPLAINT}`}
            className="link link-hover"
          >
            <button className="btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                />
              </svg>
              Atras
            </button>
          </Link>
        </label>
      </div>
      <div className="card-body">
        <div className="text-center mb-8">
          <h1 className="font-bold text-2xl">Tipo de denuncia</h1>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Nombre</span>
          </label>
          <p className="input input-bordered">{typeComplaint?.name}</p>
        </div>
        <div className="form-control mb-5">
          <label className="label">
            <span className="label-text">Tags</span>
          </label>
          <p className="input input-bordered">
            {typeComplaint?.tags.map((tag) => (
              <div key={tag} className="badge badge-neutral mr-1 mb-1">
                {tag}
              </div>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ShowTypeOfComplaint;
