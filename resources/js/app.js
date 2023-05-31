import "./bootstrap";

// jquery
import jQuery from "jquery";
window.$ = jQuery;

$("#addRow").on('click', function () {
  $("#deliverySlip-create-deliverySlipData")
    .append('<tr class="deliverySlip-create-tableData" name="tableData"><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td><td><p>\1000</p></td></tr>')
})
