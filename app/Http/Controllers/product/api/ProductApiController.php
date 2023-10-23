<?php

namespace App\Http\Controllers\Product\Api;


use App\Http\Controllers\Controller;
use App\Http\Requests\Product\Api\ApiGetProduct;
use App\Http\Requests\Product\Api\ApiSearchProduct;
use App\Http\Requests\Product\Api\ApiStoreRequest;
use App\Http\Requests\Product\Api\ApiUpdateRequest;
use App\Models\Product;
use App\Services\CommonService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProductApiController extends Controller

{

    /**
     * 商品検索
     *
     * @param ApiSearchProduct $request
     * @return void
     */
    public function search (ApiSearchProduct $request) {
        $commonService = new CommonService();
        $contractId = $commonService->getContractId();

        $query = DB::table('products')->select(
            'production_code as productionCode',
            'production_name as productionName',
            'unit_price as unitPrice',
            'unit as unit' ,
            'tax_division as taxDivision',
            'tax_rate as taxRate'
        )->where('contract_id', '=' ,$contractId);
        // 条件設定
        if ($request->input('productionCode') !== null) {
            $query->where('production_code', '=', $request->input('productionCode'));
        }
        if ($request->input('productionName') !== null) {
            $query->where('production_name', 'like', "%{$request->input('productionName')}%");
        }
        if ($request->input('taxDivision') !== null) {
            $query->where('tax_division', '=', $request->input('taxDivision'));
        }
        if ($request->input('taxRate') !== null) {
            $query->where('tax_rate', '=', $request->input('taxRate'));
        }

        $count = $query->count();
        if ($count === 0) {
            return response()->json(
                [
                    'count' => $count,
                    'products' => [],
                ],
                200
            );
        }

        return response()->json(
            [
                'count' => $count,
                'products' => $query->forPage($request->input('page'), $request->input('itemsPerPage'))->orderBy('created_at')->get()
            ],
            200
        );
    }

    /**
     * 商品登録
     *
     * @param ApiStoreRequest $request
     * @return void
     */
    public function store (ApiStoreRequest $request) {
        Log::info('ProductApiController.store START');

        $productModel = new Product();

        $commonService = new CommonService();
        $contractId = $commonService->getContractId();

        $productModel->fill([
            'contract_id' => $contractId,
            'production_code' => $request->input('productionCode'),
            'production_name' => $request->input('productionName'),
            'unit_price' => $request->input('unitPrice'),
            'tax_division' => $request->input('taxDivision'),
            'tax_rate' => $request->input('taxRate'),
            'unit' => $request->input('unit'),
        ])->save();

        Log::info('ProductApiController.store END');

        return response()->json(
            [
                'status' => 'success',
                'id' => $productModel->production_code
            ],
            '200'
        );
    }

    /**
     * 商品取得
     *
     * @param ApiGetProduct $request
     * @return void
     */
    public function getProduct (ApiGetProduct $request) {
        Log::info('ProductApiController.getProduct START');
        $commonService = new CommonService();
        $contractId = $commonService->getContractId();

        $query = DB::table('products')->select(
            'production_code as productionCode',
            'production_name as productionName',
            'unit_price as unitPrice',
            'unit as unit' ,
            'tax_division as taxDivision',
            'tax_rate as taxRate'
        )->where('contract_id', '=' ,$contractId)->where('production_code', '=', $request->input('productionCode'));

        $count = $query->count();
        if ($count === 0) {
            return response()->json(
                [
                    'count' => $count,
                    'products' => null,
                ],
                200
            );
        }
        Log::info('ProductApiController.getProduct END');
        return response()->json(
            [
                'count' => $count,
                'product' => $query->forPage($request->input('page'), $request->input('itemsPerPage'))->orderBy('created_at')->first()
            ],
            200
        );
    }

    /**
     * 商品更新
     *
     * @param ApiStoreRequest $request
     * @return void
     */
    public function update (ApiUpdateRequest $request) {
        Log::info('ProductApiController.update START');

        $productModel = new Product();

        $commonService = new CommonService();
        $contractId = $commonService->getContractId();

        DB::table('products')->where('contract_id', '=', $contractId)->where('production_code', '=', $request->input('productionCode'))->update([
            'production_name' => $request->input('productionName'),
            'unit_price' => $request->input('unitPrice'),
            'tax_division' => $request->input('taxDivision'),
            'tax_rate' => $request->input('taxRate'),
            'unit' => $request->input('unit')
        ]);

        Log::info('ProductApiController.update END');

        return response()->json(
            [
                'status' => 'success',
                'id' => $productModel->production_code
            ],
            '200'
        );
    }
}
