<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>

    p {
      margin: 0;
    }
    .clearfix::after{
      content: "";
      clear: both;
      display: block;
    }
    .contents {
      width: 210mm;
      height: 297mm;
      margin: 0mm;
      padding: 10mm 10mm;
    }

    .header {
      border-bottom:1px solid black;
    }

    .documentName {
      float:left;
      font-size: 30px;
    }

    .documentNo {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
    }
    .documentNo>p {
      margin-bottom: 0px
    }

    .leftSide {
      float: left;
    }

    .rightSide {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
    }

    .totalAmount {
      border-bottom: 1px solid black;
    }

    .customerName {
      margin: 10px 0 10px 0;
      font-size: 20px;
      border-bottom: 1px solid black;
    }
    .customerName>p {
      margin-left: 200px
    }

    .totalAmount {
      margin: 20px 0 20px 0;
      font-size: 25px;
    }

    table {
      margin: 0 auto;
      border-collapse: collapse;
    }
    th{
      background-color: rgb(238, 236, 236);
      border: 1px solid black;
    }
    td {
      text-align: center;
      border:1px solid black;
    }

  </style>
</head>
<body>
  <div class="contents">
    <div class="header clearfix">
      <div class="documentName">仕切書</div>
      <div class="documentNo">
        <p>No.  sm-001</p>
      </div>
    </div>
    <div class="basicInfo clearfix">
      <div class="leftSide">
        <div class="customerName">
          <p>様</p>
        </div>
        <div class="totalAmount">
          <p>合計金額(税込) 2000円</p>
        </div>
      </div>
      <div class="rightSide">
        <div>
          <div class="date">yyyy/mm/dd</div>
          <div class="companyInfo">
            株式会社〇〇<br>
            〒 000-0000 〇〇県〇〇市〇〇町<br>
            TEL.000-0000-0000
          </div>
        </div>
      </div>
    </div>
    <div class="rows">
      <table>
        <tr>
          <th style="width: 10mm">
            No.
          </th>
          <th style="width: 40mm">
            型式
          </th>
          <th style="width: 40mm">
            品名
          </th>
          <th style="width: 20mm">
            数量
          </th>
          <th style="width: 20mm">
            単価
          </th>
          <th style="width: 30mm">
            金額
          </th>
          <th style="width: 30mm">
            備考
          </th>
        </tr>
        <tr>
          <td>
            1
          </td>
          <td>
            サンプル型式
          </td>
          <td>
            サンプル品名
          </td>
          <td>
            10
          </td>
          <td>
            200円
          </td>
          <td>2,000 円</td>
          <td rowspan="13"></td>
        </tr>
        <tr>
          <td>
            2
          </td>
          <td>
            サンプル型式
          </td>
          <td>
            サンプル品名
          </td>
          <td>
            10
          </td>
          <td>
            200円
          </td>
          <td>
            2,000 円
          </td>
        </tr>
        <tr>
          <td>
            3
          </td>
          <td>
            サンプル型式
          </td>
          <td>
            サンプル品名
          </td>
          <td>
            10
          </td>
          <td>
            200円
          </td>
          <td>2,000 円</td>
        </tr>
        <tr>
          <td>
            4
          </td>
          <td>
            サンプル型式
          </td>
          <td>
            サンプル品名
          </td>
          <td>
            10
          </td>
          <td>
            200円
          </td>
          <td>2,000 円</td>
        </tr>
        <tr>
          <td>
            5
          </td>
          <td>
            サンプル型式
          </td>
          <td>
            サンプル品名
          </td>
          <td>
            10
          </td>
          <td>
            200円
          </td>
          <td>2,000 円</td>
        </tr>
        <tr>
          <td>
            6
          </td>
          <td>
            サンプル型式
          </td>
          <td>
            サンプル品名
          </td>
          <td>
            10
          </td>
          <td>
            200円
          </td>
          <td>2,000 円</td>
        </tr>
        <tr>
          <td>
            7
          </td>
          <td>
            サンプル型式
          </td>
          <td>
            サンプル品名
          </td>
          <td>
            10
          </td>
          <td>
            200円
          </td>
          <td>2,000 円</td>
        </tr>
        <tr>
          <td>
            8
          </td>
          <td>
            サンプル型式
          </td>
          <td>
            サンプル品名
          </td>
          <td>
            10
          </td>
          <td>
            200円
          </td>
          <td>2,000 円</td>
        </tr>
        <tr>
          <td>
            9
          </td>
          <td>
            サンプル型式
          </td>
          <td>
            サンプル品名
          </td>
          <td>
            10
          </td>
          <td>
            200円
          </td>
          <td>2,000 円</td>
        </tr>
        <tr>
          <td>
            10
          </td>
          <td>
            サンプル型式
          </td>
          <td>
            サンプル品名
          </td>
          <td>
            10
          </td>
          <td>
            200円
          </td>
          <td>2,000 円</td>
        </tr>
        <tr>
          <td rowspan="3" colspan="3">
          </td>
          <td colspan="2">
            小計
          </td>
          <td>
            2000円
          </td>
        </tr>
        <tr>
          <td colspan="2">
            消費税
          </td>
          <td>
            100円
          </td>
        </tr>
        <tr>
          <td colspan="2">
            合計
          </td>
          <td>
            2000円
          </td>
        </tr>
      </table>
    </div>
  </div>
</body>
</html>
</body>
</html>