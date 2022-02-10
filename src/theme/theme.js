const calcRem = (size) => `${size}rem`;

const fontSizes = {
  small: calcRem(1.2),
  base: calcRem(1.4),
  lg: calcRem(1.6),
  xl: calcRem(2.0),
  xxl: calcRem(2.2),
  xxxl: calcRem(2.4),
  titleSize: calcRem(5.0),
};

const paddings = {
  small: calcRem(0.4),
  base: calcRem(0.8),
  lg: calcRem(1.2),
  xl: calcRem(1.4),
  xxl: calcRem(1.6),
  xxxl: calcRem(1.8),
};

const fontWeight = {
  light: 200,
  normal: 400,
  bold: 700,
};

const margins = {
  small: calcRem(0.4),
  base: calcRem(0.8),
  lg: calcRem(1.2),
  xl: calcRem(1.4),
  xxl: calcRem(1.6),
  xxxl: calcRem(1.8),
};

const deviceSizes = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "450px",
  tablet: "768px",
  tabletL: "1024px",
};

const colors = {
  white: "#FFFFFF",
  black: "#000000",
  gray_1: "#F0EDED",
  gray_2: "#e5e4e4",
  gray_3: "#8C8A8A",
  gray_4: "#ebe9e9ba",
  green_1: "#5CC793",
  green_2: "#3cb46e",
  red: "#D16D6A",
  purple: "#986DF3",
};

const opacityColor = {
  gray: "rgba(230, 230, 233, 0.56)",
  purple: "rgba(139, 84, 255, 0.4)",
};

const gradientColor = {
  lightPurple: "linear-gradient(180deg, #FFC6F5 0%, #E478EB 32.29%, #B577F2",
  purple: "linear-gradient(180deg, #794AFF 0%, #9A4AFF 70.83%, #B04AFF 96.35%)",
};

const device = {
  mobileS: `only screen and (max-width: ${deviceSizes.mobileS})`,
  mobileM: `only screen and (max-width: ${deviceSizes.mobileM})`,
  mobileL: `only screen and (max-width: ${deviceSizes.mobileL})`,
  tablet: `only screen and (max-width: ${deviceSizes.tablet})`,
  tabletL: `only screen and (max-width: ${deviceSizes.tabletL})`,
};

const theme = {
  fontSizes,
  colors,
  opacityColor,
  gradientColor,
  deviceSizes,
  device,
  paddings,
  margins,
  fontWeight,
};

export default theme;
