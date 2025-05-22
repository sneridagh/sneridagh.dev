"""Init and utils."""

from zope.i18nmessageid import MessageFactory

import logging


__version__ = "1.0.0a1"

PACKAGE_NAME = "sneridagh_dev"

_ = MessageFactory("sneridagh_dev")

logger = logging.getLogger("sneridagh_dev")
