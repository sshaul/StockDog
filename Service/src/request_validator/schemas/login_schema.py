from ..field import Field
from .user_schema import validateEmail

fields = [
   Field('email', str, True, validateEmail),
   Field('password', str, True)
]