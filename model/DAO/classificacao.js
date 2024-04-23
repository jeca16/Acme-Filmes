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

const inserirNovaClassificacao = async function (dadosClassificacao){
    try {
        let sql = `insert into tbl_classificacao (
                sigla_classificacao, 
                icone_classificacao, 
                aviso_classificacao, 
                descricao_classificacao) 
            values (
                '${dadosClassificacao.sigla_classificacao}',
                '${dadosClassificacao.icone_classificacao}',
                '${dadosClassificacao.aviso_classificacao}',
                '${dadosClassificacao.descricao_classificacao}'
                )`;

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

const idNovaClassificacao = async function (){
    let idClassificacao = `select CAST( last_insert_id() AS DECIMAL) as id from tbl_classificacao limit 1;`
    let idClassificacoes = await prisma.$queryRawUnsafe(idClassificacao)

    return idClassificacoes
}

const atualizarclassificacao = async function (dadosClassificacao, id_classificacao){
    try {
        let sql 

           sql =  `UPDATE tbl_classificacao
                    SET sigla_classificacao = '${dadosClassificacao.sigla_classificacao}',
                        icone_classificacao = '${dadosClassificacao.icone_classificacao}', 
                        aviso_classificacao = '${dadosClassificacao.aviso_classificacao}',
                        descricao_classificacao = '${dadosClassificacao.descricao_classificacao}'
                        
                    WHERE id_classificacao = ${id_classificacao}`
        

        let classificacaoAtualizado = await prisma.$executeRawUnsafe(sql)
        if (classificacaoAtualizado) {
            return true
        } else {
            return false

        }
        
    } catch (error) {
        return false
    }
}

const deletarClassificacao = async function (id_classificacao){
    try {
        let sql = `delete from tbl_classificacao where id_classificacao = ${id_classificacao}`

        let classificacao = await prisma.$executeRawUnsafe(sql)
        return classificacao

    } catch (error) {
        return false
    }
}

const listarClassificacao = async function (){
    try {
        // script sql para listar os registros 
        let sql = 'select * from tbl_classificacao order by id_classificacao desc';

        // $queryRawUnsafe() -  encaminha apenas a variavel
        // $queryRaw('selet *from tbl_filme') - encaminha o script

        // executa o scriptsql no banco de dados e recebe o retorno dos dados na variavel rsFilmes
        let rsClassificacao = await prisma.$queryRawUnsafe(sql);
        return rsClassificacao
    } catch (error) {
        return false
    }
}

const buscarClassificacaoPeloId = async function (id_classificacao){
    try {
        // realiza a busca do filme pelo id
        let sql = `select * from tbl_classificacao where id_classificacao = ${id_classificacao}`

        // executa no banco de dados o script sql
        let rsClassificacao = await prisma.$queryRawUnsafe(sql)
        return rsClassificacao

    } catch (error) {
        return false
    }
}

module.exports = {
    inserirNovaClassificacao,
    idNovaClassificacao,
    atualizarclassificacao,
    deletarClassificacao,
    listarClassificacao,
    buscarClassificacaoPeloId
}