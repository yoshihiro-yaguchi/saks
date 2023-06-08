<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>仕切書</title>
  @vite(['resources/sass/app.scss','resources/css/app.css', 'resources/js/app.ts'])
</head>
<body class="deliverySlip-create">
  <header>
  </header>
  <div class="deliverySlip-create-contents">
    <div class="deliverySlip-create-header">
      <h1>仕切書作成</h1>
    </div>
    <div class="deliverySlip-create-addRow">
      <button class="btn btn btn-outline-secondary btn-sm" id="addRow">行追加</button>
    </div>
      <table class="deliverySlip-create-deliverySlipData" id="deliverySlip-create-deliverySlipData">
        <tr class="deliverySlip-create-tableHeader">
          <th>商品ID</th>
          <th>商品名</th>
          <th>単価</th>
          <th>税率</th>
          <th>数量</th>
          <th>価格</th>
        </tr>
        <tr class="deliverySlip-create-tableData" id="deliverySlip-create-tableData-1" name="tableData">
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><p>1000</p></td>
        </tr>
      </table>
    </div>
    <div class="footer"></div>
  </div>
</body>
<script>
</script>
</html>