import React, { useState, useEffect } from 'react'
import Header from './Header'
import Generos from './componentes/generos/Generos'
import NovoGenero from './componentes/generos/NovoGenero'
import EditarGenero from './componentes/generos/EditarGenero'
import Home from './componentes/Home'
import Series from './componentes/series/Series'
import NovaSerie from './componentes/series/NovaSerie'
import EditarSerie from './componentes/series/EditarSerie'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'


function App() {
  
  return(
    <Router>
      <div>
        <Header/>
          <Route path='/' exact component={Home} />
          <Route path='/generos' exact component={Generos} />
          <Route path='/novogenero' exact  component={NovoGenero} />
          <Route path='/generos/:id' exact  component={EditarGenero} />
          <Route path='/series' exact  component={Series} />
          <Route path='/novaserie' exact  component={NovaSerie} />
          <Route path='/series/:id' exact  component={EditarSerie} />
      </div>
    </Router>
  )
}

export default App
