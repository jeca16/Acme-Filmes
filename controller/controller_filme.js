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
const setInserirNovoFilme = async function (dadosFilme, contentType) {


    try {
        if (String(contentType).toLowerCase() == 'application/json') {

            let resultDadosFilme = {}

            if (dadosFilme.nome == '' || dadosFilme.nome == undefined || dadosFilme.nome.length > 80 ||
                dadosFilme.sinopse == '' || dadosFilme.sinopse == undefined || dadosFilme.sinopse.length > 65000 ||
                dadosFilme.duracao == '' || dadosFilme.duracao == undefined || dadosFilme.duracao.length > 8 ||
                dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento.length != 10 ||
                dadosFilme.foto_capa == '' || dadosFilme.foto_capa == undefined || dadosFilme.foto_capa.length > 200 ||
                dadosFilme.valor_unitario.length > 8
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {

                let dadosValidated = false;

                if (dadosFilme.data_relancamento != null &&
                    dadosFilme.data_relancamento != undefined &&
                    dadosFilme.data_relancamento != '') {
                    if (dadosFilme.data_relancamento.length != 10) {
                        return message.ERROR_REQUIRED_FIELDS
                    } else {
                        dadosValidated = true
                    }
                } else {
                    dadosValidated = true
                }

                if (dadosValidated == true) {
                    let novoFilme = await FilmesDAO.insertFilme(dadosFilme)
                    let idNovoFilme = await FilmesDAO.idFilme()


                    if (novoFilme) {
                        resultDadosFilme.status = message.SUCCESS_CREATED_ITEM.status,
                            resultDadosFilme.status_code = message.SUCCESS_CREATED_ITEM.status_code,
                            resultDadosFilme.message = message.SUCCESS_CREATED_ITEM.message,
                            resultDadosFilme.filme = dadosFilme
                        resultDadosFilme.filme.id = idNovoFilme

                        return resultDadosFilme
                    } else {
                        return message.ERROR_INTERNAL_SERVER_BD
                    }
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }

}

// funcao para atualizar um filme eistente
const setAtualizarFilme = async function () {

}

// funcao para excluir um filme existente 
const setExcluirFilme = async function (id) {

    try {
        let idFilme = id

        if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
            return message.ERROR_INVALID_ID
        } else {
            let dadosFilme = await FilmesDAO.deleteFilme(idFilme)

            if (dadosFilme) {
                return message.SUCCESS_DELETED_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER_BD
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

// funcao para retor todos os filmes do banco de dados
const getListarFilmes = async function () {

    try {

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
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}


// funcao para buscar um filme pelo id 
const getBuscarFilme = async function (id) {

    try {
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
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

module.exports = {
    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilme
}

