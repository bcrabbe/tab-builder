import { createMuiTheme } from '@material-ui/core/styles'; // v1.x

const margin = 10;
const padding = 5;
const themeDefault = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      light: '#fff',
      main: '#fff',
      dark: '#aaa',
      contrastText: '#000',
    },
    secondary: {
      light: '#000',
      main: '#000',
      dark: '#444',
      contrastText: '#000',
    },
  },
  typography: {
    useNextVariants: true,
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  spacing: {
    margin: margin,
    padding: padding,
  },
  overrides: {
  }
});

export default themeDefault;
