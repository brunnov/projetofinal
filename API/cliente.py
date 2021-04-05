import conexao_banco as sql


def todos():
    stmt = 'select "id_clientes","CPF_CNPJ", "email", "telefone","nome_razaosocial" from "Usuarios" inner join "Clientes" on "Usuarios"."id_usuario" = "Clientes"."id_usuario" order by "id_clientes"'
    result = sql.query(stmt)
    return(result)

def busca(idcliente):
    stmt = f'select "id_clientes","nome_razaosocial","CPF_CNPJ", "telefone", "email" ,"endereco","senha","login","responsavel", "dia_pagamento" from "Usuarios" inner join "Clientes" on "Usuarios"."id_usuario" = "Clientes"."id_usuario" where "Clientes"."id_clientes" = {idcliente}'
    result = sql.query(stmt)
    return(result)

def inclusao(cpf_cnpj, senha, login, nome, telefone, email, endereco, responsavel,diaPagamento):
    stmt = f''' select "id_usuario" from "Usuarios" where "CPF_CNPJ" = '{cpf_cnpj}' '''
    result = sql.query(stmt)
    print(result)
    if result == []:

        stmt = f'''INSERT INTO public."Usuarios"("CPF_CNPJ", senha, login)
	    VALUES ('{cpf_cnpj}', '{senha}', '{login}') '''
        result = sql.update(stmt)
        print(result)
        if result == 'Feito':
            stmt = f'''select "id_usuario" from "Usuarios" where login = '{login}' and "CPF_CNPJ" = '{cpf_cnpj}' '''
            result = sql.query(stmt)
            for x in result:
                
                stmt = f''' INSERT INTO public."Clientes"(id_usuario, nome_razaosocial, telefone, email, endereco, responsavel, dia_pagamento)
	    VALUES ('{x['id_usuario']}', '{nome}', '{telefone}', '{email}','{endereco}', '{responsavel}',{diaPagamento});'''
            result = sql.update(stmt)
    else:
        stmt = f'''select "Id_Usuario" from Usuarios where "CPF_CNPJ" = '{cpf_cnpj}' '''
        result = sql.query(stmt)
        for x in result:
            
            stmt = f''' INSERT INTO public.clientes("Id_Usuario", "Responsavel", "Codigo_Forma_Pagamento", "Dia_Pagamento")
	    VALUES ('{x['Id_Usuario']}', '{responsavel}' );'''
            result = sql.update(stmt)
    return(result)

def edicao(cpf_cnpj, nome, endereco, telefone, email, senha, idusuario, responsavel, diaPagamento, login):
    
    stmt = f'''UPDATE "Clientes" set "nome_razaosocial" = '{nome}', "endereco" = '{endereco}', "telefone" = '{telefone}', "email" = '{email}' , "responsavel" = '{responsavel}', "dia_pagamento" = {diaPagamento} where  "id_clientes" = {idusuario}'''
    result = sql.update(stmt)
    stmt = f'''select "id_usuario" from "Clientes" where  "id_clientes" = {idusuario} '''
    result = sql.query(stmt)
    for x in result:
        stmt = f''' UPDATE "Usuarios" set "CPF_CNPJ" = '{cpf_cnpj}' , "senha" = '{senha}',"login" = '{login}' where  "id_usuario" = {x['id_usuario']}'''
        result = sql.update(stmt)
    return result

def exclusao(id):
    for x in id:
        stmt = f''' delete from "Clientes" where "id_clientes" = {x}'''
        print(stmt)
        result = sql.update(stmt)