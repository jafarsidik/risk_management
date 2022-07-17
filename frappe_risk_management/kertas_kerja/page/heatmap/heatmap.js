frappe.pages['heatmap'].on_page_load = function(wrapper) {
	new MyPage(wrapper);
}
//page content
MyPage = Class.extend({
	init: function(wrapper){
		
		this.page = frappe.ui.make_app_page({
			parent: wrapper,
			title: 'Heatmap',
			single_column: true
		});
		this.make();
	},
	//buat halaman
	make: function(){
		let me = $(this);
		let body = `<h1>testiomg</h1>`;
		$(frappe.render_template(`heatmap`, this)).appendTo(this.page.main);
		
	}
});