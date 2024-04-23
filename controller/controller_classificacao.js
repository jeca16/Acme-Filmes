/**********************************************************************************************
 * objetivo: arquivo responsavel pela interacao entre o app e a  model,                       *
 * que teremos todas as tratativas e regra de negocio para o crud de filmes                   *
 *                                                                                            *
 * data: 23/01/24                                                                             *
 * autor: Jessica Pereira dos Santos                                                          *
 * versão:1.0                                                                                 *
 *********************************************************************************************/
const message = require('../modulo/config.js')
const FilmesDAO = require('../model/DAO/classificacao.js')

const setInserirNovaClassificacao = async function (dadosClassificacao, contentType){
    try {
    
        if (String(contentType).toLowerCase() == 'application/json') {

            let resultDadosClassificacao = {}

            if (dadosClassificacao.sigla_classificacao == ''     || dadosClassificacao.sigla_classificacao == undefined     || dadosClassificacao.sigla_classificacao > 45  ||
                dadosClassificacao.icone_classificacao == ''     || dadosClassificacao.icone_classificacao == undefined     || dadosClassificacao.icone_classificacao > 200 ||
                dadosClassificacao.aviso_classificacao == ''     || dadosClassificacao.aviso_classificacao == undefined     || dadosClassificacao.aviso_classificacao > 150 ||
                dadosClassificacao.descricao_classificacao == '' || dadosClassificacao.descricao_classificacao == undefined || dadosClassificacao.descricao_classificacao > 200 ) {
                return message.ERROR_REQUIRED_FIELDS
            }else{

                let novaClassificacao = await FilmesDAO.inserirNovaClassificacao(dadosClassificacao)
                
                let idNovaClassificacao = await FilmesDAO.idNovaClassificacao() 

                if (novaClassificacao) {
                    resultDadosClassificacao.status = message.SUCCESS_CREATED_ITEM.status,
                    resultDadosClassificacao.status_code = message.SUCCESS_CREATED_ITEM.status_code,
                    resultDadosClassificacao.message = message.SUCCESS_CREATED_ITEM.message,
                    resultDadosClassificacao.classificacao = dadosClassificacao
                    resultDadosClassificacao.classificacao.id_classificacao = idNovaClassificacao

                    return resultDadosClassificacao
                } else {
                    return message.ERROR_INTERNAL_SERVER_BD
                }
            }
        }
    } catch (error) {
        
    }
}

const setAtualizarClassificacao = async function (dadosClassificacao, id_classificacao, contentType){
    try {
        if (String(contentType).toLowerCase() == 'application/json') {

            let resultDadosClassificacao = {}

            if (dadosClassificacao.sigla_classificacao == '' || dadosClassificacao.sigla_classificacao == undefined || dadosClassificacao.sigla_classificacao > 45 ||
                dadosClassificacao.icone_classificacao == '' || dadosClassificacao.icone_classificacao == undefined || dadosClassificacao.icone_classificacao > 200 ||
                dadosClassificacao.aviso_classificacao == '' || dadosClassificacao.aviso_classificacao == undefined || dadosClassificacao.aviso_classificacao > 150 ||
                dadosClassificacao.descricao_classificacao == '' || dadosClassificacao.descricao_classificacao == undefined || dadosClassificacao.descricao_classificacao > 200) {

                return message.ERROR_REQUIRED_FIELDS

                
            }else{

                let novaClassificacao = await FilmesDAO.atualizarclassificacao(dadosClassificacao, id_classificacao)
                
                if (novaClassificacao) {
                    resultDadosClassificacao.status = message.SUCCESS_CREATED_ITEM.status,
                    resultDadosClassificacao.status_code = message.SUCCESS_CREATED_ITEM.status_code,
                    resultDadosClassificacao.message = message.SUCCESS_CREATED_ITEM.message,
                    resultDadosClassificacao.classificacao = dadosClassificacao
                    
                    return resultDadosClassificacao
                } else {
                    return message.ERROR_INTERNAL_SERVER_BD
                }
            }
        }
    } catch (error) {
        
    }
}

const setExcluirClassificacao = async function (id_classificacao){
    try {
        let idClassificacao = id_classificacao

        if (idClassificacao == '' || idClassificacao == undefined || isNaN(idClassificacao)) {
            return message.ERROR_INVALID_ID
        } else {
            let dadosClassificacao = await FilmesDAO.deletarClassificacao(idClassificacao)

            if (dadosClassificacao) {
                return message.SUCCESS_DELETED_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER_BD
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const getListarClassificacao = async function (){
    try {

        // cria uma variavel tipo json
        let classificacaoJson = {}

        // chama a função do DAO para buscar os dados no banco de dados
        let dadosClassificacao = await FilmesDAO.listarClassificacao()

        // verifica se existe, dados retornados do DAO
        if (dadosClassificacao) {

            classificacaoJson.classificacao = dadosClassificacao;
            classificacaoJson.quantidade = dadosClassificacao.length;
            classificacaoJson.status_code = 200;

            return classificacaoJson
        } else {

            return message.ERROR_INTERNAL_SERVER_BD
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarclassificacao = async function (id_classificacao){
    try {
        // recebe o id do filme
        let idClassificacao = id_classificacao
        let classificacaoJSON = {}

        let dadosClassificacao = await FilmesDAO.buscarClassificacaoPeloId(idClassificacao)

        if (dadosClassificacao) {
            if (dadosClassificacao.length > 0) {
                classificacaoJSON.classificacao = dadosClassificacao,
                classificacaoJSON.status_code = 200

                return classificacaoJSON
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

module.exports={
    setInserirNovaClassificacao,
    setAtualizarClassificacao,
    setExcluirClassificacao,
    getListarClassificacao,
    getBuscarclassificacao
}

