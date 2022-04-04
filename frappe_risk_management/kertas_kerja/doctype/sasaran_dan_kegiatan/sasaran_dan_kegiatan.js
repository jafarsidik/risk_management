// Copyright (c) 2022, Muhamad Jafar Sidik and contributors
// For license information, please see license.txt

frappe.ui.form.on('Sasaran Dan Kegiatan', {
	refresh: function(frm) {
		if (!frm.is_new()) {
			frappe.db.get_doc('Kajian Risiko', null,{ id_kajian_risiko: frm.doc.id_kajian_risiko }).then(result => {
				let data_kajian_risiko = $(`<table class="table table-hover table-sm">
					<tbody>
						<tr>
							<th>ID Kajian Risko</th>
							<th>Jenis Kajian</td>
							<th>Judul Kajian Risiko</td>
							<th>Nama RJPP</td>
							<th>Program</td>
						</tr>
						<tr>
							<td>${result.id_kajian_risiko}</td>
							<td>${result.jenis_kajian}</td>
							<td>${result.judul_kajian_risiko}</td>
							<td>${result.nama_rjpp}</td>
							<td>${result.program}</td>
						</tr>
						
						
					</tbody>
				</table>`);
				$(frm.fields_dict.html_kajian_risiko.wrapper).html(data_kajian_risiko);
			});
		}
	},
	id_kajian_risiko:function(frm){
		frappe.db.get_doc('Kajian Risiko', null,{ id_kajian_risiko: frm.doc.id_kajian_risiko }).then(result => {
			let data_kajian_risiko = $(`<table class="table table-hover table-sm">
				<tbody>
					<tr>
						<th>ID Kajian Risko</th>
						<th>Jenis Kajian</td>
						<th>Judul Kajian Risiko</td>
						<th>Nama RJPP</td>
						<th>Program</td>
					</tr>
					<tr>
						<td>${result.id_kajian_risiko}</td>
						<td>${result.jenis_kajian}</td>
						<td>${result.judul_kajian_risiko}</td>
						<td>${result.nama_rjpp}</td>
						<td>${result.program}</td>
					</tr>
					
					
				</tbody>
			</table>`);
			$(frm.fields_dict.html_kajian_risiko.wrapper).html(data_kajian_risiko);
		});
	}
});
// frappe.ui.form.on('Kegiatan Child', {
	
//     tanggal_mulai:function(frm,cdt,cdn) {
// 		var child = locals[cdt][cdn];
// 		var date1 = new Date(frm.doc.tanggal_mulai);
// 		var date2 = new Date(frm.doc.tanggal_selesai);
// 		// hitung perbedaan waktu dari dua tanggal
// 		var Difference_In_Time = date2.getTime() - date1.getTime();
// 		// hitung jml hari antara dua tanggal
// 		var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
// 		frm.set_value('durasi',Difference_In_Days);
// 		frm.refresh_field('durasi');
// 	},	
// 	tanggal_selesai:function(frm,cdt,cdn) {
// 		var child = locals[cdt][cdn];
// 		var date1 = new Date(child.tanggal_mulai);
// 		var date2 = new Date(child.tanggal_selesai);
// 		// hitung perbedaan waktu dari dua tanggal
// 		var Difference_In_Time = date2.getTime() - date1.getTime();
// 		// hitung jml hari antara dua tanggal
// 		var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
// 		frm.set_value('durasi',Difference_In_Days);
// 		frm.refresh_field('durasi');
// 	},	
// });
