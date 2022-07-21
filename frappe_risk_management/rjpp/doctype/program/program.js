// Copyright (c) 2022, Muhamad Jafar Sidik and contributors
// For license information, please see license.txt

frappe.ui.form.on('Program', {
	program: function(frm) {
		if(frm.doc.__islocal) {
			// add missing " " arg in split method
			let parts = frm.doc.program.split(" ");
			let abbr = $.map(parts, function (p) {
				return p.toUpperCase() ? p.substr(0, 1).toUpperCase() : null;
			}).join("");
			frm.set_value("kode_program", abbr);
		}
	},
	refresh: function(frm) {
		if (!frm.is_new()) {
			frm.doc.kode_program && frm.set_df_property("kode_program", "read_only", 1);
		}
	}
});
