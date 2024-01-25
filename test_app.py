from unittest import TestCase
from app import app
from models import Cupcake, db
from dotenv import load_dotenv
load_dotenv()
import os

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_ECHO'] = False
app.config['TESTING'] = True

with app.app_context():
    db.drop_all()
    db.create_all()

class CupcakeJsonCase(TestCase):
    """Test for cakecake json Cases"""
    def setUp(self):
        with app.app_context():
            Cupcake.query.delete()
            db.session.commit()
            cupcake = Cupcake(flavor="blue", size="small", rating=6)
            db.session.add(cupcake)
            db.session.commit()
            self.cupcake_id = cupcake.id
    
    def tearDown(self):
        with app.app_context():
            db.session.rollback()
        
    def test_home(self):
        with app.test_client() as client:
            resp = client.get("/")
            self.assertEqual(resp.status_code, 302)
    
    def test_all_cupcakes(self):
        with app.test_client() as client:
            resp = client.get("/api/cupcakes")
            self.assertEqual(resp.status_code, 200)
            
            expected_cupcake = {
            'flavor': 'blue',
            'id': self.cupcake_id,
            'image': 'https://thestayathomechef.com/wp-content/uploads/2017/12/Most-Amazing-Chocolate-Cupcakes-1-small.jpg',
            'rating': 6.0,
            'size': 'small'
            }
            
            self.assertTrue(resp.json)
            
            actual_cupcake = resp.json[0]
            
            self.assertEqual(actual_cupcake['flavor'], expected_cupcake['flavor'])
            self.assertEqual(actual_cupcake['id'], expected_cupcake['id'])
            self.assertEqual(actual_cupcake['image'], expected_cupcake['image'])
            self.assertEqual(actual_cupcake['rating'], expected_cupcake['rating'])
            self.assertEqual(actual_cupcake['size'], expected_cupcake['size'])

    def test_create_cupcake(self):
        with app.test_client() as client:
            cupcake = {
            'flavor': 'red',
            'image': 'https://big.jpg',
            'rating': 9.0,
            'size': 'big'
            }
            resp = client.post("/api/cupcakes", json=cupcake)
            
            self.assertEqual(resp.status_code, 201)
            self.assertEqual(Cupcake.query.count(), 2)
            
            self.assertEqual(resp.json['flavor'], cupcake['flavor'])
            self.assertEqual(resp.json['image'], cupcake['image'])
            self.assertEqual(resp.json['rating'], cupcake['rating'])
            self.assertEqual(resp.json['size'], cupcake['size'])
            
    def test_patch_cupcake(self):
        with app.test_client() as client:
            resp = client.patch(f"/api/cupcakes/{self.cupcake_id}", json={'flavor': 'orange'})
            self.assertEqual(resp.status_code, 200)
            cupcake = {
                'id': self.cupcake_id,
                'image': 'https://thestayathomechef.com/wp-content/uploads/2017/12/Most-Amazing-Chocolate-Cupcakes-1-small.jpg',
                'rating': 6.0,
                'size': 'small',
                'flavor': 'orange'
            }
            self.assertDictEqual(cupcake, resp.json)

    def test_delete_cupcake(self):
        with app.test_client() as client:
            resp = client.delete(f"/api/cupcakes/{self.cupcake_id}")
            self.assertEqual(resp.status_code, 200)
            self.assertDictEqual({"message": "delete"}, resp.json)
            
            
# todo: Add tests to make sure that the GET/PATCH/DELETE routes return a 404 when the cupcake cannot be found.
          
if __name__ == "__main__":
    import unittest
    unittest.main()