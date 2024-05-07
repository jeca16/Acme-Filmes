/**********************************************************************************************
 * objetivo: arquivo responsavel pela interacao entre o app e a  model,                       *
 * que teremos todas as tratativas e regra de negocio para o crud de diretores                *
 *                                                                                            *
 * data: 23/01/24                                                                             *
 * autor: Jessica Pereira dos Santos                                                          *
 * versão:1.0                                                                                 *
 *********************************************************************************************/
const message = require('../modulo/config.js')
const FilmesDAO = require('../model/DAO/diretores.js')

/************************ Atores ************************ */

const setInserirNovoDiretor = async function (dadosDiretor, contentType){

    try {
        if (String(contentType).toLowerCase() == 'application/json') {

            let resultDadosDiretor = {}

            if (dadosDiretor.nome_diretor == '' || dadosDiretor.nome_diretor == undefined || dadosDiretor.nome_diretor.length > 200 ||
                dadosDiretor.sobre_diretor == '' || dadosDiretor.sobre_diretor == undefined || dadosDiretor.sobre_diretor.length > 65000 ||
                dadosDiretor.sexo_id == '' || dadosDiretor.sexo_id == undefined || dadosDiretor.sexo_id.length > 1 ||
                dadosDiretor.data_nascimento == '' || dadosDiretor.data_nascimento == undefined || dadosDiretor.data_nascimento.length > 10 ||
                dadosDiretor.foto_diretor == '' || dadosDiretor.foto_diretor == undefined || dadosDiretor.foto_diretor.length > 200 
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {

                let dadosValidated = false;

                if (dadosDiretor.data_falecimento != null &&
                    dadosDiretor.data_falecimento != undefined &&
                    dadosDiretor.data_falecimento != '') {
                    if (dadosDiretor.data_falecimento.length > 6) {
                        return message.ERROR_REQUIRED_FIELDS
                    } else {
                        dadosValidated = true
                    }
                } else {
                    dadosValidated = true
                }

                if (dadosValidated == true) {
                    let novoDiretor = await FilmesDAO.inserirDiretor(dadosDiretor)
                    let idNovoDiretor = await FilmesDAO.idDiretor()
                   
                    if (novoDiretor) {
                        resultDadosDiretor.status = message.SUCCESS_CREATED_ITEM.status,
                        resultDadosDiretor.status_code = message.SUCCESS_CREATED_ITEM.status_code,
                        resultDadosDiretor.message = message.SUCCESS_CREATED_ITEM.message,
                        resultDadosDiretor.ator = dadosDiretor
                        resultDadosDiretor.ator.id = idNovoDiretor

                        return resultDadosDiretor
                        
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

const setAtualizarDiretor = async function (dadosDiretor, idDiretor, contentType){
    try {
        if (String(contentType).toLowerCase() == 'application/json') {

            let resultDadosdiretor = {}

            if (dadosDiretor.nome_diretor       == '' || dadosDiretor.nome_diretor       == undefined || dadosDiretor.nome_diretor     > 200 ||
                dadosDiretor.sobre_diretor      == '' || dadosDiretor.sobre_diretor      == undefined || dadosDiretor.sobre_diretor  > 65000 ||
                dadosDiretor.sexo_id            == '' || dadosDiretor.sexo_id            == undefined || dadosDiretor.sexo_id            > 1 ||
                dadosDiretor.data_nascimento    == '' || dadosDiretor.data_nascimento    == undefined || dadosDiretor.data_nascimento    > 10||
                dadosDiretor.foto_diretor       == '' || dadosDiretor.foto_diretor       == undefined || dadosDiretor.foto_diretor.length > 200 ) {

                return message.ERROR_REQUIRED_FIELDS
                

                
            }else{

                let novoDiretor = await FilmesDAO.updateDiretor(dadosDiretor, idDiretor)
                
                if (novoDiretor) {
                    resultDadosdiretor.status = message.SUCCESS_CREATED_ITEM.status,
                    resultDadosdiretor.status_code = message.SUCCESS_CREATED_ITEM.status_code,
                    resultDadosdiretor.message = message.SUCCESS_CREATED_ITEM.message,
                    resultDadosdiretor.diretor = dadosDiretor
                    
                    return resultDadosdiretor
                } else {
                    return message.ERROR_INTERNAL_SERVER_BD
                }
            }
        }
    } catch (error) {
        
    }
}

const setExcluirDiretor = async function (id_diretor){
    try {
        let idDiretor = id_diretor

        if (idDiretor == '' || idDiretor == undefined || isNaN(idDiretor)) {
            return message.ERROR_INVALID_ID
        } else {
            let dadosDiretor = await FilmesDAO.deleteDiretor(idDiretor)

            if (dadosDiretor) {
                return message.SUCCESS_DELETED_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER_BD
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const getListarDiretores = async function (){
    try {

        // cria uma variavel tipo json
        let DiretoresJson = {}

        // chama a função do DAO para buscar os dados no banco de dados
        let dadosDiretores = await FilmesDAO.selectAllDiretores()

        // verifica se existe, dados retornados do DAO
        if (dadosDiretores.length > 0) {

            DiretoresJson.diretores = dadosDiretores;
            DiretoresJson.quantidade = dadosDiretores.length;
            DiretoresJson.status_code = 200;
           
            return DiretoresJson
        } else {
            return message.ERROR_INTERNAL_SERVER_BD
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarDiretor = async function (diretorId){
    try {
        let idDiretor = diretorId
        let DiretoresJSON = {}

        let dadosDiretor = await FilmesDAO.selectByIdDiretor(idDiretor)

        if (dadosDiretor) {
            if (dadosDiretor.length > 0) {
                DiretoresJSON.diretor =  dadosDiretor,
                DiretoresJSON.status_code = 200

                return DiretoresJSON
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




module.exports = {
    setInserirNovoDiretor,
    getListarDiretores,
    getBuscarDiretor,
    setExcluirDiretor,
    setAtualizarDiretor
}