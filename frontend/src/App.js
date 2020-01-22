import React, { useEffect, useState } from "react";

import "./global.css";
import "./App.css";
import "./Sidebar.css";
import "./Main.css";
import DevItem from "./components/DevItem";
import DevForm from "./components/DevForm";
import api from "./services/api";

export default function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get("/devs");

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post("/dev", data);

    setDevs(...devs, response.data);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}
