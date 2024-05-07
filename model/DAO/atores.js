/**********************************************************************************************
 * objetivo: criar a interacao com o banco de dados MYSQL para fazer o crud de atores         *
 * data: 23/01/24                                                                             *
 * autor: Jessica Pereira dos Santos                                                          *
 * versão:1.0                                                                                 *
 *********************************************************************************************/
// o unico que usa o query é o select, todos os outros scripts usam execute
// import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client');

// instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient()

/************************ Atores ************************ */

const inserirAtor  = async function(dadosAtor){
    try {
        let sql

        if (dadosAtor.data_falecimento == null || dadosAtor.data_falecimento == '' || dadosAtor.data_falecimento == undefined) {
            sql = ` insert into tbl_atores (
                nome_ator, 
                sobre_ator,
                data_nascimento,
                data_falecimento,
                sexo_id,
                foto_ator
            ) values (
                "${dadosAtor.nome_ator}",
                "${dadosAtor.sobre_ator}",
                "${dadosAtor.data_nascimento}",
                null,
                "${dadosAtor.sexo_id}",
                "${dadosAtor.foto_ator}"
            );`
        } else {
            sql = ` insert into tbl_atores (
                nome_ator, 
                sobre_ator,
                data_nascimento,
                data_falecimento,
                sexo_id,
                foto_ator
            ) values (
                "${dadosAtor.nome_ator}",
                "${dadosAtor.sobre_ator}",
                "${dadosAtor.data_nascimento}",
                "${dadosAtor.data_falecimento}",
                "${dadosAtor.sexo_id}",
                "${dadosAtor.foto_ator}"
            );`

        }


        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }

    } catch (error) {
        console.log(error)
        return false
    }
}

const idAtor = async function(){
    let idAtor = `select CAST( last_insert_id() AS DECIMAL) as id_ator from tbl_atores limit 1;`
    let idAtores = await prisma.$queryRawUnsafe(idAtor)

    return idAtores
}

const updateAtor = async function(dadosAtor, id_ator){
    try {
        let sql 

           sql =  `UPDATE tbl_atores
                    SET nome_ator = '${dadosAtor.nome_ator}',
                        sobre_ator = '${dadosAtor.sobre_ator}', 
                        sexo_id = '${dadosAtor.sexo_id}',
                        data_nascimento = '${dadosAtor.data_nascimento}',
                        foto_ator = '${dadosAtor.foto_ator}'
                        
                    WHERE id_ator = ${id_ator}`
        

        let classificacaoAtualizado = await prisma.$executeRawUnsafe(sql)
        if (classificacaoAtualizado) {
            return true
        } else {
            return false

        }
        
    } catch (error) {
        console.log(error)
        return false
    }
}

const deleteAtor = async function(id_ator){
    try {
        let sql = `delete from tbl_atores where id_ator = ${id_ator}`

        let ator = await prisma.$executeRawUnsafe(sql)
        return ator

    } catch (error) {
        return false
    }
}

const selectAllAtores = async function (){
    try {
        // script sql para listar os registros 
        let sql = 'select * from tbl_atores order by id_ator desc';

        let rsAtor = await prisma.$queryRawUnsafe(sql);
        return rsAtor
    } catch (error) {
        return false
    }
}

const selectByIdAtor = async function (idAtor){
    try {
        let sql = `select * from tbl_atores where id_ator = ${idAtor}`

        let rsAtor = await prisma.$queryRawUnsafe(sql)
        return rsAtor
    } catch (error) {
        return false
    }
}

module.exports = {
    inserirAtor,
    selectAllAtores,
    selectByIdAtor,
    idAtor,
    updateAtor,
    deleteAtor,
}