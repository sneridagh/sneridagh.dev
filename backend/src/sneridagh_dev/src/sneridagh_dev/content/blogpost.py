from sneridagh_dev import _
from plone.dexterity.content import Container
from plone.supermodel.model import Schema
from zope import schema
from zope.interface import implementer


class IBlogPost(Schema):
    """BlogPost content type interface"""


@implementer(IBlogPost)
class BlogPost(Container):
    """BlogPost content type"""
