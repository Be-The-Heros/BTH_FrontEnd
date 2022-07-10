export const base64ToFile = (filename: string, base64: string) => {
  return fetch(base64)
    .then((res) => res.blob())
    .then((blob) => {
      const file = new File([blob], filename, { type: "image/jpeg" });
      return file;
    });
};
