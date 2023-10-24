<!DOCTYPE html>
<html lang="ja">

<head>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Noto Sans JP';
        }

        table {
            border-collapse: collapse
        }

        .container {
            width: 700pt;
            height: 100%;
            margin: auto;
        }

        .header-leftside {
            height: 30px;
        }

        .flex {
            display: flex;
            justify-content: flex-start;
        }

        .border-none {
            border: none;
        }

        .max-width {
            width: 100%;
        }

        .font-color {
            color: #3CC6CC;
        }

        .col2TableWidth {
            width: 50%;
        }

        .detailRowsHead {
            background-color: #3CC6CC;
            border: 1px solid #3CC6CC;
            text-align: center;
            height: 30px;
        }

        .detailRowsHead>p {
            font-size: 18px;
            color: white;
        }

        .detailRowsBody {
            border: 1px solid #3CC6CC;
            padding: 2px 5px;
            height: 30px;
        }

        .detailRowsBody>p {
            font-size: 16px
        }

        .detailRowTr:nth-child(even)>.detailRowsBody {
            background-color: #EFFEFF;
        }

        .number {
            text-align: end;
        }

        .tableTitle {
            text-align: center;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <table class="max-width" style="height: 75px">
                <tbody>
                    <tr>
                        <td style="text-align: left; vertical-align: center;">
                            <p class="font-color font-weight-light" style="font-size: 36px;">買取明細書・依頼書</p>
                        </td>
                        <td style="text-align: right; vertical-align: center;">
                            {{-- 取引年月日 --}}
                            <p style="font-size: 14px">
                                {{ $transactionDate->year }}年{{ sprintf('%02d', $transactionDate->month) }}月{{ sprintf('%02d', $transactionDate->day) }}日
                            </p>
                            {{-- YYYY-MMDD-XXXXでXの部分に取引IDを出す --}}
                            <p style="font-size: 14px">
                                取引番号:{{ $transactionDate->year }}-{{ sprintf('%02d', $transactionDate->month) }}{{ sprintf('%02d', $transactionDate->day) }}-{{ sprintf('%04d', $id) }}
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="customer-info">
            <table class="max-width" style="height: 16px">
                <tbody style="vertical-align: top;">
                    <tr>
                        {{-- お客様情報 --}}
                        <td style="width: 50%; text-align: left; padding: 16px 8px;">
                            {{-- 会社名<br /> 事業所名 --}}
                            @if ($transactionHead['corporationDivision'] === '法人')
                                <p style="font-size: 20px">{{ $transactionHead['customerCompany'] }}<br /><span
                                        style="font-size: 16px">{{ $transactionHead['customerBranch'] }}</span>
                                </p>
                            @endif
                            <div style="margin-left: 8px; height:180px">
                                {{-- 郵便番号<br />住所 都道府県 市区町村 町・番地 <br /> 建物名など --}}
                                <p style="font-size: 14px">
                                    〒{{ substr_replace($transactionHead['customerZipCode'], '-', 3, 0) }}</p>
                                <p style="font-size: 14px">
                                    {{ "{$transactionHead['customerAddress1']}{$transactionHead['customerAddress2']}{$transactionHead['customerAddress3']}" }}
                                </p>
                                @isset($transactionHead['customerAddress4'])
                                    <p style="font-size: 14px">{{ $transactionHead['customerAddress4'] }}</p>
                                @endisset

                                </p>
                                {{-- 電話番号 <br /> 登録番号 --}}
                                @isset($transactionHead['customerPhoneNumber'])
                                    <p style="font-size: 14px">TEL {{ $transactionHead['customerPhoneNumber'] }}</p>
                                @endisset
                                @isset($transactionHead['invoiceNumber'])
                                    <p style="font-size: 14px">登録番号 {{ $transactionHead['invoiceNumber'] }}</p>
                                @endisset
                            </div>
                            {{-- お客様名 --}}
                            <table style="width: 90%; margin-top: 10px">
                                <tbody>
                                    <tr>
                                        <td style="text-align: center; width: 90%; border-bottom: 2px solid #3CC6CC;">
                                            <p style="font-size: 28px; ">
                                                {{ $transactionHead['customerName'] }}</p>
                                        </td>
                                        <td style="text-align: end; width: 10%; border-bottom: 2px solid #3CC6CC;">
                                            <p style="font-size: 20px;">様</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            {{-- 合計金額 --}}
                            <table style="width: 90%; margin-top: 10px;">
                                <tbody>
                                    <tr>
                                        <td colspan="2">
                                            <p style="font-size: 14px;">以下の通り買取申し上げます。</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            style="text-align: center; border-bottom: 2px solid #3CC6CC; background-color: #3CC6CC; width: 30%;">
                                            <p style="font-size: 16px; color: white;">
                                                買取金額</p>
                                        </td>
                                        <td style="text-align: center; border-bottom: 2px solid #3CC6CC; width: 70%;">
                                            <p style="font-size: 24px;">
                                                &yen;{{ number_format($transactionHead['total']) }}</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        </td>
                        {{-- 会社情報 --}}
                        <td style="width: 50%; text-align: left; padding: 16px 8px;">
                            {{-- 会社名<br /> 事業所名 --}}
                            <p style="font-size: 20px">{{$companyInfo['companyName']}}<br /><span style="font-size: 16px">{{$companyInfo['branchName']}}</span></p>
                            <div style="margin-left: 8px">
                                {{-- 郵便番号<br />住所 都道府県 市区町村 町・番地 <br /> 建物名など --}}
                                <p style="font-size: 14px">〒{{$companyInfo['zipcode']}}<br />{{"{$companyInfo['address1']}{$companyInfo['address2']}{$companyInfo['address3']}"}}<br />{{$companyInfo['address4']}}
                                </p>
                                {{-- 担当  <br /> email <br /> 電話番号 --}}
                                <p style="font-size: 14px; margin-top: 10px">担当 {{$companyInfo['pinName']}}<br />
                                    email {{$companyInfo['email']}}<br />
                                    TEL {{$companyInfo['tel']}}
                                </p>
                                {{-- 登録番号 --}}
                                <p style="font-size: 14px; margin-top: 10px">登録番号 {{$companyInfo['invoiceNumber']}}</p>
                                <p></p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <table class="max-width" style="margin-top: 16px">
            <thead>
                <tr>
                    <th class="detailRowsHead" style="width: 50%;">
                        <p>品番・品名</p>
                    </th>
                    <th class="detailRowsHead" style="width: 12.5%;">
                        <p>数量(重量)</p>
                    </th>
                    <th class="detailRowsHead" style="width: 12.5%;">
                        <p>単価</p>
                    </th>
                    <th class="detailRowsHead" style="width: 12.5%;">
                        <p>税率</p>
                    </th>
                    <th class="detailRowsHead" style="width: 12.5%;">
                        <p>金額</p>
                    </th>
                </tr>
            </thead>
            <tbody>
                @foreach ($detailRows as $detailRow)
                    <tr class="detailRowTr">
                        {{-- 品番 --}}
                        <td class="detailRowsBody">
                            <p>{{ $detailRow['productName'] }}</p>
                        </td>
                        {{-- 数量(重量) --}}
                        <td class="detailRowsBody number">
                            <p>{{ number_format($detailRow['quantity']) }}</p>
                        </td>
                        {{-- 単価 --}}
                        <td class="detailRowsBody number">
                            <p>{{ number_format($detailRow['unitPrice']) }}</p>
                        </td>
                        {{-- 税率 --}}
                        <td class="detailRowsBody number">
                            <p>{{ number_format($detailRow['taxRate']) }}%</p>
                        </td>
                        {{-- 金額 --}}
                        <td class="detailRowsBody number">
                            <p>{{ number_format($detailRow['totalPrice']) }}</p>
                        </td>
                    </tr>
                @endforeach
                {{-- 少なくとも10行になるように調整する。 --}}
                @if (10 - count($detailRows) > 0)
                    @for ($i = 0; $i < 10 - count($detailRows); $i++)
                        <tr class="detailRowTr">
                            <td class="detailRowsBody">
                            </td>
                            <td class="detailRowsBody">
                            </td>
                            <td class="detailRowsBody">
                            </td>
                            <td class="detailRowsBody">
                            </td>
                            <td class="detailRowsBody">
                            </td>
                        </tr>
                    @endfor
                @endif
            </tbody>
        </table>
        <table class="max-width" style="margin-top: 16px; margin-left: 1px">
            <tbody>
                <tr class="detailRowTr">
                    <td style="width: 50%;"></td>
                    <td class="detailRowsBody tableTitle" style="width: 12.5%">
                        <p>
                            小計
                        </p>
                    </td>
                    <td class="detailRowsBody number">
                        <p>
                            {{ number_format($amountInfo['subtotal']) }}
                        </p>
                    </td>
                </tr>
                <tr class="detailRowTr">
                    <td></td>
                    <td class="detailRowsBody tableTitle">
                        <p>
                            (内消費税)
                        </p>
                    </td>
                    <td class="detailRowsBody number">
                        <p>
                            {{ number_format($amountInfo['taxInclude']) }}
                        </p>
                    </td>
                </tr>
                <tr class="detailRowTr">
                    <td></td>
                    <td class="detailRowsBody tableTitle">
                        <p>
                            合計
                        </p>
                    </td>
                    <td class="detailRowsBody number">
                        <p>
                            {{ number_format($amountInfo['total']) }}
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>
        <table class="max-width" style="margin-top: 16px; margin-left: 1px;">
            <tbody>
                @foreach ($taxInfos as $taxInfo)
                    <tr class="detailRowTr">
                        <td style="width: 50%">
                        </td>
                        {{-- 税率対象 --}}
                        <td class="detailRowsBody tableTitle" style="width: 10%;">
                            <p>{{ number_format($taxInfo['taxRate']) }}%対象</p>
                        </td>
                        {{-- 対象金額 --}}
                        <td class="detailRowsBody number" style="width: 15%">
                            <p>{{ number_format($taxInfo['taxableAmount']) }}</p>
                        </td>
                        <td class="detailRowsBody tableTitle" style="width: 10%;">
                            <p>消費税</p>
                        </td>
                        {{-- 消費税額 --}}
                        <td class="detailRowsBody number" style="width: 15%">
                            <p>{{ number_format($taxInfo['taxAmount']) }}</p>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
        <table class="max-width">
            <tbody>
                <tr>
                    <td
                        style="text-align: center; background-color: #3CC6CC; width: 15%; height: 32px;">
                        <p style="font-size: 16px; color: white;">取引備考</p>
                    </td>
                    <td style="width: 85%"></td>
                </tr>
                <tr>
                    <td colspan="2" style="border: 1px solid #3CC6CC; height: 170pt; padding: 5px 5px">
                        <p>{{$transactionHead['transactionNote']}}</p>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</body>

</html>
