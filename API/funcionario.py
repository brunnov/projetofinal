import conexao_banco as sql

def todos():
    stmt = 'select "id_funcionario","CPF_CNPJ", "email", "telefone","especialidade","nome" from "Usuarios" inner join "Funcionarios" on "Usuarios"."id_usuario" = "Funcionarios"."id_usuario" '
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
            
            stmt = f''' INSERT INTO public.clientes("Id_Usuario", "Responsavel", "Codigo_Forma_Pagamento", "Dia_Pagamento")
	    VALUES ('{x['Id_Usuario']}',  ); '''
            result = sql.update(stmt)
    return(result)