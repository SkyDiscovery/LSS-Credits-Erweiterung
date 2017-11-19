// ==UserScript==
// @name         LSS-Creditserweiterung
// @version      1.0
// @description  In einer Drop-Down-List werden verschiedene Extras zu den Credits angezeigt
// @author       KBOE2
// @include      https://www.leitstellenspiel.de/*
// @include      https://www.leitstellenspiel.de/profile/*
// @grant        none
// ==/UserScript==


var username = document.getElementById("navbar_profile_link").innerText.substr(1);
var Credits = document.getElementById("navigation_top").outerHTML;
var Coins = document.getElementById("coins_top").outerHTML;
var credits = document.getElementById("navigation_top");
var coins = document.getElementById("coins_top");
var gesamtcredits = "undefined";
var dienstgrad = "undefined";
var next_level = "undefined";

function lightbox_open() {
    lightboxOpen();
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function mach_tausender() {
    var zahl = readCookie("gesamtcredits");
    if (zahl === null){
        alert("Um die Credits-erweiterung zu aktivieren, bitte gehe auf dein Profil und lade dann die Seite neu");
    }
    var i;
    var j=0;
    var ergebnis="";
    ergebnis = parseInt(zahl).toLocaleString();
    return ergebnis;
}

credits_gesamt = mach_tausender();

dienstgrad = readCookie("dienstgrad");

var dienstgrade = ["Anwärter(in)","Feuerwehrmann / Feuerwehrfrau","Oberfeuerwehrmann / Oberfeuerwehrfrau","Hauptfeuerwehrmann / Hauptfeuerwehrfrau","Stv. Gruppenführer(in)","Gruppenführer(in)","Stv. Zugführer(in)","Zugführer(in)","Stv. Wehrführer(in)","Wehrführer(in)","Stv. Kreisbrandmeister(in)","Kreisbrandmeister(in)","Stv. Landesbrandmeister(in)","Landesbrandmeister(in)","Ehrenmitglied"];
var benoetigte_credits = [0,200,10000,100000,1000000,5000000,10000000,20000000,50000000,100000000,200000000,500000000,1000000000,2000000000,5000000000];

function naechster_dienstgrad(dienstgrad){
    var i = 0;
    for (var item in dienstgrade) {
        if (dienstgrade[item] == dienstgrad){
            var item_2 = parseInt(item)+1;
            var benoetigt = benoetigte_credits[item_2];
            return benoetigt;
        }
        i += 1;
    }
}

function dienstgrad_next(dienstgrad){
    for (var item in dienstgrade) {
        if (dienstgrade[item] == dienstgrad){
            var item_2 = parseInt(item)+1;
            var naechster_grad = dienstgrade[item_2];
            return naechster_grad;
        }
    }
}

var benoetigt = naechster_dienstgrad(dienstgrad);
var naechster_grad = dienstgrad_next(dienstgrad);
gesamtcredits = parseInt(readCookie("gesamtcredits"));
var verbleibend = benoetigt - gesamtcredits;
next_level = parseInt(verbleibend).toLocaleString();
if (credits_gesamt == "NaN"){
	credits_gesamt = "Bitte auf das Profil gehen<br>und dann die Seite neu laden";
}
if (next_level == "NaN"){
	next_level = "Bitte auf das Profil gehen<br>und dann die Seite neu laden";
}

check_profil();
$(".nav.navbar-nav.navbar-right").append('<li ><a id="menu_creditsverwaltung"  class="dropdown_toggle href="#" role="button" data-toggle="dropdown" aria-expanded="false"><img src="http://img5.fotos-hochladen.net/uploads/moneyboxfille9ropt2yxs7.png" heigth="25" width="25"><span class="visible-xs">Creditsverwaltung (von KBOE2)</span><b class="caret"></b></a><ul class="dropdown-menu" role="menu" aria-labelledy="menu_Creditsverwaltung><li class="divider" role="presentation"></li><li role="presentation" >' + Credits + '</li><li role="presentation"><a href="/credits/overview" class="lightbox-open" target="blank" onclick="lightbox_open()" >Credits-Übersicht</a></li><li role="presentation">' + Coins + '</li><li role="presentation"><a href="/coins/list" class="lightbox-open" target="blank" onclick="lightbox_open()">Coinsprotokoll</a></li><li class="divider" role="presentation"></li><li role="presentation"><a>Gesamtcredits: ' + credits_gesamt + '</a></li><li role="presentation"><a>Credits zum nächsten Dienstgrad<br>(' + naechster_grad + '):<br>'+ next_level + '</a></li><li class="divider" role="presentation"></li><li role="presentation"><a href="http://kboe-2.de.tl?in=4" target="blank"><img src="http://www.fotos-hochladen.net/uploads/kb29tnz0o1c3qu.jpg" alt="KBOE2"/> Webseite des Entwicklers (KBOE2)</a></li><li role="presentation"><a class="lightbox-open" target="blank" onclick="lightbox_open()" href="/profile/205976">Profil des Entwicklers (KBOE2)</a></li><li role="presentation"><a href="https://docs.google.com/forms/d/e/1FAIpQLSeEBV6pdU1zPJAEAoIVjdOOxoc_vf88vqaDvdLrS0aanPrasw/viewform" target="blank" class="lightbox-open" onclick="lightbox_open">Programmierauftrag/idee senden</a></li><li class="divider" role="presentation"></li<li role="presentation"><a href="https://icons8.com/" target="blank">Icon-Pack</a></li></ul></li>');

credits.parentNode.remove(credits);
coins.parentNode.remove(coins);
