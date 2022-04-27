export const base64ToFile = (base64: string) => {
  return fetch(base64)
    .then((res) => res.blob())
    .then((blob) => {
<<<<<<< HEAD
      const file = new File([blob], "File name", { type: "jpeg" });
=======
      const file = new File([blob], 'user_photo.jpg', { type: 'image/jpeg' });
>>>>>>> d547993c6ba62e9e3e1cadbcec039ee558fbcc54
      return file;
    });
};
