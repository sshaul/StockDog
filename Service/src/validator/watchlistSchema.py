from marshmallow import Schema, fields

class WatchlistSchema(Schema):
   portfolioId = fields.Integer(required=True)
   ticker = fields.Str(required=True)