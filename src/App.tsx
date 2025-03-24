import Callback from './components/Callback';
import { Routes, Route } from 'react-router-dom';
import {
  createTheme,
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
} from '@mui/material';
import Main from './views/Main';
import LoginScreen from './views/LoginScreen';
import { Colors } from './constants/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.GREEN_SPOTIFY,
    },
    secondary: {
      main: Colors.BLACK_SPOTIFY,
    },
  },
});

//deploy pls
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          'html, body, #root': {
            margin: 0,
            padding: 0,
            height: '100%',
            width: '100%',
            boxSizing: 'border-box',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
