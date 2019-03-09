var text1 = '{"tab" : { "eng" : "Tab", "swe" : "Nota" }, "username" : { "eng" : "Username",   "swe" : "Användarnamn" },"password" : {"eng" : "Password", "swe" : "Lösenord" } }';
var text2 ='{ "submit" : { "eng" : "Submit", "swe" : "Skicka" }, "regularguest" : { "eng" : "Regular Guest", "swe" : "Vanlig Gäst" } }';


  var myObj=JSON.parse(text1);
  var myObj2=JSON.parse(text2);


lang1 = localStorage.getItem("lang");
// alert(" "+myObj2.submit.swe);

if (lang1=="swe") {
document.getElementById("username").placeholder=myObj.username.swe;
document.getElementById("password").placeholder=myObj.password.swe;
 document.getElementById("subm").innerHTML=myObj2.submit.swe;
 document.getElementById("regguest").innerHTML=myObj2.regularguest.swe ; 
   
} 
if (lang1=="eng") {
document.getElementById("username").placeholder=myObj.username.eng;
document.getElementById("password").placeholder=myObj.password.eng;
 document.getElementById("regguest").innerHTML=myObj2.regularguest.eng;

}

