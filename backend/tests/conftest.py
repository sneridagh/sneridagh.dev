from pytest_plone import fixtures_factory
from sneridagh_dev.testing import ACCEPTANCE_TESTING
from sneridagh_dev.testing import FUNCTIONAL_TESTING
from sneridagh_dev.testing import INTEGRATION_TESTING


pytest_plugins = ["pytest_plone"]


globals().update(
    fixtures_factory((
        (ACCEPTANCE_TESTING, "acceptance"),
        (FUNCTIONAL_TESTING, "functional"),
        (INTEGRATION_TESTING, "integration"),
    ))
)
