/*****************************************************************************
 * objetivo: arquivo para realizar as aquisicoes de filmes                   *
 * data: 23/01/24                                                            *
 * autor: Jessica Pereira dos Santos                                         *
 * versão:1.0                                                                *
 ****************************************************************************/

/*************************************************************************************
 * para realizar a conexao com o banco de dadps precisamos utilizar uma dependecia:  *
 *       - sequelize ORM                                                             *
 *       - prisma    ORM                                                             *
 *       - fastfy    ORM                                                             *
 *                                                                                   *
 * prisma -  para utilizar o prisma precisamos instar as seguintes dependecias:      *
 *   npm install prisma --save                                                       *
 *   npm install @prisma/client --save                                               *
 *                                                                                   *
 *     apos a instalacao do prisma devemos rodar o comando abaixo para incializar    *
 *                                o prima:                                           *
 *   npx prisma init                                                                 *
*************************************************************************************/




const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { filmes } = require('./modulo/filmes');

const app = express()

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET')

    app.use(cors());

    next();
})

// cria um onjeto do tipo json para recebr o resultados via body nas requisições post ou put
const bodyParserJSON = bodyParser.json()

/**************** imports de arquivos e bibliotecas do projeto ****************/
const controllerFilmes = require('./controller/controller_filme.js')
/******************************************************************************/

app.get('/v1/AcmeFilmes/filmes', cors(), async function (request, response, next) {
    let listarFilmes = require('./controller/funções')
    let filme = listarFilmes.getListarFilmes()
    response.json(filme)
    response.status(200)
})

app.get('/v2/AcmeFilmes/filmes', cors(), async function (request, response, next) {

    let dadosFilmes = await controllerFilmes.getListarFilmes()

    response.status(dadosFilmes.status_code)
    response.json(dadosFilmes)
    
})


app.get('/v1/AcmeFilmes/filme/:id', cors(), async function (request, response, next) {
    let Id = request.params.id
    let FilmesDetalhes = require('./controller/funções')
    let FilmesId = FilmesDetalhes.getFilmesId(Id)

    if (FilmesId) {
        response.json(FilmesId)
        response.status(200)
    } else {
        response.status(404)
        response.json({ erro: "não foi possivel encontrar o filme com este id" })
    }
})

app.get('/v2/AcmeFilmes/filmes/:id', cors(), async function(request, response, next){
    let idFilme = request.params.id
    let dadosFilme = await controllerFilmes.getBuscarFilme(idFilme)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
   
})

// Endpoint: inserir novos filmes no banco de dados
// não esquecer de colocar o bodyParser ja que ele define a forma de chagada dos dados  
app.post('/v2/AcmeFilmes/filme', cors(), bodyParserJSON, async function(request, response, next){

    let contentType = request.headers['content-type']
    
    // receb dados encaminhados na requisição do body (ja vem em json)
    let dadosBody = request.body
    

    // encaminha dados para a controller enviar para o bd
    let resultDados = await controllerFilmes.setInserirNovoFilme(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
} )

app.delete('/v1/AcmeFilmes/filmes/:id', cors(), async function(request, response, next){
    let id = request.params.id
    let filmeDeleted = await controllerFilmes.setExcluirFilme(id)

    response.status(filmeDeleted.status_code)
})

app.listen(8080, function () {
    console.log('API funcionando e aguardando requisições')
})
