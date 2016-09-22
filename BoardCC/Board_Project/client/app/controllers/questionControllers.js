app.controller('homeController', ['$scope', '$http', 'questionService', function ($scope, $http, questionService) {

  //-----------------------------------------------------------
  //use for get child data reference by relational of id and parent
  $scope.getDataById = function (index, level) {
    if (index) {
      _data = {
        "parent": index
      };
    } else {
      var _data = {
        "parent": 1
      };
    }
    $http({
      method: 'GET',
      url: 'http://localhost:3800/api/resloves/parent/' + _data.parent,
      data: "",
      config: '',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function successCallback(response) {
      $scope.AddData(response);
      // console.log(response);
    }, function errorCallback(response) {
      // console.log(response);
    });
    //console.log('this index ' + _data.parent);
  };

  //-------------------------------------------------------------


  //----------------------------------------------------------------------------------------

  //ฟังก์ชั่นนี้ใช้สำหรับแอดกล่องและข้อมูลลูกตัวใหม่เพิ่ม โดยจะมีการเรียกฟังก์ชั่น addBox() จากไฟล์ box.js อีกที
  $scope.AddData = function (response) {
    //this for add div element to parent
    // console.log(typeof $('#level' + response.data[0].level).html());
    // console.log("level is : " + response.data[0].level);
    if (typeof $('#level' + response.data[0].level).html() == 'undefined' || response.data[0].level == 1) { //ใช้สำหรับเช็คว่ากล่อง level 1 มีค่าเป็น undefined หรือเปล่า
      var element = "<div class='col-md-3 scroll' id='boxlevel'>" +
        "<div class='panel panel-warning'>" +
        "<div class='panel-body'>" +
        "<ul class='list-group parent" + response.data[0].parent + " ' id='level" + response.data[0].level + "'>" +
        "</ul>" +
        "<button class='todo-add-button' href='#todo-members-modal' data-toggle = 'modal' >" +
        "+ </button>" +
        "</div>" +
        "</div>" +
        "</div>";
      $('.parent').append(element);

      //this for add children data to parent
      var addchildren = '';
      for (var i = 0; i < response.data.length; i++) {
        addchildren +=
          "<button type='button'  value='text' onclick='addBox(" + response.data[i]._id + " , " + response.data[i].level + ")'  class='list-group-item list-group-item-info'>" +
          response.data[i].text +
          "<span class=' badge badge-default fa fa-chevron-right'></span>" +
          "</button>";
      }
      // ใช้สำหรับตอบสนองกล่อง
      if ($('div#boxlevel').length < 4) {
        $('.parent' + response.data[0].parent).append(addchildren).hide().show('slow');
      } else {
        //วนลูปลบกล่องในกรณีที่กล่องเกืน 4 กล่อง มันจะวนลูปล่ะลบอันที่เกินออกไปโดยเอากล่อง - 4
        for (var i = 0; i < $('div#boxlevel').length - 4; i++) {
          $('div#boxlevel').eq(i).remove();
        }
        $('.parent' + response.data[0].parent).append(addchildren).hide().show('slow');
      }
    }
  }
  //----------------------------------------------------------------------------------------

}]);


