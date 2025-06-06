import React from "react";

import FilterProvider from "./context/FilterContext";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  return (
    <>
      <FilterProvider>
        <main className="p-4">
          <h1 className="text-xl font-bold mb-4">
            Frontend Filter Optimization
          </h1>
          <Dashboard />
        </main>
      </FilterProvider>
    </>
  );
}

export default App;
