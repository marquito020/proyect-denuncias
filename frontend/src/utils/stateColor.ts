const colorsMap = new Map([
  ["pendiente", "bg-blue-500"],
  ["aceptado", "bg-green-500"],
  ["rechazado", "bg-red-500"],
  ["cancelado", "bg-orange-500"],
]);

export const stateColor = (state: string) => {
  const color = colorsMap.get(state);

  if (!color) return "bg-blue-500";

  return color;
};
