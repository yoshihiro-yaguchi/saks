<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreContract extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'contractCompanyName' => ['nullable', 'max:100'],
            'contractersName' => ['required', 'max:100'],
            'contractZipcode' => ['nullable', 'max:8'],
            'contractAddress1' => ['nullable', 'max:10'],
            'contractAddress2' => ['nullable', 'max:50'],
            'contractAddress3' => ['nullable', 'max:100'],
            'contractAddress4' => ['nullable', 'max:100'],
        ];
    }
}
