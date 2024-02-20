/**********************************************************************************************
 * objetivo: arquivo responsavel pelas configurações globais de mensagens, valores e          *
 * conteudos para o projeto                                                                   *
 * data: 20/02/24                                                                             *
 * autor: Jessica Pereira dos Santos                                                          *
 * versão:1.0                                                                                 *
 *********************************************************************************************/

/*************** Mensagens de erro ***************/
const ERROR_INVALID_ID = {status: false, status_code: 400, message: 'O id informado na requisição não é válido!!! '}

const ERROR_NOT_FOUND = {status: false, status_code: 404, message: 'Nenhum item encontrado na requisição!!!'}

const ERROR_INTERNAL_SERVER_BD = {status:false, status_code: 500, message: 'Ocorreram erros internos no servidor de banco de dados, por favor contate o administradir do sistema'}

module.exports = {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_BD
}