import { ThemeProvider } from "styled-components";
import {defaultTheme} from './styles/themes/default'
import { GlobalStyle } from "./styles/global";
import { Router } from "./Router";
import { BrowserRouter } from "react-router-dom";
import { CyclesContextProvider } from "./contexts/CyclesContext";
// import { Home } from "./exemplos/Home";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      
      <GlobalStyle />
      
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>
      
    </ThemeProvider>
  )
}
