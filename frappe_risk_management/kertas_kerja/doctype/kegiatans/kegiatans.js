// Copyright (c) 2022, Muhamad Jafar Sidik and contributors
// For license information, please see license.txt

frappe.ui.form.on('Kegiatans', {
	setup:function(frm){
		
		frm.set_query('sasaran', function(){
			return {
				filters: {
				   id_kajian_risiko: frm.doc.kajian_risiko,
				}
			}
		})
		
	},
	refresh: function(frm) {
		if (!frm.is_new()) {
			frappe.db.get_doc('Kajian Risiko', null,{ id_kajian_risiko: frm.doc.kajian_risiko }).then(result => {
				frappe.db.get_doc('Sasaran', null,{ name: frm.doc.sasaran }).then(result_sasaran => {
					let data_kajian_risiko = $(`<table class="table table-hover table-sm">
						<tbody>
							<tr><th colspan="3">Kajian Risiko</th></tr>
							<tr>
								<td>ID Kajian Risko</td>
								<td>:</td>
								<td>${result.id_kajian_risiko}</td>
							</tr>
							<tr>
								<td>Jenis Kajian</td>
								<td>:</td>
								<td>${result.jenis_kajian}</td>
							</tr>
							<tr>
								<td>Judul Kajian Risiko</td>
								<td>:</td>
								<td>${result.judul_kajian_risiko}</td>
							</tr>
							<tr>
								<td>Nama RJPP</td>
								<td>:</td>
								<td>${result.nama_rjpp}</td>
							<tr>
								<td>Program</td>
								<td>:</td>
								<td>${result.program}</td>
							</tr>
							<tr><th colspan="3">Sasaran</th></tr>
							<tr>
								<td>Organisasi</td>
								<td>:</td>
								<td>${result_sasaran.organisasi}</td>
							</tr>
							<tr>
								<td>Direktorat Pemilik Sasaran</td>
								<td>:</td>
								<td>${result_sasaran.direktorat_pemilik_sasaran}</td>
							</tr>
							<tr>
								<td>Unit Kerja</td>
								<td>:</td>
								<td>${result_sasaran.unit_kerja}</td>
							</tr>
							<tr>
								<td>Divisi Pemilik Sasaran</td>
								<td>:</td>
								<td>${result_sasaran.divisi_pemilik_sasaran}</td>
							</tr>
							<tr>
								<td>Deskripsi Sasaran</td>
								<td>:</td>
								<td>${result_sasaran.deskripsi_sasaran}</td>
							</tr>
							<tr>
								<td>Indikator Kinerja Sasaran</td>
								<td>:</td>
								<td>${result_sasaran.indikator_kinerja_sasaran_iks}</td>
							</tr>
							<tr>
								<td>Satuan Indikator Kinerja Sasaran</td>
								<td>:</td>
								<td>${result_sasaran.satuan_indikator_kinerja}</td>
							</tr>
							<tr>
								<td>Target Indikator Kinerja Sasaran</td>
								<td>:</td>
								<td>${result_sasaran.target_iks}</td>
							</tr>
							</tbody>
						</table>`);
					$(frm.fields_dict.data_kajian_risiko.wrapper).html(data_kajian_risiko);
					frm.refresh_field('data_kajian_risiko');
				});
			});
		}
	},
	sasaran:function(frm){
		frappe.db.get_doc('Kajian Risiko', null,{ id_kajian_risiko: frm.doc.kajian_risiko }).then(result => {
			frappe.db.get_doc('Sasaran', null,{ name: frm.doc.sasaran }).then(result_sasaran => {
				let data_kajian_risiko = $(`<table class="table table-hover table-sm">
						<tbody>
							<tr><th colspan="3">Kajian Risiko</th></tr>
							<tr>
								<td>ID Kajian Risko</td>
								<td>:</td>
								<td>${result.id_kajian_risiko}</td>
							</tr>
							<tr>
								<td>Jenis Kajian</td>
								<td>:</td>
								<td>${result.jenis_kajian}</td>
							</tr>
							<tr>
								<td>Judul Kajian Risiko</td>
								<td>:</td>
								<td>${result.judul_kajian_risiko}</td>
							</tr>
							<tr>
								<td>Nama RJPP</td>
								<td>:</td>
								<td>${result.nama_rjpp}</td>
							<tr>
								<td>Program</td>
								<td>:</td>
								<td>${result.program}</td>
							</tr>
							<tr><th colspan="3">Sasaran</th></tr>
							<tr>
								<td>Organisasi</td>
								<td>:</td>
								<td>${result_sasaran.organisasi}</td>
							</tr>
							<tr>
								<td>Direktorat Pemilik Sasaran</td>
								<td>:</td>
								<td>${result_sasaran.direktorat_pemilik_sasaran}</td>
							</tr>
							<tr>
								<td>Unit Kerja</td>
								<td>:</td>
								<td>${result_sasaran.unit_kerja}</td>
							</tr>
							<tr>
								<td>Divisi Pemilik Sasaran</td>
								<td>:</td>
								<td>${result_sasaran.divisi_pemilik_sasaran}</td>
							</tr>
							<tr>
								<td>Deskripsi Sasaran</td>
								<td>:</td>
								<td>${result_sasaran.deskripsi_sasaran}</td>
							</tr>
							<tr>
								<td>Indikator Kinerja Sasaran</td>
								<td>:</td>
								<td>${result_sasaran.indikator_kinerja_sasaran_iks}</td>
							</tr>
							<tr>
								<td>Satuan Indikator Kinerja Sasaran</td>
								<td>:</td>
								<td>${result_sasaran.satuan_indikator_kinerja}</td>
							</tr>
							<tr>
								<td>Target Indikator Kinerja Sasaran</td>
								<td>:</td>
								<td>${result_sasaran.target_iks}</td>
							</tr>
							</tbody>
						</table>`);
				$(frm.fields_dict.data_kajian_risiko.wrapper).html(data_kajian_risiko);
				frm.refresh_field('data_kajian_risiko');
			});
		});
	}
});
