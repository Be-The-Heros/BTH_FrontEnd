const PREFIX_APP = "BTH: ";

export const setDocumentTitle = (title: string) => {
  document.title = PREFIX_APP + title;
};

export const setLocalStorage = (key: string, value: string) => {
  return localStorage.setItem(key, value);
};

export const getLocalStorage = (key: string) => {
  return localStorage.getItem(key) || "";
};
