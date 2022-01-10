from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in frappe_risk_management/__init__.py
from frappe_risk_management import __version__ as version

setup(
	name="frappe_risk_management",
	version=version,
	description="Manajemen Resiko Buatan Jafarsidik",
	author="Muhamad Jafar Sidik",
	author_email="jeff.sidik@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
