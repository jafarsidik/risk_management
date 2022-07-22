# Copyright (c) 2022, Muhamad Jafar Sidik and contributors
# For license information, please see license.txt
from __future__ import unicode_literals
from contextlib import nullcontext
from frappe import _
import frappe

def execute(filters=None):
	columns =[
		{'fieldname':'name','label':'ID','fieldtype':'Data'},
		{'fieldname':'id_kajian_risiko','label': _('Kajian Risiko'),'fieldtype': 'Link','options': 'Kajian Risiko'},
		{'fieldname':'organisasi','label': 'Organisasi','fieldtype':"Data"},
		{'fieldname':'unit_kerja','label': 'Unit Kerja','fieldtype':"Link",'options': 'Unit Kerja'},
		{'fieldname':'direktorat_pemilik_sasaran','label': 'Unit Kerja Pemilik Sasaran','fieldtype':"Link",'options': 'Direktorat'},
		{'fieldname':'deskripsi_sasaran','Deskripsi Sasaran': 'Deskripsi Sasarn','fieldtype':"Data"},
	]
	data = frappe.db.get_list('Sasaran',
			filters,
			fields=['name','id_kajian_risiko','organisasi','unit_kerja','direktorat_pemilik_sasaran','deskripsi_sasaran']
		)
	frappe.msgprint("<span style='color:Red;'>Once this popup has served it's purpose, then comment out it's invocation, viz. #frappe.msgprint...</span><br><br>" + "<pre>{}</pre>".format(frappe.as_json(data)))
	return columns, data