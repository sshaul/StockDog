from flask import g, make_response, request
from functools import update_wrapper
import simplejson as json

from .validation_error import ValidationError

def validate(data, fields):
   errors = []
   
   check_headers(errors)
   if (len(errors) > 0):
      raise ValidationError(errors)

   check_required_fields(data, fields, errors)
   if (len(errors) > 0):
      raise ValidationError(errors)

   check_field_validity(data, fields, errors)
   if (len(errors) > 0):
      raise ValidationError(errors)

   return None


def check_headers(errors):
   contentTypeHeader = request.headers.get('Content-Type')
   if contentTypeHeader is None:
      errors.append({'MissingHeader' : 'Content-Type is a required header'})
   elif contentTypeHeader and contentTypeHeader != 'application/json':
      errors.append({'InvalidHeader' : 'API only accepts Content-Type of application/json'})
   
   return errors


def check_required_fields(data, fields, errors):
   for field in fields:
      if field.isRequired and data.get(field.name) is None:
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


def validate_params(fields):
   def decorator(fn):
      def wrap(*args, **kwargs):
         try:
            validate(request.args, fields)
         except ValidationError as e:
            return make_response(json.dumps(e.errors), 400)
         
         return fn(*args, **kwargs)
      return update_wrapper(wrap, fn)
   return decorator


def validate_body(fields):
   def decorator(fn):
      def wrap(*args, **kwargs):
         try:
            validate(request.get_json(), fields)
         except ValidationError as e:
            return make_response(json.dumps(e.errors), 400)
         
         return fn(*args, **kwargs)
      return update_wrapper(wrap, fn)
   return decorator