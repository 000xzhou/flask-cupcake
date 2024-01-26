"""Models for Cupcake app."""
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)

class Cupcake(db.Model):
    __tablename__ = "cupcakes"
    
    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    flavor = db.Column(db.Text, nullable=False)
    size = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Float, nullable=False)
    image = db.Column(db.Text, default='https://thestayathomechef.com/wp-content/uploads/2017/12/Most-Amazing-Chocolate-Cupcakes-1-small.jpg')
    
    def __repr__(self):
        s = self
        return f"<id={s.id}, flavor={s.flavor}, size={s.size}, rating:{s.rating}, image:{s.image}>"
    def serialize_cupcake(self):
        """Serialize a cupcake SQLAlchemy obj to dictionary."""

        return {
            "id": self.id,
            "flavor": self.flavor,
            "size": self.size,
            "rating": self.rating,
            "image": self.image,
        }
    ingredients = db.relationship('Ingredient', backref='cupcake', lazy=True)
        
class Ingredient(db.Model):
    __tablename__ = 'ingredients'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), nullable=False)
    cupcake_id = db.Column(db.Integer, db.ForeignKey('cupcakes.id'), nullable=False)