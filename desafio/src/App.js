/*
* CHALLENGE progresso do formulário

* INSTRUÇÕES
Neste desafio sua missão é criar um formulário e seus 4 campos (com controlled inputs),
juntamente com uma barra de progresso que altera-se conforme o usuário preenche os campos.
- Crie também validações para cada campo conforme instruções abaixo.

* BARRA DE PROGRESSO
Para aproveitar estilização já definida, crie:
- a barra com um elemento pai chamado .bar-container e seu filho .bar

* CAMPOS DO FORMULÁRIO:
input - nome completo - válido se digitar no mínimo dois nomes,
input - email - válido se digitar um e-mail,
select - estado civil,
radio - gênero

Para validação de e-mail use a seguinte RegEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

* FUNCIONAMENTO
Espera-se que o formulário tenha 4 campos ao todo. Portanto, quando o usuário preencher
o primeiro campo, a barra de progresso deve assumir 25% do tamanho total;
o segundo campo, 50% e assim por diante...

Caso o usuário não tenha definido valores para os elementos de select e radio,
os mesmos não devem ser considerados como preenchidos até então.

Se o usuário preencher um campo e apagar seu valor, este campo deve ser considerado como vazio,
fazendo com que a barra de progresso regrida novamente.

Desabilitar o botão de enviar caso todos os campos não estejam preenchidos/válidos.

Ao enviar, deve-se apresentar um alert javascript com sucesso, limpar todos os campos
do formulário e zerar a barra de progresso novamente.
*/

import "./App.css";
import React from "react";

function App() {
  const [dados, setDados] = React.useState({
    fullName: "",
    email: "",
    state: "",
    gener: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setDados((prev) => {
      const newData = { ...prev, [name]: value };
      return newData;
    });
  }

  function calculeProgress() {
    let value = 0;
    let amountCount = 25;

    if (dados.fullName) {
      const fullNameSplit = dados.fullName.split(" ");
      if (fullNameSplit.length > 1) value += amountCount;
    }

    if (dados.email) {
      let regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (regex.test(dados.email)) {
        value += amountCount;
      }
    }

    if (dados.gener) {
      value += amountCount;
    }

    if (dados.state) {
      value += amountCount;
    }

    return value;
  }

  return (
    <div className="App">
      <h3>desafio fernandev</h3>
      <h1>progresso do formulário</h1>

      <main>
        {
          <div className="bar-container">
            <div
              className="bar"
              style={{ width: `${calculeProgress()}%` }}
            ></div>
          </div>
        }
        <div className="form-group">
          <label htmlFor="">Nome Completo</label>
          <input
            onChange={handleChange}
            name="fullName"
            value={dados.fullName}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">E-mail</label>
          <input value={dados.email} onChange={handleChange} name="email" />
        </div>
        <div className="form-group">
          <label htmlFor="">Estado Civil</label>
          <select name="state" value={dados.state} onChange={handleChange}>
            <option name="state">- selecione...</option>
            <option name="state" value="solteiro">
              Solteiro
            </option>
            <option name="state">Casado</option>
            <option name="state" value="divorciado">
              Divorciado
            </option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="">Gênero</label>
          <div className="radios-container">
            <span>
              <input
                value="masculino"
                onChange={handleChange}
                name="gener"
                type="radio"
                checked={dados.gener === "masculino"}
              />{" "}
              Masculino
            </span>
            <span>
              <input
                value="feminino"
                onChange={handleChange}
                name="gener"
                type="radio"
                checked={dados.gener === "feminino"}
              />{" "}
              Feminino
            </span>
          </div>
        </div>
        <button>Enviar Formulário</button>
      </main>
    </div>
  );
}

export default App;
