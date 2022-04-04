frappe.pages['risk-register'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Risk Register',
		single_column: true
	});
}