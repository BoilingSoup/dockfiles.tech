<?php

namespace Tests\Feature\Traits;

trait UserInfoJsonStructure
{
    private function userInfoJsonStructure()
    {
        return [
            'id',
            'name',
            'email',
            'email_verified_at',
            'avatar',
            'is_admin',
            'github_id',
            'gitlab_id',
        ];
    }
}
