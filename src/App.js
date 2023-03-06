import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import Vocabulary from "./pages/Vocabulary";
import OneWordSubstitutes from "./pages/OneWordSubstitutes";
import IdiomPhrases from "./pages/IdiomPhrases";
import PhrasalVerbs from "./pages/PhrasalVerbs";
import Antonyms from "./pages/Antonyms";
import Synonyms from "./pages/Synonyms";
import AddData from "./pages/AddData";
import Search from "./components/Search";
import Error from "./pages/Error";
import Admin from "./pages/Admin";

function App() {
  return (
    <div className="App">
      <BrowserRouter id="pattern">
        <Header />
        <Search />
        <Routes path="/">
          <Route path="/" exact element={<Homepage />} />
          <Route path="/vocabulary" exact element={<Vocabulary />} />
          <Route path="/one-word-substitutes" exact element={<OneWordSubstitutes />}/>
          <Route path="/idiom-&-phrases" exact element={<IdiomPhrases />} />
          <Route path="/phrasal-verbs" exact element={<PhrasalVerbs />} />
          <Route path="/antonyms" exact element={<Antonyms />} />
          <Route path="/synonyms" exact element={<Synonyms />} />
          <Route path="/add-data" exact element={<AddData />} />
          <Route path="/admin" exact element={<Admin />} />
          <Route path="/*" exact element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
