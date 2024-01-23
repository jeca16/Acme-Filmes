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
    Filmes.filmes.filmes.forEach(function(detalhes_filme){
        if(id == detalhes_filme.id){
            return detalhes_filme
        }
    })
}

module.exports = {
    getListarFilmes,
    getFilmesId
}
