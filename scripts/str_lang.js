myJSON=' { "tab" : { "eng" : "Tab", "swe" : "Nota"  },   "username" : {  "eng" : "Username", "swe" : "Användarnamn" }, "password" : {   "eng" : "Password", "swe" : "Lösenord" }, "table" : { "eng" : "Table", "swe" : "Bord" }, } }'
ob2=JSON.stringify(myJSON);
localStorage.setItem("str_lang",ob2);