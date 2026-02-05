import styled, { ThemeProvider } from "styled-components"
import { darkTheme } from "./utils/Theme";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        
        <BrowserRouter>
          <Navbar/>
          <Routes>
              <Route path="/" element={<Home/>} exact/>
              <Route path="/post" element={<CreatePost/>} exact/>
             
          </Routes>
        </BrowserRouter>
        
      </ThemeProvider >
      
    </div>
  );
}

export default App;
