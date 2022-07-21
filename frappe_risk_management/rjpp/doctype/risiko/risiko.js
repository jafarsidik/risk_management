// Copyright (c) 2022, Muhamad Jafar Sidik and contributors
// For license information, please see license.txt

frappe.ui.form.on('Risiko', {
	// refresh: function(frm) {

	// }
	kategori_risiko: function(frm) {
		frm.set_query("tipe_risiko", function() {	
			return {
				"filters": {
					"kategori_risiko": frm.doc.kategori_risiko
				}
			};
		});
    	frm.refresh_field("tipe_risiko");
	}
});
