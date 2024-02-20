/**********************************************************************************************
 * objetivo: criar a interacao com o banco de dados MYSQL para fazer o crud de filmes         *
 * data: 23/01/24                                                                             *
 * autor: Jessica Pereira dos Santos                                                          *
 * versão:1.0                                                                                 *
 *********************************************************************************************/
// import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client');

// instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient();

// inserir um novo filme
const insertFilme = async function () {

}

// atualizar um filme existente filtrando pelo id
const updateFilme = async function (id) {

}

// excluir um filme exister filtrando pelo id
const deleteFilme = async function (id) {

}

// lista todos os filmes existentes na tabela 
const selectAllFilmes = async function () {

    try {
        // script sql para listar os registros 
    let sql = 'select * from tbl_filme';

    // $queryRawUnsafe() -  encaminha apenas a variavel
    // $queryRaw('selet *from tbl_filme') - encaminha o script

    // executa o scriptsql no banco de dados e recebe o retorno dos dados na variavel rsFilmes
    let rsFilmes = await prisma.$queryRawUnsafe(sql);
        return rsFilmes
        
    } catch (error) {
        return false
    }
    
}

// const selectByNameFilme = async function (nome) {
//     let nomeFilme = nome
//     let sql = `select * from tbl_filme where nome like '%${nomeFilme}%'`
//     let rsFilmes = await prisma.$queryRawUnsafe(sql);

//     if (rsFilmes.length > 0)
//         return rsFilmes
//     else
//         return false
// }

// buscar o flme existente filtrando pelo id 
const selectByIdFilme = async function (id) {

    try {
        // realiza a busca do filme pelo id
        let sql = `select * from tbl_filme where id = ${id}`

        // executa no banco de dados o script sql
        let rsFilme = await prisma.$queryRawUnsafe(sql)
            return rsFilme
        
    } catch (error) {
        return false
    }


}

module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme
    // selectByNameFilme
}