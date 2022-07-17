# Copyright (c) 2022, Muhamad Jafar Sidik and contributors
# For license information, please see license.txt

import frappe


def execute(filters=None):
	columns=[
		{
            'fieldname': 'risiko',
            'label': "Kode Risiko",
            'fieldtype': 'Link',
            'options': 'Risiko'
        },
		{
            'fieldname': 'deskripsi_risiko',
            'label': "Peristiwa Risiko",
            'fieldtype': 'Data',
        },
		{
            'fieldname': 'kategori_risiko',
            'label': "Kategori Risiko",
            'fieldtype': 'Data',
        },
		{
            'fieldname': 'tipe_risiko',
            'label': "Tipe Risiko",
            'fieldtype': 'Data',
        },
        {
            'fieldname': 'penyebabs',
            'label': "Penyebab Risiko",
            'fieldtype': 'Data',
        },
        {
            'fieldname': 'dampaks',
            'label': "Penjelasan Dampak",
            'fieldtype': 'Data',
        },
		{
            'fieldname': 'base_line_mulai',
            'label': "Mulai (Date)",
            'fieldtype': 'Date',
        },
		{
            'fieldname': 'base_line_selesai',
            'label': "Berakhir (Date)",
            'fieldtype': 'Date',
        },
		{
            'fieldname': 'kodefikasi_current',
            'label': "Level / Nilai Risiko Current",
            'fieldtype': 'Data',
        }
	]
	values = {'company': 'Frappe Technologies Inc'}
	data = frappe.db.sql("""SELECT  
		`risiko`,
		`deskripsi_risiko`,
		`kategori_risiko`,
		`tipe_risiko`,
	    (SELECT `penyebab`
          FROM `tabKemungkinan Child`
          WHERE `tabKemungkinan Child`.`parent` = `tabAnalisa dan Evaluasi Risiko`.`name`) AS `penyebabs`, 
		(SELECT `penjelasan_dampak_risiko_child`
          FROM `tabDampak Child` 
          WHERE `tabDampak Child`.`parent` = `tabAnalisa dan Evaluasi Risiko`.`name`) AS `dampaks`,
		`base_line_mulai`, 
		`base_line_selesai`,
		`kodefikasi_inherent` as `kodefikasi_current`
		FROM `tabAnalisa dan Evaluasi Risiko`
	""", as_dict=0)
	return columns, data
