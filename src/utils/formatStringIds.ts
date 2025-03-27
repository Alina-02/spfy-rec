export const formatStringId = (objectsArray) => {
  const idsString = objectsArray.map((object) => object.id).join(',');
  return idsString;
};
