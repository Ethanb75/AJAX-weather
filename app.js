var x = $("#demo");
var sign = " deg C";
var currTemp;
var desc;

$(".fa-pencil-square-o").click(toggleDeg);

function toggleDeg(){
    if (sign === " deg C") {
        currTemp = Math.round(currTemp * (9/5) + 32);
        sign = " deg F"
        x.fadeIn().html(desc +"<br>"+ currTemp + sign);
    } else {
        currTemp = Math.round((currTemp -32)*(5/9));
        sign = " deg C";
        x.fadeIn().html(desc +"<br>"+ currTemp + sign);
    }
}
function getLocal(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.html("geolocation is not supported");
    }
}
function showPosition(position) {
    var urlData = "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
    getJson(urlData);
}

function getJson(urlData){
    var back = $(".backer");
    $.getJSON( "http://api.openweathermap.org/data/2.5/weather?" + urlData + "&appid=18a6d3061be3608490c08fc2c16d1203", function( data ) {
    currTemp = Math.round(data.main.temp - 273);
    desc = data.name;
    if (currTemp > 30){
        back.fadeIn().css("background-image","url('img/hot.jpg')");
    } else if (currTemp > 15){
            back.fadeIn().css("background-image","url('img/hot.jpg')");
    } else {
            back.fadeIn().css("background-image","url('img/cold.jpg')");
    }
        x.fadeIn().html(desc +"<br>"+ currTemp + sign);
    });

}
getLocal();