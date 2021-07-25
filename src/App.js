import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Navigation from './components/Navigation'
import NotesList from './components/NoteList'
import CreateNote from './components/CreateNote'
import CreateUser from './components/CreateUser'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
      <Router>
        <Navigation />
        {/* <div class>
        <div class="row" >
          <div class="col-md-1"><br></br></div>
          <div class="col-md-10" ><br></br></div>
          <div class="col-md-1"  ><br></br></div>
        </div>

        <div class="row">
          <div class="col-md-1"><p> </p></div>
          <div class="col-md-3"><h2 class="card-title tittle-register">Aqui va el logo</h2></div>
          <div class="col-md-7"><h2 class="card-title tittle-register">Bienvenido</h2></div>
          <div class="col-md-1"><p> </p></div>
        </div>
        <div class="row" >
          <div class="col-md-1"><br></br></div>
          <div class="col-md-10" ><br></br></div>
          <div class="col-md-1"  ><br></br></div>
        </div>
        <div class="row" >
          <div class="col-md-1"><p></p></div>
          <div class="col-md-5"><h3 class="card-title tittle-register">Detector de Rostros</h3></div>
          <div class="col-md-5"><h3 class="card-title tittle-register">Text-To-Speech</h3></div>
          <div class="col-md-1"><p></p> </div>
        </div>



      </div> */}


        <div class="page-item container-fluid container_exp">
          <div class="container my-4">
            <div class="text-center">
              <h3 class="card-title tittle-register">Bienvenido</h3>
            </div>
          </div>

          <div class="card">
            <table class="table table-hover text-center">
              <thead>
              <tr>
                <th scope="col">Detector de rostros</th>
                <th scope="col">Text-to-Speech</th>
              </tr>
              </thead>

              <tr>

                <th scope="col" >
                  <input type="text"
                         className="form-control" placeholder="Url">
                  </input>
                </th>
                <th scope="col">
                  <input type="text"
                         className="form-control" placeholder="Ingrese texto">
                  </input>
                </th>
              </tr>
              <br></br>
              <tr>
                <th>
                  <button type="button" class="btn btn-secondary">Detectar</button>
                </th>
                <button type="button" class="btn btn-secondary">Convertir</button>
                <br></br>
              </tr>
            </table>
          </div>
        </div>
      </Router>
  );
}

export default App;