const getElement = (selection) => {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  }
  throw new Error(
    "Wrong selection confirm the class name of the selection ensure it's correct"
  );
};

export default getElement;
