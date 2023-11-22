import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { toast, Toaster } from "react-hot-toast";

import Loading from "../../../Loading/Loading";

import { useAllOfficials } from "../../../../hooks/useOfficial";
import { PrivateRoutes } from "../../../../constants/routes";
import { Person } from "../../../../interfaces/person.interface";

function OfficialsList() {
  const navigate = useNavigate();
  const { officials, isLoading, error } = useAllOfficials();
  const [currentPage, setCurrentPage] = useState(0);

  const officialsPagination = (): Person[] => {
    return officials ? officials.slice(currentPage, currentPage + 5) : [];
  };

  if (isLoading) {
    return <Loading />;
  } else if (error) {
    return <div>Ocurrio un error</div>;
  }

  const nextPage = () => {
    if (officials) {
      const lengthList = officials.length;
      if (lengthList > currentPage + 5) {
        setCurrentPage(currentPage + 5);
      }
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 5);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-lg">
      <Toaster />
      <div className="flex justify-between mb-2">
        <div>
          <h1 className="text-green-500 text-base font-medium">Funcionarios</h1>
          <p className="text-gray-500">Hay {officials?.length} funcionarios</p>
        </div>
        <div>
          <Link to={`${PrivateRoutes.PRIVATE}${PrivateRoutes.OFFICIALS}/add`}>
            <button className="px-3 py-2 bg-green-700 rounded-lg text-white font-medium">
              + Agregar
            </button>
          </Link>
        </div>
      </div>
      <div className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 px-3 py-4 border-b border-gray-200 text-gray-900">
        <h5>ID</h5>
        <h5>Nombre</h5>
        <h5>Telefono</h5>
        <h5>Acciones</h5>
      </div>
      {officialsPagination().map((official) => (
        <div
          key={official._id}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4  rounded-lg border-b border-gray-200 items-center bg-white hover:bg-gray-100 transition-colors mb-4  text-sm"
        >
          <div>
            <h5 className="md:hidden font-bold mb-2 mt-2">ID</h5>
            <p>{official._id}</p>
          </div>
          <div>
            <h5 className="md:hidden font-bold mb-2">Nombre</h5>
            <p className="break-words">{official.name}</p>
          </div>
          <div>
            <h5 className="md:hidden font-bold mb-2">Telefono</h5>
            <p className="break-words">{official.phone}</p>
          </div>
          <div className="md:flex md:justify-center gap-3 md:p-2 xl:mb-0 sm:mb-2 mr-2">
            <h5 className="md:hidden font-bold mb-2">Acciones</h5>
            <button
              onClick={() => {
                navigate(
                  `${PrivateRoutes.PRIVATE}${PrivateRoutes.OFFICIALS}/show/${official._id}`
                );
              }}
              className="text-base text-gray-200 rounded px-3 py-2 bg-gray-200 hover:bg-gray-300 xl:mr-0 sm:mr-2"
            >
              <EyeIcon className="text-gray-700 h-5 w-5" />
            </button>
            <button
              onClick={() => {
                navigate(
                  `${PrivateRoutes.PRIVATE}${PrivateRoutes.OFFICIALS}/edit/${official._id}/${official.userId}`
                );
              }}
              className="text-base text-gray-200 rounded px-3 py-2 bg-gray-200 hover:bg-gray-300 xl:mr-0 sm:mr-2"
            >
              <PencilSquareIcon className="text-gray-700 h-5 w-5" />
            </button>
            <button
              onClick={() => {
                toast((t) => (
                  <div>
                    <h3>Esta seguro de eliminar al funcionario?</h3>
                    <br />
                    <div className="flex justify-between gap-2">
                      <button
                        // disabled={isMutating}
                        onClick={async () => {
                          // await deleteArea(`${official._id}`);
                          toast.success("Área eliminado", {
                            id: t.id,
                            duration: 3000,
                          });
                        }}
                        className="rounded-lg bg-red-500 text-white px-3 py-2 hover:bg-red-600"
                      >
                        {/* {isMutating ? "Eliminando" : "Si, eliminar"} */}
                        eliminar
                      </button>
                      <button
                        // disabled={isMutating}
                        onClick={() => toast.dismiss(t.id)}
                        className="rounded-lg bg-gray-200 text-gray-800 px-3 py-2 hover:bg-gray-300"
                      >
                        No, Cancelar
                      </button>
                    </div>
                  </div>
                ));
              }}
              className="text-base text-gray-200 rounded px-3 py-2 bg-gray-200 hover:bg-gray-300 xl:mr-0 sm:mr-2"
            >
              <TrashIcon className="text-gray-700 h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
      <div className="join">
        <button onClick={prevPage} className="join-item btn">
          «
        </button>
        <button className="join-item btn">
          Página {(currentPage + 5) / 5}
        </button>
        <button onClick={nextPage} className="join-item btn">
          »
        </button>
      </div>
    </div>
  );
}

export default OfficialsList;
