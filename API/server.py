from flask import Flask, request, jsonify
from flask_restful import Resource, Api, reqparse
from sqlalchemy import create_engine
from json import dumps
from flask_cors import CORS
import conexao_banco as sql
import csv
from datetime import datetime
import cliente as cli
import funcionario as fun
import agendamento as age
#import sendemailat as send

back = []
app = Flask(__name__)
CORS(app, origins="http://localhost:4200", allow_headers=[
    "Content-Type", "Authorization", "Access-Control-Allow-Credentials"],
    supports_credentials=True, intercept_exceptions=False)
def selectItem(it):
    print(it)
    return (it)
#Cliente página
@app.route('/clientes', methods=['GET'])
def clientes():
    result = cli.todos()
    return jsonify(result)

@app.route('/cliente', methods=['POST'])
def cliente():
    request.get_json(force=True)
    idcliente = request.json['id']
    result = cli.busca(idcliente)
    return jsonify(result)

@app.route('/login', methods=['POST'])
def login():
    request.get_json(force=True)
    senha = request.json['senha']
    login = request.json['login']
    stmt = f'''select "id_usuario" from "Usuarios" where "login" = '{login}' and "senha" = '{senha}' '''
    result = sql.query(stmt)    
    return jsonify(result)

@app.route('/clienteinclusao', methods=['POST'])
def clienteinclusao():
    request.get_json(force=True)
    senha = request.json['senha']
    nome = request.json['nome']
    email = request.json['email']
    telefone = request.json['telefone']
    cpf_cnpj = request.json['cpf_cnpj']
    endereco = request.json['endereco']
    responsavel = request.json['responsavel']
    login = request.json['login']
    diaPagamento = request.json['diaPagamento']
    result = cli.inclusao(cpf_cnpj, senha, login, nome, telefone, email, endereco, responsavel,diaPagamento)    
    return jsonify(result)


@app.route('/clienteexclusao', methods=['POST'])
def clienteexclusao():
    request.get_json(force=True)
    id = request.json['id']
    result = cli.exclusao(id)
    return jsonify(result)

@app.route('/clienteedicao', methods=['POST'])
def clienteedicao():
    request.get_json(force=True)
    idusuario = request.json['id']
    senha = request.json['senha']
    nome = request.json['nome']
    email = request.json['email']
    telefone = request.json['telefone']
    cpf_cnpj = request.json['cpf_cnpj']
    endereco = request.json['endereco']
    responsavel = request.json['responsavel']
    diaPagamento = request.json['diaPagamento']
    login = request.json['login']
    result = cli.edicao(cpf_cnpj, nome, endereco, telefone, email, senha, idusuario, responsavel, diaPagamento, login)
    return jsonify(result)
#Funicionários Página
@app.route('/funcionarios', methods=['GET'])
def funcionarios():
    result = fun.todos()
    return jsonify(result)

@app.route('/funcionario', methods=['POST'])
def funcionario():
    idfuncionario = request.json['idfuncionario']
    result = fun.busca(idfuncionario)
    return jsonify(result)

@app.route('/funcionarioinclusao', methods=['POST'])
def funcionarioinclusao():
    request.get_json(force=True)
    senha = request.json['senha']
    nome = request.json['nome']
    email = request.json['email']
    telefone = request.json['telefone']
    cpf_cnpj = request.json['cpf_cnpj']
    endereco = request.json['endereco']
    especialidade = request.json['especialidade']
    login = request.json['login']
    result = fun.inclusao(cpf_cnpj,senha,login,nome,telefone,email,endereco,especialidade)
    return jsonify(result)

@app.route('/funcionarioexclusao', methods=['POST'])
def funicionarioexclusao():
    request.get_json(force=True)
    id = request.json['id']
    result = fun.exclusao(id)
    return jsonify(result)

@app.route('/funcionarioedicao',methods=['POST'])
def funcionarioedicao():
    request.get_json(force=True)
    senha = request.json['senha']
    nome = request.json['nome']
    email = request.json['email']
    telefone = request.json['telefone']
    cpf_cnpj = request.json['cpf_cnpj']
    endereco = request.json['endereco']
    especialidade = request.json['especialidade']
    login = request.json['login']
    id = request.json['id']
    result = fun.edicao(cpf_cnpj, nome, endereco, telefone, email, senha, login,especialidade, id)
    return jsonify(result)

#Página de Serviços

@app.route('/buscaagendamento', methods=['GET'])
def buscaagendamento():
    result = age.todos()
    return jsonify(result)

if __name__ == '__main__':    
    app.run(host="localhost",debug=True)
