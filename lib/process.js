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
const util = require('./utils');

module.exports = function ( ctx , oss_list) {
    const oss_config = ctx.config.asset_oss;
    const img_path = util.img_rela_path(oss_config);
    var internal = false;
    if (oss_config.oss_internal){
        internal = true;
    }
    const oss_client = new OSS({
        region: oss_config.oss_region,
        accessKeyId: oss_config.oss_acid,
        accessKeySecret: oss_config.oss_ackey,
        bucket: oss_config.oss_bucket,
        internal: internal
    });

    return function () {
        Promise.filter(oss_list, function (asset) {
            return fs.exists(asset.source).then(function(exist) {
                if (exist) return asset.modified;
                return exist;
            });
        }).map(function (asset) {
            co(function* () {
                oss_client.useBucket(oss_config.oss_bucket);
                var put_path = url.resolve( img_rela_path , asset.path );
                var result = yield oss_client.put(put_path , asset.source);
            }).catch(function (err) {
                console.log('同步上传至OSS失败：',err);
            });
        });
    }
}