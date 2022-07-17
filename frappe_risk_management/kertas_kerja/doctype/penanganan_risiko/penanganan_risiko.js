// Copyright (c) 2022, Muhamad Jafar Sidik and contributors
// For license information, please see license.txt

frappe.ui.form.on('Penanganan Risiko', {
	// refresh: function(frm) {

	// }
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
		frm.set_query('identifikasi_risiko', function () {
			return {
				filters: {
					konteks: frm.doc.konteks,
				}
			}
		});
		frm.set_query('analisa', function () {
			return {
				filters: {
					//risiko: frm.doc.risiko,
					strategi_penanganan: ['in', ['Reduce / Control', 'Share / Transfer', 'Avoid']]
				}
			}
		});
		if (!frm.is_new()) {
			let peristiwa_risiko = frm.doc.name;
			console.log(peristiwa_risiko);
			frappe.db.get_doc('Penanganan Risiko', null, { name: peristiwa_risiko }).then(result => {
				console.log(result);
				frm.doc.tindakan_mitigasi = [];
				$.each(result.penanganan_risiko, function (_i, e) {
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

	},
	onclick_kemungkinan: function (frm) {

		var x = frm.doc.tingkat_kemungkinan_current - frm.doc.onclick_kemungkinan;
		frm.set_value('tingkat_kemungkinan_target', x);
		frm.refresh_field("tingkat_kemungkinan_target");

		var get_kodefikasi = frm.doc.tingkat_kemungkinan_target * frm.doc.tingkat_dampak_target;
		frappe.db.get_doc('Kodefikasi', null, { nilai_kemungkinan: frm.doc.tingkat_kemungkinan_target, nilai_dampak: frm.doc.tingkat_dampak_target }).then(result => {

			frm.set_value('tingkat_risiko_target__p_x_d', get_kodefikasi + ' - ' + result.tingkat_mungkin_x_dampak);
			frm.refresh_field("tingkat_risiko_target__p_x_d");

			frm.set_value('tingkat_risiko_target__kodefikasi_', result.nilai_tingkat_risiko + ' - ' + result.tingkat_kodifikasi);
			frm.refresh_field("tingkat_risiko_target__kodefikasi_");
		});
	},
	onclick_dampak: function (frm) {

		var x = frm.doc.tingkat_dampak_current - frm.doc.onclick_dampak;
		frm.refresh_field("tingkat_dampak_target");
		frm.set_value('tingkat_dampak_target', x);


		var get_kodefikasi = frm.doc.tingkat_kemungkinan_target * frm.doc.tingkat_dampak_target;
		frappe.db.get_doc('Kodefikasi', null, { nilai_kemungkinan: frm.doc.tingkat_kemungkinan_target, nilai_dampak: frm.doc.tingkat_dampak_target }).then(result => {
			frm.refresh_field("tingkat_risiko_target__p_x_d");
			frm.set_value('tingkat_risiko_target__p_x_d', get_kodefikasi + ' - ' + result.tingkat_mungkin_x_dampak);

			frm.refresh_field("tingkat_risiko_target__kodefikasi_");
			frm.set_value('tingkat_risiko_target__kodefikasi_', result.nilai_tingkat_risiko + ' - ' + result.tingkat_kodifikasi);

		});
	},
	peristiwa_risiko: function (frm) {

	}
});
