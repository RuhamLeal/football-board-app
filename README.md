<a name="readme-top"></a>

<h1 align="center">Projeto Trybe Futebol Clube (TFC) ⚽</h1>

<details>
  <summary>Sumário</summary><br />
  <ol>
    <li><a href="#sobre-o-projeto">Sobre o Projeto</a></li>
    <li><a href="#tecnologias">Tecnologias</a></li>
    <li><a href="#funcionalidades">Funcionalidades</a></li>
    <li><a href="#como-executar-o-projeto">Como Executar o Projeto</a></li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#habilidades">Habilidades</a></li>
    <li><a href="#sobre-a-trybe">Sobre a Trybe</a></li>
    <li><a href="#contato">Contato</a></li>
  </ol>
</details>

## Sobre o Projeto

O TFC é uma aplicação fullstack que oferece informações sobre jogos e classificações de futebol.

<details>
  <summary><strong> Detalhes</strong></summary><br />

1️⃣ **Banco de dados:**

- É um container docker MySQL já configurado no `docker-compose` através de um serviço definido como `db`.
- Tem o papel de fornecer dados para o serviço de back-end.
- Durante a execução dos testes sempre vai ser acessado pelo `sequelize` e via porta `3002` do `localhost`;
- Você também pode conectar a um Cliente MySQL (Workbench, Beekeeper, DBeaver e etc), colocando as credenciais configuradas no `docker-compose` no serviço `db`.

2️⃣ **Back-end:**

- Roda na porta `3001` do `localhost`, porta pela qual o front-end faz requisições por padrão;
- A aplicação é inicializada a partir do arquivo `app/backend/src/server.ts`;
- O `express` é executado e a aplicação ouve a porta que vem das variáveis de ambiente;
- Todas as dependências extras (tal como `joi`, `boom`, `express-async-errors`...) devem ser listadas em `app/backend/packages.npm`.

3️⃣ **Front-end:**

- Roda na porta `3000` do `localhost`;
- O front se comunica com serviço de back-end pela url `http://localhost:3001`.
- Disponibilizado pela trybe.

4️⃣ **Docker:**

- O `docker-compose` tem a responsabilidade de unir todos os serviços conteinerizados (backend, frontend e db) e subir o projeto completo com o comando `npm run compose:up` ou `npm run compose:up:dev`;
</details>

<details>
  <summary><strong>Demo</strong></summary><br />
  
  https://user-images.githubusercontent.com/70448374/216853287-5550cb20-0d01-42da-85c4-c1fc1551faa7.mp4

</details>

<br/>

## Tecnologias
<details>
  <summary><strong>✨ Front-end</strong></summary><br />

- [HTML5][html5-url]
- [CSS3][css3-url]
- [JavaScript][javascript-url]
- [React.js][react-url]
- [React Router][react-router-url]
- [Axios][axios-url]
- [dotenv][dotenv-url]

---

</details>

<details>
  <summary><strong>⚙️ Back-end</strong></summary><br />

- [Node.js][node-url]
- [Typescript][typescript-url]
- [MySQL][mysql-url]
- [Express][express-url]
- [Sequelize][sequelize-url]
- [JWT][jwt-url]
- [Bcryptjs][bcryptjs-url]
- [dotenv][dotenv-url]

---

</details>

<details>
  <summary><strong>🧪 Testes</strong></summary><br />

- [Chai][chai-url]
- [Mocha][mocha-url]
- [Sinon.js][sinon-url]

---

</details>

<br/>

## Funcionalidades

<ul>
  <li>Há três maneiras de visualizar a classificação: geral (que engloba todas as partidas), jogos como mandante e jogos como visitante.</li>
  <li>Consultar todos os jogos do campeonato, sendo possível visualizar o resultado dos jogos finalizados e dos que ainda estão em andamento.</li>
  <li>Com o usuário <strong>admin</strong> logado, é possível editar os placares das partidas em andamento e finalizá-las. Jogos já finalizados não podem ser alterados.</li>
  <li>Com o usuário <strong>admin</strong> logado, é possível adicionar uma nova partida.</li>
</ul>

<br/>

## Como Executar o Projeto

Para rodar o projeto localmente, siga os passos abaixo.

1. Verifique se a sua máquina possui as configurações mínimas para execução do projeto;

- Sistema Operacional Distribuição Unix;
- Node versão igual ou superior à `16.14.0 LTS`;
- Docker;
- Docker-compose versão igual ou superior à `1.29.2`.

2. Clone o repositório;

```
git clone https://github.com/RuhamLeal/football-board-app.git
```

3. Navegue até a raiz do projeto;

```
cd ./football-board-app
```

4. Na raiz do projeto, instale as dependências com o comando abaixo;

```
npm run postinstall
```

5. Na raiz do projeto, vá até a diretório `app` e execute o comando abaixo para subir os containers. Ao fazê-lo, três containers serão inicializados:

- **app_backend**: referente ao back-end;
- **app_frontend**: referente ao front-end;
- **db**: referente ao banco de dados.

```
cd app/ && npm run compose:up:dev
```

6. No navegador, visite `http://localhost:3000`. Se tudo ocorreu bem, será possível utilizar a aplicação.

<details>
  <summary><strong>tests+</strong></summary><br />

- Para executar os testes do back-end, vá até o diretório `app/backend/` e utilize o comando abaixo.

```
npm run test:coverage
```

- Para inicializar a aplicação fora do container e conectar com seu banco local, siga os passos abaixo.

1. Vá até o diretório `app/backend/`;
2. Renomeie o arquivo `.env.example` para `.env`;
3. Configure os valores de acordo com o cenário do seu ambiente (credenciais de banco de dados, secrets desejadas e etc).
</details>


<br/>

## Habilidades

<ul>
  <li>Modelagem de dados com Sequelize e Typescript.</li>
  <li>Aplicação do conceito de arquitetura de software MSC (Model-Service-Controller).</li>
  <li>Configuração de Dockerfiles para back-end e front-end.</li>
  <li>Aplicação do Desenvolvimento Orientado a Testes (TDD).</li>
  <li>Criação de testes de integração.</li>
  <li>Aplicação dos princípios de Paradigma de Orientação a Objetos (POO).</li>
  <li>Aplicação dos princípios de SOLID.</li>
</ul>

<br/>

## Contato

[![Linkedin][linkedin-badge]][linkedin-url]

<p align="right"><a href="#readme-top">Voltar ao topo</a></p>

<!-- MARKDOWN LINKS & IMAGES -->

[axios-url]: https://axios-http.com/docs/intro
[bcryptjs-url]: https://www.npmjs.com/package/bcryptjs
[chai-url]: https://www.chaijs.com/
[cors-url]: https://www.npmjs.com/package/cors
[css3-url]: https://developer.mozilla.org/en-US/docs/Web/CSS
[docker-url]: https://www.docker.com/
[dotenv-url]: https://www.dotenv.org/
[eslint-url]: https://eslint.org/
[express-url]: https://expressjs.com/
[html5-url]: https://developer.mozilla.org/en-US/docs/Web/HTML
[javascript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[jest-url]: https://jestjs.io/
[jwt-url]: https://jwt.io/
[mocha-url]: https://mochajs.org/
[mysql-url]: https://www.mysql.com/
[node-url]: https://nodejs.org/en/
[react-url]: https://reactjs.org/
[react-router-url]: https://reactrouter.com/en/main
[sequelize-url]: https://sequelize.org/
[sinon-url]: https://sinonjs.org/
[typescript-url]: https://www.typescriptlang.org/
[linkedin-badge]: https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white
[linkedin-url]: https://www.linkedin.com/in/ruham-leal/
