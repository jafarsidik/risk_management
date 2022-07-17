// Copyright (c) 2022, Muhamad Jafar Sidik and contributors
// For license information, please see license.txt

frappe.ui.form.on('Identifikasi Risiko', {
	setup: function (frm) {
		frm.set_query('sasaran', function () {
			return {
				filters: {
					id_kajian_risiko: frm.doc.kajian,
				}
			}
		});
		frm.set_query('kegiatan', function () {
			return {
				filters: {
					sasaran: frm.doc.sasaran,
				}
			}
		});
		frm.set_query('konteks', function () {
			return {
				filters: {
					kegiatan: frm.doc.kegiatan,
				}
			}
		});
		frm.set_query('tipe_risiko', function () {
			return {
				filters: {
					kategori_risiko: frm.doc.kategori_risiko,
				}
			}
		});


	},
	refresh: function (frm) {

		if (!frm.is_new()) {

			frappe.db.get_doc('Penetapan Konteks', null, { name: frm.doc.konteks }).then(result => {
				frappe.db.get_doc("Kegiatans", result.kegiatan).then(result_kegiatan => {
					frappe.db.get_doc("Sasaran", result.sasaran).then(result_sasaran => {
						frappe.db.get_doc("Kajian Risiko", result.id_kajian_risiko).then(result_kajian_risiko => {


							//Sumber Risiko External
							let sumber_risiko_external_html = '<table class="table table-hover table-sm"><tbody><tr><th>Faktor</th><th>Parameter</th><th>Deskripsi</th></tr>';
							$.each(result.sumber_risiko_external, function (index, value) {
								sumber_risiko_external_html += '<tr><td>' + value.faktor + '</td><td>' + value.parameter + '</td><td>' + value.deskripsi + '</td></tr>';
							});
							sumber_risiko_external_html += '</tbody></table>';
							//Sumber Risiko Internal
							let sumber_risiko_internal_html = '<table class="table table-hover table-sm"><tbody><tr><th>Faktor</th><th>Parameter</th><th>Deskripsi</th></tr>';
							$.each(result.sumber_risiko_internal, function (index, value) {
								sumber_risiko_internal_html += '<tr><td>' + value.faktor + '</td><td>' + value.parameter + '</td><td>' + value.deskripsi + '</td></tr>';
							});
							sumber_risiko_internal_html += '</tbody></table>';

							let data_konteks = $(`<table class="table table-hover table-sm">
								<tbody>
									<tr><th colspan="3">Kajian Risiko</th></tr>
									<tr>
										<td>ID Kajian Risiko</td>
										<td>:</td>
										<td>${result_kajian_risiko.id_kajian_risiko}</td>
									</tr>
									<tr>
										<td>Jenis Risiko</td>
										<td>:</td>
										<td>${result_kajian_risiko.jenis_kajian}</td>
									</tr>
									<tr>
										<td>Kajian Risiko</td>
										<td>:</td>
										<td>${result_kajian_risiko.judul_kajian_risiko}</td>
									</tr>
									<tr>
										<td>RJPP</td>
										<td>:</td>
										<td>${result_kajian_risiko.nama_rjpp}</td>
									</tr>
									<tr>
										<td>Program</td>
										<td>:</td>
										<td>${result_kajian_risiko.program}</td>
									</tr>
									<tr><th colspan="3">Sasaran</th></tr>
									<tr>
										<td>ID Sasaran</td>
										<td>:</td>
										<td>${result_sasaran.id_sasaran}</td>
									</tr>
									<tr>
										<td>Deskripsi Sasaran</td>
										<td>:</td>
										<td>${result_sasaran.deskripsi_sasaran}</td>
									</tr>
									<tr>
										<td>Organisasi</td>
										<td>:</td>
										<td>${result_sasaran.organisasi}</td>
									</tr>
									<tr>
										<td>Unit Kerja</td>
										<td>:</td>
										<td>${result_sasaran.unit_kerja}</td>
									</tr>
									<tr>
										<td>Indikator Kinerja Sasaran (IKS)</td>
										<td>:</td>
										<td>${result_sasaran.indikator_kinerja_sasaran_iks}</td>
									</tr>
									<tr>
										<td>Satuan Indikator Kinerja</td>
										<td>:</td>
										<td>${result_sasaran.satuan_indikator_kinerja}</td>
									</tr>
									<tr>
										<td>Target IKS</td>
										<td>:</td>
										<td>${result_sasaran.target_iks}</td>
									</tr>
									<tr>
										<td>Target IKS</td>
										<td>:</td>
										<td>${result_sasaran.direktorat_pemilik_sasaran}</td>
									</tr>
									<tr>
										<td>Direktorat Pemilik Sasaran</td>
										<td>:</td>
										<td>${result_sasaran.direktorat_pemilik_sasaran}</td>
									</tr>
									<tr><th colspan="3">Kegiatan</th></tr>
									<tr>
										<td>Judul Kegiatan</td>
										<td>:</td>
										<td>${result_kegiatan.judul_kegiatan}</td>
									</tr>
									<tr>
										<td>Direktorat</td>
										<td>:</td>
										<td>${result_kegiatan.direktorat}</td>
									</tr>
									<tr>
										<td>Divisi</td>
										<td>:</td>
										<td>${result_kegiatan.divisi}</td>
									</tr>
									<tr>
										<td>Tanggal Mulai</td>
										<td>:</td>
										<td>${result_kegiatan.tanggal_mulai}</td>
									</tr>
									<tr>
										<td>Tanggal Selesai</td>
										<td>:</td>
										<td>${result_kegiatan.tanggal_selesai}</td>
									</tr>
									<tr>
										<td>Output Kegiatan</td>
										<td>:</td>
										<td>${result_kegiatan.output_kegiatan}</td>
									</tr>
									<tr>
										<td>Indikator Kinerja Kegiatan</td>
										<td>:</td>
										<td>${result_kegiatan.indikator_kinerja_kegiatan_ikk}</td>
									</tr>
									<tr>
										<td>Satuan Indikator Kinerja Kegiatan</td>
										<td>:</td>
										<td>${result_kegiatan.satuan_ikk}</td>
									</tr>
									<tr>
										<td>Target Indikator Kinerja Kegiatan</td>
										<td>:</td>
										<td>${result_kegiatan.target_ikk}</td>
									</tr>
									<tr>
										<td>Anggaran Kegiatan</td>
										<td>:</td>
										<td>${result_kegiatan.anggaran_kegiatan}</td>
									</tr>
									<tr><th colspan="3">Penetapan Konteks</th></tr>
									<tr>
										<td>Deskripsi Konteks</td>
										<td>:</td>
										<td>${result.deskripsi_konteks}</td>
									</tr>
									<tr>
										<td scope="row">Sumber Risiko External</td>
										<td>:</td>
										<td colspan=5>`+ sumber_risiko_external_html + `</td>
									</tr>
									<tr>
										<td scope="row">Sumber Risiko External</td>
										<td>:</td>
										<td colspan=5>`+ sumber_risiko_internal_html + `</td>
									</tr>
								</tbody>
							</table>`);
							$(frm.fields_dict.data_konteks.wrapper).html(data_konteks);
							frm.refresh_field("data_konteks");
						});
					});
				});
			});
		}
	},
	konteks: function (frm) {

		frappe.db.get_doc('Penetapan Konteks', null, { name: frm.doc.konteks }).then(result => {
			frappe.db.get_doc("Kegiatans", result.kegiatan).then(result_kegiatan => {
				frappe.db.get_doc("Sasaran", result.sasaran).then(result_sasaran => {
					frappe.db.get_doc("Kajian Risiko", result.id_kajian_risiko).then(result_kajian_risiko => {


						//Sumber Risiko External
						let sumber_risiko_external_html = '<table class="table table-hover table-sm"><tbody><tr><th>Faktor</th><th>Parameter</th><th>Deskripsi</th></tr>';
						$.each(result.sumber_risiko_external, function (index, value) {
							sumber_risiko_external_html += '<tr><td>' + value.faktor + '</td><td>' + value.parameter + '</td><td>' + value.deskripsi + '</td></tr>';
						});
						sumber_risiko_external_html += '</tbody></table>';
						//Sumber Risiko Internal
						let sumber_risiko_internal_html = '<table class="table table-hover table-sm"><tbody><tr><th>Faktor</th><th>Parameter</th><th>Deskripsi</th></tr>';
						$.each(result.sumber_risiko_internal, function (index, value) {
							sumber_risiko_internal_html += '<tr><td>' + value.faktor + '</td><td>' + value.parameter + '</td><td>' + value.deskripsi + '</td></tr>';
						});
						sumber_risiko_internal_html += '</tbody></table>';

						let data_konteks = $(`<table class="table table-hover table-sm">
							<tbody>
								<tr><th colspan="3">Kajian Risiko</th></tr>
								<tr>
									<td>ID Kajian Risiko</td>
									<td>:</td>
									<td>${result_kajian_risiko.id_kajian_risiko}</td>
								</tr>
								<tr>
									<td>Jenis Risiko</td>
									<td>:</td>
									<td>${result_kajian_risiko.jenis_kajian}</td>
								</tr>
								<tr>
									<td>Kajian Risiko</td>
									<td>:</td>
									<td>${result_kajian_risiko.judul_kajian_risiko}</td>
								</tr>
								<tr>
									<td>RJPP</td>
									<td>:</td>
									<td>${result_kajian_risiko.nama_rjpp}</td>
								</tr>
								<tr>
									<td>Program</td>
									<td>:</td>
									<td>${result_kajian_risiko.program}</td>
								</tr>
								<tr><th colspan="3">Sasaran</th></tr>
								<tr>
									<td>ID Sasaran</td>
									<td>:</td>
									<td>${result_sasaran.id_sasaran}</td>
								</tr>
								<tr>
									<td>Deskripsi Sasaran</td>
									<td>:</td>
									<td>${result_sasaran.deskripsi_sasaran}</td>
								</tr>
								<tr>
									<td>Organisasi</td>
									<td>:</td>
									<td>${result_sasaran.organisasi}</td>
								</tr>
								<tr>
									<td>Unit Kerja</td>
									<td>:</td>
									<td>${result_sasaran.unit_kerja}</td>
								</tr>
								<tr>
									<td>Indikator Kinerja Sasaran (IKS)</td>
									<td>:</td>
									<td>${result_sasaran.indikator_kinerja_sasaran_iks}</td>
								</tr>
								<tr>
									<td>Satuan Indikator Kinerja</td>
									<td>:</td>
									<td>${result_sasaran.satuan_indikator_kinerja}</td>
								</tr>
								<tr>
									<td>Target IKS</td>
									<td>:</td>
									<td>${result_sasaran.target_iks}</td>
								</tr>
								<tr>
									<td>Target IKS</td>
									<td>:</td>
									<td>${result_sasaran.direktorat_pemilik_sasaran}</td>
								</tr>
								<tr>
									<td>Direktorat Pemilik Sasaran</td>
									<td>:</td>
									<td>${result_sasaran.direktorat_pemilik_sasaran}</td>
								</tr>
								<tr><th colspan="3">Kegiatan</th></tr>
								<tr>
									<td>Judul Kegiatan</td>
									<td>:</td>
									<td>${result_kegiatan.judul_kegiatan}</td>
								</tr>
								<tr>
									<td>Direktorat</td>
									<td>:</td>
									<td>${result_kegiatan.direktorat}</td>
								</tr>
								<tr>
									<td>Divisi</td>
									<td>:</td>
									<td>${result_kegiatan.divisi}</td>
								</tr>
								<tr>
									<td>Tanggal Mulai</td>
									<td>:</td>
									<td>${result_kegiatan.tanggal_mulai}</td>
								</tr>
								<tr>
									<td>Tanggal Selesai</td>
									<td>:</td>
									<td>${result_kegiatan.tanggal_selesai}</td>
								</tr>
								<tr>
									<td>Output Kegiatan</td>
									<td>:</td>
									<td>${result_kegiatan.output_kegiatan}</td>
								</tr>
								<tr>
									<td>Indikator Kinerja Kegiatan</td>
									<td>:</td>
									<td>${result_kegiatan.indikator_kinerja_kegiatan_ikk}</td>
								</tr>
								<tr>
									<td>Satuan Indikator Kinerja Kegiatan</td>
									<td>:</td>
									<td>${result_kegiatan.satuan_ikk}</td>
								</tr>
								<tr>
									<td>Target Indikator Kinerja Kegiatan</td>
									<td>:</td>
									<td>${result_kegiatan.target_ikk}</td>
								</tr>
								<tr>
									<td>Anggaran Kegiatan</td>
									<td>:</td>
									<td>${result_kegiatan.anggaran_kegiatan}</td>
								</tr>
								<tr><th colspan="3">Penetapan Konteks</th></tr>
								<tr>
									<td>Deskripsi Konteks</td>
									<td>:</td>
									<td>${result.deskripsi_konteks}</td>
								</tr>
								<tr>
									<td scope="row">Sumber Risiko External</td>
									<td>:</td>
									<td colspan=5>`+ sumber_risiko_external_html + `</td>
								</tr>
								<tr>
									<td scope="row">Sumber Risiko External</td>
									<td>:</td>
									<td colspan=5>`+ sumber_risiko_internal_html + `</td>
								</tr>
							</tbody>
						</table>`);
						$(frm.fields_dict.data_konteks.wrapper).html(data_konteks);
						frm.refresh_field("data_konteks");
					});
				});
			});
		});
	},
	// kategori_risiko:function(frm){
	// 	console.log(frm.doc);
	// 	frappe.db.get_doc('Kategori Risiko', null,{ name: frm.doc.kategori_risiko }).then(result => {
	// 		frappe.db.get_doc('Tiper Risiko', null,{ name: frm.doc.kategori_risiko }).then(result_tipe => {
	// 			frm.set_value('risk_id',result.singkatan +);
	// 			frm.refresh_field("risk_id");
	// 	});
	// }
});
