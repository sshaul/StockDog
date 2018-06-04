from marshmallow import Schema, fields

class PortfolioSchema(Schema):
   name = fields.Str(required=True)
   buyPower = fields.Decimal(),
   leagueId = fields.Integer(),
   inviteCode = fields.Str()


class PortfolioHistorySchema(Schema):
   value = fields.Decimal(required=True)
