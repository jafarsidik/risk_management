// Copyright (c) 2022, Muhamad Jafar Sidik and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Sasaran"] = {
	"filters": [
		{
            'fieldname': 'id_kajian_risiko',
            'label': __('Kajian Risiko'),
            'fieldtype': 'Link',
            'options': 'Kajian Risiko'
        },
		{
            'fieldname': 'organisasi',
            'label': __('Organisasi'),
            'fieldtype': 'Select',
			'options': [
				'Holding',
				'Sub Holding',
				'Anak Perusahaan',
				'Cucu Perusahaan',
				'Cicit Perusahaan'
            ],
            'default':'Sub Holding'
        },
		{
            'fieldname': 'unit_kerja',
            'label': __('Unit Kerja'),
            'fieldtype': 'Link',
            'options': 'Unit Kerja'
        },
		{
            'fieldname': 'direktorat_pemilik_sasaran',
            'label': __('Direktorat'),
            'fieldtype': 'Link',
            'options': 'Direktorat'
        },
		{
            'fieldname': 'divisi_pemilik_sasaran',
            'label': __('Divisi'),
            'fieldtype': 'Link',
            'options': 'Divisi'
        },
	]
};
