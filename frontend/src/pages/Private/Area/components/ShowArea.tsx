import { useParams, Link } from "react-router-dom";

import Loading from "../../../Loading/Loading";

import { PrivateRoutes } from "../../../../constants/routes";
import { useGetArea } from "../../../../hooks/useArea";

function ShowArea() {
  const { id } = useParams();
  const { areaFound, isLoading, error } = useGetArea(`${id}`);

  if (isLoading) {
    return <Loading />;
  } else if (error) {
    return <div>Ocurrio un error: {error.message}</div>;
  }

  return (
    <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100 mt-16">
      <div className="m-2 mb-0">
        <label className="label text-center text-base">
          <Link
            to={`${PrivateRoutes.PRIVATE}${PrivateRoutes.AREAS}`}
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
          <h1 className="font-bold text-2xl">Área</h1>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Nombre</span>
          </label>
          <p className="input input-bordered">{areaFound?.name}</p>
        </div>
        <div className="form-control ">
          <label className="label">
            <span className="label-text">Tipos de denuncia</span>
          </label>
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Descripción</span>
          </label>
          <p
            placeholder="Descripción"
            className="textarea textarea-bordered text-base"
          >
            {areaFound?.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ShowArea;
