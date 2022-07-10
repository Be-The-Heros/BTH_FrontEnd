export const DEVICE_SIZE = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

export const device = {
  mobileS: `(min-width: ${DEVICE_SIZE.mobileS})`,
  mobileM: `(min-width: ${DEVICE_SIZE.mobileM})`,
  mobileL: `(min-width: ${DEVICE_SIZE.mobileL})`,
  tablet: `(min-width: ${DEVICE_SIZE.tablet})`,
  laptop: `(min-width: ${DEVICE_SIZE.laptop})`,
  laptopL: `(min-width: ${DEVICE_SIZE.laptopL})`,
  desktop: `(min-width: ${DEVICE_SIZE.desktop})`,
  desktopL: `(min-width: ${DEVICE_SIZE.desktop})`,
};

export const PHOTO_DISPLAY = 4;
