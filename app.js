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

/**************** imports de arquivos e bibliotecas do projeto ****************/
const controllerFilmes = require('./controller/controller_filme.js')
/******************************************************************************/
app.get('/v1/AcmeFilmes/filmes', cors(), async function (request, response, next) {
    let listarFilmes = require('./controller/funções')
    let filme = listarFilmes.getListarFilmes()
    response.json(filme)
    response.status(200)
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

app.get('/v2/AcmeFilmes/filmes', cors(), async function (request, response, next) {

    let dadosFilmes = await controllerFilmes.getListarFilmes()

    if (dadosFilmes) {
        response.json(dadosFilmes)
        response.status(200);
    } else {
        response.json({ message: 'nenhum registro encontrado' })
        response.status(404)
    }
})

app.get('/v2/AcmeFilmes/filmes/filtro', cors(), async function (request, response, next) {
    let nomeFilme = request.query.nomeDoFilme
    let infoFilmes = await controllerFilmes.getFilmeNome(nomeFilme)

    if (infoFilmes) {
        response.json(infoFilmes)
        response.status(200);
    } else {
        response.json({ message: 'nenhum registro encontrado' })
        response.status(404)
    }

})


app.listen(8080, function () {
    console.log('API funcionando e aguardando requisições')
})
