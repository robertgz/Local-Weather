$(document).ready(function(){
  var wData = {
    city: "", country: "", tempK: "", tempC: "", tempF: "",
    conditions: "", condIconURL: ""
  };
  
  function getData() {
    $.getJSON("https://ipinfo.io", function(json) {
      wData.city = json.city;
      wData.country = json.country;
      $.getJSON("https://api.openweathermap.org/data/2.5/weather?q="               
                + wData.city + "," + wData.country
                + "&APPID=5d02459eb489a8cbf8465814b8cdf896" 
                , function(json2){ 
      wData.tempK = json2.main.temp;
      wData.tempC = Math.round(wData.tempK - 273.15);
      wData.tempF = Math.round(wData.tempK * (9.0/5.0) - 459.67);
      wData.conditions = json2.weather[0].main;
      wData.condIconURL = "http://openweathermap.org/img/w/" + json2.weather[0].icon + ".png";     
      updateDisplay();
      });         
    });
  }
  
  function updateDisplay() {
    $("#city").html(wData.city + ", " + wData.country); 
    $("#tempF").html(wData.tempF);
    $("#tempC").html(wData.tempC);    
    $("#cond-text").html(wData.conditions);
    $("#cond-icon").attr("src", wData.condIconURL);    
  }
  
  $("#temperature").find("a").on("click", function(){
    $("#degreesF").toggle();
    $("#degreesC").toggle();
  });
  
  getData();
});