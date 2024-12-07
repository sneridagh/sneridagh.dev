"""Installer for the sneridagh_dev package."""

from pathlib import Path
from setuptools import find_packages
from setuptools import setup


long_description = f"""
{Path("README.md").read_text()}\n
{Path("CONTRIBUTORS.md").read_text()}\n
{Path("CHANGES.md").read_text()}\n
"""


setup(
    name="sneridagh_dev",
    version="1.0.0a1",
    description="sneridagh.dev configuration package.",
    long_description=long_description,
    classifiers=[
        "Environment :: Web Environment",
        "Framework :: Plone",
        "Framework :: Plone :: Addon",
        "Framework :: Plone :: 6.0",
        "Programming Language :: Python",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Operating System :: OS Independent",
        "License :: OSI Approved :: GNU General Public License v2 (GPLv2)",
    ],
    keywords="Python Plone CMS",
    author="Victor Fernandez de Alba",
    author_email="sneridagh@gmail.com",
    url="https://github.com/sneridagh/sneridagh-dev",
    project_urls={
        "PyPI": "https://pypi.python.org/pypi/sneridagh_dev",
        "Source": "https://github.com/sneridagh/sneridagh-dev",
        "Tracker": "https://github.com/sneridagh/sneridagh-dev/issues",
    },
    license="GPL version 2",
    packages=find_packages("src", exclude=["ez_setup"]),
    package_dir={"": "src"},
    include_package_data=True,
    zip_safe=False,
    python_requires=">=3.8",
    install_requires=[
        "setuptools",
        "Plone",
        "prettyconf",
        "plone.api",
        "collective.exportimport",
    ],
    extras_require={
        "test": [
            "pytest-plone>=0.2.0",
            "pytest-cov",
            "pytest",
            "pytest-plone>=0.5.0",
            "zest.releaser[recommended]",
            "plone.app.testing[robot]>=7.0.0a3",
            "plone.restapi[test]",
            "collective.MockMailHost",
            "collective.exportimport",
            "kitconcept.seo",
            "collective.blog",
            "rss_provider",
        ],
    },
    entry_points="""
    [z3c.autoinclude.plugin]
    target = plone
    [console_scripts]
    update_locale = sneridagh_dev.locales.update:update_locale
    """,
)
