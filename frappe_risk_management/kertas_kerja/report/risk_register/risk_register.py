# Copyright (c) 2022, Muhamad Jafar Sidik and contributors
# For license information, please see license.txt

import frappe


def execute(filters=None):
    columns = get_columns(filters)
    data = get_data(filters)
    return columns, data

def get_columns(filters):
    return[
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
        },
        {
            'fieldname': 'kodefikasi_target',
            'label': "Level / Nilai Risiko Target",
            'fieldtype': 'Data',
        }
	]
def get_data(filters):
    kajiansql = "RP.`kajian` = '{kajian}'".format(kajian=filters.kajian) if filters.kajian else "1 = 1"
    query =  frappe.db.sql("""SELECT  
            RP.`deskripsi_risiko`,
            RP.`kategori_risiko`,
            RP.`tipe_risiko`,
            (SELECT `penyebab`
            FROM `tabKemungkinan Child`
                        WHERE `tabKemungkinan Child`.`parent` = ANL.`name`
                        ) AS `penyebabs`, 
            (SELECT `tabDampak Child`.`penjelasan_dampak_risiko_child`
            FROM `tabDampak Child` 
                        WHERE `tabDampak Child`.`parent` = ANL.`name`
            ) AS `dampaks`,
            RP.`base_line_mulai`, 
            RP.`base_line_selesai`,
            RP.`tingkat_risiko_current__kodefikasi_` as `kodefikasi_current`,
            RP.`tingkat_risiko_target__kodefikasi_` as `kodefikasi_target`,
            RP.`risiko`
        FROM `tabPenanganan Risiko` RP
		left join `tabAnalisa dan Evaluasi Risiko` ANL on RP.`risiko` = ANL.`name`
        WHERE ({kajiansql}) """.format( kajiansql=kajiansql),as_dict=1)
    return query

