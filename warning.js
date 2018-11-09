/*************************** warning.js ***********************************
   created : 9/21/2018
   author  : Zachary Harbison
   site    : The car repair logs |www.public.asu.edu/~zharbiso/GIT_417/index.html
   class   : GIT 417 Fall A 
   Note    : This program displays a warning message that shows the user some
             of the things that a Java Script  program can find about them and 
             links to find information that will help educate them on ways to 
             protect themselves.
******************************************************************************/
var warn = document.getElementById("warning");//the warning section
var hide = document.getElementById("hideBtn");//hide button, click to close

var geoLoc = document.getElementById("navi1");//span where geolocation displays
var onLine = document.getElementById("navi2");//span where boolean user online
var platform = document.getElementById("navi3");//span user platform displays
var userAgent = document.getElementById("navi4");//span user agent displays
var pixDepth = document.getElementById("navi5");//span user's screen pixel depth
var scrRes = document.getElementById("navi6");//span for users screen resolution

function moreInfo(){
    warn.style.height = "80%";
    warn.style.animationIterationCount = "0";
}
function showWarning(){
    warn.style.display = "block";//displays warning, hidden by default
    try{//may cause error if disabled or not supported
        if(window.navigator.geolocation){//if it works then true
        window.navigator.geolocation.getCurrentPosition(userLocation);//passes geolocation to userLocation for display
        throw "Error: Your browser doesn't support this or you restricted access (good idea!)"//throw error if not supported or disabled
        }
    }
    catch(err){
        geoLoc.innerHTML = err;//displays error message
    }
    onLine.innerHTML =window.navigator.onLine;//replaces span with true/false
    platform.innerHTML =window.navigator.platform;// "" "" with user OS platform
    userAgent.innerHTML =window.navigator.userAgent;// browser's user agent
    pixDepth.innerHTML =screen.pixelDepth;// pix depth of screen
    scrRes.innerHTML =screen.width+" * "+screen.height;//displays screen height and width
}
function userLocation(coordinates){//for displaying coordinates of geolocation
    geoLoc.innerHTML ="Your latitude "+coordinates.coords.latitude+" and longitude "+coordinates.coords.longitude;
}
function hideWarning(){
    warn.style.display = "none";//close button hides warning
}
setTimeout(showWarning, 3000);//waits 3 seconds after loading before displaying warning

/*adds a event listener for the elements which should be in index.html. Now uses validation to make backwards compatible with older IE (from text book)*/
if(warn.addEventListener){//if true then addEventListener
	warn.addEventListener("click", moreInfo, false);//calls moreInfo clicked
    hide.addEventListener("click", hideWarning, false);
}else if(warn.attachEvent){//else attachEvent (<=IE8)
	warn.attachEvent("onclick", moreInfo, false);//same but for legacy 
    hide.attachEvent("onclick", hideWarning, false);//same but for legacy 
}

    
    