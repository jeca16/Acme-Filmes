/**********************************************************************************************
 * objetivo: arquivo responsavel pela interacao entre o app e a  model,                       *
 * que teremos todas as tratativas e regra de negocio para o crud de filmes                   *
 *                                                                                            *
 * data: 23/01/24                                                                             *
 * autor: Jessica Pereira dos Santos                                                          *
 * versão:1.0                                                                                 *
 *********************************************************************************************/
const message = require('../modulo/config.js')
const FilmesDAO = require('../model/DAO/genero.js')

const setInserirNovoGenero = async function (dadosGenero, contentType){
    
    try {
    
        if (String(contentType).toLowerCase() == 'application/json') {

            let resultDadosGenero = {}

            if (dadosGenero.nome_genero == '' || dadosGenero.nome_genero == undefined || dadosGenero.nome_genero > 100) {
                return message.ERROR_REQUIRED_FIELDS
            }else{

                let novoGenero = await FilmesDAO.inserirNovoGenero(dadosGenero)
                let idNovoGenero = await FilmesDAO.idNovoGenero() 

                if (novoGenero) {
                    resultDadosGenero.status = message.SUCCESS_CREATED_ITEM.status,
                    resultDadosGenero.status_code = message.SUCCESS_CREATED_ITEM.status_code,
                    resultDadosGenero.message = message.SUCCESS_CREATED_ITEM.message,
                    resultDadosGenero.genero = dadosGenero
                    resultDadosGenero.genero.id = idNovoGenero

                    return resultDadosGenero
                } else {
                    return message.ERROR_INTERNAL_SERVER_BD
                }
            }
        }
    } catch (error) {
        
    }
}

const getListarGenero = async function (){
    try {
        // cria uma variavel tipo json
        let generoJson = {}

        // chama a função do DAO para buscar os dados no banco de dados
        let dadosGeneros = await FilmesDAO.selectAllgenero()

        // verifica se existe, dados retornados do DAO
        if (dadosGeneros) {

            generoJson.genero = dadosGeneros;
            generoJson.quantidade = dadosGeneros.length;
            generoJson.status_code = 200;

            return generoJson
        } else {

            return message.ERROR_INTERNAL_SERVER_BD
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const setAtualizarGenero = async function (dadosGenero, id_genero, contentType){
    try {
    
        if (String(contentType).toLowerCase() == 'application/json') {

            let resultDadosGenero = {}

            if (dadosGenero.nome_genero == '' || dadosGenero.nome_genero == undefined || dadosGenero.nome_genero > 100) {
                return message.ERROR_REQUIRED_FIELDS
            }else{

                let novoGenero = await FilmesDAO.atualizarGenero(dadosGenero, id_genero)
                
                if (novoGenero) {
                    resultDadosGenero.status = message.SUCCESS_CREATED_ITEM.status,
                    resultDadosGenero.status_code = message.SUCCESS_CREATED_ITEM.status_code,
                    resultDadosGenero.message = message.SUCCESS_CREATED_ITEM.message,
                    resultDadosGenero.genero = dadosGenero

                    return resultDadosGenero
                } else {
                    return message.ERROR_INTERNAL_SERVER_BD
                }
            }
        }
    } catch (error) {
        
    }
}

const setExcluirGenero = async function (id_genero){
    try {
        let idGenero = id_genero

        if (idGenero == '' || idGenero == undefined || isNaN(idGenero)) {
            return message.ERROR_INVALID_ID
        } else {
            let dadosGenero = await FilmesDAO.deleteGenero(idGenero)

            if (dadosGenero) {
                return message.SUCCESS_DELETED_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER_BD
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarGenero = async function (id_genero){
    try {
        // recebe o id do filme
        let idGenero = id_genero
        let generoJSON = {}

        let dadosGenero = await FilmesDAO.selectByIdGenero(idGenero)

        if (dadosGenero) {
            if (dadosGenero.length > 0) {
                generoJSON.filme = dadosGenero,
                generoJSON.status_code = 200

                return generoJSON
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

// const getBuscarGeneroNome = async function (search) {
//     let nomeGenero = search
//     console.log(nomeGenero)
//     let generoJSON = {}
//     if (nomeGenero == '' ||nomeGenero == undefined) {
//         return message.ERROR_INVALID_ID; //400
//     } else {
//         let dadosGenero = await FilmesDAO.selectByNameFilme(nomeGenero);
//         if (dadosGenero) {
//             if(dadosGenero.length>0){
//                 generoJSON.filmes = dadosGenero;
//                 generoJSON.quantidade = dadosGenero.length;
//                 generoJSON.status_code = 200;
//                 return generoJSON;
//             } else {
//                 return message.ERROR_NOT_FOUND
//             }
//         } else {
//             return message.ERROR_INTERNAL_SERVER_BD
//         }
//     }

// }


module.exports = {
    setInserirNovoGenero,
    getListarGenero,
    setAtualizarGenero,
    setExcluirGenero,
    getBuscarGenero
    // getBuscarGeneroNome
}