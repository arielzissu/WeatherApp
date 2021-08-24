import React from "react";
import { BrowserRouter } from "react-router-dom";
import '../src/styles/app.style.css';
import '../src/styles/weather.style.css';
import '../src/styles/favorite.style.css';
import { RoutesSwitch } from "./routes/route";
import NavBar from "./cmps/navBar.cmp";

function App() {

  return (
    <BrowserRouter>
      <section className="app-container">
        <NavBar />
        <main className="main-container">
          <RoutesSwitch />
        </main>
      </section>
    </BrowserRouter>
  );
}

export default App;
