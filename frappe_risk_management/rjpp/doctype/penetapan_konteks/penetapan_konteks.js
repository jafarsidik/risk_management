// Copyright (c) 2022, Muhamad Jafar Sidik and contributors
// For license information, please see license.txt

frappe.ui.form.on('Penetapan Konteks', {
	
	
	// sasarans: function(frm) {
    //     frm.set_query("code_kegiatan", function() {	
    //        return {
    //            "filters": {
    //                "sasaran": frm.doc.sasarans
    //            }
    //        };
    //    });
	//    frm.refresh_field("code_kegiatan");
	  
    // }
	
	refresh: function(frm) {
		//console.log(frm.doc);
		let b = $(`<table class="table table-hover table-sm">
			<tbody>
				<tr>
					<th scope="row">Program</th>
					<td colspan=5>: `+frm.doc.program+`</td>
				</tr>
				<tr>
					<th scope="row">Sasaran</th>
					<td colspan=5>: `+frm.doc.sasaran+`</td>
				</tr>
				<tr >
					<th scope="row">Kegiatan</th>
					<td colspan=5>: `+frm.doc.kegiatan+`</td>
				</tr>
				<tr>
					<th scope="row">BL Tgl Mulai</th>
					<td >: `+frm.doc.bl_tgl_mulai+`</td>
				</tr>
				<tr>
					<th scope="row">BL Tgl Selesai</th>
					<td>: `+frm.doc.bl_tgl_selesai+`</td>
				</tr>
				<tr>
					<th scope="row">KPI</th>
					<td>: `+frm.doc.kpi+`</td>
				</tr>
				<tr>
					<th scope="row">Target KPI</th>
					<td>: `+frm.doc.target_kpi+`</td>
				</tr>
				<tr>
					<th scope="row">Direktorat</th>
					<td>: `+frm.doc.direktorat+`</td>
				</tr>
				<tr>
					<th scope="row">Divisi</th>
					<td>: `+frm.doc.divisi+`</td>
				</tr>
			</tbody>
	  	</table>`);
		$(frm.fields_dict.data_sasaran.wrapper).html(b);
	},
	code_kegiatan:function(frm){
	
		//let data_sasaran = '<p>'+frm.doc.kegiatan+'</p>';
		let b = $(`<table class="table table-hover table-sm">
		
			<tbody>
				<tr>
					<th scope="row">Program</th>
					<td colspan=5>: `+frm.doc.program+`</td>
				</tr>
				<tr>
					<th scope="row">Sasaran</th>
					<td colspan=5>: `+frm.doc.sasaran+`</td>
				</tr>
				<tr >
					<th scope="row">Kegiatan</th>
					<td colspan=5>: `+frm.doc.kegiatan+`</td>
				</tr>
				<tr>
					<th scope="row">BL Tgl Mulai</th>
					<td >: `+frm.doc.bl_tgl_mulai+`</td>
				</tr>
				<tr>
					<th scope="row">BL Tgl Selesai</th>
					<td>: `+frm.doc.bl_tgl_selesai+`</td>
				</tr>
				<tr>
					<th scope="row">KPI</th>
					<td>: `+frm.doc.kpi+`</td>
				</tr>
				<tr>
					<th scope="row">Target KPI</th>
					<td>: `+frm.doc.target_kpi+`</td>
				</tr>
				<tr>
					<th scope="row">Direktorat</th>
					<td>: `+frm.doc.direktorat+`</td>
				</tr>
				<tr>
					<th scope="row">Divisi</th>
					<td>: `+frm.doc.divisi+`</td>
				</tr>
			</tbody>
	  	</table>`);
		$(frm.fields_dict.data_sasaran.wrapper).html(b);
		//   const update_data = frm => {
		// 	const vm = new Vue({
		// 		el: "#items",
		// 		data: {
		// 			items: frm.doc.items
		// 		}
		// 	});
		//frm.refresh_field("kegiatan_text");
	},
	kategori_risiko: function(frm) {
		frm.set_query("tipe_risiko", function() {	
			return {
				"filters": {
					"kategori_risiko": frm.doc.kategori_risiko
				}
			};
		});
    	frm.refresh_field("tipe_risiko");
	}
	
});
