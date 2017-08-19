'use strict';

var url = require('url');

const getOssImagePath = function(config){
    var oss_root = '/';
    var oss_img_path = '/images/'
    if (config.oss_root){
        oss_root = config.oss_root;
    }
    oss_root = url.resolve(config.oss_url , oss_root);
    if (config.oss_img_path){
        oss_img_path = config.oss_img_path;
    }
    return url.resolve( oss_root , oss_img_path );
};

const getImgRelaPath = function(config){
    var oss_root = '/';
    var oss_img_path = '/images/'
    if (config.oss_root){
        oss_root = config.oss_root;
    }
    if (config.oss_img_path){
        oss_img_path = config.oss_img_path;
    }
    return url.resolve( oss_root , oss_img_path );
};

const isEnable = function(config){
    if (config.enable &&
        config.oss_url &&
        config.oss_acid &&
        config.oss_ackey &&
        config.oss_region &&
        config.oss_bucket ){
        return true;
    }
    return false;
}

module.exports = {
    enable: isEnable,
    img_path: getOssImagePath,
    img_rela_path: getImgRelaPath
}