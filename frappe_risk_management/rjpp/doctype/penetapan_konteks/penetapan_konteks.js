// Copyright (c) 2022, Muhamad Jafar Sidik and contributors
// For license information, please see license.txt

frappe.ui.form.on('Penetapan Konteks', {
	// code_kegiatan: function(frm) {
    //     frm.set_query("code_kegiatan", function() {	
    //        return {
    //            "filters": {
    //                "sasaran": frm.doc.sasarans
    //            }
    //        };
    //    });
	//    frm.refresh_field("code_kegiatan");
    // },

	sasarans: function(frm) {
        frm.set_query("code_kegiatan", function() {	
           return {
               "filters": {
                   "sasaran": frm.doc.sasarans
               }
           };
       });
	   frm.refresh_field("code_kegiatan");
	   //alert(frm.doc.sasarans);
    }
	//sasarans: function(frm){
		//console.log(frm);
	// 	let getDataKegiatan = frm.doc.code_kegiatan;
	// 	if(getDataKegiatan){
	// 		frappe.call({
	// 			method: "frappe_risk_management.api.get_tugas_by_kegiatan",
	// 		 	args: {code_kegiatan: getDataKegiatan}
	// 		}).done((r) => {
	// 			console.log(r);
	// 			console.log(frm);
	// 	    	frm.doc.tugas_child = []
		
	// 	    // $.each(r.message, function(_i, e){
	// 	    // 	let entry = frm.add_child("tugas_child");
	// 		//     entry.tugas = e.name;
	// 			//})
	// 		})
	// 		//refresh_field("tugas_child")
	// 	}
		
		
	// }
	// refresh: function(frm) {

	// }
	
});
