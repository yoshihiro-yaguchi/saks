<?php

namespace App\Http\Controllers;

use Mccarlosen\LaravelMpdf\Facades\LaravelMpdf;

class PdfController extends Controller
{
    public function viewPdf()
    {
        $data = [
            'foo' => 'bar',
        ];
        //ここでviewに$dataを送っているけど、
        //今回$dataはviewで使わない
        $pdf = LaravelMpdf::loadView('pdf.document', $data);

        // 表示させる場合
        // return $pdf->stream('document.pdf');

        return $pdf->download('document.pdf'); //生成されるファイル名
    }
}
