import conexao_banco as sql

def todos():
    stmt = 'SELECT id_agendamento, prioridade, funcionario, cliente, data_abertura, assunto, observacao	FROM public."Agendamentos";'
    resutl = sql.query(stmt)
    return resutl