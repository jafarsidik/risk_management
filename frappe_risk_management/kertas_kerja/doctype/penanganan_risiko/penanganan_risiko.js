// Copyright (c) 2022, Muhamad Jafar Sidik and contributors
// For license information, please see license.txt

frappe.ui.form.on('Penanganan Risiko', {
	// refresh: function(frm) {

	// }
	setup:function(frm){
		
		frm.set_query('risiko', function(){
			 return {
				"filters": {
					strategi_penanganan: ['in', ['Reduce / Control','Share / Transfer','Avoid']]
			 	}
	 			// filters: {
				// 	strategi_penanganan: 'Reduce / Control',
				// 	strategi_penanganan: 'Share / Transfer',
				// 	strategi_penanganan: 'Avoid',
	 			// }
	 		}
	 	})
		
		
	},
	onclick_kemungkinan:function(frm){
		
		var x = frm.doc.tingkat_kemungkinan_current-frm.doc.onclick_kemungkinan;
		frm.set_value('tingkat_kemungkinan_target',x);
		frm.refresh_field("tingkat_kemungkinan_target");
		
		var get_kodefikasi = frm.doc.tingkat_kemungkinan_target*frm.doc.tingkat_dampak_target;
		frappe.db.get_doc('Kodefikasi', null,{ nilai_kemungkinan:frm.doc.tingkat_kemungkinan_target, nilai_dampak:frm.doc.tingkat_dampak_target }).then(result => {
			
			frm.set_value('tingkat_risiko_target__p_x_d',get_kodefikasi + ' - ' + result.tingkat_mungkin_x_dampak);
			frm.refresh_field("tingkat_risiko_target__p_x_d");
					
			frm.set_value('tingkat_risiko_target__kodefikasi_', result.nilai_tingkat_risiko + ' - ' +result.tingkat_kodifikasi);
			frm.refresh_field("tingkat_risiko_target__kodefikasi_");
		});
	},
	onclick_dampak:function(frm){
		
		var x = frm.doc.tingkat_dampak_current-frm.doc.onclick_dampak;
		frm.refresh_field("tingkat_dampak_target");
		frm.set_value('tingkat_dampak_target',x);
		
		
		var get_kodefikasi = frm.doc.tingkat_kemungkinan_target*frm.doc.tingkat_dampak_target;
		frappe.db.get_doc('Kodefikasi', null,{ nilai_kemungkinan:frm.doc.tingkat_kemungkinan_target, nilai_dampak:frm.doc.tingkat_dampak_target }).then(result => {
			frm.refresh_field("tingkat_risiko_target__p_x_d");
			frm.set_value('tingkat_risiko_target__p_x_d',get_kodefikasi + ' - ' + result.tingkat_mungkin_x_dampak);
			
			frm.refresh_field("tingkat_risiko_target__kodefikasi_");		
			frm.set_value('tingkat_risiko_target__kodefikasi_', result.nilai_tingkat_risiko + ' - ' +result.tingkat_kodifikasi);
			
		});
	},
});
