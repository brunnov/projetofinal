import conexao_banco as sql


def todos():
    stmt = 'select "id_clientes","CPF_CNPJ", "email", "telefone","nome_razaosocial" from "Usuarios" inner join "Clientes" on "Usuarios"."id_usuario" = "Clientes"."id_usuario" '
    result = sql.query(stmt)
    return(result)

def busca(idcliente):
    stmt = f'select "Usuarios"."id_usuario","nome_razaosocial","CPF_CNPJ", "telefone", "email" ,"endereco","senha","login","responsavel" from "Usuarios" inner join "Clientes" on "Usuarios"."id_usuario" = "Clientes"."id_usuario" where "Usuarios"."id_usuario" = {idcliente}'
    result = sql.query(stmt)
    return(result)

def inclusao(cpf_cnpj, senha, login, nome, telefone, email, endereco, responsavel):
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
                
                stmt = f''' INSERT INTO public."Clientes"(id_usuario, nome_razaosocial, telefone, email, endereco, responsavel)
	    VALUES ('{x['id_usuario']}', '{nome}', '{telefone}', '{email}','{endereco}', '{responsavel}');'''
            result = sql.update(stmt)
    else:
        stmt = f'''select "Id_Usuario" from Usuarios where "CPF_CNPJ" = '{cpf_cnpj}' '''
        result = sql.query(stmt)
        for x in result:
            
            stmt = f''' INSERT INTO public.clientes("Id_Usuario", "Responsavel", "Codigo_Forma_Pagamento", "Dia_Pagamento")
	    VALUES ('{x['Id_Usuario']}', '{responsavel}' );'''
            result = sql.update(stmt)
    return(result)

def edicao(cpf_cnpj, nome, endereco, telefone, email, senha, idusuario, responsavel, pagamento, diaPagamento):
    stmt = f'''UPDATE "Usuarios" set "CPF_CNPJ" = '{cpf_cnpj}', "Nome_RazaoSocial" = '{nome}', "Endereco" = '{endereco}', "Telefone" = '{telefone}', "Email" = '{email}', "Senha" = '{senha}'
	    where  "Id_Usuario" = {idusuario}'''
    result = sql.update(stmt)
    stmt = f''' UPDATE public.clientes set "Responsavel" = '{responsavel}', "Codigo_Forma_Pagamento" ={pagamento}, "Dia_Pagamento" ={diaPagamento}
	 where  "Id_Usuario" = {idusuario}'''
    result = sql.update(stmt)

def exclusao(id):
    for x in id:
        stmt = f''' delete from "Clientes" where "id_usuario" = {x}'''
        print(stmt)
        result = sql.update(stmt)