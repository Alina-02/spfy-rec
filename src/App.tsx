import LoginButton from './components/LoginButton';
import Callback from './components/Callback';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, GlobalStyles } from '@mui/material';
import Main from './views/Main';

//deploy pls
function App() {
  return (
    <>
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
        <Route path="/" element={<LoginButton />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </>
  );
}

export default App;
