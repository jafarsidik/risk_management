// Copyright (c) 2022, Muhamad Jafar Sidik and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Risk Register"] = {
	"filters": [
		{
			fieldname: 'kajian',
			label: "Kajian Risiko",
			fieldtype: 'Link',
			options: 'Kajian Risiko'
		},
	]
};
