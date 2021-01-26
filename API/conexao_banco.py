import psycopg2 
import sys

def query (sql):
    print(sql)
    resultado = []
    
    try:
        conn = psycopg2.connect(host='localhost',user='postgres', password='123456')
        cursor = conn.cursor()
        cursor.execute(sql)
        columns = [column[0] for column in cursor.description]
        for row in cursor.fetchall():
            x = dict(zip(columns, row)) 
            resultado.append(x)
        conn.close()
        return resultado
    except Exception as e:
        print("Banco indisponível"+str(e))
        conn.close()
        resultado = 'Indisponivel'
        return resultado

def update (sql):
    
    try:
        conn = psycopg2.connect(host='localhost',user='postgres', password='123456')
        print(sql)
        cursor = conn.cursor()
        cursor.execute(sql)
        conn.commit()
        cursor.close()
        conn.close()
        return "Feito"
    except Exception as e:
        conn.rollback()
        conn.close()
        print(e)
        return "rollback"