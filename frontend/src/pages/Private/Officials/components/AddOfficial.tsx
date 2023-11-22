import { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";

import Loading from "../../../Loading/Loading";

import { PrivateRoutes } from "../../../../constants/routes";
import { useAddOfficial } from "../../../../hooks/useOfficial";
import { useAllAreas } from "../../../../hooks/useArea";
import {
  OfficialCustomForm,
  TypeOfPerson,
} from "../../../../interfaces/person.interface";

function AddOfficial() {
  const navigate = useNavigate();
  const { areas, isLoading, error } = useAllAreas();
  const { addOfficial, isMutating } = useAddOfficial();

  if (isLoading) {
    return <Loading />;
  } else if (error) {
    return <div>Ocurrio un error</div>;
  }

  const handleSubmit = async (e: FormEvent<OfficialCustomForm>) => {
    e.preventDefault();
    const elements = e.currentTarget.elements;

    const name = elements.name.value;
    const ci = elements.ci.value;
    const address = elements.address.value;
    const phone = elements.phone.value;
    const areaId = elements.areaId.value;
    const email = elements.email.value;
    const password = elements.password.value;
    // console.log(name, ci, address, phone, email, password, areaId);
    try {
      const response = await addOfficial({
        user: { email, passwords: [password] },
        person: {
          name,
          ci,
          address,
          phone,
          areaId,
          type: TypeOfPerson.official,
          photo: "",
          userId: "",
        },
      });
      if (response?._id) {
        console.log(response);
        navigate(`${PrivateRoutes.PRIVATE}${PrivateRoutes.OFFICIALS}`, {
          replace: true,
        });
        toast.success("Funcionario creado exitosamente!");
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
            to={`${PrivateRoutes.PRIVATE}${PrivateRoutes.OFFICIALS}`}
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
          <h1 className="font-bold text-2xl">Crear nuevo funcionario</h1>
          <p>Ingrese los datos del formulario</p>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="********"
            className="input input-bordered"
            required
          />
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
        <div className="form-control">
          <label className="label">
            <span className="label-text">Ci</span>
          </label>
          <input
            type="text"
            name="ci"
            placeholder="Ci"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Telefono</span>
          </label>
          <input
            maxLength={8}
            type="number"
            name="phone"
            placeholder="Telefono"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Dirección</span>
          </label>
          <input
            type="text"
            name="address"
            placeholder="Dirección"
            className="input input-bordered"
            required
          />
        </div>
        {/* <div className="form-control">
          <label className="label">
            <span className="label-text">Foto</span>
          </label>
          <input
            type="file"
            name="photo"
            className="file-input file-input-ghost w-full max-w-xs"
            required
          />
        </div> */}
        <div className="form-control mb-5">
          <label className="label">
            <span className="label-text">Área</span>
          </label>
          <select
            name="areaId"
            className="select select-bordered w-full"
            required
          >
            {areas?.map((area) => (
              <option key={area._id} value={area._id}>
                {area.name}
              </option>
            ))}
          </select>
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

export default AddOfficial;
