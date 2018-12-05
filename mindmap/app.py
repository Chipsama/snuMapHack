import csv, json
from flask import Flask,render_template


app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.route('/maps/example1.json')
def example1():
    f = open('./static/js/maps/example1.json', 'rt', encoding='UTF8')
    print("stage1")
    data = f.read()
    print("stage2")
    return data

@app.route('/maps/example2.json')
def example2():
    f = open('./static/js/maps/example2.json', 'rt', encoding='UTF8')
    print("stage1")
    data = f.read()
    print("stage2")
    return data

if __name__ == '__main__':
    app.run(debug = True)
    