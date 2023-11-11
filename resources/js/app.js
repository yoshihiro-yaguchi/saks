import "./bootstrap";

// jquery
import jQuery from "jquery";
window.$ = jQuery;

/**
 * 仕切書作成画面
 */
$(function () {
  let name = "deliverySlip-create-tableData-";
  let idx = 1;
  // 行追加
  $("#addRow").on("click", function () {
    idx++;
    let id = name + idx;
    $("#deliverySlip-create-deliverySlipData").append(
      `<tr class="deliverySlip-create-tableData" id=${id} name="tableData"></tr>`
    );
    $(`#${id}`).append(
      `<td><FullWidthInput name="productId" type="text"></td>`
    );
    $(`#${id}`).append(`<td><FullWidthInput type="text"></td>`);
    $(`#${id}`).append(`<td><FullWidthInput type="text"></td>`);
    $(`#${id}`).append(`<td><FullWidthInput type="text"></td>`);
    $(`#${id}`).append(`<td><FullWidthInput type="text"></td>`);
    $(`#${id}`).append(`<td><p>1000</p></td>`);
  });
});
