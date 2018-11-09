/*************************** contactForm.js ***********************************
   created : 10/25/2018
   author  : Zachary Harbison
   site    : The car repair logs |www.public.asu.edu/~zharbiso/GIT_418/contact.html
   class   : GIT 418 Fall B 
   
   Note    : This program allows user to send a contact message and has been updated 
			to add/remove additional options to an array that displays upon submission.
			Original program written by me for GIT 417 Fall A. 
			
			This form now has additional validation including the use of regular expressions.
******************************************************************************/
var subButton = document.getElementById("contactSub");//submit button
var error = false;//boolean used for reseting things changed by error handling 
var optSelect = document.getElementsByName("checkOpt");
var phoneNum;//form element for phone#
var userName;//user name
var email;//form element for email
var subject;//form element for subject
var message;//form element for message
var subMsg = document.getElementById("response");//form element for submit 
var userSelect =[];//array holding optional user selections

function checkForm(){
	phoneNum = document.getElementById("formPhone");//form element for phone#
	userName = document.getElementById("formName").value;//form element for name
	var name = document.getElementById("formName");//form element for name
	email = document.getElementById("formEmail");//form element for email
	subject = document.getElementById("formSub");//form element for subject
	message = document.getElementById("formMsg");//form element for message
	try{//start of the try catch block
		if(name.value == ""){//if above is false but name is empty
			name.style.backgroundColor ="#ff0000";//sets input area to red
			throw "Please enter name";//throws the custom error
		}
		if(name.value.length>80){// name > 80 characters 
			name.style.backgroundColor ="#ff0000";//sets input area to red
			throw "Please enter name less than 80 letters";//throws the custom error
		}
		if(email.value.search(".") == -1){// email is empty
			email.style.backgroundColor ="#ff0000";
			throw "Please enter email address";
		}
		if(email.value.length>256){// email is larger than 256 char
			email.style.backgroundColor ="#ff0000";
			throw "Please enter email address less than 256 characters";
		}
		if(email.value.search(/@/)===-1){//email should have @ symbol 
			email.style.backgroundColor ="#ff0000";
			throw "Please enter a valid email address";
		}
		if(phoneNum.value == "" || phoneNum.value.length<7 || 
						phoneNum.value.length>10 || isNaN(phoneNum.value)) {//if phone # is empty, NaN, wrong size
			phoneNum.style.backgroundColor ="#ff0000";
			throw "please enter 7 to 10 digits without spaces or dashes";
		}
		if(subject.value == "" ||subject.value.length>200){//if subject is empty or > 200 char
			subject.style.backgroundColor ="#ff0000";
			throw "please enter subject less than 200 characters"
		}
		if(message.value == "" ||message.value.lenght>500){//if message is empty or > 500 char
			message.style.backgroundColor ="#ff0000";
			throw "please enter message"
		}
		showSub();//hides form and shows what was submitted 
		
		if(error){//if errors occurred last iteration but not this time, resets
			error = false;//resets back to false
			phoneNum.style.backgroundColor ="#A7B79D";//rest red background
			email.style.backgroundColor ="#A7B79D";//rest red background
			name.style.backgroundColor ="#A7B79D";//rest red background
			subject.style.backgroundColor ="#A7B79D";//rest red background
			message.style.backgroundColor ="#A7B79D";//rest red background
		} 
	}
	catch(err){//if error thrown in try block
		subMsg.innerHTML = err;//displays error message for user
		error = true;// indicated that error has happened for next iteration
	}
}
function userOptions(){//adds/removes selections from userSelect array
	var optValue = document.getElementsByName("checkOptTxt");//grabs all the elements with selection text
	for(var i = 0;i<optSelect.length;i++){//for loop of selections
		if(optSelect[i].checked){//if selection is checked
			userSelect[i]= optValue[i].innerHTML;//add text from optValue to userSelect array
		}else userSelect[i]="";//if not checked element at index is blank
	}
}

//hides form and displays submission details
function showSub(){
	document.getElementById("displaySub").style.display ="block";//shows user submissions
	document.getElementById("subName").innerHTML = userName;//shows user name
	document.getElementById("subEmail").innerHTML = email.value;//shows user email
	document.getElementById("subPhone").innerHTML = phoneNum.value;//shows user phone number
	document.getElementById("subSubject").innerHTML = subject.value;//shows user subject
	document.getElementById("subMessage").innerHTML = message.value;//shows user message
	document.getElementById("subOption").innerHTML = userSelect.toString();//creates a string from userSelect array
	document.getElementById("contact").style.display ="none";//hides inputs to display submission
}

/*adds a event listener for the button with the id contactSub and calls 
checkPhone when element is clicked.*/
if(subButton.addEventListener){//if true then addEventListener
	subButton.addEventListener("click", checkForm, false);//calls checkPhone 
	for(var i=0;i<optSelect.length;i++){//event listener for each check box (calls for every check/uncheck)
		optSelect[i].addEventListener("click", userOptions, false);
	}
	
}else if(subButton.attachEvent){//else attachEvent (<=IE8)
	subButton.attachEvent("onclick", checkForm, false);//same but for legacy 
	for(var i=0;i<optSelect.length;i++){
		optSelect[i].attachEvent("onclick", userOptions, false);
	}
}



/*in hindsight if I were to redo this I would create an array for the form vars and just loop through using the index number to through/rest errors. I really wanted to use the html5 validation but couldn't figure out how to keep it from submitting my form when my js hadn't validated it. Also couldn't succesfully use the remove method so that the red backgrounds would just return to default. Not very DRY hardcoding the css. maybe I should be adding/removing classes to the elements and then changing those in the .css file.*/ 