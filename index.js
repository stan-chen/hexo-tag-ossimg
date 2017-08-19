'use strict';
/**
 * Author Xuefei Chen
 * Email chenxuefei_pp@163.com
 * Created on 2017/8/17 12:54
 */

var url = require('url');
var util = require('./lib/utils');
var ctx = hexo;

var oss_config = ctx.config.asset_oss;

var PostAsset = ctx.model('PostAsset');
var oss_img_list = []
hexo.extend.tag.register('ossimg', function(args){
    var img_root = '';

    if (!util.enable(oss_config)){
        img_root = ctx.config.root;
    } else {
        img_root = util.img_path(oss_config);
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

if(util.enable(oss_config)) {
    hexo.extend.filter.register('after_generate', require('./lib/process')(ctx, oss_img_list) );
}



