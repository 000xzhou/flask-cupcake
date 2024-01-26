from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, BooleanField, validators, SelectField
from wtforms.validators import InputRequired, Optional

class AddCupcake(FlaskForm):
    """Form for adding cupcakes."""
    flavor = StringField("Name", validators=[InputRequired(message="Must include a flavor")])
    size = [("small", "small"), ("medium", "medium"), ("large", "large")]
    rating = FloatField("Age", validators=[Optional(), validators.NumberRange(min=0, max=10, message="rating must be between 0 and 10")])
    image = StringField("Photo URL", validators=[Optional(), validators.URL(message="Must be a URL")])