import React, { useEffect, useState } from 'react';
import { getUsersDB } from './data-base/main.js';

import './App.css';

function App() {
  const [response, setResponse] = useState();

  useEffect(() => {
    getUsersDB().then((result) => setResponse(result));
  }, [])


  return (
    <div className="App">
      <title>
        Magna
      </title>
      <div class="container d-flex justify-content-center align-items-center" style="height: 100vh;">
        <div class="card p-4" style="width: 100%; max-width: 400px;">
          <h2 class="text-center mb-4">Login</h2>
          <form action="/login" method="post">
            <div class="mb-3">
              <label for="matricula" class="form-label">Matrícula</label>
              <input type="text" id="matricula" name="matricula" class="form-control" placeholder="Digite sua matrícula" required />
            </div>
            <div class="mb-3">
              <label for="senha" class="form-label">Senha</label>
              <input type="password" id="senha" name="senha" class="form-control" placeholder="Digite sua senha" required />
            </div>
            <button type="submit" class="btn btn-success w-100">Entrar</button>
          </form>
          <div class="text-center mt-3">
            <p>Ainda não tem uma conta? <a href="criarUsuario.html" class="link-primary">Criar Usuário</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;