import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { themeSettings } from './theme';
import Login from "./pages/Login"

function App() {

  const theme = useSelector( (state) => state.theme );
  const finalTheme = useMemo( () => createTheme(themeSettings(theme)), [theme]);
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={finalTheme}>
          <CssBaseline>
            <Routes>
              <Route path="/" element={ <Home/> } />
              <Route path="/login" element={ <Login /> } />
            </Routes>
          </CssBaseline>
        </ThemeProvider>
     </BrowserRouter>
        
    </div>
  )
}

export default App;
