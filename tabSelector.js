/*************************** TabSelector.js ***********************************
   created : 8/30/2018
   author  : Zachary Harbison
   site    : The car repair logs |www.public.asu.edu/~zharbiso/GIT_417/index.html
   class   : GIT 417 Fall A 

   Note    : This program allows different calculators to be selected with tabs
******************************************************************************/
//calculator and tabs are hidden by default unless this script loads
document.getElementById("QuickConCalc").style.display = "block";
document.getElementById("calcButton").style.display = "block";


var calc1 = document.getElementById("ci2CC");//button for tab 1
var calc2 = document.getElementById("mpg");//button for tab 2
var calc3 = document.getElementById("more");//button for tab 3

var buttons = [calc1, calc2, calc3];//array of buttons (to use just one for loop)

var tabSelector = 0;//for tracking the tab index (index 0 = tab 1)
showTab(tabSelector);//calls showTab passing tabSelector (start with tab 1)

function changeTab(){// changes tabSelector to parameter 
  showTab(tabSelector = this.value);//calls showTab passing the value from the button
}

function showTab(num){// shows correct Tab
  var tabs = document.getElementsByClassName("calculator");//gets all calculator class
  //following sets default/clears changes made by selections
  for(var i = 0; i < tabs.length; i++){//for elements in tab (calculator class)
	tabs[i].style.display = "none";//sets all to not display 
	buttons[i].style.backgroundColor = "#314625";//set all buttons to normal bg color
	buttons[i].style.color = "#A7B79D";//sets all tab buttons font to normal
  }//next update will try to change class instead so css is separate 
  
  tabs[tabSelector].style.display = "block";//displays selected tab 
  buttons[tabSelector].style.backgroundColor = "#4e703b";//styles the selected tab 
  buttons[tabSelector].style.color = "#000"; //styles the selected tab 
}

/*adds a event listener for the tab buttons for different calculators index.html. With validation to make backwards compatible with older IE (from text book)*/

if(calc1.addEventListener){//if true then addEventListeners
	calc1.addEventListener("click", changeTab, false);//tab button 1 calls changeTab
	calc2.addEventListener("click", changeTab, false);//tab button 2 calls changeTab
	calc3.addEventListener("click", changeTab, false);//tab button 3 calls changeTab
}else if(calc1.attachEvent){//else if attachEvent is true (<=IE8)
	calc1.attachEvent("onclick", changeTab, false);//tab button 3 calls changeTab
	calc2.attachEvent("onclick", changeTab, false);//tab button 3 calls changeTab
	calc3.attachEvent("onclick", changeTab, false);//tab button 3 calls changeTab
}