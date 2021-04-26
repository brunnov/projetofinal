import conexao_banco as sql

def todos():
    stmt = 'select "id_funcionario","CPF_CNPJ", "email", "telefone","especialidade","nome" from "Usuarios" inner join "Funcionarios" on "Usuarios"."id_usuario" = "Funcionarios"."id_usuario" order by  "id_funcionario"'
    result = sql.query(stmt)
    return(result)

def inclusao(cpf_cnpj,senha,login,nome,telefone,email,endereco,especialidade):
    stmt = f''' select "id_usuario" from "Usuarios" where "CPF_CNPJ" = '{cpf_cnpj}' '''
    result = sql.query(stmt)
    if result == []:

        stmt = f'''INSERT INTO public."Usuarios"("CPF_CNPJ", senha, login)
	    VALUES ('{cpf_cnpj}', '{senha}', '{login}') '''
        result = sql.update(stmt)
        if result == 'Feito':
            stmt = f'''select "id_usuario" from "Usuarios" where login = '{login}' and "CPF_CNPJ" = '{cpf_cnpj}' '''
            result = sql.query(stmt)
            for x in result:
                
                stmt = f''' INSERT INTO public."Funcionarios"(id_usuario, nome, telefone, email, endereco, especialidade)
	    VALUES ('{x['id_usuario']}', '{nome}', '{telefone}', '{email}','{endereco}', '{especialidade}');'''
            result = sql.update(stmt)
    else:
        stmt = f'''select "Id_Usuario" from Usuarios where "CPF_CNPJ" = '{cpf_cnpj}' '''
        result = sql.query(stmt)
        for x in result:
            
            stmt = f''' INSERT INTO public."Funcionarios"("Id_Usuario", "Responsavel", "Codigo_Forma_Pagamento", "Dia_Pagamento")
	    VALUES ('{x['Id_Usuario']}',  ); '''
            result = sql.update(stmt)
    return(result)

def exclusao(id):
    for x in id:
        stmt = f''' delete from "Funcionarios" where "id_funcionario" = {x}'''
        print(stmt)
        result = sql.update(stmt)

def edicao(cpf_cnpj, nome, endereco, telefone, email, senha, login,especialidade, id):
    stmt = f''' select "login" from "Usuarios" inner join "Funcionarios" on "Usuarios"."id_usuario" = "Funcionarios"."id_usuario" where "Funcionarios"."id_funcionario" = {id}'''
    result = sql.query(stmt)
    for x in result:
        if x['login'] != login:
            stmt = f'''select "id_usuario" from "Usuarios" where "login" = '{login}' '''
            result1 = sql.query(stmt)
        else:
            result1 = []
    print(result1)
    if result1 == []:
        stmt = f'''UPDATE "Funcionarios" set "nome" = '{nome}', "endereco" = '{endereco}', "telefone" = '{telefone}', "email" = '{email}' , "especialidade" = '{especialidade}' where  "id_funcionario" = {id}'''
        result = sql.update(stmt)
        stmt = f'''select "id_usuario" from "Funcionarios" where  "id_funcionario" = {id} '''
        result = sql.query(stmt)
        for x in result:
            stmt = f''' UPDATE "Usuarios" set "CPF_CNPJ" = '{cpf_cnpj}' , "senha" = '{senha}',"login" = '{login}' where  "id_usuario" = {x['id_usuario']}'''
            result = sql.update(stmt)
    else:
        result = 'Login já existe'
    return result


def busca(idfuncionario):
    stmt = f'''select "id_funcionario","CPF_CNPJ", "email", "telefone","especialidade","nome", "login", "endereco", "senha" from "Usuarios" inner join "Funcionarios" on "Usuarios"."id_usuario" = "Funcionarios"."id_usuario" where "id_funcionario" = {idfuncionario} '''
    result = sql.query(stmt)
    return result

