from ..field import Field

def validateLength(lengthStr, field, errors):
   if type(lengthStr) != str or lengthStr not in ['day', 'week', 'month', 'year', 'recent']:
      errors.append({
         'InvalidField': field.name + " is not one of 'day', 'week', 'month', 'year', or 'recent'"
      })
   
   return errors

fields = [
   Field('ticker', str, True),
   Field('length', str, True, validateLength)
]

