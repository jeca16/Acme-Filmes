/**********************************************************************************************
 * objetivo: criar a interacao com o banco de dados MYSQL para fazer o crud de diretores      *
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

const inserirDiretor  = async function(dadosDiretor){
    try {
        let sql

        if (dadosDiretor.data_falecimento == null || dadosDiretor.data_falecimento == '' || dadosDiretor.data_falecimento == undefined) {
            sql = ` insert into tbl_diretores (
                nome_diretor, 
                sobre_diretor,
                data_nascimento,
                data_falecimento,
                sexo_id,
                foto_diretor
            ) values (
                "${dadosDiretor.nome_diretor}",
                "${dadosDiretor.sobre_diretor}",
                "${dadosDiretor.data_nascimento}",
                null,
                "${dadosDiretor.sexo_id}",
                "${dadosDiretor.foto_diretor}"
            );`
        } else {
            sql = ` insert into tbl_atores (
                nome_diretor, 
                sobre_diretor,
                data_nascimento,
                data_falecimento,
                sexo_id,
                foto_diretor
            ) values (
                "${dadosDiretor.nome_diretor}",
                "${dadosDiretor.sobre_diretor}",
                "${dadosDiretor.data_nascimento}",
                "${dadosDiretor.data_falecimento}",
                "${dadosDiretor.sexo_id}",
                "${dadosDiretor.foto_diretor}"
            );`

        }


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

const idDiretor = async function(){
    let idDiretor = `select CAST( last_insert_id() AS DECIMAL) as id_ator from tbl_diretores limit 1;`
    let idDiretores = await prisma.$queryRawUnsafe(idDiretor)

    return idDiretores
}

const updateDiretor = async function(dadosDiretor, id_diretor){
    try {
        let sql 

           sql =  `UPDATE tbl_diretores
                    SET nome_diretor = '${dadosDiretor.nome_diretor}',
                        sobre_diretor = '${dadosDiretor.sobre_diretor}', 
                        sexo_id = '${dadosDiretor.sexo_id}',
                        data_nascimento = '${dadosDiretor.data_nascimento}',
                        foto_diretor = '${dadosDiretor.foto_diretor}'
                        
                    WHERE id_diretor = ${id_diretor}`
        

        let diretorAtualizado = await prisma.$executeRawUnsafe(sql)
        if (diretorAtualizado) {
            return true
        } else {
            return false

        }
        
    } catch (error) {
        return false
    }
}

const deleteDiretor = async function(id_diretor){
    try {
        let sql = `delete from tbl_diretores where id_diretor = ${id_diretor}`

        let diretor = await prisma.$executeRawUnsafe(sql)
        return diretor

    } catch (error) {
        return false
    }
}

const selectAllDiretores = async function (){
    try {
        // script sql para listar os registros 
        let sql = 'select * from tbl_diretores order by id_diretor desc';

        let rsDiretor = await prisma.$queryRawUnsafe(sql);
        return rsDiretor
    } catch (error) {
        return false
    }
}

const selectByIdDiretor = async function (idDiretor){
    try {
        let sql = `select * from tbl_diretores where id_diretor = ${idDiretor}`

        let rsDiretor = await prisma.$queryRawUnsafe(sql)
        return rsDiretor
    } catch (error) {
        return false
    }
}

module.exports = {
    inserirDiretor,
    selectAllDiretores,
    selectByIdDiretor,
    idDiretor,
    updateDiretor,
    deleteDiretor,
}