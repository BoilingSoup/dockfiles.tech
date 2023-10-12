<?php

namespace App\Helpers;

use Nette\Utils\Arrays;
use Nette\Utils\Strings;

class ImageHelper
{
    public static function UrlToPublicID(string $url): string
    {
        $idWithExtension = Arrays::last(explode('/', $url));

        return Arrays::first(explode('.', $idWithExtension));
    }

  public static function isCloudinaryURL(string $url): bool
  {
      $split = explode('.', $url);
      if (count($split) !== 4) {
          return false;
      }

      return Arrays::first($split) === 'https://res' && $split[1] === 'cloudinary' && Strings::startsWith($split[2], 'com');
  }
}
