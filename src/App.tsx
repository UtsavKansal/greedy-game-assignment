import React from "react";

import "./App.css";
import Main from "./pages/Main";
import { Provider } from "react-redux";
import store from "./storeo/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
