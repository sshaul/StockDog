from ..field import Field
from .util_schema import validateName

fields = [
   Field('name', str, True, validateName),
   Field('buyPower', int, False),
   Field('inviteCode', str, False)
]

