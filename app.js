/*****************************************************************************
 * objetivo: fazer dois endpoints de acordo com o que foi instruido          *
 * data: 23/01/24                                                            *
 * autor: Jessica Pereira dos Santos                                         *
 * versão:1.0                                                                *
 ****************************************************************************/


const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { filmes } = require('./modulo/filmes');

const app = express()

app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET')

    app.use(cors());

    next();
})

app.get('/v1/AcmeFilmes/filmes', cors(), async function(request, response, next){
    let listarFilmes = require('./controller/funções')
    let filme = listarFilmes.getListarFilmes()
    response.json(filme)
    response.status(200)
})

app.get('/v1/AcmeFilmes/filme/:id', cors(), async function(request, response,next){
    let Id = request.params.id
    let FilmesDetalhes = require('./controller/funções')
    let FilmesId = FilmesDetalhes.getFilmesId(Id)

    if(FilmesId){
        response.json(FilmesId)
        response.status(200)
    }else{
        response.status(404)
        response.json({erro: "não foi possivel encontrar o filme com este id"})
    }
})
app.listen(8080, function(){
    console.log('API funcionando e aguardando requisições')
})