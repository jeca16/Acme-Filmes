/**********************************************************************************************
 * objetivo: criar a interacao com o banco de dados MYSQL para fazer o crud de filmes         *
 * data: 23/01/24                                                                             *
 * autor: Jessica Pereira dos Santos                                                          *
 * versão:1.0                                                                                 *
 *********************************************************************************************/
// o unico que usa o query é o select, todos os outros scripts usam execute
// import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client');

// instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient()

const inserirNovoGenero = async function (dadosGenero){
    
    try {
        let sql = `insert into tbl_genero (nome_genero) values ('${dadosGenero.nome_genero}')`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            
            return true
        } else {
            return false

        }
    } catch (error) {
        return false
    }
}

module.exports = {
    inserirNovoGenero
}