# hexo-tag-ossimg (Deprecated)

[![Build Status](https://travis-ci.org/chenxuefei-pp/hexo-tag-ossimg.svg?branch=master)](https://travis-ci.org/chenxuefei-pp/hexo-tag-ossimg)

# About

## This project is no longer maintained. Please use [hexo-asset-oss](https://github.com/stan-chen/hexo-asset-oss.git).

> This is a [Hexo](http://hexo.io/) tag plugin for push post image to aliyun OSS.

## Installation

```bash
npm install --save hexo-tag-ossimg
```

## Usage

The full tag format is as follows:

```bash
{% ossimg slug [title] %}
```

example:

```bash
{% ossimg 1.png the image %}
```

## Configuration

You can configure the type, autoplay and size in your main _config.yml:

Example configuration:

```yml
# OSS Images Config
asset_oss:
    enable: true
    oss_url: https://assets.example.com
    oss_root: /static/ # optional default '/'
    oss_img_path: /images/ # optional default '/images/'
    oss_acid: <AccessID>
    oss_ackey: <AccessKey>
    oss_region: oss-cn-shenzhen
    oss_bucket: assets-example-com
    oss_internal: false # optional is internal default false
```

Push all assets to OSS ? [HERE](https://github.com/chenxuefei-pp/hexo-asset-oss#readme)

## License

Copyright (c) 2017, Xuefei Chen. Licensed under the [MIT license](LICENSE).
