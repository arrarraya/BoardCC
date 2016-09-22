'use strict';
const indicative = require('indicative');
var fail = {resultcode:50000,resultDecription:'System Error'};
var success = {resultcode:20000,resultDrcription:'System Success',Data:[]};
module.exports = function(Customer) {
  Customer.createsubmit =function (data,cb) { //ฟังชั่นสำหรับ สร้างข้อมูลลงใน mongodb
    for(var x in data ){
      console.log(data[x]);
    };
    if(empty(data)){
      Customer.create({
        "room":data.room,
        "customerName":data.customerName,
        "tel":data.tel,
        "date":data.date,
        "premium":data.premium,
        "retail":data.retail,
        "accessPoint":data.accessPoint,
        "solution":data.solution,
        "status":data.status,
        "moreInfo":data.moreInfo,
        "basicResolve":data.basicResolve,
        "editDate":data.editDate,
        "userRec":data.userRec},function (err,result) {
        if(err) {
          cb(null,fail)
        } else {
          success.Data.push(result);
          cb(null, success)
        }
      });
    } else {
      cb(null,fail)
      console.log('Some Data is empty. Please check your data ');
    }

  };

  Customer.deletedata = function(del, cb) { // ฟังชั่นลบข้อมูล
    if(checkid(del)) {
      Customer.destroyById(del.id, function (err, result_delete) {
          console.log(del.id);
          if (err) {
            cb(null,fail)
          }
          else
            success.Data.push(result_delete)
          cb(null, success);
          console.log(success);
        }
      )
    } else { //ลบไม่ได้จะส่งคอลเเบคคืนหาผู้ใช้
      cb(null,fail)
      console.log('Can not delete data. please check your id  ');
    }
  };


  Customer.findbyphone = function (phonenum,cb) { //function phone number
    if(findbyphone(phonenum)) {
      Customer.find({where: {"tel": phonenum.tel}}, function (err, result_phone) {
        if (err) {
          cb(null,fail)
        } else
          success.Data.push(result_phone)
        cb(null,success);
      })
    } else {
      cb(null,fail)  // callback หา frontend
      console.log(' Can not find phone number  ');
    }
  };



  Customer.updated = function (update,cb) { // function edit
    if(checkid(update)) {
      Customer.upsert({
        "id": update.id,
        "room": update.room,
        "customerName": update.customerName,
        "tel": update.tel,
        "date": update.date,
        "premium": update.premium,
        "retail": update.retail,
        "accessPoint": update.accessPoint,
        "solution": update.solution,
        "status": update.status,
        "moreInfo": update.moreInfo,
        "basicResolve": update.basicResolve,
        "editDate": update.editDate,
        "userRec": update.userRec
      }, function (err, result_update) {
        console.log(update.id);
        if (err) {
          cb(null,fail)
        }
        else {
          success.Data.push(result_update)
          cb(null,success)
        }
      })
    } else {
      cb(null,fail) // callback หา frontend
      console.log(' Can not find ID  ');
    }



  };

  function empty(data) {  // ฟังชั่นสำหรับตรวจสอบข้อมูล ว่าข้อมูลว่าง?
    // for(var x in data) {
    if (indicative.is.empty(data.room) == true ||
      indicative.is.empty(data.customerName) == true ||
      indicative.is.empty(data.tel) == true ||
      indicative.is.empty(data.date) == true ||
      indicative.is.empty(data.premium) == true ||
      indicative.is.empty(data.retail) == true ||
      indicative.is.empty(data.accessPoint) == true )
      //indicative.is.empty(data.solution) == true ||
      //indicative.is.empty(data.status) == true )
      //indicative.is.empty(data.moreInfo) == true ||
     // indicative.is.empty(data.basicResolve) == true ||
      //indicative.is.empty(data.editDate) == true ||
      //indicative.is.empty(data.userRec) == true  ) {   //เมื่อ data ไม่มีข้อมูล หรือเท่ากับ undefined method isEmpty จะ return true
    {return false;

    } else  { //เมื่อ data มีข้อมูล หรือไม่เท่ากับ undefined method isEmpty จะ return false
      return true;

    }
    // }
  }

  function checkid(del) {
    if(indicative.is.empty(del.id) == true){  //หากไม่รับ id  จะรีเทริน false
      return false;
    } else {
      return true;  //ได้รับ id จะ return true
    }
  }

  function findbyphone(phonenum) {
    if(indicative.is.empty(phonenum.tel) == true){  //ค้นหาหมายเลขโทรศัพท์ indicative.is.empty(undefined)  --> true
      console.log('can not find phone number');    //ค้นหาหมายเลขโทรศัพท์ indicative.is.empty('08xxxx')  --> false
      return false;
    } else {
      console.log('get a phone number');
      return true;

    }
  }









  Customer.remoteMethod(
    'createsubmit',
    {

      accepts: [{ arg: 'data', type: 'object', http: { source: 'body' }, }],
      returns: {arg: 'agument', type: 'object',root:true},
      http: {path: '/create', verb:'post'}
    }
  );
  Customer.remoteMethod(
    'deletedata',
    {
      accepts: [{ arg: 'del', type: 'object',http: { source: 'body' }}],
      returns: {arg: 'delid', type: 'object'},
      http: {path: '/delete', verb: 'delete'}

    }
  );
  Customer.remoteMethod(
    'findbyphone',
    {
      accepts: [{ arg: 'phonenum', type: 'object',http: { source: 'body' }}],
      returns: {arg: 'phone', type: 'object',root:true},
      http: {path: '/find', verb:'post'}

    }
  );
  Customer.remoteMethod(
    'updated',
    {
      accepts: [{ arg: 'update', type: 'object',http: { source: 'body' }}],
      returns: {arg: 'updeted', type: 'object'},
      http: {path: '/updated', verb:'post'}

    }
  );

};

