import LoginButton from './components/LoginButton';
import Callback from './components/Callback';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, GlobalStyles } from '@mui/material';
import Main from './views/Main';

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
      <Router>
        <Routes>
          <Route
            path="https://glittery-otter-ddfc65.netlify.app/"
            element={<LoginButton />}
          />
          <Route path="/callback" element={<Callback />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
