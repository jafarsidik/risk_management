// Copyright (c) 2022, Muhamad Jafar Sidik and contributors
// For license information, please see license.txt
//frm.get_field(konteks_internal).grid.cannot_add_rows = true;
// if (!frappe.is_new()) {
//     frm.add_custom_button('Click me', () => console.log('Clicked custom button'))
// }
frappe.ui.form.on('Analisa Risiko', {
	kriteria_kemungkinan_inherent: function(frm,cdt,cdn) {
		let row = locals[cdt][cdn];
		 	
		frm.set_query("skala_kemungkinan", function() {	
			return {
		 		"filters": {
		 			"kriteria_kemungkinan": row.kriteria_kemungkinan_inherent
		 		}
		 	};
		});
    	frm.refresh_field("kriteria_kemungkinan_inherent");
	},
	kriteria_dampak: function(frm,cdt,cdn) {
		let row = locals[cdt][cdn];
		 	
		frm.set_query("skala_dampak", function() {	
			return {
		 		"filters": {
		 			"kriteria_skala_dampak": row.kriteria_dampak
		 		}
		 	};
		});
    	frm.refresh_field("skala_dampak");
		//console.table(row);
		console.log(row);
	},
	skala_kemungkinan: function(frm,cdt,cdn) {
	
		var x = frm.doc.probabilitas_kemungkinan*frm.doc.probabilitas_dampak;
		frappe.db.get_doc('Tingkat Mungkin x Dampak', null,{ no: x }).then(result => {
			frm.refresh_field("tingkat_risiko_inherent_mungkin_x_dampak");		
			frm.set_value('tingkat_risiko_inherent_mungkin_x_dampak', result.name);
		});
		frappe.db.get_doc('Tingkat Kodefikasi', null,{ no: x }).then(result => {
			frm.refresh_field("tingkat_risiko_inherent_kodifikasi");		
			frm.set_value('tingkat_risiko_inherent_kodifikasi', result.name);
		});
	},
	skala_dampak: function(frm,cdt,cdn) {
		var x = frm.doc.probabilitas_kemungkinan*frm.doc.probabilitas_dampak;
		frappe.db.get_doc('Tingkat Mungkin x Dampak', null,{ no: x }).then(result => {
			frm.refresh_field("tingkat_risiko_inherent_mungkin_x_dampak");		
			frm.set_value('tingkat_risiko_inherent_mungkin_x_dampak', result.name);
		});
		frappe.db.get_doc('Tingkat Kodefikasi', null,{ no: x }).then(result => {
			frm.refresh_field("tingkat_risiko_inherent_kodifikasi");		
			frm.set_value('tingkat_risiko_inherent_kodifikasi', result.name);
		});
	},
	data_penetapan_konteks:function(frm,cdt, cdn) {
		frappe.db.get_doc('Penetapan Konteks', frm.doc.data_penetapan_konteks).then(result => {
			let b = $(`<div class="table-responsive-sm"><table class="table table-hover table-sm">
				<tbody>
					<tr>
						<th>Program</th>
						<td>: `+result.program+`</td>
					</tr>
					<tr>
						<th>Sasaran</th>
						<td>: `+result.sasaran+`</td>
					</tr>
					<tr>
						<th>Kegiatan</th>
						<td>: `+result.kegiatan+`</td>
					</tr>
					<tr>
						<th>BL Tgl Mulai</th>
						<td>: `+result.bl_tgl_mulai+`</td>
					</tr>
					<tr>
						<th>BL Tgl Selesai</th>
						<td>: `+result.bl_tgl_selesai+`</td>
					</tr>
					<tr>
						<th>KPI</th>
						<td>: `+result.kpi+`</td>
					</tr>
					<tr>
						<th >Target KPI</th>
						<td>: `+result.target_kpi+`</td>
					</tr>
					<tr>
						<th>Direktorat</th>
						<td>: `+result.direktorat+`</td>
					</tr>
					<tr>
						<th >Divisi</th>
						<td>: `+result.divisi+`</td>	
					</tr>
				</tbody>
			</table></div>`);
			$(frm.fields_dict.data_sasaran.wrapper).html(b);
			let html_risiko = $(`<div class="table-responsive-sm"><table class="table table-hover table-sm">
				<tbody>
					<tr >
						<th>Deskripsi Risiko</th>
						<td>: `+result.risiko+`</td>
					</tr>
					<tr >
						<th>Tipe Risiko</th>
						<td>: `+result.tipe_risiko+`</td>
					</tr>
					<tr>
						<th>Kategori Risiko</th>
						<td>: `+result.kategori_risiko+`</td>
					</td>
				</tbody>
			</table></div>`);
			$(frm.fields_dict.data_identifikasi_risiko.wrapper).html(html_risiko);
			
		});
		
		frm.clear_table('konteks_internal');
		frm.clear_table('konteks_external');
		frappe.model.with_doc('Penetapan Konteks', frm.doc.data_penetapan_konteks, function () {
			let source_doc = frappe.model.get_doc('Penetapan Konteks', frm.doc.data_penetapan_konteks);
		
			
			$.each(source_doc.internal, function (index, source_row) {
				const target_row = frm.add_child('konteks_internal');
				target_row.faktor_internal = source_row.faktor_internal;
				target_row.paramater_internal = source_row.paramater_internal;
				target_row.deskripsi_internal = source_row.deskripsi_internal;
				frm.refresh_field('konteks_internal');
			});
			$.each(source_doc.external, function (index, source_row) {
				const target_row = frm.add_child('konteks_external');
				target_row.faktor_external = source_row.faktor_external;
				target_row.paramater_external = source_row.paramater_external;
				target_row.deskripsi_external = source_row.deskripsi_external;
				frm.refresh_field('konteks_external');
			});
		
		});
	},
	
	refresh: function(frm,cdt, cdn) {
		//console.log(frm.doc);
		//if (!frm.is_new()) {
			//frm.add_custom_button('Click me', () => console.log('Clicked custom button'))
		//}

		frappe.db.get_doc('Penetapan Konteks', frm.doc.data_penetapan_konteks).then(result => {
			let b = $(`<div class="table-responsive-sm"><table class="table table-hover table-sm">
				<tbody>
					<tr>
						<th>Program</th>
						<td>: `+result.program+`</td>
					</tr>
					<tr>
						<th>Sasaran</th>
						<td>: `+result.sasaran+`</td>
					</tr>
					<tr>
						<th>Kegiatan</th>
						<td>: `+result.kegiatan+`</td>
					</tr>
					<tr>
						<th>BL Tgl Mulai</th>
						<td>: `+result.bl_tgl_mulai+`</td>
					</tr>
					<tr>
						<th>BL Tgl Selesai</th>
						<td>: `+result.bl_tgl_selesai+`</td>
					</tr>
					<tr>
						<th>KPI</th>
						<td>: `+result.kpi+`</td>
					</tr>
					<tr>
						<th >Target KPI</th>
						<td>: `+result.target_kpi+`</td>
					</tr>
					<tr>
						<th>Direktorat</th>
						<td>: `+result.direktorat+`</td>
					</tr>
					<tr>
						<th >Divisi</th>
						<td>: `+result.divisi+`</td>	
					</tr>
				</tbody>
			</table></div>`);
			$(frm.fields_dict.data_sasaran.wrapper).html(b);
			let html_risiko = $(`<div class="table-responsive-sm"><table class="table table-hover table-sm">
				<tbody>
					<tr >
						<th>Deskripsi Risiko</th>
						<td>: `+result.risiko+`</td>
					</tr>
					<tr >
						<th>Tipe Risiko</th>
						<td>: `+result.tipe_risiko+`</td>
					</tr>
					<tr>
						<th>Kategori Risiko</th>
						<td>: `+result.kategori_risiko+`</td>
					</td>
				</tbody>
			</table></div>`);
			$(frm.fields_dict.data_identifikasi_risiko.wrapper).html(html_risiko);
		});
		
		
		
		frm.clear_table('konteks_internal');
		frm.clear_table('konteks_external');
		frappe.model.with_doc('Penetapan Konteks', frm.doc.data_penetapan_konteks, function () {
		 	let source_doc = frappe.model.get_doc('Penetapan Konteks', frm.doc.data_penetapan_konteks);
		
			$.each(source_doc.internal, function (index, source_row) {
		 	 	const target_row = frm.add_child('konteks_internal');
		 	 	target_row.faktor_internal = source_row.faktor_internal;
		 	 	target_row.paramater_internal = source_row.paramater_internal;
		 	 	target_row.deskripsi_internal = source_row.deskripsi_internal;
		 	 	frm.refresh_field('konteks_internal');
		 	});
		 	$.each(source_doc.external, function (index, source_row) {
		 		const target_row = frm.add_child('konteks_external');
		 		target_row.faktor_external = source_row.faktor_external;
		 		target_row.parameter_external = source_row.parameter_external;
		 		target_row.deskripsi_external = source_row.deskripsi_external;
		 		frm.refresh_field('konteks_external');
		    });
		
		});
	}
});
frappe.ui.form.on('Penyebab Child', {
    kriteria_kemungkinan: function(frm,cdt,cdn) {
		let row = locals[cdt][cdn];
		 	
		frm.set_query("skala_kemungkinan", function() {	
			return {
		 		"filters": {
		 			"kriteria_kemungkinan": row.kriteria_kemungkinan
		 		}
		 	};
		});
    	frm.refresh_field("skala_kemungkinan");
		//console.table(row);
		console.log(row);
	},
	skala_kemungkinan: function(frm,cdt,cdn) {
		var child = locals[cdt][cdn];
		frappe.db.get_doc('Skala Kemungkinan', child.skala_kemungkinan).then(result => {
			
			frappe.model.set_value('tingkat_kemungkinan_inherent', result.tingkat_kemungkinan);
			frappe.model.set_value('probabilitas', result.probabilitas);
		});
	}
});
frappe.ui.form.on('Dampak Child', {
    kriteria_dampak: function(frm,cdt,cdn) {
		let row = locals[cdt][cdn];
		 	
		frm.set_query("skala_dampak", function() {	
			return {
		 		"filters": {
		 			"kriteria_skala_dampak": row.kriteria_dampak
		 		}
		 	};
		});
    	frm.refresh_field("skala_dampak");
		//console.table(row);
		console.log(row);
	},
	skala_dampak: function(frm,cdt,cdn) {
		var child = locals[cdt][cdn];
		frappe.db.get_doc('Skala Dampak', child.skala_dampak).then(result => {
			frappe.model.set_value('tingkat_dampak', result.tingkat_dampak);
			frappe.model.set_value('probabilitas', result.probabilitas);
		});
	}
});