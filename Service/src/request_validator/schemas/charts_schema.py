from ..field import Field
from .util_schema import validateLength

fields = [
   Field('ticker', str, True),
   Field('length', str, True, validateLength)
]

