from marshmallow import Schema, fields

class UserSchema(Schema):
   firstName = fields.Str(required=True)
   lastName = fields.Str(required=True)
   email = fields.Email(required=True)
   password = fields.Str(required=True)