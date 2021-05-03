import conexao_banco as sql

def todos():
    stmt = '''SELECT id_agendamento, nome, funcionario, cliente, data_abertura, assunto, observacao, prioridade, nome_razaosocial, data_agendamento,status
	FROM public."Agendamentos" inner join public."Clientes" on cliente = id_clientes 
	inner join public."Funcionarios" on funcionario = id_funcionario;'''
    resutl = sql.query(stmt)
    return resutl
def inclusao(cliente,funcionario,data,prioridade,assunto,observacao):
    stmt = f''' INSERT INTO public."Agendamentos"(
	funcionario, cliente, assunto, observacao, prioridade, data_agendamento,data_abertura,status)
	VALUES ({funcionario}, {cliente}, '{assunto}', '{observacao}', {prioridade},'{data}',CURRENT_DATE, 'Agendado' );'''
    result = sql.update(stmt)
    return result

def exclusao(id):
    for x in id:
        stmt = f''' delete from "Agendamentos" where "id_agendamento" = {x}'''
        print(stmt)
        result = sql.update(stmt)
    return result

def busca(id):
    stmt = f'''SELECT id_agendamento, nome, funcionario, cliente, data_abertura, assunto, observacao, prioridade, nome_razaosocial, data_agendamento,status
	FROM public."Agendamentos" inner join public."Clientes" on cliente = id_clientes 
	inner join public."Funcionarios" on funcionario = id_funcionario where id_agendamento = {id};'''
    result = sql.query(stmt)
    return result