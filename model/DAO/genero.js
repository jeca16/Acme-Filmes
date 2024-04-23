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

const idNovoGenero = async function(){
    let idGenero = `select CAST( last_insert_id() AS DECIMAL) as id from tbl_genero limit 1;`
    let idGeneros = await prisma.$queryRawUnsafe(idGenero)

    return idGeneros
}

const selectAllgenero = async function(){
    try {
        // script sql para listar os registros 
        let sql = 'select * from tbl_genero order by id_genero desc';

        let resultGenero = await prisma.$queryRawUnsafe(sql);
        return resultGenero
    } catch (error) {
        return false
    }
}

const atualizarGenero = async function (dadosGenero, id_genero){
    try {
        let sql = `UPDATE tbl_genero
                    SET nome_genero ='${dadosGenero.nome_genero}'
                    WHERE id_genero = '${id_genero}'`

        let generoAtualizado = await prisma.$executeRawUnsafe(sql)
        if (generoAtualizado) {
            return true
        } else {
            return false

        }
        
    } catch (error) {
        return false
    }
}

const deleteGenero = async function (id_genero){
    try {
        let sql = `delete from tbl_genero where id_genero = ${id_genero}`

        let genero = await prisma.$executeRawUnsafe(sql)
        return genero

    } catch (error) {
        return false
    }
}

const selectByIdGenero = async function (id_genero){
    try {
        // realiza a busca do filme pelo id
        let sql = `select * from tbl_genero where id_genero = ${id_genero}`

        // executa no banco de dados o script sql
        let rsGenero = await prisma.$queryRawUnsafe(sql)
        return rsGenero

    } catch (error) {
        return false
    }
}

// const selectByNameGenero =  async function (search){
//     try {
//         const sql = `select id_genero,REPLACE(nome_genero,"${coringa}","'") from tbl_filme WHERE nome LIKE "%${search}%"`;
//         let rsGenero = await prisma.$queryRawUnsafe(sql);
//         return rsGenero
//     } catch (error) {
//         return false
//     }
// }

module.exports = {
    inserirNovoGenero,
    idNovoGenero,
    selectAllgenero,
    atualizarGenero,
    deleteGenero,
    selectByIdGenero
    // selectByNameGenero
}