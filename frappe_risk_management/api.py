import frappe

@frappe.whitelist()
def get_tugas_by_kegiatan(code_kegiatan None):
	tugas = frappe.db.sql(f""" SELECT name,tugas FROM `tabTugas` """, as_dict=True)
	frappe.response['message'] = "pong"

@frappe.whitelist()
def get_risiko():
	print 'jafar'
	frappe.db.sql(f""" SELECT name FROM `tabIdentifikasi Risiko Child`  """, as_dict=True)
	frappe.response['message'] = "pong"