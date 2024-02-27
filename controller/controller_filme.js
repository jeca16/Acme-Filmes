/**********************************************************************************************
 * objetivo: arquivo responsavel pela interacao entre o app e a  model,                       *
 * que teremos todas as tratativas e regra de negocio para o crud de filmes                   *
 *                                                                                            *
 * data: 23/01/24                                                                             *
 * autor: Jessica Pereira dos Santos                                                          *
 * versão:1.0                                                                                 *
 *********************************************************************************************/
const message = require('../modulo/config.js')
const FilmesDAO = require('../model/DAO/filme.js')

// funcao para inserir um novo filme no banco de dados 
const setInserirNovoFilme = async function (dadosFilme) {

let resultDadosFilme ={}

    if (dadosFilme.nome                   == '' || dadosFilme.nome              == undefined || dadosFilme.nome.length > 80             ||
        dadosFilme.sinopse                == '' || dadosFilme.sinopse           == undefined || dadosFilme.sinopse.length > 65000       ||
        dadosFilme.duracao                == '' || dadosFilme.duracao           == undefined || dadosFilme.duracao.length > 8           ||
        dadosFilme.data_lancamento        == '' || dadosFilme.data_lancamento   == undefined || dadosFilme.data_lancamento.length > 8   ||
        dadosFilme.foto_capa              == '' || dadosFilme.foto_capa         == undefined || dadosFilme.foto_capa.length > 200       ||
        dadosFilme.data_relancamento.length > 8 ||  
        dadosFilme.valor_unitario.length    > 8  
        ){
        return message.ERROR_REQUIRED_FIELDS
    } else{
        let novoFilme = await FilmesDAO.insertFilme (dadosFilme)
        
        if (novoFilme) {
            resultDadosFilme.status         = message.SUCCESS_CREATED_ITEM.status,
            resultDadosFilme.status_code    = message.SUCCESS_CREATED_ITEM.status_code,
            resultDadosFilme.message        = message.SUCCESS_CREATED_ITEM.message,
            resultDadosFilme.filme          = dadosFilme
        }
    }
}

// funcao para atualizar um filme eistente
const setAtualizarFilme = async function () {

}

// funcao para excluir um filme existente 
const setExcluirFilme = async function () {

}

// funcao para retor todos os filmes do banco de dados
const getListarFilmes = async function () {

    // cria uma variavel tipo json
    let filmesJson = {}

    // chama a função do DAO para buscar os dados no banco de dados
    let dadosFilmes = await FilmesDAO.selectAllFilmes()

    // verifica se existe, dados retornados do DAO
    if (dadosFilmes) {
        
        filmesJson.filmes = dadosFilmes;
        filmesJson.quantidade = dadosFilmes.length;
        filmesJson.status_code = 200;
        
        return filmesJson
    } else {
       
        return message.ERROR_INTERNAL_SERVER_BD
    }
}

// const getFilmeNome = async function(nome){
//     let nomeFilme = nome
//     let infoFilmeJson = {}
//     let info = await FilmesDAO.selectByNameFilme(nomeFilme)

//     if(info){
//         infoFilmeJson.filmes = info
//         infoFilmeJson.status_code = 200;
//         return infoFilmeJson
//     }else{
//         return false
//     }
// }





// funcao para buscar um filme pelo id 
const getBuscarFilme = async function (id) {

    // recebe o id do filme
    let idFilme = id
    let filmeJSON = {}

    let dadosFilme = await FilmesDAO.selectByIdFilme(idFilme)

    if (dadosFilme) {
        if (dadosFilme.length > 0) {
            filmeJSON.filme = dadosFilme,
                filmeJSON.status_code = 200

            return filmeJSON
        } else {
            return message.ERROR_NOT_FOUND
        }

    } else {
        return message.ERROR_INTERNAL_SERVER_BD
    }


}

module.exports = {
    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilme
}

