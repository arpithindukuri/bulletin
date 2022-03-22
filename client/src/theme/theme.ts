import { createTheme } from '@material-ui/core/styles'

export const theme = createTheme({
    palette: {
        primary: {
          main: '#68390D',
          light: 'rgba(104, 57, 13, 0.54)',
        },
        secondary: {
          main: '#f0e6db',
          light: '#EDDCC8'
        },
        warning: {
          main: '#ECD1C5'
        }
      },
      typography: {
        button: {
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#fff',
            color: '#3c52b2',
        },
        },
      }
});