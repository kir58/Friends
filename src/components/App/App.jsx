import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Filter from "../Filter/Filter";
import Friend from "../Friend/Friend";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./App.css";

const App = () => {
  return (
    <div className={styles.container}>
      <Router>
        <Header />
        <Route path="/" exact component={Filter} />
        <Route path="/:id" component={Friend} />
        <Footer />
      </Router>
    </div>
  );
};

export default App;
