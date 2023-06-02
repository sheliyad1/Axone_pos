var express = require('express');
var router = express.Router();
const controller = require('../controller/msc_table');
const multer = require("multer");
const path = require('path');
const { TIMEOUT } = require('dns');
const { timeEnd } = require('console');
const { fs } = require('fs');
var http = require('http');
var url = require('url');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "public", "images","itemimage"))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + file.originalname)
    console.log(file.filename);
  }
})
const upload = multer({ storage: storage });

router.get('/welcome', (req, res, next) => {
  var hostname = req.headers.host;
  var Url = "http://"+hostname;
  res.render('index', { baseurl: Url });
});

// mst_table
router.post('/create_mst_tbl', controller.create_mst_tbl);
router.get('/find_mst_tbl', controller.find_mst_tbl);
router.get('/delete_mst_tbl', controller.del_mst_tbl)
router.post('/update_tblstatus', controller.update_tblstatus)

//mst_itemgroup
router.post('/create_mst_itemgroup', upload.single('filename'), controller.create_mst_itemgroup);
router.get('/find_mst_itemgroup', controller.find_mst_itemgroup);
router.get('/delete_mst_category', controller.del_mst_category)
router.post('/update_categorystatus', controller.update_categorystatus)

//mst_printer
router.post('/create_mst_printer', controller.create_mst_printer);
router.get('/find_mst_printer', controller.find_mst_printer);
router.post('/update_printerstatus', controller.update_printerstatus);
router.get('/delete_mst_printer', controller.del_mst_printer);

//mst_counter
router.post('/create_mst_counter', controller.create_mst_counter);
router.get('/find_mst_counter', controller.find_mst_counter);
router.get('/delete_mst_counter', controller.del_mst_counter)
router.post('/update_counterstatus', controller.update_counterstatus)

//mst_item
router.post('/create_mst_item', upload.single('filename'),  controller.create_mst_item);
router.get('/find_mst_item',  controller.find_mst_item);
router.post('/update_itemstatus',  controller.update_itemstatus);
router.get('/delete_mst_item',  controller.del_mst_item);


//trn_sale
router.post('/create_trn_sale', controller.create_trn_sale);
router.get('/find_trn_sale', controller.find_trn_sale);

// others
router.post('/save_bill', controller.save_bill);
router.post('/tbl_transfer', controller.tbl_transfer);
router.post('/delete_tbl_item', controller.delete_tbl_item);
router.post('/input_qty', controller.input_qty);


router.get('/tbl_item_data', controller.find_tbl_item);
router.get('/find_create_print', controller.find_create_print);
router.get('/tbl_bill_total', controller.tbl_bill_total);
router.get('/find_new_tblitem', controller.find_new_tblitem);


// report
router.get('/order_wise_report', controller.find_order_wise_report);
router.get('/counter_wise_report', controller.find_counter_wise_report);
router.get('/date_wise_report', controller.find_date_wise_report);
router.get('/date_and_counter_wise_report', controller.find_date_and_counter_wise_report);
router.get('/find_order_item', controller.find_order_item)
module.exports = router;

