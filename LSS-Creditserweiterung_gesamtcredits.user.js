// ==UserScript==
// @name         LSS-Creditserweiterung_gesamtcredits
// @version      1.0
// @description  Gesamtcredits des Spielers werden gespeichert und im Hauptscript verarbeitet (durch Cookies)
// @author       KBOE2
// @include      https://www.leitstellenspiel.de/profile/205976
// @grant none
// ==/UserScript==

//!!!!
//Achtung: bitte im Link oben (https://www.leitstellenspiel.de/profile/205976) noch die Zahl in die eigene Spieler-ID ändern (Kann über weiteres Script direkt im Browser angezeigt werden. Oder: Drop-down-Liste mit Profil und so öffnen, rechts-klick auf Benutzername --> Link speichern --> durch link oben ersetzten)
//!!!

var regex = /\d/gi, result, indices = [];
var elements = document.getElementsByClassName("page-header");
for (var i = 0; i < elements.length; i++){
  var element = elements[i];
  var ausgabe = element.innerHTML;
  ausgabe = ausgabe.replace(/ /,"");
  ausgabe = ausgabe.replace(/\n|\r/g,"");
  ausgabe = ausgabe.replace(/<div.+div>|\r/g,"");
  ausgabe = ausgabe.replace(/<h1.+h1>|\r/g,"");
  ausgabe = ausgabe.replace(/<a.+a>|\r/g,"");
  ausgabe = ausgabe.replace(/<br>|\r/g,"");
  ausgabe = ausgabe.replace("Verband:","");
  ausgabe = ausgabe.replace("Dienstgrad:","");
  ausgabe = ausgabe.replace("verdiente Credits","");
  var gesamtcredits = "";
    while (result = regex.exec(ausgabe)) {
    indices.push("" + result.index);
    gesamtcredits+=result;
  }
  ausgabe = ausgabe.replace(/\d.+\d/,"");
  var dienstgrad = ausgabe;
  document.cookie = "gesamtcredits=" + gesamtcredits + "; path=/";
  document.cookie = "dienstgrad=" + dienstgrad + "; path=/";
}