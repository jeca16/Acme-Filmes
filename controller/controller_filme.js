/**********************************************************************************************
 * objetivo: arquivo responsavel pela interacao entre o app e a  model,                       *
 * que teremos todas as tratativas e regra de negocio para o crud de filmes                   *
 *                                                                                            *
 * data: 23/01/24                                                                             *
 * autor: Jessica Pereira dos Santos                                                          *
 * versão:1.0                                                                                 *
 *********************************************************************************************/
const FilmesDAO = require('../model/DAO/filme.js')

// funcao para inserir um novo filme no banco de dados 
const setInserirNovoFilme = async function(){

}

// funcao para atualizar um filme eistente
const setAtualizarFilme = async function(){

}

// funcao para excluir um filme existente 
const setExcluirFilme = async function(){

}

// funcao para retor todos os filmes do banco de dados
const getListarFilmes = async function(){

    // cria uma variavel tipo json
    let filmesJson = {}

    // chama a função do DAO para buscar os dados no banco de dados
    let dadosFilmes = await FilmesDAO.selectAllFilmes()

    // verifica se existe, dados retornados do DAO
    if (dadosFilmes){
        // criando o json para retornar para o app
        filmesJson.filmes = dadosFilmes;
        filmesJson.quantidade = dadosFilmes.length;
        filmesJson.status_code = 200;
        // retorna o json montado
        return filmesJson
    }else{
        // return flse quando não houverem dados 
        return false
    }
}

const getFilmeNome = async function(nome){
    let nomeFilme = nome
    let infoFilmeJson = {}
    let info = await FilmesDAO.selectByNameFilme(nomeFilme)

    if(info){
        infoFilmeJson.filmes = info
        infoFilmeJson.status_code = 200;
        return infoFilmeJson
    }else{
        return false
    }
}

// funcao para buscar um filme pelo id 
const getBuscarFilme = async function(){

}

module.exports = {
    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilme,
    getFilmeNome
}

