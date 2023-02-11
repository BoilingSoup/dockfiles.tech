<?php

namespace App\Http\Requests;

use App\Http\Requests\Traits\CommentsRepliesRules;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreRepliesRequest extends FormRequest
{
    use CommentsRepliesRules;

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::user()->hasVerifiedEmail();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return $this->commentsAndRepliesRules();
    }
}
