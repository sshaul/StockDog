from flask import g
from pprint import pprint
from .validation_error import ValidationError

def validate(data, fields):
   errors = []
   
   check_required_fields(data, fields, errors)
   if (len(errors) > 0):
      raise ValidationError(errors)
   print("after required check")
   check_field_validity(data, fields, errors)
   if (len(errors) > 0):
      raise ValidationError(errors)

   return None

def check_required_fields(data, fields, errors):
   for field in fields:
      if field.isRequired and data.get(field.name) is None:
         print("here")
         errors.append({'MissingField' : field.name + ' is a required field'})
      
   return errors


def check_field_validity(data, fields, errors):
   for field in fields:
      if field.customValidate is not None:
         field.customValidate(data.get(field.name), field, errors)
      elif field.datatype == str and data.get(field.name) is not None:
         validate_str(data.get(field.name), field, errors)
      elif field.datatype == int and data.get(field.name) is not None:
         validate_int(data.get(field.name), field, errors)
      else:
         g.logger.error("Unexpected datatype encountered in request validation")
   
   return errors


def validate_str(datum, field, errors):
   if type(datum) != str:
      errors.append({'InvalidField' : field.name + ' is not a string or formatted incorrectly'})
   
   return errors

def validate_int(datum, field, errors):
   if type(datum) != int:
      errors.append({'InvalidField' : field.name + ' is not an int or formatted incorrecly'})
   
   return errors