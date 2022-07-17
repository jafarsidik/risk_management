// Copyright (c) 2022, Muhamad Jafar Sidik and contributors
// For license information, please see license.txt

frappe.ui.form.on('Penetapan Konteks dan Identifikasi Risiko', {
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
				$(frm.fields_dict.html_kajian.wrapper).html(data_kajian_risiko);
                frm.refresh_field("html_kajian");
			});
            frappe.db.get_doc('Sasaran Dan Kegiatan', frm.doc.sasaran_dan_kegiatan).then(result => {
                //Kegiatan
                let kegiatan_html= '<table class="table table-hover table-sm"><tbody><tr><th>Judul Kegiatan</th><th>Direktorat</th><th>Divisi</th><th>Tanggal Mulai</th><th>Tanggal Selesai</th></tr>';
                $.each(result.kegiatan, function( index, value ) {
                    kegiatan_html += '<tr><td>'+value.judul_kegiatan+'</td><td>'+value.direktorat+'</td><td>'+value.divisi+'</td><td>'+value.tanggal_mulai+'</td><td>'+value.tanggal_selesai+'</td></tr>';
                });
                kegiatan_html += '</tbody></table>';
                 let data_sasaran = $(`<table class="table table-hover table-sm">
                     <tbody>
                         <tr>
                             <th scope="row">ID Sasaran</th>
                             <td>:</td>
                             <td colspan=5>${result.id_sasaran}</td>
                         </tr>
                         <tr>
                             <th scope="row">Deskripsi Sasaran</th>
                             <td>:</td>
                             <td colspan=5>${result.deskripsi_sasaran}</td>
                         </tr>
                         <tr>
                             <th scope="row">Indikator Kinerja Sasaran (IKS)</th>
                             <td>:</td>
                             <td colspan=5>${result.indikator_kinerja_sasaran_iks}</td>
                        </tr>
                         <tr>
                             <th scope="row">Satuan Indikator Kinerja Sasaran</th>
                             <td>:</td>
                             <td colspan=5>${result.satuan_indikator_kinerja}</td>
                         </tr>
                        <tr>
                             <th scope="row">Target IKS</th>
                             <td>:</td>
                             <td colspan=5>${result.target_iks}</td>
                         </tr>
                         <tr>
                             <th scope="row">Direktorat Pemilik Sasaran</th>
                            <td>:</td>
                             <td colspan=5>${result.direktorat_pemilik_sasaran}</td>
                         </tr>
                        <tr>
                             <th scope="row">Divisi Pemilik Sasaran</th>
                             <td>:</td>
                            <td colspan=5>${result.divisi_pemilik_sasaran}</td>
                         </tr>
                         <tr>
                            <th scope="row">Kegiatan</th>
                            <td>:</td>
                            <td colspan=5>`+kegiatan_html+`</td>
                            </tr>
                    </tbody>
                 </table>`);
                 $(frm.fields_dict.html_sasaran_dan_kegiatan.wrapper).html(data_sasaran);
                 frm.refresh_field("html_sasaran_dan_kegiatan");
            });
		}
        //filter paramater external
        frm.set_query('parameter',"sumber_risiko_external", function(doc,cdt, cdn) {	
            var getDataChild = locals[cdt][cdn];
            return {
                filters: {
                    faktor_external:getDataChild.faktor
                }
            }
        });
        //filter paramater internal
        frm.set_query('parameter',"sumber_risiko_internal", function(doc,cdt, cdn) {	
            var getDataChild = locals[cdt][cdn];
            return {
                filters: {
                    faktor_internal:getDataChild.faktor
                }
            }
        });
	},
    id_kajian_risiko:function(frm){
        frm.set_query("sasaran_dan_kegiatan", function() {	
		 	return {
		 		"filters": {
		 			"id_kajian_risiko": frm.doc.id_kajian_risiko
		 		}
		 	};
		});
    	frm.refresh_field("sasaran_dan_kegiatan");

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
			$(frm.fields_dict.html_kajian.wrapper).html(data_kajian_risiko);
            frm.refresh_field("html_kajian");
		});
	},
    sasaran_dan_kegiatan:function(frm){
        
		frappe.db.get_doc('Sasaran Dan Kegiatan', frm.doc.sasaran_dan_kegiatan).then(result => {
			//Kegiatan
            let kegiatan_html= '<table class="table table-hover table-sm"><tbody><tr><th>Judul Kegiatan</th><th>Direktorat</th><th>Divisi</th><th>Tanggal Mulai</th><th>Tanggal Selesai</th></tr>';
            $.each(result.kegiatan, function( index, value ) {
                kegiatan_html += '<tr><td>'+value.judul_kegiatan+'</td><td>'+value.direktorat+'</td><td>'+value.divisi+'</td><td>'+value.tanggal_mulai+'</td><td>'+value.tanggal_selesai+'</td></tr>';
            });
            kegiatan_html += '</tbody></table>';
		 	let data_sasaran = $(`<table class="table table-hover table-sm">
		 		<tbody>
                     <tr>
                         <th scope="row">ID Sasaran</th>
                         <td>:</td>
                         <td colspan=5>${result.id_sasaran}</td>
                     </tr>
                     <tr>
                         <th scope="row">Deskripsi Sasaran</th>
                         <td>:</td>
                         <td colspan=5>${result.deskripsi_sasaran}</td>
                     </tr>
                     <tr>
		 				<th scope="row">Indikator Kinerja Sasaran (IKS)</th>
		 				<td>:</td>
		 				<td colspan=5>${result.indikator_kinerja_sasaran_iks}</td>
					</tr>
		 			<tr>
		 				<th scope="row">Satuan Indikator Kinerja Sasaran</th>
		 				<td>:</td>
		 				<td colspan=5>${result.satuan_indikator_kinerja}</td>
		 			</tr>
                    <tr>
		 				<th scope="row">Target IKS</th>
		 				<td>:</td>
		 				<td colspan=5>${result.target_iks}</td>
		 			</tr>
		 			<tr>
		 				<th scope="row">Direktorat Pemilik Sasaran</th>
						<td>:</td>
		 				<td colspan=5>${result.direktorat_pemilik_sasaran}</td>
		 			</tr>
					<tr>
		 				<th scope="row">Divisi Pemilik Sasaran</th>
		 				<td>:</td>
						<td colspan=5>${result.divisi_pemilik_sasaran}</td>
		 			</tr>
                    <tr>
                        <th scope="row">Kegiatan</th>
                        <td>:</td>
                        <td colspan=5>`+kegiatan_html+`</td>
                        </tr>
				</tbody>
		 	</table>`);
		 	$(frm.fields_dict.html_sasaran_dan_kegiatan.wrapper).html(data_sasaran);
		 	frm.refresh_field("html_sasaran_dan_kegiatan");
		});
	},
});

// frappe.ui.form.on('Sumber Risiko External Child', {
//     faktor:function(frm, cdt, cdn) {
//         var getDataChild = locals[cdt][cdn];
//       //  alert(getDataChild.faktor);
//         cur_frm.fields_dict["sumber_risiko_external"].set_query('paramater',"sumber_risiko_external",function(doc,cdt, cdn) {	
//             //  var getDataChild = locals[cdt][cdn];
//             console.log(doc)
//             return {
//                  filters: {
//                    faktor_external:getDataChild.faktor
//                  }
//              }
//         });
        
//  	}	
//  });
 //frm.refresh_field("parameter");
       // frappe.db.get_doc('Parameter External', child.faktor).then(result => {
        //    child.parameter = result.paramater;
        //    frm.refresh_field("parameter");
 	// 	frappe.db.get_doc('Parameter External', child.faktor_external).then(result => {
 			
 	// 		child.risk_id = result.singkatan+random;
 	// 		frm.refresh_field('risk_id');
 	 	//});