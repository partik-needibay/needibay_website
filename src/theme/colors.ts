const gray = {
  900: "#2B3445", // Main Text
  800: "#373F50", // Paragraph
  700: "#555",
  777: "#414141",
  776: "#9C9C9C",
  775: "#828282",
  600: "#7D879C", // Low Priority form Title/Text
  500: "#979797",
  400: "#DAE1E7", // Border
  300: "#9C9C9C",
  200: "#398946", // Line Stroke
  100: "#F6F9FC",
  white: "#FFFFFF",
};
const green = {
  100: "#009733",
  200: "#039C00",
};

const product_detail = {
  grey: "#ABA5A5",
  grey2: "#7B7B7B",
  cancelation: "#F1D4FF",
  grey3: "#636363",
  green: "#009733",
};

const policy = {
  main: "#515151",
};
const textColor = {
  hint: gray[600],
  muted: gray[600],
  primary: gray[900],
  disabled: gray[400],
  secondary: gray[800],
  tertiary: gray[700],
};

const bodyColor = {
  default: gray[100],
  paper: gray["white"],
  text: textColor.primary,
};



const primaryColor = {
  light: "#FFE1E6",
  main: "#672DD1",
  step: "#21A700",
  main2: "#FF5F5F",
  user: "#404040",
  box: "#828181",
  box2: "#959595",
  main3: '#F0E7FF',
  dark: "#4F4CB6",
  text: "#ffffff",
  100: "#FCE9EC",
  200: "#F8C7CF",
  300: "#F07D90",
  400: "#EC6178",
  500: "#D23F57",
  600: "#E63E58",
  700: "#E3364E",
  800: "#DF2E44",
  900: "#D91F33",
};

const login_button = {
  main: "#CBAEFF",
  text: "#ffffff",
};

const secondaryColor = {
  light: "rgba(15, 52, 96, 0.2)",
  main: "rgba(15, 52, 96, 1)",
  dark: "#303A47",
  text: "#ffffff",
  900: "#041533",
  100: "#F3F6F9",
};

const tertiaryColor = {
  main: "#51A1FF",
  light: '#EAF4FF'
};

const categories = {
  main: "#7D879C",
};

const product = {
  main: "#BFBFBF",
};
const category = {
  main: '#808080'
}
const call = {
  main: "#005513",
  text: "#fff",
  banner: "#006D18",
};
const boxColor = {
  main: "#fff",
  text: "#000",
};

const dark = { main: "#222" };

const light = { main: "#fff" };

const cart = { main: "#EBEFF4", text: "#000" };

const warningColor = { main: "#FF3838", text: textColor.primary };

const errorColor = {
  main: "#E94560",
  light: "#FFE1E6",
  text: textColor.primary,
};

const successColor = {
  text: textColor.primary,
  main: "#FFF",
  light: "#00AC45",
};

const defaultColor = {
  main: textColor.primary,
  dark: textColor.primary,
  text: textColor.primary,
  light: textColor.secondary,
};

const paste = { 50: "#F5F5F5", 100: "#DDFBF1", main: "#fff" };

const marron = { 50: "#f3f5f9", 100: "#F6F2ED", main: "#BE7374" };

export const blue = {
  100: "#DBF0FE",
  200: "#B8DEFE",
  300: "#94C9FE",
  400: "#7AB6FD",
  500: "#4E97FD",
  600: "#2564DE",
  700: "#2756B6",
  800: "#183C92",
  900: "#0E2979",
  main: "#4E97FD",
};

const text2 = {
  main: "#696969",
};
export const colors = {
  dark,
  gray,
  product_detail,
  green,
  light,
  text2,
  blue,
  policy,
  paste,
  call,
  categories,
  cart,
  box: boxColor,
  login_button,
  marron,
  text: textColor,
  body: bodyColor,
  error: errorColor,
  warn: warningColor,
  success: successColor,
  default: defaultColor,
  category: category,
  primary: primaryColor,
  secondary: secondaryColor,
  tertiary: tertiaryColor,
};
