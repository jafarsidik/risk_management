// Copyright (c) 2022, Muhamad Jafar Sidik and contributors
// For license information, please see license.txt

frappe.ui.form.on('Program Kertas Kerja V2', {
	refresh: function(frm) {
		var x = frm.doc.tingkat_kemungkinan*frm.doc.tingkat_dampak;
		frappe.db.get_doc('Kodefikasi', null,{ no: x }).then(result => {
			frm.refresh_field("mungkin_x_dampak");		
			frm.set_value('mungkin_x_dampak', result.no+' - '+result.tingkat_mungkin_x_dampak);
			frm.refresh_field("kodefikasi");		
			frm.set_value('kodefikasi', result.no+' - '+result.tingkat_kodifikasi);
		});
	},
	tingkat_kemungkinan:function(frm){
		var x = frm.doc.tingkat_kemungkinan*frm.doc.tingkat_dampak;
		frappe.db.get_doc('Kodefikasi', null,{ no: x }).then(result => {
			frm.refresh_field("mungkin_x_dampak");		
			frm.set_value('mungkin_x_dampak', result.no+' - '+result.tingkat_mungkin_x_dampak);
			frm.refresh_field("kodefikasi");		
			frm.set_value('kodefikasi', result.no+' - '+result.tingkat_kodifikasi);
		});
	},
	tingkat_dampak:function(frm){
		var x = frm.doc.tingkat_kemungkinan*frm.doc.tingkat_dampak;
		frappe.db.get_doc('Kodefikasi', null,{ no: x }).then(result => {
			frm.refresh_field("mungkin_x_dampak");		
			frm.set_value('mungkin_x_dampak', result.no+' - '+result.tingkat_mungkin_x_dampak);
			frm.refresh_field("kodefikasi");		
			frm.set_value('kodefikasi', result.no+' - '+result.tingkat_kodifikasi);
		});
	}
});

frappe.ui.form.on('Risiko Child', {
    kategori:function(frm,cdt,cdn) {
		var child = locals[cdt][cdn];
		frappe.db.get_doc('Kategori Risiko', child.kategori).then(result => {
			let random = Math.floor(100000 + Math.random() * 900000);
			child.risk_id = result.singkatan+random;
			frm.refresh_field('risk_id');
		});
	},	
});
frappe.ui.form.on('Kemungkinan Child', {
	
    nilai:function(frm,cdt,cdn) {
		var child = locals[cdt][cdn];
		const nilai_array = [];
		$.each(frm.doc.kemungkinan, function (index, source_row) {
			nilai_array.push(source_row.nilai);
	   	});
		frm.set_value('tingkat_kemungkinan',Math.max.apply(Math,nilai_array));
		frm.refresh_field('tingkat_kemungkinan');
	},	
});
frappe.ui.form.on('Dampak Child', {
	
    nilai:function(frm,cdt,cdn) {
		var child = locals[cdt][cdn];
		const nilai_array = [];
		$.each(frm.doc.dampak, function (index, source_row) {
			nilai_array.push(source_row.nilai);
	   	});
		frm.set_value('tingkat_dampak',Math.max.apply(Math,nilai_array));
		frm.refresh_field('tingkat_dampak');
	},	
});