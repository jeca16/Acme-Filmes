/**********************************************************************************************
 * objetivo: arquivo responsavel pela interacao entre o app e a  model,                       *
 * que teremos todas as tratativas e regra de negocio para o crud de atores                   *
 *                                                                                            *
 * data: 23/01/24                                                                             *
 * autor: Jessica Pereira dos Santos                                                          *
 * versão:1.0                                                                                 *
 *********************************************************************************************/
const message = require('../modulo/config.js')
const FilmesDAO = require('../model/DAO/atores.js')

/************************ Atores ************************ */

const setInserirNovoAtor = async function (dadosAtor, contentType){

    try {
        if (String(contentType).toLowerCase() == 'application/json') {

            let resultDadosAtor = {}

            if (dadosAtor.nome_ator == '' || dadosAtor.nome_ator == undefined || dadosAtor.nome_ator.length > 200 ||
                dadosAtor.sobre_ator == '' || dadosAtor.sobre_ator == undefined || dadosAtor.sobre_ator.length > 65000 ||
                dadosAtor.sexo_id == '' || dadosAtor.sexo_id == undefined || dadosAtor.sexo_id.length > 1 ||
                dadosAtor.data_nascimento == '' || dadosAtor.data_nascimento == undefined || dadosAtor.data_nascimento.length > 10 ||
                dadosAtor.foto_ator == '' || dadosAtor.foto_ator == undefined || dadosAtor.foto_ator.length > 200 
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {

                let dadosValidated = false;

                if (dadosAtor.data_falecimento != null &&
                    dadosAtor.data_falecimento != undefined &&
                    dadosAtor.data_falecimento != '') {
                    if (dadosAtor.data_falecimento.length > 6) {
                        return message.ERROR_REQUIRED_FIELDS
                    } else {
                        dadosValidated = true
                    }
                } else {
                    dadosValidated = true
                }

                if (dadosValidated == true) {
                    let novoAtor = await FilmesDAO.inserirAtor(dadosAtor)
                    let idNovoAtor = await FilmesDAO.idAtor()
                   
                    if (novoAtor) {
                        resultDadosAtor.status = message.SUCCESS_CREATED_ITEM.status,
                        resultDadosAtor.status_code = message.SUCCESS_CREATED_ITEM.status_code,
                        resultDadosAtor.message = message.SUCCESS_CREATED_ITEM.message,
                        resultDadosAtor.ator = dadosAtor
                        resultDadosAtor.ator.id = idNovoAtor

                        return resultDadosAtor
                        
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

const setAtualizarAtor = async function (dadosAtor, idAtor, contentType){
    try {
        if (String(contentType).toLowerCase() == 'application/json') {

            let resultDadosAtor = {}

            if (dadosAtor.nome_ator       == '' || dadosAtor.nome_ator       == undefined || dadosAtor.nome_ator     > 200 ||
                dadosAtor.sobre_ator      == '' || dadosAtor.sobre_ator      == undefined || dadosAtor.sobre_ator  > 65000 ||
                dadosAtor.sexo_id         == '' || dadosAtor.sexo_id         == undefined || dadosAtor.sexo_id         > 1 ||
                dadosAtor.data_nascimento == '' || dadosAtor.data_nascimento == undefined || dadosAtor.data_nascimento > 10||
                dadosAtor.foto_ator       == '' || dadosAtor.foto_ator       == undefined || dadosAtor.foto_ator.length > 200 ) {

                return message.ERROR_REQUIRED_FIELDS

                
            }else{

                let novoAtor = await FilmesDAO.updateAtor(dadosAtor, idAtor)
                
                if (novoAtor) {
                    resultDadosAtor.status = message.SUCCESS_CREATED_ITEM.status,
                    resultDadosAtor.status_code = message.SUCCESS_CREATED_ITEM.status_code,
                    resultDadosAtor.message = message.SUCCESS_CREATED_ITEM.message,
                    resultDadosAtor.classificacao = dadosAtor
                    
                    return resultDadosAtor
                } else {
                    return message.ERROR_INTERNAL_SERVER_BD
                }
            }
        }
    } catch (error) {
        
    }
}

const setExcluirAtor = async function (id_ator){
    try {
        let idAtor = id_ator

        if (idAtor == '' || idAtor == undefined || isNaN(idAtor)) {
            return message.ERROR_INVALID_ID
        } else {
            let dadosAtor = await FilmesDAO.deleteAtor(idAtor)

            if (dadosAtor) {
                return message.SUCCESS_DELETED_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER_BD
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const getListarAtores = async function (){
    try {

        // cria uma variavel tipo json
        let AtoresJson = {}

        // chama a função do DAO para buscar os dados no banco de dados
        let dadosAtores = await FilmesDAO.selectAllAtores()

        // verifica se existe, dados retornados do DAO
        if (dadosAtores.length > 0) {

            AtoresJson.atores = dadosAtores;
            AtoresJson.quantidade = dadosAtores.length;
            AtoresJson.status_code = 200;
           
            return AtoresJson
        } else {
            return message.ERROR_INTERNAL_SERVER_BD
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarAtor = async function (atorId){
    try {
        let idAtor = atorId
        let AtoresJSON = {}

        let dadosAtor = await FilmesDAO.selectByIdAtor(idAtor)

        if (dadosAtor) {
            if (dadosAtor.length > 0) {
                AtoresJSON.ator =  dadosAtor,
                AtoresJSON.status_code = 200

                return AtoresJSON
            }else{
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_BD
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarAtorNome = async function (search){
}


module.exports = {
    setInserirNovoAtor,
    getListarAtores,
    getBuscarAtor,
    setExcluirAtor,
    setAtualizarAtor
}