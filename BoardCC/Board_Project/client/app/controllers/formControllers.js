app.controller('formController', ['$scope', '$http',  function ($scope, $http) {
//this function use for post to req data from node to handle and send back to template email
  $scope.Data = [];
  $scope.Edit = [];
  $scope.Show = [];
//--------------------------------------------------
  $scope.submit = function () {
//-----------------------------------------------------
    var _data = {
      room: $scope.room,
      customerName: $scope.customerName,
      tel: $scope.tel,
      date: $scope.date,
      premium: $scope.premium,
      retail: $scope.retail,
      accessPoint: $scope.accessPoint,
      moreInfo: $scope.more
      // question : $scope.
    };
    console.log(_data);
    $http({
      method: 'POST',
      url: 'http://localhost:3800/api/customers/create',
      data:_data,
      config: '',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function successCallback(response) {
      console.log(response.status + ' ' + response.statusText);
      // swal({
      //     title: "Add Data Success",
      //     text: "Success Message",
      //     timer: 2000,
      //     showConfirmButton: false,
      //     html: true
      // });
      // setTimeout(function() {
      //     location.href = "/";
      // }, 2000);
    }, function errorCallback(response) {
      swal({
        title: "Add Data Error",
        text: "Error Message",
        timer: 2000,
        showConfirmButton: false,
        html: true
      });
      console.log(response.status + ' ' + response.statusText);
    });
  };
  //----------------------------------------------------------------------
  $scope.search = function () {
    var _data2 = {
      tel : $scope.searchCustomer
    };
    console.log(_data2);
    $scope.Show.tel = $scope.searchCustomer;
    console.log($scope.Show.tel);
    $http({
      method: 'POST',
      url: 'http://localhost:3800/api/customers/find',
      data:_data2,
      config: '',
      headers: {
        'Content-Type': 'application/json'
      }
    }).success(function(response) {
      console.log(response.resultcode);
      $scope.Data = response;
      if(response.length>=1){
        $scope.Show.boolean = true;
        $scope.room = response[0].room;
        $scope.customerName = response[0].customerName;
        $scope.tel = response[0].tel;
      }else{
        $scope.Show.boolean = false;
        $scope.room = "";
        $scope.customerName = "";
        $scope.tel = "";
      };
    }).then(function successCallback(response) {
      console.log(response.status + ' ' + response.statusText);
      // setTimeout(function() {
      //     location.href = "/";
      // }, 3000);
    }, function errorCallback(response) {
      console.log(response.status + ' ' + response.statusText);
    });
    $("#div-editbox").show("slow");
  };
//--------------------------------------------------------------------
  $scope.cancelData = function () {
    $("#div-editbox").hide("slow");
  };
//--------------------------------------------------------------------
  $scope.deleteData = function (index) {
    var _data3 = {
      "id":$scope.Data[index].id
    }
    console.log($scope.Data[index].id);
    if (confirm('คุณต้องการลบข้อมูลนี้หรือไม่')){
      $http({
        method: 'DELETE',
        url: 'http://localhost:3800/api/customers/delete',
        data:_data3,
        config: '',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function successCallback(response) {
        console.log(response.status + ' ' + response.statusText);
        setTimeout(function() {
          location.href = "/";
        }, 500);
      }, function errorCallback(response) {
        console.log(response.status + ' ' + response.statusText);
      });
    }else{
      //do nothings
    }
  };
  $scope.editData = function(index) {
    $scope.Edit.room = $scope.Data[index].room;
    $scope.Edit.customerName = $scope.Data[index].customerName;
    $scope.Edit.tel = $scope.Data[index].tel;
    $scope.Edit.date = $scope.Data[index].date
    $scope.Edit.premium = $scope.Data[index].premium;
    $scope.Edit.retail = $scope.Data[index].retail;
    $scope.Edit.accessPoint = $scope.Data[index].accessPoint;
    $scope.Edit.moreInfo = $scope.Data[index].moreInfo
    $scope.Edit.id = $scope.Data[index].id;
    console.log($scope.Edit.id)
  };

  $scope.editSubmit = function (index) {
    var _data4 = {
      id: $scope.Edit.id,
      room:  $scope.Edit.room,
      customerName: $scope.Edit.customerName,
      tel: $scope.Edit.tel,
      date: $scope.Edit.date,
      premium: $scope.Edit.premium,
      retail: $scope.Edit.retail,
      accessPoint: $scope.Edit.accessPoint,
      moreInfo: $scope.Edit.moreInfo
    }
    console.log(_data4);
    if (confirm('คุณต้องการแก้ไขข้อมูลนี้หรือไม่')){
      $http({
        method: 'POST',
        url: 'http://localhost:3800/api/customers/updated',
        data: _data4,
        config: '',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function successCallback(response) {
        console.log(response.status + ' ' + response.statusText);
        setTimeout(function() {
          location.href = "/";
        }, 0);
      }, function errorCallback(response) {
        console.log(response.status + ' ' + response.statusText);
      });
    }else{
      //do nothing
    }
  };



  //     $scope.init = function () {
  //         //push object in array
  //         $scope.loadData();
  //     };

  //     //-----------------------------------------------------
  //     $scope.loadData = function () {
  //         $scope.forms = formService.loadData();
  //     };
  //     //-----------------------------------------------------

  //     //--------------------CRUD function--------------------

  //     $scope.newData = function () {
  //         formService.newData();
  //     };

  //     //-----------------------------------------------------
  //     $scope.editData = function (id) {
  //         formService.editdata(id);
  //     };

  //     //-----------------------------------------------------
  //     $scope.updateData = function () {
  //         formService.updateData();
  //     };

  //     //-----------------------------------------------------
  //     $scope.deleteData = function (id) {
  //         formService.deleteData(id);
  //     };
  //     //----------------------------------------------------

  //     //-----------------------------------------------------
  //     $scope.cancelData = function () {
  //         formService.cancelData();
  //     };
  //     //----------------------------------------------------
  // };

}]);

/**
 * Created by Isma-il on 9/11/2016.
 */
