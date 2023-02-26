import {BrowserRouter} from "react-router-dom";
import {AppRouter} from "./router";
import {CssBaseline} from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <CssBaseline enableColorScheme>
        <AppRouter/>
      </CssBaseline>
    </BrowserRouter>
  )
}

export default App
