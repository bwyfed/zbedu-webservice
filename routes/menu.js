/**
 * Created by BWY on 2017/12/8.
 */
let express = require('express');
let router = express.Router();
let headerData = require('../mock/header-data.json');
let indexData = require('../mock/index-main.json');

// 获取头部部分菜单数据
router.get('/header',(req, res, next)=>{
    res.json({
        "status": 0,
        "msg": "header data success",
        "result": headerData.result
    });
});
// 获取首页的菜单数据
router.get('/index',(req,res,next)=>{
    res.json({
        "status": 0,
        "msg": "index data success",
        "result": indexData
    });
});

module.exports = router;