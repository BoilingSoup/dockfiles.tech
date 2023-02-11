<?php

namespace App\Http\Requests;

use App\Http\Requests\Traits\CommentsRepliesRules;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreCommentsRequest extends FormRequest
{
    use CommentsRepliesRules;

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::check();
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
