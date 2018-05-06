from flask import Flask, render_template, jsonify
import json

app = Flask(__name__, template_folder='.')

data = json.load(open('data/games.json'))


@app.route('/')
def hello_world():
    return render_template('index.html')


@app.route('/data/games.json')
def api_games_list():
    return jsonify(data)


@app.route('/data/games/<id>')
def api_games_single(id):
    for item in data:
        if item['id'] == id:
            return jsonify(item)

    return 404


@app.errorhandler(404)
def page_not_found(e):
    return jsonify(error=404, text=str(e)), 404
