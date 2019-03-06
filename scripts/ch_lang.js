

lang1=localStorage.getItem("lang")
 if (lang1=="")
 localStorage.setItem("lang","swe")

 function change_lang() {
 lang1=localStorage.getItem("lang");
 if (lang1=="eng") {
 localStorage.setItem("lang","swe");  
 lang1=localStorage.getItem("lang");
 document.getElementById("chlang").value="Svenska"
 setTimeout("location.href='/pr4-github/InterfaceProgramming/index.html'",2000)
 }
 else {
 localStorage.setItem("lang","eng");
 lang1=localStorage.getItem("lang");
 document.getElementById("chlang").value="English"
 setTimeout("location.href='/pr4-github/InterfaceProgramming/index.html'",2000)
 }


  }



