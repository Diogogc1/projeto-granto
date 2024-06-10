import React from 'react';
import logo from './logo.svg';
import Inserir from './pages/inserir';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Busca from './pages/busca';
import Layout from './components/layout';


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route index element={<Inserir></Inserir>} />
          <Route path='/busca' element={<Busca></Busca>}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
