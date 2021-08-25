import React from "react";
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import '../src/styles/app.style.css';
import '../src/styles/weather.style.css';
import '../src/styles/favorite.style.css';
import { RoutesSwitch } from "./routes/route";
import NavBar from "./cmps/navBar.cmp";

function App(props: any) {

  const getDarkStyle = () => {
    return props.isDarkMode ? { backgroundColor: 'lightgray', color: 'white' } : {};
  }
  
  return (
    <BrowserRouter>
      <section className="app-container">
        <NavBar />
        <main className="main-container" style={getDarkStyle()}>
          <RoutesSwitch />
        </main>
      </section>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => ({
  isDarkMode: state.darkMode.isDarkMode,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
