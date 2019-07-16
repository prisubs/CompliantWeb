from flask import Flask, request
# from web.backend import *

app = Flask(__name__)

@app.route('/', methods = ['GET', 'POST'])
def result():
    if request.method == 'GET':
        return

if __name__ == '__main__':
    app.run(debug = True)