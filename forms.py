from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, BooleanField, validators, SelectField
from wtforms.validators import InputRequired, Optional

class AddCupcake(FlaskForm):
    """Form for adding cupcakes."""
    flavor = StringField("Flavor", validators=[InputRequired(message="Must include a flavor")])
    size = SelectField("Size", choices=[("small", "small"), ("medium", "medium"), ("large", "large")])  
    rating = FloatField("Rating", validators=[Optional(), validators.NumberRange(min=0, max=10, message="rating must be between 0 and 10")])
    image = StringField("Image", validators=[Optional(), validators.URL(message="Must be a URL")])