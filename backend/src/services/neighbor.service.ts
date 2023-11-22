import PersonModel from "../models/person.model.js";

const getNeighbor = async (id: string) => {
  const neighborFound = await PersonModel.findById({ _id: id });

  if (!neighborFound) {
    return { message: "El vecino no existe" };
  }

  return neighborFound;
};

export default { getNeighbor };
