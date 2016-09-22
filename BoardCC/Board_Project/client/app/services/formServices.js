app.service('formService', function () {

    // data for post to nodejs server
    var _data = $.param({
        room: $scope.room,
        customerName: $scope.customerName,
        tel: $scope.tel,
        dateTime: $scope.dateTime,
        premium: $scope.premium,
        retail: $scope.retail,
        accessPoint: $scope.accessPoint,
        more: $scope.more
    });

//-----------------------------------------------------
    this.loadData = function () {
        // this anonymous function is use for get and refresh data
        var refresh = function () {
            $http.get('/read').success(function (response) {
                console.log("I got the data I requested");
                $scope.forms = response;
            });
        };
        return refresh();
    };
//-----------------------------------------------------
    this.newData = function () {

        $http.post('/add', _data).success(function (response) {
            console.log(response.status + ' ' + response.statusText);
        }).error(function (response) {
            console.log(response.status + ' ' + response.statusText);
        });

    };
//-----------------------------------------------------
    this.editData = function (id) {
        console.log(id);
        $http.get('/edit' + id).success(function (response) {
            $scope.editData = response;
            console.log(response.status + ' ' + response.statusText);
        }).error(function (response) {
            console.log(response.status + ' ' + response.statusText);
        })
    };
//-----------------------------------------------------
    this.updateData = function (id) {
        console.log(id);
        $http.put('/update' + id ,$scope.editData).success(function (response) {
            $scope.loadData();
            console.log(response.status + ' ' + response.statusText);
        }).error(function (response) {
            console.log(response.status + ' ' + response.statusText);
        });
    };
//-----------------------------------------------------
    this.deleteData = function (id) {
        console.log(id);
        $http.delete('/delete' + id).success(function (response) {
            console.log(response.status + ' ' + response.statusText);
        }).error(function (response) {
            console.log(response.status + ' ' + response.statusText);
        });
    };
//-----------------------------------------------------
    this.cancelData = function () {
        $scope.room = "";
        $scope.customerName = "";
        $scope.tel = "";
        $scope.dateTime = "";
        $scope.premium = "";
        $scope.retail = "";
        $scope.accessPoint = "";
        $scope.more = "";
    };
//-----------------------------------------------------
});
/**
 * Created by Isma-il on 9/11/2016.
 */
