import { createTheme } from '@material-ui/core/styles'

//modified theme - different from Ahmed Abdullah's

export const theme = createTheme({
  palette: {
    primary: {
      main: "#978575",
    },
    secondary: {
      main: "#68390D",
    },
    text: {
      primary: "#68390D",
      secondary: "#AC927A",
    },
    background: {
      default: "#ffffff",
    },
  },
  typography: {
    button: {
      textTransform: 'none',
      '&:hover': {
        backgroundColor: '#DBAE9A',
        color: '#000000',
      },
    },
  }
});