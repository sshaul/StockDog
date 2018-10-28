import re
from validate_email import validate_email

from ..field import Field

def validateEmail(emailStr, field, errors):
   if not validate_email(emailStr):
      errors.append({
         'InvalidField': field.name + " is an invalid address"
      })
   
   return errors

def validatePassword(passwordStr, field, errors):
   if not re.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$", passwordStr):
      errors.append({
         'InvalidField': field.name + " must have 8 characters, 1 uppercase letter " +
            "1 lowercase letter, and 1 number"
      })
   
   return errors

fields = [
   Field('firstName', str, True),
   Field('lastName', str, True),
   Field('email', str, True, validateEmail),
   Field('password', str, True, validatePassword)
]