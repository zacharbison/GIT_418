/*************************** Calculations.js ***********************************
   created : 8/30/2018
   author  : Zachary Harbison
   site    : The car repair logs |www.public.asu.edu/~zharbiso/GIT_417/index.html
   class   : GIT 417 Fall A 
******************************************************************************/


/*************************** CubInchToCC ***************************************
    converts the user given number in cubic inches to the equivalent number in cubic centimeters
******************************************************************************/
function cubInchToCC(){//function name
	var cubicInch = document.getElementById("cuIn").value;/*creates a var and
	sets it to what the users input*/
	var cubicCent = 16.387;/*creates a var with the value of 1 cubic inch in
	cubic centimeters*/
	var convertedNum = cubicInch * cubicCent;/* creates convertedNum and sets
	it to the product of user defined cubicInch and preset cubicCent*/
	document.getElementById("cuC").innerHTML = convertedNum;/*sets the element
	with the id of cuC to the value of convertedNum*/
	CCToCuL(convertedNum);//calls CCToCuL and passes the value of convertedNum
}// end cubInchToCC


/***************************  CCToCuL ***************************************** 
	converts the the output of CubInchToCC to the equivalent in liters
	rounded to the nearest 10th
******************************************************************************/
function CCToCuL(ccNum){//function name with a parameter
	var convertedNum = Math.round(ccNum / 100);/* creates a local var (not the
	same var in cubInchToCC() as that was also a local variable
	and sets it to the value of ccNum divided by 100 after being rounded. 
	cc divided by 1000 = liters but I divided by 100 so I could round to the
	nearest 10th*/
	convertedNum = convertedNum / 10;/*takes converted number and moves the decimal one place to give liters rounded to the tenth for usual engine listing*/
	document.getElementById("cuL").innerHTML = convertedNum + " (rounded to the nearest 10th)";
	//above sets element with id cuL to the converted number with message
	/*below sets the element with the id userNum to display a message explaining Cu Inch engine = Cu Liter Engine*/
	document.getElementById("userNum").innerHTML = "So a " + document.getElementById("cuIn").value + " Cu Inch engine is the same as a " + convertedNum + " Cu Liter engine";
}//end CCToCuL

/***************************  mpg ***************************************** 
	converts user input miles driven and gallons used and returns average mpg
******************************************************************************/
function mpg(){//mpg function with no parameters
	var miles = document.getElementById("mDriven").value;//takes user input miles 
	var gallons = document.getElementById("gallons").value;//takes user gallons 
	var mpg = miles / gallons;//calculates mpg and stores in var mpg
	if(miles <= 0 || gallons <= 0){//gives error message if numbers are not valid
		document.getElementById("userMPG").innerHTML = "Well that's not right, it's got to be two positive numbers. Try again.";
	}else{//if numbers are valid
		document.getElementById("userMPG").innerHTML = "This gives you an average mpg of " + mpg;//displays the results
	}
}

/*adds a event listener for the element with the id cuIn2Cuc and calls 
cubInchToCC when element is clicked. cuIn2Cuc should be in index.html. Now uses validation to make backwards compatible with older IE (from text book)*/
var ciCcListener = document.getElementById("cuIn2CuC");//cubic in to cc button
var mpgListener = document.getElementById("mpgCon");//mpg button
if(ciCcListener.addEventListener){//if true then addEventListener
	ciCcListener.addEventListener("click", cubInchToCC, false);//calls cubInchToCC clicked
	mpgListener.addEventListener("click", mpg, false);//calls mpg when clicked
}else if(addListener.attachEvent){//else attachEvent (<=IE8)
	addListener.attachEvent("onclick", CubInchToCC, false);//same but for legacy 
	mpgListener.attachEvent("onclick", mpg, false);//same but for legacy 
}

