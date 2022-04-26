export const base64ToFile = (base64: string) => {
  return fetch(base64)
    .then((res) => res.blob())
    .then((blob) => {
      const file = new File([blob], 'user_photo.jpg', { type: 'image/jpeg' });
      return file;
    });
};
