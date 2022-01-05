// const baseUrl = "http://localhost:3005";
//  const baseUrl = "http://3.7.53.241:3005";

// const baseUrl = "http://52.88.121.110:3005"
 const baseUrl = "http://192.168.1.47:8000"
// Abhishek sir IP. 
 
let apiPath = {
    base_url: baseUrl + "/save-client-form",
    ack_dot_form: baseUrl + "/ack-dot-form",
    login_url: baseUrl + "/users/login",
    list_form_data: baseUrl + "/list-form-data",
    list_prices: baseUrl + "/list-prices",
    form_detail: baseUrl + "/form-detail",
    driver_detail: baseUrl + "/driver-detail",
    add_client: baseUrl + "/add-client",
    update_client: baseUrl + "/update-client",
    dna_form_detail: baseUrl + "/dna-form-detail",
    change_user_status: baseUrl + "/change-user-status",
    save_paternity_form: baseUrl + "/save-paternity-form",
    save_maternity_form: baseUrl + "/save-maternity-form",
    save_immigration_form: baseUrl + "/save-immigration-form",
    save_passport_form: baseUrl + "/save-passport-form",
    save_sibblingship_form: baseUrl + "/save-siblingship-form",
    save_infidelity_form: baseUrl + "/save-infidelity-form",
    save_grandparentage_form: baseUrl + "/save-grandparentage-form",
    save_avuncular_form: baseUrl + "/save-avuncular-form",
    create_invoice: baseUrl + "/create-invoice",
    list_invoices: baseUrl + "/list-invoices",
    invoice_detail: baseUrl + "/invoice-detail",
    delete_invoice: baseUrl + "/delete-invoice",
    check_detail: baseUrl + "/check-detail",
    save_drug_result: baseUrl + "/save-drug-result",
    list_subscriptions: baseUrl + "/list-subscriptions",
    pdf_download_url: baseUrl + "/download-drug-result",
    driver_comment: baseUrl + "/driver-comment"
}

export default apiPath;
