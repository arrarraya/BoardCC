//script for use dateTime-----------------------------------
function eraseText() {
  document.getElementById("textarea1").value = "";
};
$(document).ready(function () {

  $(".form_datetime").datetimepicker({
    format: "dd MM yyyy - hh:ii",
    autoclose: true,
    todayBtn: true,
    pickerPosition: "bottom-left"
  });
});
//-----------------------------------------------------------


function addBox (parent,level){
  console.log("parent is : " + parent +"\n" + "level is : " + level);
  $('div#boxlevel').remove(); //เริ่มแรกลบกล่องออกก่อน
  var link_question = $('#link_question'); //อ้างอิงตัวแปรที่จะใช้เก็บ link_question
  var history_link = link_question.text(); //ไปดึง text จาก link_question ไปให้ history_link เพื่อดึงค่า path ที่เรากดไป
  var arr_history = history_link.split('/'); // ใช้ฟังก์ชั่น split() เพื่อให้ข้อมูลในอาร์เรย์ถูกแบ่งโดย / นะ

  arr_history[level] = parent; //ทำให้รู้ว่า level ที่กดอยุ่มี parent เป็นอะไร
  var str = ''; //ประกาศตัวแปร str เพื่อใช้เก็บพาธ
  $.each(arr_history, function(i,item) {
    str = str + "/" + item;
  });
  str = str.substr(1,str.length); //ใช้เลือกสตริงตัวแรกถึงตัวสุดท้ายของความยาวของ str
  link_question.text(str); //ใช้ในการดึงข้อความของ str

  for(var j = 0 ; j < level+1 ; j ++){
    //console.log('parent' + arr_history[j]);
    angular.element('#homeController').scope().getDataById(parseInt(arr_history[j]),level);
  }
};

  /*
  console.log('click level ' + level);
  console.log('level_st ' + level_st);
  for(var i = level_st; i < level+1 ; i++){
    /!** กรณีที่ level ที่กดน้อยกว่า 3 *!/
    if(i > 0){
      console.log('addbox level ' + i);
      angular.element('#homeController').scope().getDataById(arr_history[i],level);
    }
  }*/


/*
if(response.data[i].name == "Q"){
  $scope.question = response.data[i].text;
}
else{
  console.log("Wrong!!");
}*/
