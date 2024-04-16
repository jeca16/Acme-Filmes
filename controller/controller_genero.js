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
                // let idNovoGenero = await FilmesDAO.idNovoGenero() 

                if (novoGenero) {
                    resultDadosGenero.status = message.SUCCESS_CREATED_ITEM.status,
                    resultDadosGenero.status_code = message.SUCCESS_CREATED_ITEM.status_code,
                    resultDadosGenero.message = message.SUCCESS_CREATED_ITEM.message,
                    resultDadosGenero.genero = dadosGenero
                    // resultDadosGenero.genero.id = idNovoGenero

                    return resultDadosGenero
                } else {
                    return message.ERROR_INTERNAL_SERVER_BD
                }
            }
        }
    } catch (error) {
        
    }
}

module.exports = {
    setInserirNovoGenero
}