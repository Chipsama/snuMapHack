import csv, json
from flask import Flask,render_template,request


app = Flask(__name__)

@app.route("/")
def home():
    return render_template('main.html')

@app.route("/index", methods = ['POST', 'GET'])
def index():
    data = request.form
    for key, value in data.items():
        print(value)
        filename = str(value)
   
    return render_template('index.html', filename = filename)

'''
data = request.form
    return render_template('result1.html', result1 = data)
'''

@app.route('/maps/<string:filename>')
def example(filename):
    file_path = './static/js/maps/' + filename
    f = open(file_path, 'rt', encoding='UTF8')
    print("stage1")
    data = f.read()
    print("stage2")
    return data

if __name__ == '__main__':
    app.run(debug = True)
    