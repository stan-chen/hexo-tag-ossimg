'use strict';
/**
 * Author Xuefei Chen
 * Email chenxuefei_pp@163.com
 * Created on 2017/8/17 12:54
 */

var url = require('url');
var Promise = require('bluebird');
var fs = require('hexo-fs');
const co  = require('co');
const OSS = require('ali-oss');

module.exports = function (ctx, oss_list) {
    var internal = false;
    if (ctx.config.oss_internal){
        internal = true;
    }
    const oss_client = new OSS({
        region: ctx.config.oss_region,
        accessKeyId: ctx.config.oss_acid,
        accessKeySecret: ctx.config.oss_ackey,
        bucket: ctx.config.oss_bucket,
        internal: internal
    });

    return function () {
        var oss_dir = '/';
        if (ctx.config.oss_dir){
            oss_dir = ctx.config.oss_dir;
        }
        Promise.filter(oss_list, function (asset) {
            return fs.exists(asset.source).then(function(exist) {
                if (exist) return asset.modified;
                return exist;
            });
        }).map(function (asset) {
            co(function* () {
                oss_client.useBucket(ctx.config.oss_bucket);
                var put_path = url.resolve( oss_dir, asset.path );
                var result = yield oss_client.put(put_path , asset.source);
            }).catch(function (err) {
                console.log('同步上传至OSS失败：',err);
            });
        });
    }
}