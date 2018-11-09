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
var userLat;//holds user latitude 
var userLon;//holds user longitude
var geoLoc = document.getElementById("navi1");//span where geolocation displays
var onLine = document.getElementById("navi2");//span where boolean user online
var platform = document.getElementById("navi3");//span user platform displays
var userAgent = document.getElementById("navi4");//span user agent displays
var pixDepth = document.getElementById("navi5");//span user's screen pixel depth
var scrRes = document.getElementById("navi6");//span for users screen resolution
var map;//modest maps

//modest maps
function initMap() {
    var container = document.getElementById('container');//div on logs.html
    var template = 'http://{S}tile.openstreetmap.org/{Z}/{X}/{Y}.png';//using modest map template
    var subdomains = [ '', 'a.', 'b.', 'c.' ];//provided with template
    var provider = new MM.TemplatedLayer(template, subdomains);//display template and subs
	var dimensions = new MM.Point(600, 400);//fixed size of 600x400px
    map = new MM.Map('map', provider, dimensions);//new map object with given parameters 
    map.setCenterZoom(new MM.Location(userLat, userLon), 14);//map centered on lat and long retired from user
	map.setZoomRange(10, 15);//how far mouse wheel will zoom in/out (I restricted because some extreme zooms cause errors)
}

function moreInfo(){
    warn.style.height = "90%";
    warn.style.animationIterationCount = "0";
	warn.style.overflowY = "scroll";//map makes this pop-up larger than typical screen size, so scrolling enabled 
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
	setTimeout(initMap, 4000)//delays loading map until geo info has been collected
}
function userLocation(coordinates){//for displaying coordinates of geolocation
    userLat = coordinates.coords.latitude;//holds given latitude in userLat to pass to map
	userLon = coordinates.coords.longitude;//holds given longitude in userLon to pass to map
	//displays latitude and longitude to user
    geoLoc.innerHTML = "Your latitude "+coordinates.coords.latitude+" and longitude "+coordinates.coords.longitude;
}
function hideWarning(){
    warn.style.display = "none";//close button hides warning
	
}
setTimeout(showWarning, 2000);//waits 2 seconds after loading before displaying warning

/*adds a event listener for the elements which should be in index.html. Now uses validation to make backwards compatible with older IE (from text book)*/
if(warn.addEventListener){//if true then addEventListener
	warn.addEventListener("click", moreInfo, false);//calls moreInfo clicked
    hide.addEventListener("click", hideWarning, false);
}else if(warn.attachEvent){//else attachEvent (<=IE8)
	warn.attachEvent("onclick", moreInfo, false);//same but for legacy 
    hide.attachEvent("onclick", hideWarning, false);//same but for legacy 
}

    
    