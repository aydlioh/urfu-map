from flask import Flask, jsonify, send_file
from flask_cors import CORS
from sosw_map_master.src.backend.database_part import base
from data_perform import format_data
from data_image import images
from server_params import host, port

app = Flask(__name__)
CORS(app)


@app.route('/institutes')
def get_institutes():
    data = base.get_institutes()
    data = [item.to_dict() for item in data]
    data = format_data(data)
    return jsonify(data)


@app.route('/institutes/<int:inst_id>/<int:image_id>')
def get_image(inst_id, image_id):
    try:
        photo = send_file(images[inst_id - 1][image_id - 1])
    except IndexError:
        return "Изображения с таким индексом нет"
    return photo


app.run(host=host, port=port)
