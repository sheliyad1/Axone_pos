const { now } = require('mongoose');
let moment = require('moment')
let path = require('path');
const { isNumberObject } = require('util/types');
const { max } = require('moment');
const con = require('../public/javascripts/connect');
const { log } = require('console');
const formidable = require('formidable');
const { json } = require('express');
const { read } = require('fs');

// const file = require('file');

// const currentdate = new Date();
currentyear = new Date();
fineyear = currentyear.getFullYear().toString().slice(-2) + "-" + (currentyear.getFullYear() + 1).toString().slice(-2);
let date = current_date().replace(/[^a-zA-Z0-9]/g, '');
const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var d = new Date()
var year = d.getFullYear() + "-" + (d.getFullYear() + 1).toString().slice(-2);


function generateString(length) {
    let result = ' ';
    const charactersLength = alphabet.length;
    for (let i = 0; i < length; i++) {
        result += alphabet.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
function current_date() {
    let date = moment(new Date(), "ddd MMM DD YYYY HH:mm:ss")
    return date.format("YYYY-MM-DD HH:mm:ss");
}
let TrnSale_ID = "TRAN-RESPAY-" + generateString(13) + "-" + date + "-GOLD";


// create table
exports.create_mst_tbl = async function (req, res) {
    try {
        data = req.body
        ISactive = req.body.tablestatus
        if (req.body.id == 0) {

            if (ISactive == 1) {
                sql = "INSERT INTO `mst_table`(`TableCode`,`TableName`, `ISActive`,`Remark`, `SequenceNo`, `EntryDate`) VALUES('" + req.body.tablecode + "','" + req.body.tablename + "', '1','" + req.body.remark + "', '  ', ' " + current_date() + " ')"
            }
            else if (ISactive == 0) {
                sql = "INSERT INTO `mst_table`(`TableCode`,`TableName`, `ISActive`,`Remark`, `SequenceNo`, `EntryDate`) VALUES('" + req.body.tablecode + "','" + req.body.tablename + "', '0','" + req.body.remark + "', '  ', ' " + current_date() + " ')"
            }
            else {
                throw new Error("please valid option select");
            }
            s = str.split(/\s+/);
            con.query(sql, function (err, results) {
                if (err) throw err;
                res.status(201).json({
                    status: 1,
                    status_code: 201,
                    messsage: 'table created successfull',
                    data: data
                })
                // Table_code = "";
                // insertid = results.insertId
                // con.query("SELECT * FROM `mst_table`", function (err, result) {
                //     if (err) throw err;
                //     let selectid = result[0].id;
                //     con.query(" UPDATE `mst_table` SET `TableCode` ='" + Table_code + insertid + "', `EntryBy` = '" + selectid + "' WHERE `id` = '" + insertid + "'", function (err) {
                //         if (err) throw err;
                //     })
                // })
                // for (const code of s) {
                //     Table_code = Table_code + code[0];
                // }
            });

        }
        else {
            if (ISactive == 1) {
                sql = "UPDATE `mst_table` SET `TableCode`= '" + req.body.tablecode + "', `TableName` = '" + req.body.tablename + "',`ISActive` = '1', `Remark` = '" + req.body.remark + "' ,`UpdateDate` = '" + current_date() + "' WHERE `id` = '" + req.body.id + "'"
            }
            else if (ISactive == 0) {
                sql = "UPDATE `mst_table` SET `TableCode`= '" + req.body.tablecode + "', `TableName` = '" + req.body.tablename + "',`ISActive` = '0', `Remark` = '" + req.body.remark + "' ,`UpdateDate` = '" + current_date() + "' WHERE `id` = '" + req.body.id + "'"
            }
            else {
                throw new Error("please valid option select");
            }

            con.query(sql, function (err) {
                if (err) throw err;
                con.query("SELECT * FROM `mst_table`", function (err, result) {
                    if (err) throw err;
                    res.status(201).json({
                        status: 1,
                        status_code: 201,
                        messsage: 'table updated successfull',
                        data: data
                    })
                    // let selectid = result[0].id;
                    // let insertid = req.body.id;
                    // con.query(" UPDATE `mst_table` SET `UpdateBy` = '" + selectid + "' WHERE `id` = '" + insertid + "'", function (err) {
                    //     if (err) throw err;

                    // })
                })
            })

        }

    }
    catch (error) {
        res.status(404).json({
            status: 0,
            status_code: 404,
            messsage: error.message,
        })
    }
}
//create item category
exports.create_mst_itemgroup = async function (req, res) {
    try {
        data = req.body
        console.log(req.files);
        ISactive = req.body.categorystatus
        if (req.body.id == 0) {


            if (ISactive == 1) {
                sql = "INSERT INTO `mst_itemgroup`(`ItemGroupName`,`ItemGroupCode`, `ISActive`,`Remark`, `EntryDate`, Image) VALUES('" + req.body.categoryname + "', '" + req.body.categorycode + "', '1','" + req.body.categoryremark + "', ' " + current_date() + " ', '" + req.body.filename + "')"
            }
            else if (ISactive == 0) {
                sql = "INSERT INTO `mst_itemgroup`(`ItemGroupName`,`ItemGroupCode`, `ISActive`,`Remark`, `EntryDate`, Image) VALUES('" + req.body.categoryname + "', '" + req.body.categorycode + "', '0','" + req.body.categoryremark + "', ' " + current_date() + " ', '" + req.body.filename + "')"
            }
            else {
                throw new Error("please valid option select");
            }
            con.query(sql, function (err, results) {
                if (err) throw err;
                res.status(201).json({
                    status: 1,
                    status_code: 201,
                    messsage: 'category created successfull',
                    data: data
                })
            });

        }
        else {
            if (ISactive == 1) {
                sql = "UPDATE `mst_itemgroup` SET `ItemGroupName` = '" + req.body.categoryname + "',`ItemGroupCode` = '" + req.body.categorycode + "',`ISActive` = '1', `Remark` = '" + req.body.categoryremark + "', `Image` = '" + req.body.filename + "' ,`UpdateDate` = '" + current_date() + "' WHERE `id` = '" + req.body.id + "'"
            }
            else if (ISactive == 0) {
                sql = "UPDATE `mst_itemgroup` SET `ItemGroupName` = '" + req.body.categoryname + "',`ItemGroupCode` = '" + req.body.categorycode + "',`ISActive` = '0', `Remark` = '" + req.body.categoryremark + "', `Image`= '" + req.body.filename + "' ,`UpdateDate` = '" + current_date() + "' WHERE `id` = '" + req.body.id + "'"
            }
            else {
                throw new Error("please valid option select");
            }

            con.query(sql, function (err) {
                if (err) throw err;
                res.status(201).json({
                    status: 1,
                    status_code: 201,
                    messsage: 'category updated successfull',
                    data: data
                })
            })

        }
    }
    catch (error) {
        res.status(404).json({
            status: 0,
            status_code: 404,
            messsage: error.message,
        })
    }
}
// create  printer
exports.create_mst_printer = async function (req, res) {
    try {
        data = req.body
        if (!req.body.id) {
            sql = "INSERT INTO `mst_printer`(`name`,`code`,`ip_address`, `ISActive`,`Remark`, `created_at`,`create_by`) VALUES('" + req.body.printerName + "', '" + req.body.printercode + "' ,'" + req.body.ipaddress + "','" + req.body.isactive + "','" + req.body.remark + "', ' " + current_date() + " ', ' ')"
            con.query(sql, function (err, results) {
                if (err) throw err;
                // insertid = results.insertId
                // PrinterCode = req.body.PrinterName + " - " + insertid;
                // con.query("SELECT * FROM `mst_printer`", function (err, result) {
                //     if (err) throw err;
                //     let selectid = result[0].id;
                //     con.query(" UPDATE `mst_printer` SET `code` = '" + PrinterCode + "', `create_by` = '" + selectid + "' WHERE `id` = '" + insertid + "'", function (err) {
                //         if (err) throw err;
                //     })
                // })
                res.status(201).json({
                    status: 1,
                    status_code: 201,
                    messsage: 'printer created successfull',
                    data: data
                })
            });

        }
        else {
            sql = "UPDATE `mst_printer` SET `name` = '" + req.body.printerName + "',`code` = '" + req.body.printercode + "', `ip_address` = '" + req.body.ipaddress + "',`ISActive` = '" + req.body.isactive + "', `Remark` = '" + req.body.remark + "' ,`updated_at` = '" + current_date() + "' WHERE `id` = '" + req.body.id + "'"
            con.query(sql, function (err) {
                if (err) throw err;
                con.query("SELECT * FROM `mst_table`", function (err, result) {
                    if (err) throw err;
                    // let selectid = result[0].id;
                    // let insertid = req.body.id;
                    // con.query(" UPDATE `mst_printer` SET `update_by` = '" + selectid + "' WHERE `id` = '" + insertid + "'", function (err) {
                    //     if (err) throw err;
                    // })
                    res.status(201).json({
                        status: 1,
                        status_code: 201,
                        messsage: 'printer updated successfull',
                        data: data
                    })
                })
            })

        }
    }
    catch (error) {
        res.status(404).json({
            status: 0,
            status_code: 404,
            messsage: error.message,
        })
    }
}
// create counter
exports.create_mst_counter = async function (req, res) {
    try {
        data = req.body;
        var ISActive = req.body.ISactive;
        if (req.body.id == 0) {
            // sql = "SELECT name FROM `mst_printer`"
            // con.query(sql, function (err, result) {
            //     if (err) throw err;
            //     for (var i = 0; i < result.length; i++) {
            //         if (req.body.Printer == result[i].name) {
            //             let ISActive = req.body.ISActive
            //             sql = "select id FROM `mst_printer` WHERE `name` = '" + req.body.Printer + "'";
            //             con.query(sql, function (err, result) {
            //                 if (err) throw err;
            if (ISActive == 1) {
                let sql = "INSERT INTO `mst_res_counter` (`counter_name`, `code`, `printer_id`, `remark`, `ISActive`, `created_at`) VALUES ('" + req.body.countername + "', '" + req.body.countercode + "', '" + req.body.printerid + "', '" + req.body.remark + "', '1', '" + current_date() + "')"
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    // insertid = result.insertId
                    // countercode = req.body.countername + " - " + insertid;
                    // con.query("SELECT * FROM `mst_res_counter`", function (err, result) {
                    //     if (err) throw err;
                    //     selectid = result[0].id;
                    //     con.query("UPDATE `mst_res_counter` SET `code` = '" + countercode + "', `create_by` = '" + selectid + "' WHERE `id` = '" + insertid + "'", function (err) {
                    //         if (err) throw err;
                    //     })
                    // })
                    res.status(201).json({
                        status: 1,
                        status_code: 201,
                        messsage: 'counter created successfull',
                        data: data
                    })
                })

            }
            else if (ISActive == 0) {
                let sql = "INSERT INTO `mst_res_counter` (`counter_name`, `code`, `printer_id`, `remark`, `ISActive`, `created_at`) VALUES ('" + req.body.countername + "', '" + req.body.countercode + "', '" + req.body.printerid + "', '" + req.body.remark + "', '0', '" + current_date() + "')"
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    // insertid = result.insertId
                    // countercode = req.body.countername + " - " + insertid;
                    // con.query("SELECT * FROM `mst_res_counter`", function (err, result) {
                    //     if (err) throw err;
                    //     selectid = result[0].id;
                    //     con.query("UPDATE `mst_res_counter` SET `code` = '" + countercode + "', `create_by` = '" + selectid + "' WHERE `id` = '" + insertid + "'", function (err) {
                    //         if (err) throw err;
                    //     })
                    // })
                    res.status(201).json({
                        status: 1,
                        status_code: 201,
                        messsage: 'counter created successfull',
                        data: data
                    })
                })
            }
            else {
                throw new Error("please valid option select");
            }
            // })
            // break;
        }

        //     }
        // })
        // }
        else {
            // sql = "SELECT name FROM `mst_printer`"
            // con.query(sql, function (err, result) {
            //     if (err) throw err;
            //     for (var i = 0; i < result.length; i++) {
            //         if (req.body.Printer == result[i].name) {
            //             ISActive = req.body.ISActive;
            //             sql = "select id FROM `mst_printer` WHERE `name` = '" + req.body.Printer + "'";
            //             con.query(sql, function (err, result) {
            //                 if (err) throw err;

            if (ISActive == 1) {
                let sql = "UPDATE `mst_res_counter` SET `counter_name` = '" + req.body.countername + "', `code` = '" + req.body.countercode + "',`printer_id` = '" + req.body.printerid + "', `remark` = '" + req.body.remark + "', `ISActive` = '1', `updated_at` = '" + current_date() + "', `update_by` = ' ' WHERE `id`= '" + req.body.id + "'"
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    // insertid = result.insertId
                    // con.query("SELECT * FROM `mst_res_counter`", function (err, result) {
                    //     if (err) throw err;
                    //     selectid = result[0].id;
                    //     con.query("select *from `mst_res_counter` ORDER BY id DESC LIMIT 1", function (err, result) {
                    //         insertid = result[0].id;
                    //         con.query("UPDATE `mst_res_counter` SET `update_by` = '" + selectid + "' WHERE `id` = '" + insertid + "'", function (err) {
                    //             if (err) throw err;
                    //         })
                    //     })

                    // })
                    res.status(201).json({
                        status: 1,
                        status_code: 201,
                        messsage: 'counter updated successfull',
                        data: data
                    })
                })

            }
            else if (ISActive == 0) {
                let sql = "UPDATE `mst_res_counter` SET `counter_name` = '" + req.body.countername + "', `code` = '" + req.body.countercode + "', `printer_id` = '" + req.body.printerid + "', `remark` = '" + req.body.remark + "', `ISActive` = '0', `updated_at` = '" + current_date() + "', `update_by` = ' '  WHERE `id`= '" + req.body.id + "'"
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    // insertid = result.insertId
                    // countercode = req.body.countername + " - " + insertid;
                    // con.query("SELECT * FROM `mst_res_counter`", function (err, result) {
                    //     if (err) throw err;
                    //     selectid = result[0].id;
                    //     con.query("select *from `mst_res_counter` ORDER BY id DESC LIMIT 1", function (err, result) {
                    //         insertid = result[0].id;
                    //         con.query("UPDATE `mst_res_counter` SET `update_by` = '" + selectid + "' WHERE `id` = '" + insertid + "'", function (err) {
                    //             if (err) throw err;
                    //         })
                    //     })
                    // })
                    res.status(201).json({
                        status: 1,
                        status_code: 201,
                        messsage: 'counter updated successfull',
                        data: data
                    })
                })
            }
            else {
                throw new Error("please valid option select");
            }
            // })
            // break;
        }
        //         }
        //     })
        // }
    }
    catch (error) {
        res.status(404).json({
            status: 0,
            status_code: 404,
            messsage: error.message,
        })
    }
}
// create item
exports.create_mst_item = async function (req, res) {
    try {
        if (!req.body.id) {
            // sql = "SELECT * FROM `mst_itemgroup` WHERE `ItemGroupName` = '" + req.body.ItemGroupName + "'";
            // con.query(sql, function (err, result) {
            // if (err) throw err;

            // if (toString(req.body.ItemGroupName) == toString(result[0].ItemGroupName)) {
            // let item_id = result[0].id;
            sql = "SELECT * FROM `mst_res_counter` WHERE `id` = '" + req.body.counterid + "'";
            con.query(sql, function (err, result) {
                if (err) throw err;
                // let igstper = req.body.IGSTPer
                // let salerate = req.body.SaleRate
                // let cgstper = igstper / 2;
                // let sgstper = igstper / 2;
                // let igstrate = salerate * igstper / 100;
                // let cgstrate = igstrate / 2;
                // let sgstrate = igstrate / 2;
                // let totalr = parseInt(salerate) + parseInt(igstrate);
                // let totalrate = totalr.toFixed(2);
                // if (toString(req.body.counter_name) == toString(result[0].counter_name)) {
                sql = "INSERT INTO `mst_item` (`ItemName`, `ItemCode`, `ItemGroup_ID`, `IGSTPer`, `CGSTPer`, `SGSTPer`, `SaleRate`, `IGSTRate`, `CGSTRate`, `SGSTRate`, `TotalRate`, `counter_id`, `Printer_ID`, `ISActive`,`Remark`, `BigImage1`, `EntryDate`) VALUES ('" + req.body.itemname + "', '" + req.body.itemcode + "', '" + req.body.categoryid + "', '" + req.body.igster + "', '" + req.body.cgstper + "', '" + req.body.sgstper + "', '" + req.body.SaleRate + "', '" + req.body.igstrate + "', '" + req.body.cgstrate + "', '" + req.body.sgstrate + "', '" + req.body.totalrate + "', '" + req.body.counterid + "', '" + result[0].printer_id + "', '" + req.body.isactive + "','" + req.body.Remark + "', '" + req.body.filename + "', '" + current_date() + "')"
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    res.status(201).json
                        ({
                            status: 1,
                            status_code: 201,
                            message: "item created successfull",
                            data: result
                        })
                    // insertid = result.insertId
                    // itemcode = req.body.ItemName + "-" + insertid;
                    // sql = "SELECT * FROM `mst_item`"
                    // con.query(sql, function (err, result) {
                    // if (err) throw err;
                    // selectid = result[0].id;
                    // sql = "UPDATE `mst_item` SET `ItemCode` = '" + itemcode + "', `BigImage1` = '" + insertid + exename + "',`EntryBy` = '" + selectid + "' WHERE `id` = '" + insertid + "'";
                    // con.query(sql, function (err) {
                    // if (err) throw err;
                    // })
                    // })

                })
            })
            // }
            // else {
            //     throw new Error('please valid counter select');
            // }
            // })
            // }
            // else {
            //     throw new Error('please valid categry select');
            // }
            // })

        }
        else {
            // sql = "SELECT * FROM `mst_itemgroup` WHERE `ItemGroupName` = '" + req.body.ItemGroupName + "'";
            // con.query(sql, function (err, result) {
            //     if (err) throw err;
            //     if (toString(req.body.ItemGroupName) == toString(result[0].ItemGroupName)) {
            //         let item_id = result[0].id;
            sql = "SELECT * FROM `mst_res_counter` WHERE `id` = '" + req.body.counterid + "'";
            con.query(sql, function (err, result) {
                if (err) throw err;
                //             let igstper = req.body.IGSTPer
                //             let salerate = req.body.SaleRate
                //             let cgstper = igstper / 2;
                //             let sgstper = igstper / 2;
                //             let igstrate = salerate * igstper / 100;
                //             let cgstrate = igstrate / 2;
                //             let sgstrate = igstrate / 2;
                //             let totalr = parseInt(salerate) + parseInt(igstrate);
                //             let totalrate = totalr.toFixed(2);
                //             if (toString(req.body.counter_name) == toString(result[0].counter_name)) {
                sql = "UPDATE `mst_item` SET `ItemName` = '" + req.body.itemname + "',  `ItemGroup_ID` = '" + req.body.categoryid + "', `ISActive` = '" + req.body.isactive + "',`IGSTPer` = '" + req.body.igstper + "', `CGSTPer` = '" + req.body.cgstper + "' , `SGSTPer` =  '" + req.body.sgstper + "' , `SaleRate` =  '" + req.body.SaleRate + "', `IGSTRate` =  '" + req.body.igstrate + "' , `CGSTRate` = '" + req.body.cgstrate + "' , `SGSTRate` =  '" + req.body.sgstrate + "' , `TotalRate` = '" + req.body.totalrate + "' , `counter_id` = '" + req.body.counterid + "' , `Printer_ID` = '" + result[0].printer_id + "', `Remark` =  '" + req.body.Remark + "', `BigImage1` = '" + req.body.filename + "' , `UpdateDate` = '" + current_date() + "'  WHERE `id` = '" + req.body.id + "'";
                con.query(sql, function (err) {
                    if (err) throw err;
                    res.status(201).json
                        ({
                            status: 1,
                            status_code: 201,
                            message: "item updated successfull",
                            data: data
                        })
                    // insertid = req.body.id;
                    // itemcode = req.body.ItemName + "-" + insertid;
                    // sql = "SELECT * FROM `mst_item`"
                    // con.query(sql, function (err, result) {
                    //     if (err) throw err;
                    //     selectid = result[0].id;
                    //     sql = "UPDATE `mst_item` SET `ItemCode` = '" + itemcode + "', `BigImage1` = '" + insertid + exename + "',`UpdateBy` = '" + selectid + "' WHERE `id` = '" + req.body.id + "'";
                    //     con.query(sql, function (err) {
                    //         if (err) throw err;
                    //     })
                    // })

                })
            })
            //             }
            //             else {
            //                 throw new Error('please valid counter select');
            //             }
            //         })

            //     }
            //     else {
            //         throw new Error('please valid category select');
            //     }
            // })

        }
    }
    catch (error) {
        res.status(404).json({
            status: 0,
            status_code: 404,
            message: error.message
        })
    }
}
// create trn sale (new item,  delete item,  itmremark add,  ordremark add, discount add)
exports.create_trn_sale = async function (req, res) {
    try {
        if (req.body.type == "NEW") {
            sql = "SELECT counter_id, Printer_ID, SaleRate, IGSTPer, CGSTPer, SGSTPer, IGSTRate, CGSTRate, SGSTRate FROM `mst_item` WHERE id = '" + req.body.item_id + "'";
            con.query(sql, function (itm_err, itm_data) {
                if (itm_err) throw itm_err;
                var counter = itm_data[0].counter_id; var printer = itm_data[0].Printer_ID; var itm_salerate = itm_data[0].SaleRate; var igstper = itm_data[0].IGSTPer; var cgstper = itm_data[0].CGSTPer; var sgstper = itm_data[0].SGSTPer; var igstrate = itm_data[0].IGSTRate; var cgstrate = itm_data[0].CGSTRate; var sgstrate = itm_data[0].SGSTRate;
                sql = "SELECT SaleNo, DiscountPer, TrnSale_ID FROM `trn_sale` WHERE `Table_ID` = '" + req.body.table_id + "' AND `ISBill` = '0' GROUP BY SaleNo";
                con.query(sql, function (trn_err, trn_data) {
                    if (trn_err) throw trn_err;
                    if (trn_data.length == 1) {
                        var OldSaleNo = trn_data[0].SaleNo; var disper = trn_data[0].DiscountPer; var oldtrnsaleid = trn_data[0].TrnSale_ID;
                        sql = "SELECT SUM(SaleQty) AS SaleQty FROM `trn_sale` WHERE Item_ID = '" + req.body.item_id + "' AND Table_ID = '" + req.body.table_id + "' AND ISBill = '0' GROUP BY SaleNo";
                        con.query(sql, function (sale_err, sale_data) {
                            if (sale_err) throw sale_err;
                            if (sale_data != '') {
                                var saleqty = parseInt(sale_data[0].SaleQty) + 1; var salerate = itm_salerate * saleqty; var igsta = salerate * igstper / 100; var grossa = salerate + igsta; var discounta = grossa * disper / 100; var netamount = grossa - discounta;
                                sql = "UPDATE `trn_sale` SET SaleQty = '" + saleqty + "', `IGSTAmount` = '" + igsta + "', `CGSTAmount` = '" + salerate * cgstper / 100 + "', `SGSTAmount` = '" + salerate * sgstper / 100 + "', GrossAmount = '" + grossa + "',DiscountAmount = '" + discounta + "' ,NetAmount = '" + netamount + "' WHERE `Item_ID` = '" + req.body.item_id + "' AND `Table_ID` = '" + req.body.table_id + "' AND `ISBill` = 0 ";
                                con.query(sql, function (err, result) {
                                    if (err) throw err;

                                })
                                res.status(201).json
                                    ({
                                        status: 1,
                                        status_code: 201,
                                        message: "item add in table successfully",
                                    })
                            }
                            else {
                                var totalrate = itm_salerate + parseFloat(igstrate);
                                sql = "INSERT INTO `trn_sale` (`TrnSale_ID`, `SaleNo`, `TokenNo`, `ISTrnSale`, `SaleDate`, `FinYear`, `Table_ID`, `Member_ID`, `CardNo`, `Item_ID`, `Counter_ID`, `Printer_ID`, `SaleQty`, `SaleRate`, `IGSTPer`, `CGSTPer`, `SGSTPer`, `IGSTRate`, `CGSTRate`, `SGSTRate`, `TotalRate`, `IGSTAmount`, `CGSTAmount`, `SGSTAmount`, `GrossAmount`, `AddAmount`, `LessAmount`, `DiscountPer`, `DiscountAmount`, `NetAmount`, `PaymentMode`, `CashAmount`, `CreditAmount`, `OnlineAmount`, `CardAmount`, `RefNo`, `Paid_Date`, `EntryDate`) VALUES ('" + oldtrnsaleid + "', '" + OldSaleNo + "', '1', '0', '" + current_date() + "', '" + fineyear + "', '" + req.body.table_id + "', ' ',' ', '" + req.body.item_id + "', '" + counter + "', '" + printer + "', '1','" + itm_salerate + "', '" + igstper + "', '" + cgstper + "', '" + sgstper + "', '" + igstrate + "', '" + cgstrate + "', '" + sgstrate + "', '" + totalrate + "', '" + igstrate + "', '" + cgstrate + "', '" + sgstrate + "', '" + totalrate + "', '', '', '" + disper + "', GrossAmount * DiscountPer / 100, GrossAmount - DiscountAmount, '', '', '', '', '', '', '', '" + current_date() + "')";
                                con.query(sql, function (err, result) {
                                    if (err) throw err;
                                    let id = result.insertId
                                    sql = "UPDATE `trn_sale` SET EntryBy = '',`DiscountAmount` = GrossAmount * DiscountPer / 100, `NetAmount` = GrossAmount - DiscountAmount WHERE `Table_ID` = '" + req.body.table_id + "'";
                                    con.query(sql, function (err) {
                                        if (err) throw err;
                                        res.status(201).json
                                            ({
                                                status: 1,
                                                status_code: 201,
                                                message: "item add in table successfully",
                                            })
                                    })
                                })
                            }
                        })
                    }
                    else {
                        sql = "SELECT CASE WHEN MAX(SaleNo) + 1 IS NULL THEN 1 ELSE MAX(SaleNo) + 1 END AS SaleNo FROM `trn_sale`";
                        con.query(sql, function (err, result) {
                            if (err) throw err;
                            var disper = result[0].DiscountPer;
                            var GeneratedSaleNo = result[0].SaleNo;
                            var totalrate = itm_salerate + parseFloat(igstrate)
                            sql = "INSERT INTO `trn_sale` (`TrnSale_ID`, `SaleNo`, `TokenNo`, `ISTrnSale`, `SaleDate`, `FinYear`, `Table_ID`, `Member_ID`, `CardNo`, `Item_ID`, `Counter_ID`, `Printer_ID`, `SaleQty`, `SaleRate`, `IGSTPer`, `CGSTPer`, `SGSTPer`, `IGSTRate`, `CGSTRate`, `SGSTRate`, `TotalRate`, `IGSTAmount`, `CGSTAmount`, `SGSTAmount`, `GrossAmount`, `AddAmount`, `LessAmount`, `DiscountPer`, `DiscountAmount`, `NetAmount`, `PaymentMode`, `CashAmount`, `CreditAmount`, `OnlineAmount`, `CardAmount`, `RefNo`, `Paid_Date`, `EntryDate`) VALUES ('" + TrnSale_ID + "', '" + GeneratedSaleNo + "', '1', '0', '" + current_date() + "', '" + fineyear + "', '" + req.body.table_id + "', ' ',' ', '" + req.body.item_id + "', '" + counter + "', '" + printer + "', '1','" + itm_salerate + "', '" + igstper + "', '" + cgstper + "', '" + sgstper + "', '" + igstrate + "', '" + cgstrate + "', '" + sgstrate + "', '" + totalrate + "', '" + igstrate + "', '" + cgstrate + "', '" + sgstrate + "', '" + totalrate + "', '', '', '" + disper + "', GrossAmount * DiscountPer / 100, GrossAmount - DiscountAmount, '', '', '', '', '', '', '', '" + current_date() + "')";
                            con.query(sql, function (err, result) {
                                if (err) throw err;
                                sql = "UPDATE `trn_sale` SET EntryBy = '',`DiscountAmount` = GrossAmount * DiscountPer / 100, `NetAmount` = GrossAmount - DiscountAmount WHERE `id` = '" + req.body.table_id + "'";
                                con.query(sql, function (err) {
                                    if (err) throw err;
                                    res.status(201).json
                                        ({
                                            status: 1,
                                            status_code: 201,
                                            message: "item add in table successfully",
                                        })
                                })
                            })
                        })
                    }
                })
            })
        }
        else if (req.body.type == "MINUS") {
            sql = "SELECT mst_item.SaleRate,trn_sale.IGSTPer,trn_sale.CGSTPer, trn_sale.SGSTPer, trn_sale.DiscountPer, SUM(trn_sale.SaleQty) AS SaleQty FROM `trn_sale` LEFT JOIN `mst_item` ON mst_item.id = trn_sale.Item_ID WHERE Item_ID = '" + req.body.item_id + "' AND Table_ID = '" + req.body.table_id + "' AND ISBill = '0' GROUP BY SaleNo";
            con.query(sql, function (err, result) {
                if (err) throw err;
                var saleqty = parseInt(result[0].SaleQty) - 1; var salerate = result[0].SaleRate * saleqty; var igsta = salerate * result[0].IGSTPer / 100; var grossa = salerate + igsta; var discounta = grossa * result[0].DiscountPer / 100; var neta = grossa - discounta;
                sql = "UPDATE `trn_sale` SET SaleQty = '" + saleqty + "',  `IGSTAmount` = '" + igsta + "', `CGSTAmount` = '" + salerate * result[0].CGSTPer / 100 + "', `SGSTAmount` = '" + salerate * result[0].SGSTPer / 100 + "', GrossAmount = '" + grossa + "',DiscountAmount = '" + discounta + "' ,NetAmount = '" + neta + "' WHERE `Item_ID` = '" + req.body.item_id + "' AND `Table_ID` = '" + req.body.table_id + "' AND `ISBill` = 0 ";
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    res.status(201).json
                        ({
                            status: 1,
                            status_code: 201,
                            message: "item minus successfull",
                        })
                })
            })

        }
        else if (req.body.type == "DELETE") {
            sql = "DELETE FROM `trn_sale` WHERE `Item_ID` = '" + req.body.item_id + "' AND `Table_ID` = '" + req.body.table_id + "' AND `ISBill` = 0";
            con.query(sql, function (err) {
                if (err) throw err;
            })
            res.status(201).json
                ({
                    status: 1,
                    status_code: 201,
                    message: "item delete successfull",
                })
        }
        else if (req.body.type == "REMARK") {
            sql = "UPDATE `trn_sale` SET `ItemRemark` = '" + req.body.Remark + "', `UpdateDate` = '" + current_date() + "', `UpdateBy` = '" + req.body.item_id + "' WHERE `Item_ID` = '" + req.body.item_id + "' AND `Table_ID` = '" + req.body.table_id + "' AND `ISBill` = 0";
            con.query(sql, function (err) {
                if (err) throw err;
            })
            res.status(201).json
                ({
                    status: 1,
                    status_code: 201,
                    message: "item remark add successfully",
                })
        }
        else if (req.body.type == "OrderREMARK") {
            sql = "UPDATE `trn_sale` SET `OrderRemark` = '" + req.body.OrderRemark + "',`UpdateDate` = '" + current_date() + "', `UpdateBy` = '" + req.body.item_id + "' WHERE `Table_ID` = '" + req.body.table_id + "' AND `ISBill` = 0";
            con.query(sql, function (err) {
                if (err) throw err;
            })
            res.status(201).json
                ({
                    status: 1,
                    status_code: 201,
                    message: "order remark add successfully",
                })
        }
        else if (req.body.type == 'DISCOUNT') {
            sql = "UPDATE `trn_sale` SET `DiscountPer` = '" + req.body.discountper + "',`DiscountAmount` = GrossAmount * DiscountPer / 100 , `NetAmount` = GrossAmount - DiscountAmount, `UpdateDate` = '" + current_date() + "', `UpdateBy` = '" + req.body.item_id + "' WHERE `Table_ID` = '" + req.body.table_id + "' AND `Item_ID`= '" + req.body.item_id + "'  AND `ISBill` = 0";
            con.query(sql, function (err) {
                if (err) throw err;
                res.status(201).json
                    ({
                        status: 1,
                        status_code: 201,
                        message: "discount add successfully",
                    })
            })
        }
    }
    catch (error) {
        res.status(404).json({
            status: 0,
            status_code: 404,
            message: error.message
        })
    }

}
// table all item delete
exports.delete_tbl_item = async function (req, res) {
    try {
        sql = "DELETE FROM `trn_sale` WHERE `Table_ID` = '" + req.body.table_id + "' AND `ISBill` = 0";
        con.query(sql, function (err) {
            if (err) throw err;
        })
        res.status(201).json
            ({
                status: 1,
                status_code: 201,
                message: "all item delete in table",
            })
    } catch (error) {
        res.status(404).json({
            status: 0,
            status_code: 404,
            message: error.message
        })
    }
}
// payment complete
exports.save_bill = async function (req, res) {
    try {
        if (req.body.paymentmode == 'CASH') {
            sql = "UPDATE `trn_sale` SET `CashAmount`='" + req.body.cashamount + "', `CreditAmount` = '" + req.body.creditamount + "', `RefNo` = '', `PaymentMode`= '" + req.body.paymentmode + "', `Paid_Date` = '" + current_date() + "',`OrderRemark` = '" + req.body.orderremark + "', `ISBill` = '1', `IsTrnSale`='1', `Status` = '102', `customer_name`='" + req.body.cust_name + "', `Mobile`='" + req.body.mob_no + "'  WHERE `Table_ID` = '" + req.body.table_id + "' AND `Item_ID` = '" + req.body.item_id + "' AND `ISBill` = '0'";
            con.query(sql, function (err) {
                if (err) throw err;
                res.status(201).json({
                    status: 1,
                    status_code: 201,
                    message: 'your payment is complete',
                })
            })
        }
        else {
            sql = "UPDATE `trn_sale` SET `CashAmount`='" + req.body.cashamount + "', `CreditAmount` = '" + req.body.creditamount + "', `RefNo` = '" + req.body.refnumber + "', `PaymentMode`= '" + req.body.paymentmode + "', `Paid_Date` = '" + current_date() + "',`OrderRemark` = '" + req.body.orderremark + "', `ISBill` = '1', `IsTrnSale`='1', `Status` = '102', `customer_name`='" + req.body.cust_name + "', `Mobile`='" + req.body.mob_no + "'  WHERE `Table_ID` = '" + req.body.table_id + "' AND `Item_ID` = '" + req.body.item_id + "' AND `ISBill` ='0'";
            con.query(sql, function (err) {
                if (err) throw err;
                res.status(201).json({
                    status: 1,
                    status_code: 201,
                    message: 'your payment is complete',
                })
            })
        }

    } catch (error) {
        res.status(404).json({
            status: 0,
            status_code: 404,
            message: error.message
        })
    }
}
// tbl transfer
exports.tbl_transfer = async function (req, res) {
    try {
        if (req.body.saleno) {
            sql = "UPDATE `trn_sale` SET `Table_ID` = '" + req.body.new_tbl_id + "', `SaleNo` = '" + req.body.saleno + "' WHERE `Table_ID` = '" + req.body.table_id + "' AND `ISBill` = '0'";
            con.query(sql, function (err) {
                if (err) throw err;
                sql = "UPDATE `trn_sale` SET `SaleNo` = '" + req.body.saleno + "' WHERE `Table_ID` = '" + req.body.new_tbl_id + "' AND `ISBill` = '0'"
                res.status(201).json({
                    status: 1,
                    status_code: 201,
                    message: 'Table Transfer Successfully'
                })
            })
        }
        else {
            sql = "UPDATE `trn_sale` SET `Table_ID` = '" + req.body.new_tbl_id + "' WHERE `Table_ID` = '" + req.body.table_id + "' AND `ISBill` = '0'";
            con.query(sql, function (err) {
                if (err) throw err;
                res.status(201).json({
                    status: 1,
                    status_code: 201,
                    message: 'Table Transfer Successfully'
                })
            })
        }
    } catch (error) {
        res.status(404).json({
            status: 0,
            status_code: 404,
            message: error.message
        })
    }
}
// input qty plus and minus
exports.input_qty = async function (req, res) {
    try {
        if (req.body.type == "PLUS") {

            sql = "SELECT counter_id, Printer_ID, SaleRate, IGSTPer, CGSTPer, SGSTPer, IGSTRate, CGSTRate, SGSTRate FROM `mst_item` WHERE id = '" + req.body.item_id + "'"
            con.query(sql, function (itm_err, itm_data) {
                if (itm_err) throw itm_err;
                var counter = itm_data[0].counter_id; var printer = itm_data[0].Printer_ID; var itm_salerate = itm_data[0].SaleRate; var igstper = itm_data[0].IGSTPer; var cgstper = itm_data[0].CGSTPer; var sgstper = itm_data[0].SGSTPer; var igstrate = itm_data[0].IGSTRate; var cgstrate = itm_data[0].CGSTRate; var sgstrate = itm_data[0].SGSTRate;
                sql = "SELECT SaleNo, DiscountPer, TrnSale_ID FROM `trn_sale` WHERE `Table_ID` = '" + req.body.table_id + "' AND `ISBill` = '0' GROUP BY SaleNo";
                con.query(sql, function (trn_err, trn_data) {
                    if (trn_err) throw trn_err;
                    for (var i = 1; i <= req.body.saleqty; i++) {
                        if (trn_data.length == 1) {
                            var disper = trn_data[0].DiscountPer;
                            sql = "SELECT SUM(SaleQty) AS SaleQty FROM `trn_sale` WHERE Item_ID = '" + req.body.item_id + "' AND Table_ID = '" + req.body.table_id + "' AND ISBill = '0' GROUP BY SaleNo";
                            con.query(sql, function (sale_err, sale_data) {
                                if (sale_err) throw sale_err;
                                var saleqty = parseInt(sale_data[0].SaleQty) + parseInt(req.body.saleqty); var salerate = itm_salerate * saleqty; var igsta = salerate * igstper / 100; var grossa = salerate + igsta; var discounta = grossa * disper / 100; var netamount = grossa - discounta;
                                sql = "UPDATE `trn_sale` SET SaleQty = '" + saleqty + "', `IGSTAmount` = '" + igsta + "', `CGSTAmount` = '" + salerate * cgstper / 100 + "', `SGSTAmount` = '" + salerate * sgstper / 100 + "', GrossAmount = '" + grossa + "',DiscountAmount = '" + discounta + "' ,NetAmount = '" + netamount + "' WHERE `Item_ID` = '" + req.body.item_id + "' AND `Table_ID` = '" + req.body.table_id + "' AND `ISBill` = 0 ";
                                con.query(sql, function (err, result) {
                                    if (err) throw err;
                                })
                            })
                        }
                        else {
                            sql = "SELECT CASE WHEN MAX(SaleNo) + 1 IS NULL THEN 1 ELSE MAX(SaleNo) + 1 END AS SaleNo FROM `trn_sale`";
                            con.query(sql, function (err, result) {
                                if (err) throw err;
                                var disper = result[0].DiscountPer;
                                var GeneratedSaleNo = result[0].SaleNo;
                                var totalrate = itm_salerate + parseFloat(igstrate)
                                sql = "INSERT INTO `trn_sale` (`TrnSale_ID`, `SaleNo`, `TokenNo`, `ISTrnSale`, `SaleDate`, `FinYear`, `Table_ID`, `Member_ID`, `CardNo`, `Item_ID`, `Counter_ID`, `Printer_ID`, `SaleQty`, `SaleRate`, `IGSTPer`, `CGSTPer`, `SGSTPer`, `IGSTRate`, `CGSTRate`, `SGSTRate`, `TotalRate`, `IGSTAmount`, `CGSTAmount`, `SGSTAmount`, `GrossAmount`, `AddAmount`, `LessAmount`, `DiscountPer`, `DiscountAmount`, `NetAmount`, `PaymentMode`, `CashAmount`, `CreditAmount`, `OnlineAmount`, `CardAmount`, `RefNo`, `Paid_Date`, `EntryDate`) VALUES ('" + TrnSale_ID + "', '" + GeneratedSaleNo + "', '1', '0', '" + current_date() + "', '" + fineyear + "', '" + req.body.table_id + "', ' ',' ', '" + req.body.item_id + "', '" + counter + "', '" + printer + "', '1','" + itm_salerate + "', '" + igstper + "', '" + cgstper + "', '" + sgstper + "', '" + igstrate + "', '" + cgstrate + "', '" + sgstrate + "', '" + totalrate + "', '" + igstrate + "', '" + cgstrate + "', '" + sgstrate + "', '" + totalrate + "', '', '', '" + disper + "', GrossAmount * DiscountPer / 100, GrossAmount - DiscountAmount, '', '', '', '', '', '', '', '" + current_date() + "')";
                                con.query(sql, function (err, result) {
                                    if (err) throw err;
                                    sql = "UPDATE `trn_sale` SET EntryBy = '',`DiscountAmount` = GrossAmount * DiscountPer / 100, `NetAmount` = GrossAmount - DiscountAmount WHERE `id` = '" + req.body.table_id + "'";
                                    con.query(sql, function (err) {
                                        if (err) throw err;
                                    })
                                })
                            })
                        }
                    }
                    res.status(201).json
                        ({
                            status: 1,
                            status_code: 201,
                            message: "item add in table successfully",
                        })
                })
            })

        }
        else if (req.body.type == 'MINUS') {
            sql = "SELECT mst_item.SaleRate,trn_sale.IGSTPer,trn_sale.CGSTPer, trn_sale.SGSTPer, trn_sale.DiscountPer, SUM(trn_sale.SaleQty) AS SaleQty FROM `trn_sale` LEFT JOIN `mst_item` ON mst_item.id = trn_sale.Item_ID WHERE Item_ID = '" + req.body.item_id + "' AND Table_ID = '" + req.body.table_id + "' AND ISBill = '0' GROUP BY SaleNo";
            con.query(sql, function (err, result) {
                if (err) throw err;
                var saleqty = parseInt(result[0].SaleQty) - parseInt(req.body.saleqty); var salerate = result[0].SaleRate * saleqty; var igsta = salerate * result[0].IGSTPer / 100; var grossa = salerate + igsta; var discounta = grossa * result[0].DiscountPer / 100; var neta = grossa - discounta;
                sql = "UPDATE `trn_sale` SET SaleQty = '" + saleqty + "', `IGSTAmount` = '" + igsta + "', `CGSTAmount` = '" + salerate * result[0].CGSTPer / 100 + "', `SGSTAmount` = '" + salerate * result[0].SGSTPer / 100 + "', GrossAmount = '" + grossa + "',DiscountAmount = '" + discounta + "' ,NetAmount = '" + neta + "' WHERE `Item_ID` = '" + req.body.item_id + "' AND `Table_ID` = '" + req.body.table_id + "' AND `ISBill` = 0 ";
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    res.status(201).json
                        ({
                            status: 1,
                            status_code: 201,
                            message: "item minus successfull",
                        })
                })
            })
        }
        else {
            res.status(201).json
                ({
                    status: 1,
                    status_code: 201,
                    message: "empty",
                })
        }
    } catch (error) {
        res.status(404).json
            ({
                status: 0,
                status_code: 404,
                message: error.message,
            })
    }
}





// tbl find
exports.find_mst_tbl = async function (req, res) {
    try {
        if (req.query.type == "ALL") {
            if (!req.query.id) {
                var sql = "SELECT * FROM `mst_table`";
            }
            else {
                var sql = "SELECT * FROM `mst_table` WHERE `id` = '" + req.query.id + "' ";
            }
            con.query(sql, function (err, result) {
                if (err) throw err;
                data = result
                res.status(202).json({
                    status: 1,
                    status_code: 202,
                    messsage: 'all table list find successfull',
                    data: data
                })
            });
        }
        else if (req.query.type == "ACTIVE") {
            if (!req.query.id) {
                var sql = "SELECT * FROM `mst_table` WHERE `ISActive` = '1' ";
            }
            else {
                var sql = "SELECT * FROM `mst_table` WHERE `ISActive` = '1' AND `id` = '" + req.query.id + "' ";
            }
            con.query(sql, function (err, result) {
                if (err) throw err;
                data = result
                res.status(202).json({
                    status: 1,
                    status_code: 202,
                    messsage: 'all table list find successfull',
                    data: data
                })
            });
        }
        else {
            throw new Error;
        }

    }
    catch (error) {
        res.status(404).json({
            status: 0,
            status_code: 404,
            messsage: error.message,
        })
    }
}
// item category find
exports.find_mst_itemgroup = async function (req, res) {
    try {
        if (req.query.type == "ALL") {
            if (!req.query.id) {
                var sql = "SELECT * FROM `mst_itemgroup`";
            }
            else {
                var sql = "SELECT * FROM `mst_itemgroup` WHERE `id` = '" + req.query.id + "' ";
            }
            con.query(sql, function (err, result) {
                if (err) throw err;
                data = result
                res.status(202).json({
                    status: 1,
                    status_code: 202,
                    messsage: 'category list find successfull',
                    data: data
                })
            });
        }
        else if (req.query.type == "ACTIVE") {
            if (!req.query.id) {
                sql = "SELECT * FROM `mst_itemgroup` WHERE `ISActive` = '1'"
            }
            else {
                sql = "SELECT * FROM `mst_itemgroup` WHERE `ISActive` = '1' AND `id` = '" + req.query.id + "' "
            }
            con.query(sql, function (err, result) {
                if (err) throw err;
                data = result
                res.status(202).json({
                    status: 1,
                    status_code: 202,
                    messsage: 'all category list find successfull',
                    data: data
                })
            });
        }
        else {
            throw new Error;
        }

    }
    catch (error) {
        res.status(404).json({
            status: 0,
            status_code: 404,
            messsage: error.message,
        })
    }
}

// printer find
exports.find_mst_printer = async function (req, res) {
    try {
        if (req.query.type == "ALL") {
            if (!req.query.id) {
                var sql = "SELECT * FROM `mst_printer`"
            }
            else {
                var sql = "SELECT * FROM `mst_printer` WHERE `id` = '" + req.query.id + "' "
            }
            con.query(sql, function (err, result) {
                if (err) throw err;
                data = result
                res.status(202).json({
                    status: 1,
                    status_code: 202,
                    messsage: 'all printer list find successfull',
                    data: data
                })
            });
        }
        else if (req.query.type == "ACTIVE") {
            if (!req.query.id) {
                var sql = "SELECT * FROM `mst_printer` WHERE ISActive = '1'";
            }
            else {
                var sql = "SELECT * FROM `mst_printer` WHERE ISActive = '1' AND `id` = '" + req.query.id + "'"
            }
            con.query(sql, function (err, result) {
                if (err) throw err;
                data = result
                res.status(202).json({
                    status: 1,
                    status_code: 202,
                    messsage: 'all table list find successfull',
                    data: data
                })
            })
        }
        else {
            throw new Error;
        }

    }
    catch (error) {
        res.status(404).json({
            status: 0,
            status_code: 404,
            messsage: error.message,
        })
    }
}
// counter find
exports.find_mst_counter = async function (req, res) {
    try {
        if (req.query.type == "ALL") {
            if (!req.query.id) {
                var sql = "SELECT * FROM `mst_res_counter`";
            }
            else {
                var sql = "SELECT * FROM `mst_res_counter` WHERE `id` = '" + req.query.id + "' ";
            }
            con.query(sql, function (err, result) {
                if (err) throw err;
                data = result
                res.status(202).json({
                    status: 1,
                    status_code: 202,
                    messsage: 'counter list find successfull',
                    data: data
                })
            });
        }
        else if (req.query.type == "ACTIVE") {
            if (!req.query.id) {
                sql = "SELECT * FROM `mst_res_counter` WHERE `ISActive` = '1'"
            }
            else {
                sql = "SELECT * FROM `mst_res_counter` WHERE `ISActive` = '1' AND `id` = '" + req.query.id + "' "
            }
            con.query(sql, function (err, result) {
                if (err) throw err;
                var data = result
                res.status(202).json({
                    status: 1,
                    status_code: 202,
                    messsage: 'category list find successfull',
                    data: data
                })
            });
        }
        else {
            throw new Error;
        }
    }
    catch (error) {
        res.status(404).json({
            status: 0,
            status_code: 404,
            messsage: error.message,
        })
    }
}
// item find
exports.find_mst_item = async function (req, res) {
    try {
        if (req.query.type == "ALL") {
            if (!req.query.id) {
                var sql = "SELECT * FROM `mst_item`";
            }
            else {
                var sql = "SELECT * FROM `mst_item` WHERE `id` = '" + req.query.id + "'"
            }
            con.query(sql, function (err, result) {
                if (err) throw err;
                data = result
                res.status(202).json({
                    status: 1,
                    status_code: 202,
                    message: "item list find successfull",
                    data: data
                })
            });
        }
        else if (req.query.type == "ACTIVE") {
            if (req.query.id == 0) {
                if (req.query.search_name == 'noneed') {
                    var sql = "SELECT * FROM `mst_item` WHERE `ISActive` = '1'"
                }
                else {
                    var sql = "SELECT * FROM `mst_item` WHERE `ISActive` = '1' AND `ItemName` LIKE '%" + req.query.search_name + "%'";
                }
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    data = result
                    res.status(202).json({
                        status: 1,
                        status_code: 202,
                        message: "item list find successfull",
                        data: data
                    })
                });
            }
            else {
                if (req.query.search_name == 'noneed') {
                    var sql = "SELECT * FROM `mst_item` WHERE `ISActive` = '1' AND `ItemGroup_ID` = '" + req.query.id + "'"

                }
                else {
                    var sql = "SELECT * FROM `mst_item` WHERE `ISActive` = '1' AND `ItemGroup_ID` = '" + req.query.id + "' AND `ItemName` LIKE '%" + req.query.search_name + "%'"
                }
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    data = result
                    res.status(202).json({
                        status: 1,
                        status_code: 202,
                        message: "item list find successfull",
                        data: data
                    })
                });
            }
        }
        else {
            throw new Error;
        }


    }
    catch (error) {
        res.status(404).json({
            status: 0,
            status_code: 404,
            messsage: error.message,
        })
    }
}
// trn sale find
exports.find_trn_sale = async function (req, res) {
    try {
        var sql = "SELECT mst_item.ItemName, mst_item.BigImage1, trn_sale.Item_ID, trn_sale.SaleNo ,trn_sale.id ,SUM(trn_sale.SaleQty) AS SaleQty,SUM(trn_sale.SaleRate) AS SaleRate, SUM(trn_sale.CGSTRate) AS CGSTRate, SUM(trn_sale.SGSTRate) AS SGSTRate, trn_sale.ItemRemark, trn_sale.NetAmount,trn_sale.GrossAmount, trn_sale.DiscountPer, trn_sale.customer_name FROM `trn_sale` LEFT JOIN mst_item ON mst_item.id = trn_sale.Item_ID WHERE Table_ID  = '" + req.query.table_id + "' AND ISBill = 0 GROUP BY trn_sale.Item_ID ORDER BY trn_sale.EntryDate DESC";
        con.query(sql, function (err, result) {
            if (err) throw err;
            if (result == '') {
                res.status(202).json({
                    status: 1,
                    status_code: 202,
                    messsage: "Table Item Show Successfull",
                    data: result,
                    saleno: 0
                })
            }
            else {
                res.status(202).json({
                    status: 1,
                    status_code: 202,
                    messsage: "Table Item Show Successfull",
                    data: result,
                    saleno: result[0].SaleNo
                })
            }
        })
    }
    catch (error) {
        res.status(404).json({
            status: 0,
            status_code: 404,
            messsage: error.message
        })
    }
}
// check empty table
exports.find_tbl_item = async function (req, res) {
    try {
        sql = "SELECT t.TableName,t.id,ts.Item_ID  FROM `mst_table` t left join `trn_sale` ts On ts.Table_ID = t.id where ts.Item_ID Is not null AND ISBill ='0'";
        con.query(sql, function (err, result) {
            if (err) throw err;
            data = result
            res.status(202).json({
                status: 1,
                status_code: 202,
                messsage: 'success',
                data: data
            })
        })

    } catch (error) {
        res.status(404).json({
            status: 0,
            status_code: 404,
            messsage: error.message
        })
    }
}
// create print
exports.find_create_print = async function (req, res) {
    try {
        if (req.query.type == 'BILL') {
            var sql = "SELECT t.TableName, ts.SaleNo, ts.customer_name, ts.Mobile ,SUM(ts.SaleRate) AS SaleRate, SUM(ts.CGSTAmount) AS CGSTRate, SUM(ts.SGSTAmount) AS SGSTRate, SUM(NetAmount) AS NetAmount, SUM(ts.DiscountAmount) AS DiscountAmount, DiscountPer, ts.OrderRemark FROM `trn_sale` ts left join `mst_table` t On ts.Table_ID = t.id where t.id = '" + req.query.table_id + "' AND ts.SaleNo = '" + req.query.saleno + "' GROUP BY SaleNo;";
        } else if (req.query.type == 'KOT') {
            var sql = "SELECT t.TableName, ts.SaleNo, ts.customer_name, ts.Mobile ,SUM(ts.SaleRate) AS SaleRate, SUM(ts.CGSTRate) AS CGSTRate, SUM(ts.SGSTRate) AS SGSTRate, SUM(NetAmount) AS NetAmount, ts.OrderRemark, ts.ItemRemark FROM `trn_sale` ts left join `mst_table` t On ts.Table_ID = t.id where t.id = '" + req.query.table_id + "' AND ts.SaleNo = '" + req.query.saleno + "' GROUP BY SaleNo;";
        }
        con.query(sql, function (err, result) {
            if (err) throw err;
            data = result;
            res.status(202).json({
                status: 1,
                status_code: 202,
                messsage: "order bill print complete",
                data: data
            });
        });
    } catch (error) {
        res.status(404).json({
            status: 0,
            status_code: 404,
            messsage: error.message
        })
    }
}
// total bill
exports.tbl_bill_total = async function (req, res) {
    try {
        sql = "SELECT Table_ID, SUM(SaleRate) AS SaleRate, SUM(CGSTAmount) AS CGSTAmount, SUM(SGSTAmount) AS SGSTAmount, SUM(GrossAmount) AS GrossAmount, DiscountPer, SUM(DiscountAmount) AS DiscountAmount, SUM(NetAmount) AS NetAmount, OrderRemark FROM `trn_sale` WHERE Table_ID = '" + req.query.table_id + "' AND ISBill = 0 GROUP BY SaleNo";
        con.query(sql, function (err, result) {
            if (err) throw err;
            var data = result
            res.status(202).json({
                status: 1,
                status_code: 202,
                messsage: 'success',
                data: data
            })
        })
    } catch (error) {
        res.status(404).json({
            status: 0,
            status_code: 404,
            messsage: error.message
        })
    }
}
// new table item show
exports.find_new_tblitem = async function (req, res) {
    try {
        sql = "SELECT * FROM `trn_sale` WHERE `Table_ID` = '" + req.query.new_tbl_id + "' AND `ISBill` = 0";
        con.query(sql, function (err, result) {
            if (err) throw err;
            res.status(202).json({
                status: 1,
                status_code: 202,
                message: 'new table item find successfully',
                data: result,
            })
        })
    } catch (error) {
        res.status(404).json({
            status: 0,
            status_code: 404,
            message: error.message
        })
    }
}




// report order wise
exports.find_order_wise_report = async function (req, res) {
    try {
        sql = "SELECT id, CONCAT(LPAD(DAY(SaleDate),2,'0'),'/', MONTH(SaleDate), '/', YEAR(SaleDate)) AS  SaleDate, SaleNo, CONCAT('#',SaleNo ,FinYear) AS OrderNo ,SUM(CashAmount) AS CashAmount, SUM(CreditAmount) AS CreditAmount, SUM(CardAmount) AS CardAmount, SUM(NetAmount) AS NetAmount FROM `trn_sale` WHERE SaleDate BETWEEN '" + req.query.from + "' AND '" + req.query.to + "' AND  ISBill = 1 GROUP BY SaleNo;";
        con.query(sql, function (err, result) {
            if (err) throw err;
            res.status(202).json({
                status: 1,
                status_code: 202,
                message: 'order wise payment report find successfully',
                data: result,
            })
        })
    } catch (error) {
        res.status(404).json({
            status: 0,
            status_code: 404,
            message: error.message
        })
    }
}
// report counter wise
exports.find_counter_wise_report = async function (req, res) {
    try {
        sql = "SELECT c.id, c.counter_name, CONCAT(LPAD(DAY(SaleDate),2,'0'),'/', MONTH(t.SaleDate), '/', YEAR(t.SaleDate)) AS  SaleDate, t.Counter_ID ,SUM(t.CashAmount) AS CashAmount, SUM(t.CreditAmount) AS CreditAmount, SUM(t.CardAmount) AS CardAmount, SUM(t.NetAmount) AS NetAmount FROM `trn_sale` t LEFT JOIN `mst_res_counter` c On t.Counter_ID = c.id WHERE SaleDate BETWEEN '" + req.query.from + "' AND '" + req.query.to + "' AND  ISBill = 1 AND Counter_ID = t.Counter_ID   GROUP BY Counter_ID";
        con.query(sql, function (err, result) {
            if (err) throw err;
            res.status(202).json({
                status: 1,
                status_code: 202,
                message: 'counter wise payment report find successfully',
                data: result,
            })
        })
    } catch (error) {
        res.status(404).json({
            status: 0,
            status_code: 404,
            message: error.message
        })
    }
}
// report date wise
exports.find_date_wise_report = async function (req, res) {
    try {
        sql = "SELECT id, CONCAT(LPAD(DAY(SaleDate),2,'0'),'/', MONTH(SaleDate), '/', YEAR(SaleDate)) AS  SaleDate, SUM(CashAmount) AS CashAmount, SUM(CreditAmount) AS CreditAmount, SUM(CardAmount) AS CardAmount, SUM(NetAmount) AS NetAmount FROM `trn_sale` WHERE SaleDate BETWEEN '" + req.query.from + "' AND '" + req.query.to + "' AND ISBill = 1 GROUP BY SaleDate";
        con.query(sql, function (err, result) {
            if (err) throw err;
            res.status(202).json({
                status: 1,
                status_code: 202,
                message: 'date wise payment report find successfully',
                data: result,
            })
        })
    } catch (error) {
        res.status(404).json({
            status: 0,
            status_code: 404,
            message: error.message
        })
    }
}
// report date and counter wise
exports.find_date_and_counter_wise_report = async function (req, res) {
    try {
        sql = "SELECT c.id, c.counter_name, CONCAT(LPAD(DAY(SaleDate),2,'0'),'/', MONTH(t.SaleDate), '/', YEAR(t.SaleDate)) AS  SaleDate, t.Counter_ID ,SUM(t.CashAmount) AS CashAmount, SUM(t.CreditAmount) AS CreditAmount, SUM(t.CardAmount) AS CardAmount, SUM(t.NetAmount) AS NetAmount FROM `trn_sale` t LEFT JOIN `mst_res_counter` c On t.Counter_ID = c.id WHERE SaleDate BETWEEN '" + req.query.from + "' AND '" + req.query.to + "' AND  ISBill = 1 AND Counter_ID = t.Counter_ID GROUP BY Counter_ID, SaleDate ORDER BY SaleDate ASC";
        con.query(sql, function (err, result) {
            if (err) throw err;
            res.status(202).json({
                status: 1,
                status_code: 202,
                message: 'counter and date wise payment report find successfully',
                data: result,
            })
        })
    } catch (error) {
        res.status(404).json({
            status: 0,
            status_code: 404,
            message: error.message
        })
    }
}
// order report bill print 
exports.find_order_item = async function (req, res) {
    try {
        if (req.query.type == 'BILL') {
            sql = "SELECT mst_table.TableName, mst_item.ItemName,trn_sale.SaleNo , CONCAT('#',trn_sale.SaleNo ,trn_sale.FinYear) AS OrderNo, trn_sale.SaleQty, (trn_sale.SaleRate * trn_sale.SaleQty) AS SaleRate, trn_sale.CGSTAmount, trn_sale.SGSTAmount ,trn_sale.NetAmount, trn_sale.DiscountAmount, trn_sale.customer_name, trn_sale.Mobile, trn_sale.SaleDate FROM `trn_sale` INNER JOIN mst_item ON mst_item.id = trn_sale.Item_ID INNER JOIN `mst_table` ON mst_table.id = trn_sale.Table_ID WHERE trn_sale.SaleDate BETWEEN '" + req.query.from + "' AND '" + req.query.to + "' AND trn_sale.SaleNo  = '" + req.query.saledata + "' AND ISBill = 1"
        }
        else if (req.query.type == 'KOT') {
            sql = "SELECT  mst_table.TableName,  mst_item.ItemName, CONCAT('#',trn_sale.SaleNo ,trn_sale.FinYear) AS OrderNo, trn_sale.SaleQty, trn_sale.customer_name, trn_sale.SaleDate, trn_sale.ItemRemark, trn_sale.OrderRemark FROM `trn_sale` INNER JOIN mst_item ON mst_item.id = trn_sale.Item_ID INNER JOIN `mst_table` ON mst_table.id = trn_sale.Table_ID WHERE trn_sale.SaleDate BETWEEN '" + req.query.from + "' AND '" + req.query.to + "' AND trn_sale.SaleNo  = '" + req.query.saledata + "' AND ISBill = 1;"
        }
        con.query(sql, function (err, result) {
            if (err) throw err;
            var data = result;
            res.status(202).json({
                status: 1,
                status_code: 202,
                message: 'order wise item find successfully',
                data: data,
            })
        })
    } catch (error) {
        res.status(404).json({
            status: 0,
            status_code: 404,
            message: error.message
        })
    }
}






// tbl status update
exports.update_tblstatus = async function (req, res) {
    try {
        if (req.body.ISActive == 1) {
            var sql = "UPDATE `mst_table` SET `ISActive` = '1',`UpdateDate` = '" + current_date() + "' WHERE `id` = '" + req.body.id + "'"
        }
        else {
            var sql = "UPDATE `mst_table` SET `ISActive` = '0',`UpdateDate` = '" + current_date() + "' WHERE `id` = '" + req.body.id + "'"
        }
        con.query(sql, function (err, result) {
            if (err) throw err;
            res.status(202).json({
                status: 1,
                status_code: 202,
                message: 'this table status update successfully',
            })
        })
    } catch (error) {
        res.status(404).json({
            status: 0,
            status_code: 404,
            message: error.message
        })
    }
}
// category status update 
exports.update_categorystatus = async function (req, res) {
    try {
        if (req.body.ISActive == 1) {
            var sql = "UPDATE `mst_itemgroup` SET `ISActive` = '1',`UpdateDate` = '" + current_date() + "' WHERE `id` = '" + req.body.id + "'"
        }
        else {
            var sql = "UPDATE `mst_itemgroup` SET `ISActive` = '0',`UpdateDate` = '" + current_date() + "' WHERE `id` = '" + req.body.id + "'"
        }
        con.query(sql, function (err, result) {
            if (err) throw err;
            res.status(202).json({
                status: 1,
                status_code: 202,
                message: 'this category status update successfully',
            })
        })
    } catch (error) {
        res.status(404).json({
            status: 0,
            status_code: 404,
            message: error.message
        })
    }
}
// counter status update
exports.update_counterstatus = async function (req, res) {
    try {
        if (req.body.ISActive == 1) {
            var sql = "UPDATE `mst_res_counter` SET `ISActive` = '1',`updated_at` = '" + current_date() + "' WHERE `id` = '" + req.body.id + "'"
        }
        else {
            var sql = "UPDATE `mst_res_counter` SET `ISActive` = '0',`updated_at` = '" + current_date() + "' WHERE `id` = '" + req.body.id + "'"
        }
        con.query(sql, function (err, result) {
            if (err) throw err;
            res.status(202).json({
                status: 1,
                status_code: 202,
                message: 'this counter status update successfully',
            })
        })
    } catch (error) {
        res.status(404).json({
            status: 0,
            status_code: 404,
            message: error.message
        })
    }
}
// item status update
exports.update_itemstatus = async function (req, res) {
    try {
        if (req.body.ISActive == 1) {
            var sql = "UPDATE `mst_item` SET `ISActive` = '1',`UpdateDate` = '" + current_date() + "' WHERE `id` = '" + req.body.id + "'"
        }
        else {
            var sql = "UPDATE `mst_item` SET `ISActive` = '0',`UpdateDate` = '" + current_date() + "' WHERE `id` = '" + req.body.id + "'"
        }
        con.query(sql, function (err, result) {
            if (err) throw err;
            res.status(202).json({
                status: 1,
                status_code: 202,
                message: 'this item status update successfully',
                data: result
            })
        })
    } catch (error) {
        res.status(404).json({
            status: 0,
            status_code: 404,
            message: error.message
        })
    }
}

exports.update_printerstatus = async function (req, res) {
    try {
        if (req.body.ISActive == 1) {
            var sql = "UPDATE `mst_printer` SET `ISActive` = '1',`updated_at` = '" + current_date() + "' WHERE `id` = '" + req.body.id + "'"
        }
        else {
            var sql = "UPDATE `mst_printer` SET `ISActive` = '0',`updated_at` = '" + current_date() + "' WHERE `id` = '" + req.body.id + "'"
        }
        con.query(sql, function (err, result) {
            if (err) throw err;
            res.status(202).json({
                status: 1,
                status_code: 202,
                message: 'this printer status update successfully',
            })
        })
    } catch (error) {
        res.status(404).json({
            status: 0,
            status_code: 404,
            message: error.message
        })
    }
}


// delete mst tbl
exports.del_mst_tbl = async function (req, res) {
    try {
        sql = "DELETE FROM `mst_table` WHERE `id`= '" + req.query.id + "'";
        con.query(sql, function (err, data) {
            if (err) throw err;
            res.status(202).json({
                status: 1,
                status_code: 202,
                message: 'this table delete successfully',
            })

        })
    } catch (error) {
        res.status(404).json({
            status: 0,
            status_code: 404,
            message: error.message
        })
    }
}
// delete mst category 
exports.del_mst_category = async function (req, res) {
    try {
        sql = "DELETE FROM `mst_itemgroup` WHERE `id`= '" + req.query.id + "'";
        con.query(sql, function (err, data) {
            if (err) throw err;
            res.status(202).json({
                status: 1,
                status_code: 202,
                message: 'this category delete successfully',
            })

        })
    } catch (error) {
        res.status(404).json({
            status: 0,
            status_code: 404,
            message: error.message
        })
    }
}
// delete mst counter
exports.del_mst_counter = async function (req, res) {
    try {
        sql = "DELETE FROM `mst_res_counter` WHERE `id`= '" + req.query.id + "'";
        con.query(sql, function (err, data) {
            if (err) throw err;
            res.status(202).json({
                status: 1,
                status_code: 202,
                message: 'this counter delete successfully',
            })

        })
    } catch (error) {
        res.status(404).json({
            status: 0,
            status_code: 404,
            message: error.message
        })
    }
}
// delete mst item
exports.del_mst_item = async function (req, res) {
    try {
        sql = "DELETE FROM `mst_item` WHERE `id`= '" + req.query.id + "'";
        con.query(sql, function (err, data) {
            if (err) throw err;
            res.status(202).json({
                status: 1,
                status_code: 202,
                message: 'this item delete successfully',
            })

        })
    } catch (error) {
        res.status(404).json({
            status: 0,
            status_code: 404,
            message: error.message
        })
    }
}

exports.del_mst_printer = async function (req, res) {
    try {
        sql = "DELETE FROM `mst_printer` WHERE `id`= '" + req.query.id + "'";
        con.query(sql, function (err, data) {
            if (err) throw err;
            res.status(202).json({
                status: 1,
                status_code: 202,
                message: 'this Printer delete successfully',
            })

        })
    } catch (error) {
        res.status(404).json({
            status: 0,
            status_code: 404,
            message: error.message
        })
    }
}