"""Flask app for Cupcakes"""
from flask import Flask, jsonify, redirect, request
from models import db, connect_db, Cupcake
from dotenv import load_dotenv
load_dotenv()
import os


app = Flask(__name__)
secret_key = os.environ.get('SECRET_KEY')
database_uri = os.environ.get('DATABASE_URL')

app.config['SQLALCHEMY_DATABASE_URI'] = database_uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False
app.secret_key = secret_key

connect_db(app)
with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return redirect('/api/cupcakes')

@app.route('/api/cupcakes')
def get_cupcakes_data():
    cupcakes = [c.serialize_cupcake() for c in Cupcake.query.all()]
    return jsonify(cupcakes)

@app.route('/api/cupcakes/<cupcake_id>')
def get_cupcake_detail(cupcake_id):
    cupcake = Cupcake.query.get_or_404(cupcake_id).serialize_cupcake()
    return jsonify(cupcake)

@app.route('/api/cupcakes', methods=['POST'])
def post_new_cupcake():
    flavor = request.json["flavor"]
    size = request.json["size"]
    rating = request.json["rating"]
    image = request.json.get("image", None)
    new_cupcake = Cupcake(flavor=flavor, size=size, rating=rating, image=image)
    db.session.add(new_cupcake)
    db.session.commit()
    
    return ( jsonify(new_cupcake.serialize_cupcake()), 201 )


@app.route('/api/cupcakes/<cupcake_id>', methods=['PATCH'])
def patch_cupcake(cupcake_id):
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    cupcake.flavor = request.json.get("flavor", cupcake.flavor)
    cupcake.size = request.json.get("size", cupcake.size)
    cupcake.rating = request.json.get("rating", cupcake.rating)
    cupcake.image = request.json.get("image", cupcake.image)
    db.session.commit()
    
    return ( jsonify(cupcake.serialize_cupcake()) )


@app.route('/api/cupcakes/<cupcake_id>', methods=['DELETE'])
def delete_cupcake(cupcake_id):
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    db.session.delete(cupcake)
    db.session.commit()
    return ( jsonify(message = "delete") )
    
    
    
if __name__ == '__main__':
    app.run(debug=True)