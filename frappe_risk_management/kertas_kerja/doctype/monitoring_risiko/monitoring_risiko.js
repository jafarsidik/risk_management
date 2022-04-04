// Copyright (c) 2022, Muhamad Jafar Sidik and contributors
// For license information, please see license.txt

frappe.ui.form.on('Monitoring Risiko', {
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
		 //frm.set_df_property("tindakan_mitigasi", "read_only", 1);
		// frm.fields_dict["tindakan_mitigasi"].grid.wrapper.find('.grid-add-row').hide();
		// frm.fields_dict["tindakan_mitigasi"].grid.wrapper.find('.grid-remove-rows').hide();
	},
	//refresh: function(frm) {
		
	//},
	peristiwa_risiko:function(frm){
		let peristiwa_risiko = frm.doc.peristiwa_risiko;
		console.log(peristiwa_risiko);
		frappe.db.get_doc('Penanganan Risiko', null,{ name:peristiwa_risiko }).then(result => {
			console.log(result);
			frm.doc.tindakan_mitigasi = [];
			$.each(result.penanganan_risiko, function(_i, e){
				let entry = frm.add_child("tindakan_mitigasi");
				entry.divisi = e.divisi;
				entry.divisi_terkait = e.divisi_terkait;
				entry.rencanan_penanganan = e.rencanan_penanganan;
				entry.output = e.output;
				entry.base_line_mulai = e.base_line_mulai;
				entry.base_line_selesai = e.base_line_selesai;
				entry.pic = e.pic;
				entry.biaya_kegiatan = e.biaya_kegiatan;
				entry.tingkat_prioritas = e.tingkat_prioritas;
			  })
			  refresh_field("tindakan_mitigasi")
		});
	}
});

	
//     nilai:function(frm,cdt,cdn) {
// 		var child = locals[cdt][cdn];
// 		const nilai_array = [];
// 		$.each(frm.doc.dampak, function (index, source_row) {
// 			nilai_array.push(source_row.nilai);
// 	   	});
// 		frm.set_value('tingkat_dampak',Math.max.apply(Math,nilai_array));
// 		frm.refresh_field('tingkat_dampak');
// 	},
// 	efektifitas_pengendalian_berjalan:function(frm,cdt,cdn) {
// 		var child = locals[cdt][cdn];
// 		var nilai_inherent = child.nilai;

// 		var nilai = 0;
// 		if(child.efektifitas_pengendalian_berjalan == "Tidak Efektif"){
// 			nilai =  nilai_inherent - 0;
// 		}else if(child.efektifitas_pengendalian_berjalan == "Cukup Efektif"){
// 			nilai =  nilai_inherent - 1;
// 		}else if(child.efektifitas_pengendalian_berjalan == "Efektif"){
// 			nilai =  nilai_inherent - 2;
// 		}

// 		child.nilai_current =  nilai;
// 		frm.refresh_field('dampak');

		
// 		const nilai_array = [];
// 		$.each(frm.doc.dampak, function (index, source_row) {
// 			nilai_array.push(source_row.nilai_current);	
// 	   	});
// 		frm.set_value('tingkat_dampak_current',Math.max.apply(Math,nilai_array));
// 		frm.refresh_field('tingkat_dampak_current');
// 	},
// });
