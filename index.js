'use strict';
/**
 * Author Xuefei Chen
 * Email chenxuefei_pp@163.com
 * Created on 2017/8/17 12:54
 */

var url = require('url');
var ctx = hexo;

var ossimg_enable = false;
if ( ctx.config.oss_url &&
    ctx.config.oss_acid &&
    ctx.config.oss_ackey &&
    ctx.config.oss_region &&
    ctx.config.oss_bucket  ){
    ossimg_enable = true;
}

var PostAsset = ctx.model('PostAsset');
var oss_img_list = []
hexo.extend.tag.register('ossimg', function(args){
    var img_root = '';

    if (!ossimg_enable){
        img_root = ctx.config.root;
    } else {
        var oss_dir = '/';
        if (ctx.config.oss_dir){
            oss_dir = ctx.config.oss_dir;
        }
        img_root = url.resolve(ctx.config.oss_url , oss_dir);
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



