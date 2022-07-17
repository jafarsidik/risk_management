// Copyright (c) 2022, Muhamad Jafar Sidik and contributors
// For license information, please see license.txt

frappe.ui.form.on('Sasaran', {
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
