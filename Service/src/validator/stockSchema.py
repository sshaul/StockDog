from marshmallow import Schema, fields

class TransSchema(Schema):
   portfolioId = fields.Integer(required=True)
   shareCount = fields.Integer(required=True)

