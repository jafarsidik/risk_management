// Copyright (c) 2022, Muhamad Jafar Sidik and contributors
// For license information, please see license.txt

frappe.ui.form.on('Analisa dan Evaluasi Risiko', {
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
		frm.set_query('risiko', function () {
			return {
				filters: {
					konteks: frm.doc.konteks,
				}
			}
		});
		frm.set_query('skala', 'kemungkinan', function (doc, cdt, cdn) {
			var child = locals[cdt][cdn];
			return {
				filters: {
					kriteria_kemungkinan: child.tipe,
				}
			}
		})
		frm.set_query('skala', 'dampak', function (doc, cdt, cdn) {
			var child = locals[cdt][cdn];
			return {
				filters: {
					kriteria_dampak: child.tipe,
				}
			}
		})
	},

	refresh: function (frm) {

		if (!frm.is_new()) {

			var x = frm.doc.tingkat_kemungkinan * frm.doc.tingkat_dampak;
			frappe.db.get_doc('Kodefikasi', null, { no: x }).then(result => {
				frm.refresh_field("mungkin_x_dampak");
				frm.set_value('mungkin_x_dampak', result.no + ' - ' + result.tingkat_mungkin_x_dampak);
				frm.refresh_field("kodefikasi");
				frm.set_value('kodefikasi', result.no + ' - ' + result.tingkat_kodifikasi);
			});
			frappe.db.get_doc('Identifikasi Risiko', null, { name: frm.doc.risiko }).then(pkir => {
				frappe.db.get_doc('Penetapan Konteks', null, { name: pkir.konteks }).then(result => {
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
								$(frm.fields_dict.data_risiko.wrapper).html(data_konteks);
								frm.refresh_field("data_risiko");
							});
						});
					});
				});
			});
			frappe.db.get_doc('Identifikasi Risiko', null, { name: frm.doc.risiko }).then(pkir => {
				let data_analisa_risiko = $(`<table class="table table-hover table-sm">
					<tbody>
						<tr><th colspan="3">Risiko</th></tr>
						<tr>
							<td>ID Risiko</td>
							<td>:</td>
							<td>${pkir.risk_id}</td>
						</tr>
						<tr>
							<td>Kategori Risiko</td>
							<td>:</td>
							<td>${pkir.kategori_risiko}</td>
						</tr>
						<tr>
							<td>Tipe Risiko</td>
							<td>:</td>
							<td>${pkir.tipe_risiko}</td>
						</tr>
						<tr>
							<td>Risk Library</td>
							<td>:</td>
							<td>${pkir.deskripsi_libraray}</td>
						</tr>
						<tr>
							<td>Deskripsi Risiko</td>
							<td>:</td>
							<td>${pkir.deskripsi_risiko}</td>
						</tr>
						
					</tbody>
				</table>`);
				$(frm.fields_dict.risiko_html_b.wrapper).html(data_analisa_risiko);

				frm.refresh_field("risiko_html_b");
			});
		}
	},

	risiko: function (frm, cdt, cdn) {

		frappe.db.get_doc('Identifikasi Risiko', null, { name: frm.doc.risiko }).then(pkir => {
			frappe.db.get_doc('Penetapan Konteks', null, { name: pkir.konteks }).then(result => {
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
							$(frm.fields_dict.data_risiko.wrapper).html(data_konteks);
							frm.refresh_field("data_risiko");
						});
					});
				});
			});
		});

		frappe.db.get_doc('Identifikasi Risiko', null, { name: frm.doc.risiko }).then(pkir => {
			let data_analisa_risiko = $(`<table class="table table-hover table-sm">
				<tbody>
					<tr><th colspan="3">Risiko</th></tr>
					<tr>
						<td>ID Risiko</td>
						<td>:</td>
						<td>${pkir.risk_id}</td>
					</tr>
					<tr>
						<td>Kategori Risiko</td>
						<td>:</td>
						<td>${pkir.kategori_risiko}</td>
					</tr>
					<tr>
						<td>Tipe Risiko</td>
						<td>:</td>
						<td>${pkir.tipe_risiko}</td>
					</tr>
					<tr>
						<td>Risk Library</td>
						<td>:</td>
						<td>${pkir.deskripsi_libraray}</td>
					</tr>
					<tr>
						<td>Deskripsi Risiko</td>
						<td>:</td>
						<td>${pkir.deskripsi_risiko}</td>
					</tr>
					
				</tbody>
			</table>`);
			$(frm.fields_dict.risiko_html_b.wrapper).html(data_analisa_risiko);

			frm.refresh_field("risiko_html_b");
		});
	},
	tingkat_kemungkinan: function (frm) {

		var x = frm.doc.tingkat_kemungkinan * frm.doc.tingkat_dampak;
		frappe.db.get_doc('Kodefikasi', null, { nilai_kemungkinan: frm.doc.tingkat_kemungkinan, nilai_dampak: frm.doc.tingkat_dampak }).then(result => {
			frm.refresh_field("mungkin_x_dampak");
			frm.set_value('mungkin_x_dampak', x + ' - ' + result.tingkat_mungkin_x_dampak);
			frm.refresh_field("kodefikasi");
			frm.set_value('kodefikasi', result.nilai_tingkat_risiko + ' - ' + result.tingkat_kodifikasi);
		});
	},
	tingkat_dampak: function (frm) {

		var x = frm.doc.tingkat_kemungkinan * frm.doc.tingkat_dampak;
		frappe.db.get_doc('Kodefikasi', null, { nilai_kemungkinan: frm.doc.tingkat_kemungkinan, nilai_dampak: frm.doc.tingkat_dampak }).then(result => {
			frm.refresh_field("mungkin_x_dampak");
			frm.set_value('mungkin_x_dampak', x + ' - ' + result.tingkat_mungkin_x_dampak);
			frm.refresh_field("kodefikasi");
			frm.set_value('kodefikasi', result.nilai_tingkat_risiko + ' - ' + result.tingkat_kodifikasi);
		});
	},
	tingkat_kemungkinan_current: function (frm) {

		var x = frm.doc.tingkat_kemungkinan_current * frm.doc.tingkat_dampak_current;
		frappe.db.get_doc('Kodefikasi', null, { nilai_kemungkinan: frm.doc.tingkat_kemungkinan_current, nilai_dampak: frm.doc.tingkat_dampak_current }).then(result => {
			frm.refresh_field("mungking_x_dampak_current");
			frm.set_value('mungking_x_dampak_current', x + ' - ' + result.tingkat_mungkin_x_dampak);
			frm.refresh_field("kodefikasi_inherent");
			frm.set_value('kodefikasi_inherent', result.nilai_tingkat_risiko + ' - ' + result.tingkat_kodifikasi);

			frappe.db.get_doc('Perlakuan Kodefikasi', null, { no: result.nilai_tingkat_risiko }).then(r => {
				frm.refresh_field("strategi_penanganan");
				frm.set_value('strategi_penanganan', r.perlakuan);

			});
		});
	},
	tingkat_dampak_current: function (frm) {

		var x = frm.doc.tingkat_kemungkinan_current * frm.doc.tingkat_dampak_current;
		frappe.db.get_doc('Kodefikasi', null, { nilai_kemungkinan: frm.doc.tingkat_kemungkinan_current, nilai_dampak: frm.doc.tingkat_dampak_current }).then(result => {
			frm.refresh_field("mungking_x_dampak_current");
			frm.set_value('mungking_x_dampak_current', x + ' - ' + result.tingkat_mungkin_x_dampak);
			frm.refresh_field("kodefikasi_inherent");
			frm.set_value('kodefikasi_inherent', result.nilai_tingkat_risiko + ' - ' + result.tingkat_kodifikasi);

			frappe.db.get_doc('Perlakuan Kodefikasi', null, { no: result.nilai_tingkat_risiko }).then(r => {
				frm.refresh_field("strategi_penanganan");
				frm.set_value('strategi_penanganan', r.perlakuan);

			});
		});
	},
	kategori_risiko: function (frm) {
		frm.set_query("tipe_risiko", function () {
			return {
				"filters": {
					"kategori_risiko": frm.doc.kategori_risiko
				}
			};
		});
		frm.refresh_field("tipe_risiko");
	},



});

frappe.ui.form.on('Kemungkinan Child', {

	nilai: function (frm, cdt, cdn) {
		var child = locals[cdt][cdn];
		const nilai_array = [];
		$.each(frm.doc.kemungkinan, function (index, source_row) {
			nilai_array.push(source_row.nilai);
		});
		frm.set_value('tingkat_kemungkinan', Math.max.apply(Math, nilai_array));
		frm.refresh_field('tingkat_kemungkinan');
	},

	efektifitas_pengendalian_berjalan: function (frm, cdt, cdn) {
		var child = locals[cdt][cdn];
		var nilai_inherent = child.nilai;

		var nilai = 0;
		if (child.efektifitas_pengendalian_berjalan == "Tidak Efektif") {
			nilai = nilai_inherent - 0;
		} else if (child.efektifitas_pengendalian_berjalan == "Cukup Efektif") {
			nilai = nilai_inherent - 1;
		} else if (child.efektifitas_pengendalian_berjalan == "Efektif") {
			nilai = nilai_inherent - 2;
		}

		child.nilai_current = nilai;
		frm.refresh_field('kemungkinan');

		var child = locals[cdt][cdn];
		//console.log(child);
		const nilai_array = [];
		$.each(frm.doc.kemungkinan, function (index, source_row) {
			nilai_array.push(source_row.nilai_current);
		});

		frm.set_value('tingkat_kemungkinan_current', Math.max.apply(Math, nilai_array));
		frm.refresh_field('tingkat_kemungkinan_current');
	},

});
frappe.ui.form.on('Dampak Child', {

	nilai: function (frm, cdt, cdn) {
		var child = locals[cdt][cdn];
		const nilai_array = [];
		$.each(frm.doc.dampak, function (index, source_row) {
			nilai_array.push(source_row.nilai);
		});
		frm.set_value('tingkat_dampak', Math.max.apply(Math, nilai_array));
		frm.refresh_field('tingkat_dampak');
	},
	efektifitas_pengendalian_berjalan: function (frm, cdt, cdn) {
		var child = locals[cdt][cdn];
		var nilai_inherent = child.nilai;

		var nilai = 0;
		if (child.efektifitas_pengendalian_berjalan == "Tidak Efektif") {
			nilai = nilai_inherent - 0;
		} else if (child.efektifitas_pengendalian_berjalan == "Cukup Efektif") {
			nilai = nilai_inherent - 1;
		} else if (child.efektifitas_pengendalian_berjalan == "Efektif") {
			nilai = nilai_inherent - 2;
		}

		child.nilai_current = nilai;
		frm.refresh_field('dampak');


		const nilai_array = [];
		$.each(frm.doc.dampak, function (index, source_row) {
			nilai_array.push(source_row.nilai_current);
		});
		frm.set_value('tingkat_dampak_current', Math.max.apply(Math, nilai_array));
		frm.refresh_field('tingkat_dampak_current');
	},
});