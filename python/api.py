from flask import Flask,jsonify,request
from flask_cors import CORS,cross_origin
import json
import pyodbc
#ODBC Driver 17 for
conn = pyodbc.connect('DRIVER={SQL Server}; \
                       SERVER=DESKTOP-H0G0JCC\SQLEXPRESS; \
                       DATABASE=Poc-test;\
                       Trusted_Connection=yes;\
                          autocommit=True;' )

cursor = conn.cursor()

app=Flask(__name__)
CORS(app)

@app.route('/api',methods=['get'])
@cross_origin()
def api():
    row=cursor.execute("exec [spGetLoginCreds]")
    data = row.fetchall()
    print(type(row))
    field=[]
    columns = [column[0] for column in cursor.description]
    for rows in data:
        field.append(dict(zip(columns,rows)))
    conn.commit()
    return jsonify(field)

@app.route('/login',methods=['POST'])
@cross_origin()
def loginCreds():
    if request.method == "POST":
        
        data=request.get_json()
        print(data[0])
        data=cursor.execute("exec spGetLoginCheck @WorkEmail='"+data[0]['WorkEmail']+ "',@Password='"+ data[0]['Password'] +"'")
        field=[]
        columns = [column[0] for column in cursor.description]
        for rows in data:
            field.append(dict(zip(columns,rows)))
        conn.commit()
    return jsonify(field)

@app.route('/SignUp',methods=['POST'])
@cross_origin()
def SignDetails():
    if request.method == "POST":
        data=request.get_json()
        data1=cursor.execute('EXEC spPostSignUpUser @FirstName = ?, @LastName = ?,@WorkEmail = ?,@Password = ?,@Company = ?,@Role= ? ,@Verification = ?,@Subscription=? ', data[0]['FirstName'], data[0]['LastName'],data[0]['WorkEmail'],data[0]['Password'],data[0]['Company'],data[0]['Role'],data[0]['Verification'],data[0]['Subscription'])
        field=[]
        columns = [column[0] for column in cursor.description]
        for rows in data1:
            field.append(dict(zip(columns,rows)))
        conn.commit()
    return jsonify(field)

if __name__ == "__main__":
    cors=CORS(app ,resource={r"/api/*":{"origin": "*"}})
    app.run(debug=True,host='192.168.0.194',port ='8000' )

# close the cursor and connection  
cursor.close()
conn.close()

