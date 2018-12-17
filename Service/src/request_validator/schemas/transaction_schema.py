from ..field import Field
from .util_schema import validatePosInt, validateTransType

fields = [
   Field('shareCount', int, True, validatePosInt),
   Field('ticker', str, True),
   Field('transType', str, True, validateTransType),
   Field('portfolioId', int, True, validatePosInt)
]