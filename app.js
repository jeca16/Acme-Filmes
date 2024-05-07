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
const controllerAtores = require('./controller/controller_atores.js')
const controllerGenero = require('./controller/controller_genero.js')
const controllerClassificacao = require('./controller/controller_classificacao.js')
const controllerDiretores = require('./controller/controller_diretores.js')

/******************************************************************************/


/************************ filmes ************************ */
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

app.post('/v2/AcmeFilmes/filme', cors(), bodyParserJSON, async function(request, response, next){

    let contentType = request.headers['content-type']
    
    // receb dados encaminhados na requisição do body (ja vem em json)
    let dadosBody = request.body
    

    // encaminha dados para a controller enviar para o bd
    let resultDados = await controllerFilmes.setInserirNovoFilme(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
} )

app.delete('/v2/AcmeFilmes/filmes/delete/:id', cors(), async function(request, response, next){
    let id = request.params.id
    let filmeDeleted = await controllerFilmes.setExcluirFilme(id)

    response.status(filmeDeleted.status_code)
    response.json(filmeDeleted.message)
})

app.put('/v2/AcmeFilmes/filmes/:id', cors(), bodyParserJSON, async function(request, response, next){
    
    // receb dados encaminhados na requisição do body (ja vem em json)
    let dadosFilme = request.body
    let id = request.params.id
    let contentType = request.headers['content-type']
    

    // encaminha dados para a controller enviar para o bd
    let resultDados = await controllerFilmes.setAtualizarFilme(dadosFilme, id, contentType)

    

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.get('/v2/acmefilmes/filme/nome', cors(), async function(request, response,){

    let filmeNome = request.query.nome
    let dadosFilmes = await controllerFilmes.getBuscarFilmeNome(filmeNome);
    response.status(dadosFilmes.status_code);
    response.json(dadosFilmes)
})




/************************ Genero ************************ */
app.post('/v2/AcmeFilmes/genero', cors(), bodyParserJSON, async function(request, response, next){

    let contentType = request.headers['content-type']
    
    // receb dados encaminhados na requisição do body (ja vem em json)
    let dadosGenero = request.body
    

    // encaminha dados para a controller enviar para o bd
    let resultDados = await controllerGenero.setInserirNovoGenero(dadosGenero, contentType)
    

    response.status(resultDados.status_code)
    response.json(resultDados)
} )

app.get('/v2/AcmeFilmes/generos', cors(), bodyParserJSON, async function(request, response, next){
    let dadosGenero = await controllerGenero.getListarGenero()

    response.status(dadosGenero.status_code)
    response.json(dadosGenero)
})

app.put('/v2/AcmeFilmes/genero/:id', cors(), bodyParserJSON, async function(request, response, next){

    let dadosGenero = request.body
    let id_genero = request.params.id
    let contentType = request.headers['content-type']

    let resultDadosGenero = await controllerGenero.setAtualizarGenero(dadosGenero, id_genero, contentType)

    response.status(resultDadosGenero.status_code)
    response.json(resultDadosGenero)
})

app.delete('/v2/AcmeFilmes/genero/delete/:id', cors(), async function(request, response, next){
    let id_genero = request.params.id
    let generoDeleted = await controllerGenero.setExcluirGenero(id_genero)

    response.status(generoDeleted.status_code)
    response.json(generoDeleted.message)
})

app.get('/v2/AcmeFilmes/generos/:id', cors(), async function(request, response, next){
    let idGenero = request.params.id
    let dadosGenero = await controllerGenero.getBuscarGenero(idGenero)

    response.status(dadosGenero.status_code)
    response.json(dadosGenero)
   
})





/************************ classificação ************************ */
app.get('/v2/AcmeFilmes/classificacoes', cors(), bodyParserJSON, async function (request, response, next){
    let dadosClassificacao = await controllerClassificacao.getListarClassificacao()

    response.status(dadosClassificacao.status_code)
    response.json(dadosClassificacao)
})

app.get('/v2/AcmeFilmes/classificacao/:id', cors(), bodyParserJSON, async function( request, response, next){
    let idClassificacao = request.params.id
    let dadosClassificacao = await controllerClassificacao.getBuscarclassificacao(idClassificacao)

    response.status(dadosClassificacao.status_code)
    response.json(dadosClassificacao)
})

app.put('/v2/AcmeFilmes/atualizar/classificacao/:id', cors(), bodyParserJSON, async function (request, response, next){
    let dadosClassificacao = request.body
    let id_classificacao = request.params.id
    let contentType = request.headers['content-type']

    let resultDadosClassificacao = await controllerClassificacao.setAtualizarClassificacao(dadosClassificacao, id_classificacao, contentType)
    response.status(resultDadosClassificacao.status_code)
    response.json(resultDadosClassificacao)
})

app.delete('/v2/AcmeFilmes/deletar/classificacao/:id', cors(), bodyParserJSON, async function (request, response, next){
    let id_classificacao = request.params.id
    let classificacaoDeleted = await controllerClassificacao.setExcluirClassificacao(id_classificacao)

    response.status(classificacaoDeleted.status_code)
    response.json(classificacaoDeleted.message)
})

app.post('/v2/AcmeFilmes/classificacao', cors(), bodyParserJSON, async function (request, response, next){
    let contentType = request.headers['content-type']
    
    // receb dados encaminhados na requisição do body (ja vem em json)
    let dadosClassificacao = request.body
    

    // encaminha dados para a controller enviar para o bd
    let resultDados = await controllerClassificacao.setInserirNovaClassificacao(dadosClassificacao, contentType)
    

    response.status(resultDados.status_code)
    response.json(resultDados)
})




/************************ Atores ************************ */

app.get('/v2/AcmeFilmes/atores', cors(), bodyParserJSON, async function (request, response, next){
    let dadosAtor = await controllerAtores.getListarAtores()

    response.status(dadosAtor.status_code)
    response.json(dadosAtor)
})

app.get('/v2/AcmeFilmes/atores/:id', cors(), bodyParserJSON, async function(request, response, next){
    let idAtor = request.params.id
    let dadosAtor = await controllerAtores.getBuscarAtor(idAtor)

    response.status(dadosAtor.status_code)
    response.json(dadosAtor)
})

app.delete('/v2/AcmeFilmes/deletar/atores/:id', cors(), bodyParserJSON, async function(request, response, next){
    let id_ator = request.params.id
    let atorDeleted = await controllerAtores.setExcluirAtor(id_ator)

    response.status(atorDeleted.status_code)
    response.json(atorDeleted.message)
})

app.put('/v2/AcmeFilmes/atualizar/ator/:id', cors(), bodyParserJSON, async function(request, response, next){
    let dadosAtor = request.body
    let id_ator = request.params.id
    let contentType = request.headers['content-type']

    let resultDadosAtor = await controllerAtores.setAtualizarAtor(dadosAtor, id_ator, contentType)
    response.status(resultDadosAtor.status_code)
    response.json(resultDadosAtor)
})

app.post('/v2/AcmeFilmes/novoAtor', cors(), bodyParserJSON, async function (request, response, next){
    let contentType = request.headers['content-type']
    
    // receb dados encaminhados na requisição do body (ja vem em json)
    let dadosAtor = request.body
    

    // encaminha dados para a controller enviar para o bd
    let resultDados = await controllerAtores.setInserirNovoAtor(dadosAtor, contentType)
    

    response.status(resultDados.status_code)
    response.json(resultDados)
})



/************************ Diretores ************************ */

app.get('/v2/AcmeFilmes/diretores', cors(), bodyParserJSON, async function (request, response, next){
    let dadosDiretor = await controllerDiretores.getListarDiretores()

    response.status(dadosDiretor.status_code)
    response.json(dadosDiretor)
})

app.get('/v2/AcmeFilmes/diretores/:id', cors(), bodyParserJSON, async function(request, response, next){
    let idDiretor = request.params.id
    let dadosDiretor = await controllerDiretores.getBuscarDiretor(idDiretor)

    response.status(dadosDiretor.status_code)
    response.json(dadosDiretor)
})

app.delete('/v2/AcmeFilmes/deletar/diretores/:id', cors(), bodyParserJSON, async function(request, response, next){
    let id_diretor = request.params.id
    let diretorDeleted = await controllerDiretores.setExcluirDiretor(id_diretor)

    response.status(diretorDeleted.status_code)
    response.json(diretorDeleted.message)
})

app.put('/v2/AcmeFilmes/atualizar/diretor/:id', cors(), bodyParserJSON, async function(request, response, next){
    let dadosDiretor = request.body
    let id_diretor = request.params.id
    let contentType = request.headers['content-type']

    let resultDadosDiretor = await controllerDiretores.setAtualizarDiretor(dadosDiretor, id_diretor, contentType)
    response.status(resultDadosDiretor.status_code)
    response.json(resultDadosDiretor)
})

app.post('/v2/AcmeFilmes/novoDiretor', cors(), bodyParserJSON, async function (request, response, next){
    let contentType = request.headers['content-type']
    
    // receb dados encaminhados na requisição do body (ja vem em json)
    let dadosDiretor = request.body
    

    // encaminha dados para a controller enviar para o bd
    let resultDados = await controllerDiretores.setInserirNovoDiretor(dadosDiretor, contentType)
    

    response.status(resultDados.status_code)
    response.json(resultDados)
})



app.listen(8080, function () {
    console.log('API funcionando e aguardando requisições')
})
