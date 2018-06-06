from marshmallow import Schema, fields

class NukeSchema(Schema):
   resetIncrement = fields.Boolean(default=True, missing=True)