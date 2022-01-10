import frappe
from frappe.model.document import Document

@frappe.whitelist()
def get_tugas_by_kegiatan(code_kegiatan):
	tugas = frappe.db.sql(f""" SELECT name,tugas FROM `tabTugas` WHERE kegiatan='{code_kegiatan}' """, as_dict=True)
	return tugas