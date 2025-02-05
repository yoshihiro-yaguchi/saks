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
     * @return array<string,array<string>>
     */
    public function rules(): array
    {
        return [
            'contractCompanyName' => ['nullable', 'max:100'],
            'contractersName' => ['required', 'max:100'],
            'invoiceNumber' => ['nullable', 'max:14'],
            'hqPhoneNumber' => ['required', 'max:15'],
            'contractZipcode' => ['required', 'nullable', 'max:8'],
            'contractAddress1' => ['required', 'nullable', 'max:10'],
            'contractAddress2' => ['required', 'nullable', 'max:50'],
            'contractAddress3' => ['required', 'nullable', 'max:100'],
            'contractAddress4' => ['nullable', 'nullable', 'max:100'],
        ];
    }
}
