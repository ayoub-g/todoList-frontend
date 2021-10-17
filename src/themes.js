import { createTheme } from "@mui/material/styles";
import { orange } from "@mui/material/colors";
export const lightThemeColor = "#a8dadc";
export const darkThemeColor = "#47597e";
export const themeOrangeDark = createTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          WebkitFontSmoothing: "auto",
        },
      },
    },
  },
  palette: {
    mode: "dark", primary: { main: "#f57c00" }
  },
  status: {
    danger: orange[500],
  },
});

export const themeOrangeLight = createTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          WebkitFontSmoothing: "auto",
        },
      },
    },
  },
  palette: {
    mode: "light", primary: { main: "#f57c00" }
  },

  status: {
    danger: orange[500],
  },
});