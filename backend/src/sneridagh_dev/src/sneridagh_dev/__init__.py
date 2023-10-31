"""Init and utils."""
from zope.i18nmessageid import MessageFactory

import logging


PACKAGE_NAME = "sneridagh_dev"

_ = MessageFactory("sneridagh_dev")

logger = logging.getLogger("sneridagh_dev")
