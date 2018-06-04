from marshmallow import Schema, fields

class LeagueSchema(Schema):
   name = fields.Str(required=True)
   start = fields.Date(required=True)
   end = fields.Date(required=True)
   startPos = fields.Decimal(required=True)