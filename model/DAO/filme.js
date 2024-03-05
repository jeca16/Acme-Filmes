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
const prisma = new PrismaClient();

// inserir um novo filme
const insertFilme = async function (dadosFilme) {
    try {
        let sql

        if (dadosFilme.data_relancamento == null || dadosFilme.data_relancamento == '' || dadosFilme.data_relancamento == undefined) {
            sql = ` insert into tbl_filme (
                nome, 
                sinopse,
                data_lancamento,
                data_relancamento,
                duracao,
                foto_capa,
                valor_unitario
            ) values (
                '${dadosFilme.nome}',
                '${dadosFilme.sinopse}',
                '${dadosFilme.data_lancamento}',
                null,
                '${dadosFilme.duracao}',
                '${dadosFilme.foto_capa}',
                '${dadosFilme.valor_unitario}'
            )`;
        }else{
            sql = ` insert into tbl_filme (
            nome, 
            sinopse,
            data_lancamento,
            data_relancamento,
            duracao,
            foto_capa,
            valor_unitario
        ) values (
            '${dadosFilme.nome}',
            '${dadosFilme.sinopse}',
            '${dadosFilme.data_lancamento}',
            '${dadosFilme.data_relancamento}',
            '${dadosFilme.duracao}',
            '${dadosFilme.foto_capa}',
            '${dadosFilme.valor_unitario}'
        )`;
         
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

const idFilme = async function(){
    let idFilme = `select CAST( last_insert_id() AS DECIMAL) as id from tbl_filme limit 1;`

    let idFilmes = await prisma.$queryRawUnsafe(idFilme);
        return idFilmes
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
    let sql = 'select * from tbl_filme order by id desc';

    // $queryRawUnsafe() -  encaminha apenas a variavel
    // $queryRaw('selet *from tbl_filme') - encaminha o script

    // executa o scriptsql no banco de dados e recebe o retorno dos dados na variavel rsFilmes
    let rsFilmes = await prisma.$queryRawUnsafe(sql);
        return rsFilmes
        
    } catch (error) {
        return false
    }
    
}

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
    selectByIdFilme,
    idFilme
}