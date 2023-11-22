import { useState, FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
import Select from "react-select";

import Loading from "../../../Loading/Loading";

import { PrivateRoutes } from "../../../../constants/routes";
import { useAddArea } from "../../../../hooks/useArea";
import { AreaCustomForm } from "../../../../interfaces/area.interface";
import { useAllTypesOfComplainst } from "../../../../hooks/useTypeComplaint";
import { OptionsType } from "../../../../interfaces/optionsType.type";


function AddArea() {
  const navigate = useNavigate();
  const { typesOfComplaints, isLoading, error } = useAllTypesOfComplainst();
  const { addArea, isMutating } = useAddArea();

  const [options, setOptions] = useState<OptionsType[]>([]);
  const [selectedTypesOfComplaint, setSelectedTypesOfComplaint] = useState<
    OptionsType[]
  >([]);

  useEffect(() => {
    if (typesOfComplaints) {
      const optionsDefault = typesOfComplaints.map((typeComplaint) => {
        return { label: typeComplaint.name, value: `${typeComplaint._id}` };
      });

      setOptions(optionsDefault);
    }
  }, [typesOfComplaints]);

  if (isLoading) {
    return <Loading />;
  } else if (error) {
    return <div>Ocurrio un error</div>;
  }

  const handleSubmit = async (e: FormEvent<AreaCustomForm>) => {
    e.preventDefault();
    const elements = e.currentTarget.elements;

    const name = elements.name.value;
    const description = elements.description.value;
    const typesComplaintId: string[] = [];

    console.log(name, description);
    console.log(selectedTypesOfComplaint);

    for (const element of selectedTypesOfComplaint) {
      typesComplaintId.push(element.value);
    }

    try {
      const response = await addArea({
        name,
        description,
        typesComplaintId,
      });
      if (response?._id) {
        console.log(response);
        navigate(`${PrivateRoutes.PRIVATE}${PrivateRoutes.AREAS}`, {
          replace: true,
        });
        toast.success("Área creado exitosamente!");
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
      <form onSubmit={handleSubmit} className="card-body">
        <div className="text-center mb-8">
          <h1 className="font-bold text-2xl">Crear nueva área</h1>
          <p>Ingrese los datos del formulario</p>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Nombre</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control ">
          <label className="label">
            <span className="label-text">Tipos de denuncia</span>
          </label>
          <Select
            isMulti
            required
            options={options}
            placeholder="Seleccione los tipos de denuncia"
            onChange={(option: readonly OptionsType[]) => {
              // actionMeta: ActionMeta< OptionsType >
              // copio los elementos de "option" por que es readonly
              const optionsChange = option.map((element) => ({
                ...element,
              }));

              setSelectedTypesOfComplaint(optionsChange);
            }}
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Descripción</span>
          </label>
          <textarea
            required
            name="descripction"
            id="description"
            placeholder="Descripción"
            cols={5}
            rows={3}
            className="textarea textarea-bordered text-base"
          ></textarea>
        </div>

        <button className="btn bg-green-700 text-white hover:bg-green-600" disabled={isMutating}>
          {isMutating ? (
            <span className="loading loading-spinner"></span>
          ) : null}
          {isMutating ? "Creando" : "Crear"}
        </button>
      </form>
    </div>
  );
}

export default AddArea;
