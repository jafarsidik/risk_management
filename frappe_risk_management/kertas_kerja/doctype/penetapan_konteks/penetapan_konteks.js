// Copyright (c) 2022, Muhamad Jafar Sidik and contributors
// For license information, please see license.txt

frappe.ui.form.on('Penetapan Konteks', {
	setup:function(frm){
		
		frm.set_query('sasaran', function(){
			 return {
	 			filters: {
					id_kajian_risiko: frm.doc.id_kajian_risiko,
	 			}
	 		}
	 	})
		frm.set_query('kegiatan', function(){
			return {
				filters: {
				   sasaran: frm.doc.sasaran,
				}
			}
		})
		frm.set_query('parameter','sumber_risiko_external', function(doc, cdt, cdn){
			var child = locals[cdt][cdn];
			return {
				filters: {
					faktor_external: child.faktor,
				}
			}
		})
		frm.set_query('parameter','sumber_risiko_internal', function(doc, cdt, cdn){
			var child = locals[cdt][cdn];
			
			return {
				filters: {
					faktor_internal: child.faktor,
				}
			}
		})
		
	},
	// refresh: function(frm) {

	// }
});
