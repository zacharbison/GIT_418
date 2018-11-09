/*************************** dateTime.js ***********************************
   created : 10/18/2018
   author  : Zachary Harbison
   site    : The car repair logs |www.public.asu.edu/~zharbiso/GIT_418/index.html
   class   : GIT 418 Fall B 
   
   Note    : This program allows users input days, months, and years to see the 
             time elapsed since that date in the past. Some code adapted from my concatForm.js program.
******************************************************************************/
var subButton = document.getElementById("elapsedSub");//submit button
var error = false;//boolean used for reseting things changed by error handling 
var userDay = document.getElementById("userDay");//form element for day
var userMonth = document.getElementById("userMonth");//form element for month
var userYear = document.getElementById("userYear");//form element for year
var errorMsg = document.getElementById("errorMsg");//to display error to user


function checkForm(){//Takes user's date and checks validity 

	try{//start of the try catch block
		if((userDay.value == "")||(userMonth.value == "")||(userYear.value == "")){//if day or month or year are empty
			userDay.style.backgroundColor ="#ff0000";//sets input area to red
            userMonth.style.backgroundColor ="#ff0000";//sets input area to red
            userYear.style.backgroundColor ="#ff0000";//sets input area to red
			throw "Please enter a day, month, and year";//throws the custom error
		}
        recalcDate();//calls recalcDate to adjust for days > 31 and months > 12
        if(isNaN(userDay.value)){ //checks if # is NaN (input currently set to num so only needed if input type is changed
			userDay.style.backgroundColor ="#ff0000";//sets input area to red
			throw "Error: Not a Number. Please enter the number of days only. eg. 31";//throws the custom error
		}
        if(isNaN(userMonth.value)){ //checks if # is NaN
			userMonth.style.backgroundColor ="#ff0000";//sets input area to red
			throw "Error: Not a Number. Please enter the month in numbers only. eg. 12";//throws the custom error
		}
        if(isNaN(userYear.value)){ //checks if # is NaN
			userYear.style.backgroundColor ="#ff0000";//sets input area to red
			throw "Error: Not a Number. Please enter the year in numbers only. eg. 1999";//throws the custom error
		}
		if(parseInt(userYear.value)>2018){//if not a past date (parsed evaluate number not string, because can just declare int)
			userYear.style.backgroundColor ="#ff0000";
			throw "Please enter date in the past not the future";
		}

		if(error){//if errors occurred last iteration but not this time, resets
			error = false;//resets back to false
			userDay.style.backgroundColor ="#A7B79D";//rest red background
			userMonth.style.backgroundColor ="#A7B79D";//rest red background
			userYear.style.backgroundColor ="#A7B79D";//rest red background
            errorMsg.innerHTML = "";//clears error message
		} 
        evalDate();//evaluates recalculated user numbers with current date
	}
	catch(err){//if error thrown in try block
		errorMsg.innerHTML = err;//displays error message for user
		error = true;// indicated that error has happened for next iteration
	}
}//end of checkForm

function recalcDate(){//recalculates user's date if days > 31 and/or months >12
    var tempHelper;//for swapping numbers around
    var tempDaY = parseInt(userDay.value);//integer value of userDay
    var tempMonth = parseInt(userMonth.value);//integer value of userMonth
    var tempYear = parseInt(userYear.value);//integer value of userYear
    
    if(tempDaY>31){//if days more than 31 then (days - 31 and months + 1)
        tempHelper = tempDaY % 31;//helper holds the remainder 
        tempDaY -= tempHelper;//subtract the remainder from days for even division
        tempMonth += tempDaY/31;//add the quotient of days divided by 31 to months
        tempDaY = tempHelper;//days are the remainder of the original number (after moving 1 month or more worth of days into the month variable)
    }
    if(tempDaY<0){tempDaY = 0;}/*days less than 0 will be changed to 0. 
    Negative years make sense (before common erra) but negative months and days
    don't in the context of this assignment*/
    
    if(tempMonth>12){//months more than 12 (months - 12 and years + 1)
        tempHelper = tempMonth % 12;//helper holds the remainder
        tempMonth -= tempHelper;//subtract the remainder for even division
        tempYear += tempMonth/12;//add the quotient of months / 12 to years
        tempMonth = tempHelper;//months are the original remainder after removing months over 12      
    }
    if(tempMonth<0){tempMonth = 0;}//months less than 0 are changed to 0
    
    userDay.value = tempDaY;//changes original user values to recalculated values
    userMonth.value = tempMonth;
    userYear.value = tempYear;
}

//this function evaluates the validated and recalculated user input against current date
function evalDate(){
    var currentDate = new Date();//instantiates a new Date object named currentDate
    var elapsedDays = 0; //for holding the difference between currentDate and user's
    var elapsedMonths = 0;//set to zero to reset for each call
    var elapsedYears = 0;
    if((currentDate.getDate() - userDay.value) < 0){//if evaluated days < 0
        elapsedDays = (currentDate.getDate() - userDay.value)+ 31;//add 31 days
        userMonth.value = parseInt(userMonth.value) + 1;//and add one month to user input
    }else{//otherwise just subtract userDay from current day and assign to elapsedDays
        elapsedDays = currentDate.getDate() - userDay.value;
    }
    if(currentDate.getMonth() - (userMonth.value -1) < 0){//if evaluated months < 0 (userMonth -1 because Date object months are 0-11)
        elapsedMonths = (currentDate.getMonth() - (userMonth.value -1)) + 12;//add 12 to user months
        userYear.value = parseInt(userYear.value) + 1;//add one year
    }else{//otherwise just subtract userMonth -1 from current month and assign to elapsedMonths
        elapsedMonths = currentDate.getMonth() - (userMonth.value -1);
    }
    elapsedYears = currentDate.getFullYear() - userYear.value;//subtract userYear from current year and assign to elapsedYears
    
    try{//to see if user input is for the future or is valid
        if(elapsedYears<0){//if newly evaluated elapsedYears is negative
			userYear.style.backgroundColor ="#ff0000";
			throw "Please enter date in the past not the future";//throw error
		}
		if(error){//if errors occurred last iteration but not this time, resets
			error = false;//resets back to false
			userYear.style.backgroundColor ="#A7B79D";//rest red background
            errorMsg.innerHTML = "";//clears error message
		} 
        showElaps(elapsedDays, elapsedMonths, elapsedYears);//passes evaluated numbers to showElaps function to be displayed to the user
	}
	catch(err){//if error thrown in try block
		errorMsg.innerHTML = err;//displays error message for user
		error = true;// indicated that error has happened for next iteration
	}
}
//shows user the elapsed number of days, months, and years from date given
function showElaps(days, months, years){//takes three vars
    document.getElementById("displayDay").innerHTML = days + " days, ";//display days
    document.getElementById("displayMonth").innerHTML = months + " months, ";//display months
    document.getElementById("displayYear").innerHTML = years + " years have elapsed!";//display years
}
/*adds a event listener for the button with the id contactSub and calls 
checkPhone when element is clicked.*/
if(subButton.addEventListener){//if true then addEventListener
	subButton.addEventListener("click", checkForm, false);//calls checkForm
}else if(subButton.attachEvent){//else attachEvent (<=IE8)
	subButton.attachEvent("onclick", checkForm, false);//same but for legacy 
}

