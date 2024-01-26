from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, validators, SelectField, FieldList, FormField, HiddenField
from wtforms.validators import InputRequired, Optional

class IngredientForm(FlaskForm):
    name = StringField('Ingredient Name')
class AddCupcake(FlaskForm):
    """Form for adding cupcakes."""
    flavor = StringField("Flavor", validators=[InputRequired(message="Must include a flavor")])
    size = SelectField("Size", choices=[("small", "small"), ("medium", "medium"), ("large", "large")])  
    rating = FloatField("Rating", validators=[InputRequired(message="Must include a rating between 0 and 10"), validators.NumberRange(min=0, max=10, message="rating must be between 0 and 10")])
    image = StringField("Image", validators=[Optional(), validators.URL(message="Must be a URL")])
class EditCupcake(FlaskForm):
    """Form for adding cupcakes."""
    id = HiddenField("ID")
    flavor = StringField("Flavor", validators=[InputRequired(message="Must include a flavor")])
    size = SelectField("Size", choices=[("small", "small"), ("medium", "medium"), ("large", "large")])  
    rating = FloatField("Rating", validators=[InputRequired(message="Must include a rating between 0 and 10"), validators.NumberRange(min=0, max=10, message="rating must be between 0 and 10")])
    image = StringField("Image", validators=[Optional(), validators.URL(message="Must be a URL")])
    ingredients = FieldList(FormField(IngredientForm))