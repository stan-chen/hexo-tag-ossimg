'use strict';
/**
 * Author Xuefei Chen
 * Email chenxuefei_pp@163.com
 * Created on 2017/8/17 12:54
 */

var url = require('url');
var ctx = hexo;

var oss_config = ctx.config.asset_oss;

var ossimg_enable = false;
if (oss_config.enable &&
    oss_config.oss_url.length &&
    oss_config.oss_acid.length &&
    oss_config.oss_ackey.length &&
    oss_config.oss_region.length &&
    oss_config.oss_bucket.length  ){
    ossimg_enable = true;
}

var PostAsset = ctx.model('PostAsset');
var oss_img_list = []
hexo.extend.tag.register('ossimg', function(args){
    var img_root = '';

    if (!ossimg_enable){
        img_root = ctx.config.root;
    } else {
        var oss_root = '/';
        if (oss_config.oss_root.length){
            oss_root = oss_config.oss_root;
        }
        img_root = url.resolve(oss_config.oss_url , oss_root);
    }

    var slug = args.shift();
    if (!slug) return;

    var asset = PostAsset.findOne({post: this._id, slug: slug});
    if (!asset) return;

    var title = args.length ? args.join(' ') : '';

    var alt = title || asset.slug;

    oss_img_list.push(asset);

    return '<img src="' + url.resolve(img_root, asset.path) + '" alt="' + alt + '" title="' + title + '">';
});

if(ossimg_enable) {
    hexo.extend.filter.register('after_generate', require('./processor')(ctx, oss_img_list) );
}



