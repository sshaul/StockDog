from ..field import Field
from .util_schema import validateEmail

fields = [
   Field('email', str, True, validateEmail),
   Field('password', str, True)
]