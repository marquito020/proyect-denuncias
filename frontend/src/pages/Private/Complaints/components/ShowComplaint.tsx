import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
import Loading from "../../../Loading/Loading";

import {
  useAddObservationWithState,
  useGetComplaint,
} from "../../../../hooks/useComplaint";
import { PrivateRoutes } from "../../../../constants/routes";
import { useGetNeighbor } from "../../../../hooks/useNeighbor";
import { FormEvent } from "react";
import { ComplaintCustomForm } from "../../../../interfaces/complaint.interface";

function ShowComplaint() {
  const { id, personId } = useParams();
  const navigate = useNavigate();
  const { complaintFound, isLoading, error } = useGetComplaint(`${id}`);
  const { addObservationWithState, isMutating } = useAddObservationWithState();
  const {
    neighborFound,
    isLoading: isLoadingNeighbor,
    error: errorNeighbor,
  } = useGetNeighbor(`${personId}`);
  const [withStatus, setWithStatus] = useState(true);

  if (isLoading || isLoadingNeighbor) {
    return <Loading />;
  } else if (error || errorNeighbor) {
    return <div>Ocurrio un error al obtener los datos:</div>;
  }

  const handleSubmit = async (e: FormEvent<ComplaintCustomForm>) => {
    e.preventDefault();
    const elements = e.currentTarget.elements;

    const observation = elements.observation.value;
    const state = elements.state ? elements.state.value : complaintFound?.state;

    console.log(observation, state);
    try {
      const response = await addObservationWithState({
        _id: complaintFound?._id,
        observation,
        state,
      });
      if (response?._id) {
        console.log(response);
        navigate(`${PrivateRoutes.PRIVATE}${PrivateRoutes.COMPLAINTS}`, {
          replace: true,
        });
      } else {
        toast.error("Ocurrio un error, vuelve a intentarlo mas tarde");
      }
    } catch (error) {
      toast.error("Ocurrio un error, vuelve a intentarlo mas tarde");
    }
  };

  return (
    <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100 mt-16">
      <Toaster />
      <ul className="menu bg-base-100 lg:menu-horizontal rounded-box p-10 pb-0">
        <li>
          <Link to={`${PrivateRoutes.PRIVATE}${PrivateRoutes.COMPLAINTS}`}>
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
          </Link>
        </li>
        <li>
          {/* part of modal */}
          <label onClick={() => setWithStatus(false)} htmlFor="my_modal_7">
            Agregar observación
          </label>
        </li>
        <li>
          <label onClick={() => setWithStatus(true)} htmlFor="my_modal_7">
            Cambiar de estado
          </label>
        </li>
        <li>
          <Link
            to={`${PrivateRoutes.PRIVATE}${PrivateRoutes.COMPLAINTS}/show/map/${complaintFound?._id}`}
          >
            Ver en mapa
          </Link>
        </li>
      </ul>

      {/* star modal */}
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Actualizar datos</h3>
          <p className="py-4">Agrege una observación o cambie de estado</p>
          <form onSubmit={handleSubmit}>
            <textarea
              name="observation"
              id="observation"
              cols={5}
              rows={5}
              placeholder="Observación"
              className="textarea textarea-bordered w-full"
              required
            ></textarea>
            {withStatus && (
              <select
                name="state"
                id="state"
                className="select select-bordered w-full mt-4"
                defaultValue={complaintFound?.state}
                required
              >
                <option
                  key={complaintFound?.state}
                  value={complaintFound?.state}
                >
                  {complaintFound?.state}
                </option>
                <option key="aceptado" value="aceptado">
                  Aceptado
                </option>
                <option key="rechazado" value="rechazado">
                  Rechazado
                </option>
              </select>
            )}
            <button
              disabled={isMutating}
              className="btn bg-green-700 text-white hover:bg-green-600 w-full mt-4"
            >
              Guardar
            </button>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
      {/* end modal */}

      <div className="p-10">
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Información de la denuncia
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Personal details and application.
          </p>
        </div>
        <div className="px-4 sm:px-0 mt-4">
          <div className="carousel w-full">
            <div id="item1" className="carousel-item w-full">
              <img
                src={complaintFound?.photos[0]}
                alt={complaintFound?.title}
                className="w-full rounded-lg max-w-2xl"
              />
            </div>
            {complaintFound && complaintFound.photos.length > 1 && (
              <div id="item2" className="carousel-item w-full">
                <img
                  src={complaintFound.photos[1]}
                  alt={complaintFound.title}
                  className="w-full rounded-lg max-w-2xl"
                />
              </div>
            )}
          </div>
          <div className="flex justify-start w-full py-2 gap-2">
            <a href="#item1" className="btn btn-xs">
              1
            </a>
            {complaintFound && complaintFound.photos.length > 1 && (
              <a href="#item2" className="btn btn-xs">
                2
              </a>
            )}
          </div>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Titulo
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {complaintFound?.title}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Descripción
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {complaintFound?.description}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Observación
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {complaintFound?.observation}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Estado
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <div className="badge badge-neutral">
                  {complaintFound?.state}
                </div>
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Fecha
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {new Date(complaintFound!.createdAt).toLocaleDateString("es", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </dd>
            </div>
            <hr />
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                Información del vecino
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                Información personal detallada
              </p>
            </div>
            <div className=" avatar mt-4">
              <div className="w-24 rounded-full ring ring-green-700 ring-offset-base-100 ring-offset-2">
                <img src={neighborFound?.photo} alt={neighborFound?.name} />
              </div>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Nombre
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {neighborFound?.name}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Ci
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {neighborFound?.ci}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Dirección
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {neighborFound?.address}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Telefono
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {neighborFound?.phone}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default ShowComplaint;
