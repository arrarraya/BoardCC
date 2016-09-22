app.service('questionService', function () {

//-----------------------------------------------------
    this.loadData = function () {
        return [
            {name: "ismail", phone: "0880140373", dell: "555555"},
            {name: "tikky", phone: "0816154896", dell: "555555"},
            {name: "arr", phone: "0599656314", dell: "555555"},
            {name: "dew", phone: "0516666987", dell: "555555"}
        ]
        // this anonymous function is use for get and refresh data
        // var refresh = function () {
        //     $http.get('/readQ').success(function (response) {
        //         console.log("I got the data I requested");
        //         $scope.problems = response;
        //         $scope.contact = "";
        //     });
        // };
        // return refresh();
    };
//-----------------------------------------------------
    this.newData = function () {
        $http.post('/addQ', _data).success(function (response) {
            console.log(response.status + ' ' + response.statusText);
        }).error(function (response) {
            console.log(response.status + ' ' + response.statusText);
        });

    };
//-----------------------------------------------------
    this.editData = function (id) {
        console.log(id);
        $http.get('/editQ' + id).success(function (response) {
            $scope.editData = response;
            console.log(response.status + ' ' + response.statusText);
        }).error(function (response) {
            console.log(response.status + ' ' + response.statusText);
        })
    };
//-----------------------------------------------------
    this.updateData = function () {
        console.log(id);
        $http.put('/update' + id ,$scope.editData).success(function (response) {
            $scope.loadData();
            console.log(response.status + ' ' + response.statusText);
        }).error(function (response) {
            console.log(response.status + ' ' + response.statusText);
        });
    };
//-----------------------------------------------------
    this.deleteData = function () {
        console.log(id);
        $http.delete('/delete' + id).success(function (response) {
            console.log(response.status + ' ' + response.statusText);
        }).error(function (response) {
            console.log(response.status + ' ' + response.statusText);
        });
    };
//-----------------------------------------------------
    this.cancelData = function () {
        $scope.problems = "";
    };
//-----------------------------------------------------
});
