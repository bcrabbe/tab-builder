import { createMuiTheme } from '@material-ui/core/styles'; // v1.x

const marginScale = 1.5;
const margin = 10;
const paddingScale = 1.5;
const padding = 5;
const pageWidth = '85vw';
const themeDefault = createMuiTheme({
  palette: {
    type: 'light',
    page: '#f2f2f9',
    background: {
      light: '#e0e0e0',
      dark: '#9e9e9e'
    },
    primary: {
      light: '#c1d5e0',
      main: '#90a4ae',
      dark: '#62757f',
      contrastText: '#000',
    },
    secondary: {
      light: '#efdcd5',
      main: '#bcaaa4',
      dark: '#8c7b75',
      contrastText: '#000',
    },
  },
  typography: {
    pageTitleVariant: 'h6',
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
    margin,
    marginScale,
    pageWidth,
    padding,
    paddingScale,
    pageMarginTop: marginScale*margin,
    pageMarginBottom: marginScale*margin
  },
  defaultShdow: 1,
  overrides: {
  }
});


themeDefault.genericBorder =
  (color=themeDefault.palette.primary.contrastText) => `1px solid ${color}`;

export default themeDefault;
