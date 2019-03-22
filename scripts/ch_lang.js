//language switcher 
// Nicolae Bogdan 2019

// set the language default to swedish and store on local storage

lang1=localStorage.getItem("lang")
 if (lang1=="")
 localStorage.setItem("lang","swe")

// function that changes language once the language button is clicked
// if the language is english switch to swedish and vice versa
// also store the new languate on local storage so that 
// the translation.js script can set the language of all pages
// the function reloads the main page so the changes are reflected on site.

 function change_lang() {
 lang1=localStorage.getItem("lang");
 if (lang1=="eng") {
 localStorage.setItem("lang","swe");  
 lang1=localStorage.getItem("lang");
 document.getElementById("chlang").value="Svenska"
 setTimeout("location.href='index.html'")
 }
 else {
 localStorage.setItem("lang","eng");
 lang1=localStorage.getItem("lang");
 document.getElementById("chlang").value="English"
 setTimeout("location.href='index.html'")
 }


  }



