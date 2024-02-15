/*****************************************************************************
 * objetivo: fazer funções de acordo com o que foi instruido                 *
 * data: 23/01/24                                                            *
 * autor: Jessica Pereira dos Santos                                         *
 * versão:1.0                                                                *
 ****************************************************************************/

var Filmes = require('../modulo/filmes')

// fazer uma função para listar todos os filmes 
const getListarFilmes = function (){

    return Filmes.filmes.filmes
}

// fazer uma função para listar o filme de acordo com o id escolhido
const getFilmesId = function (id){
    let dados
    Filmes.filmes.filmes.forEach(function(detalhes_filme){
        if(id == detalhes_filme.id){
            dados = detalhes_filme
        }
    })

    return dados
}

const getFilmesNome = function (nome){
    let info
    Filmes.filmes.filmes.forEach(function(infoFilme){
        if(nome == infoFilme.nome){
            info = infoFilme
        }
    })

    return info
}

module.exports = {
    getListarFilmes,
    getFilmesId,
    getFilmesNome
}
