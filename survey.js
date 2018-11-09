/*************************** survey.js ***********************************
   created : 9/25/2018
   author  : Zachary Harbison
   site    : The car repair logs |www.public.asu.edu/~zharbiso/GIT_417/survey.html
   class   : GIT 417 Fall A 
   
   Note    : This program demonstrates validation and error handling
******************************************************************************/


var validName = false;//shows that name has been validated
var nextQuest = 3;//passes the scene number to be shown to quest();
var userName = document.getElementById("userName");//user input for name survey.html
var firstName ="";//during validation this var gets the users first name
var lastName ="";//during validation this var gets the users last name
var anonym = document.getElementById("anonymous");//radio button option to be anonymous
var addMsg = document.getElementById("addMsg");//check box for user to toggle textarea for message
var userMsg = document.getElementById("userMsg");//textarea for message
var answers = ["","","",""];//holds user given answers

//array holding error message span elements (for displaying errors)
var asnsweErr = [document.getElementById("AnswErrMsg1"),document.getElementById("AnswErrMsg2"),document.getElementById("AnswErrMsg3"),document.getElementById("AnswErrMsg4"),document.getElementById("AnswErrMsg5")];
//array holding div elements
var scenes = [document.getElementById("scene1"),document.getElementById("scene2"),document.getElementById("scene3"),document.getElementById("scene4"),document.getElementById("scene5"),document.getElementById("scene6"),document.getElementById("scene7"),document.getElementById("scene8")];
//array holding scene buttons(didn't use getClass or type to make it easier to understand as I made changes)
var sceneBtn = [document.getElementById("startSurv"),document.getElementById("goTOScene4"),document.getElementById("goTOScene5"),document.getElementById("goTOScene6"),document.getElementById("goTOScene7"),document.getElementById("goTOScene8")];
//array holding radio button elements that give users answers
var quAndAnsw = [document.getElementById("q1a1"),document.getElementById("q1a2"),document.getElementById("q2a1"),document.getElementById("q2a2"),document.getElementById("q3a1"),document.getElementById("q3a2"),document.getElementById("q4a1"),document.getElementById("q4a2")];

//hides all scenes by setting display to none
function clearScene(){
    for(var i =0; i<scenes.length; i++){//for loop set to the length of the array
        scenes[i].style.display = "none";//element at array index "i" are set to display none
    }
}

//calls clearScene() and shows one scene (start of survey or the value of the button calling)
function setScene(){
    clearScene();//clears the view
    if(this.value){//if this.value == true (the button's value that called the function)
        scenes[this.value].style.display = "block";//displays the scene in the scenes array at the index equal to the value given by the button calling
    }else scenes[0].style.display = "block";//if a value wasn't given display the start of survey
    
}

//calls clearScene and shows one scene of the num that was passed (passed other function not click event)
function quest(num){
    clearScene();//clears view
    scenes[num].style.display = "block";//shows scene at the array index equal to the value passed to the function
}

//validates user given name (or anonym.) using try catch block
function checkName(){
    try{
        if(userName.value=="" && !anonym.checked){ throw "Please Enter Name Or Select Anonymous";//if no name or radio selected throw error
        }
        if(!userName.value=="" && anonym.checked){ //if both name and radio selected throw error
        anonym.checked = false;//uncheck anonymous radio button (defaulting to the name given)
        throw "You Entered A Name And Selected Anonymous, Please Select One Only";
        }
        if(anonym.checked){//user selected to be anonymous
            firstName = "Anonymous";//sets firstName to be Anonymous
            validName = true;//indicates to program that user name has been validated
        }
        if(!validName){//if name hasn't been validated (and isn't one of the above errors) 
            hasSpace(userName.value);//pass userName string to hasSpace to be validated
        }
        if(!validName){//if name still isn't validName (meaning hasSpace didn't validate name and not anonymous)
        document.getElementById("questName").innerHTML = "First And Last Please";//changes main h1 to ask for first and last (user didn't use spaces in name)
        throw "example: John Smith"//throw error (example in error span because h1 was changed to ask user)
        }
        if(validName){//if name is valid (user given with first and last or anonymous)
            quest(2);//call quest passing the number 2 (the 3rd index of array scenes will be shown)
        }
    }
    catch(err){//catch any error given by try block
        document.getElementById("errMsg").innerHTML = err;//display error message
        userName.style.backgroundColor = "#cc0000";//set input area background to red
        validName = false;//resets validation (probably can be removed)
    }
}

//checks user given name for spaces to indicate that first and last names were given and separates names in to two vars
function hasSpace(name){
    var space = false;//starts function with the space flag false
    for(var i=0; i<name.length; i++){//loops through name string
        if(i>0 && i<name.length-1 && name[i] == " "){//excluding the first and last char checks if any chars are spaces
            space = true;//if a space char is found sets space to true
        }
        if(space){//if space equals true then loop index should be starting last name
            lastName+= name.charAt(i);//adds the char at the loop's index of name to lastName
        }else{//if space hasn't been found then should be first name (or invalid name)
            firstName+= name.charAt(i);//adds the char at the loop's index of name to firstName
        }
    }
    if(space){//if space is true (above loop found a space in the string)
        validName = true;//name is valid
    }else{//no space found name not valid
        firstName="";//clears whatever was added during search
        lastName="";//should be empty if no space was found but covering bases (probably can be removed)
    }
}

//toggles textare for user to give message
function addUserMsg(){
    if(addMsg.checked){//if checkbox is checked
        userMsg.style.display = "block";//display textare
    }else userMsg.style.display = "none";//if not or unchecked hide textarea
}

//checks the user given answers for errors and sets validated answers to answers array then passes number for next scene
function checkAns(){
    try{
        if(scene3.style.display == "block"){//if scene 3 is showing (question #1)
            if(quAndAnsw[0].checked){//if first radio is checked
                answers[0] = quAndAnsw[0].value;//sets answers at given index to value of radio
            }else if(quAndAnsw[1].checked){//if 2nd radio is checked
                answers[0] = quAndAnsw[1].value;//sets answers at given index to value of radio
            }else{//neither radio option were selected before clicking enter
                asnsweErr[0].innerHTML="please make a selection";//displays message
                throw 2;//throws number (catch block uses this number to call quest() to reload scene rather than calling the next 
            }
            nextQuest = 3;//if valid answer was given sets nextQuest to value of next scene index in scenes array (quest called at end of try block)
        }
        if(scene4.style.display == "block"){//if scene 4 is showing (question #2)
            if(quAndAnsw[2].checked){
                answers[1] = quAndAnsw[2].value;
            }else if(quAndAnsw[3].checked){
                answers[1] = quAndAnsw[3].value;
            }else{
                asnsweErr[1].innerHTML="please make a selection";
                throw 3;
            }
            nextQuest = 4;
        }
        if(scene5.style.display == "block"){//if scene 5 is showing (question #3)
            if(quAndAnsw[4].checked){
                answers[2] = quAndAnsw[4].value;
            }else if(quAndAnsw[5].checked){
                answers[2] = quAndAnsw[5].value;
            }else{
                asnsweErr[2].innerHTML="please make a selection";
                throw 4;
            }
            nextQuest = 5;
        }
        if(scene6.style.display == "block"){//if scene 6 is showing (question #4)
            if(quAndAnsw[6].checked){
                answers[3] = quAndAnsw[6].value;
            }else if(quAndAnsw[7].checked){
                answers[3] = quAndAnsw[7].value;
            }else{
                asnsweErr[3].innerHTML="please make a selection";
                throw 5;
            }
            reviewAnsw();//if valid answer given calls reviewAnsw to show answers with next scene
            nextQuest = 6;
        }

        quest(nextQuest);//passes index number for next scene after valid answer has been given
    }catch(err){//if error was thrown
        quest(err);//passes error number to reload the scene
    }
}   

//shows user their input to review (wanted to have check boxes that would change the queue order to let user fix only selected answers, ran out of time)
function reviewAnsw(){
        document.getElementById("yourName").innerHTML = firstName +" "+ lastName;//displays first name with space and last name in span with id yourName
        document.getElementById("yourQ1").innerHTML = answers[0];//displays users answer to question #1
        document.getElementById("yourQ2").innerHTML = answers[1];//displays users answer to question #2
        document.getElementById("yourQ3").innerHTML = answers[2];//displays users answer to question #3
        document.getElementById("yourQ4").innerHTML = answers[3];//displays users answer to question #4
}

//validates if user message check box was selected and message given before submitting 
function sub(){
    try{
        if(addMsg.checked && userMsg.value==""){//if selected but no message given
        throw "enter a message or unchecked this selection"//throw error advising user
        }
        asnsweErr[4].innerHTML = "";//clears error message on scene reload if valid
        quest(7);//if valid submit (nothing to submit to, instead display success scene)
    }catch(err){//catches error given
        asnsweErr[4].innerHTML = err;//displays error to user
    }
}

//clears form if start over button clicked (doesn't work well on firefox)
function srtOver(){
    document.getElementById("userName").innerHTML = "";//clears userName input
    firstName ="";//clears previously validated first name
    lastName ="";//clears previously validated last name
    anonym.checked = false;//unchecks anonymous radio
    for(var i=0;i<quAndAnsw.length;i++){//loop unchecks answers radios
        quAndAnsw[i].checked = false;
    }
    location.reload();//refreshes page
}
//adds a event listener for the buttons
if(sceneBtn[0].addEventListener){//if true then addEventListener
    for(var i =0; i<sceneBtn.length; i++){//array used to partially limit typing out document.getElementById
        if(i>0 && i<5){//index 1-4 call checkAns() 
            sceneBtn[i].addEventListener("click", checkAns, false);    
        }else if(i==5){//index 5
            sceneBtn[i].addEventListener("click", sub, false); //calls sub()
        }else{//index 0
            sceneBtn[i].addEventListener("click", setScene, false);//starts the survey
        }
    }
    document.getElementById("goTOScene3").addEventListener("click", checkName, false); //had errors with old setup, pulled out of array to be verbose checks user name
    document.getElementById("srtOver").addEventListener("click", srtOver, false);//start over button to reset form
    addMsg.addEventListener("click", addUserMsg, false);//calls addUserMsg when user message is toggled 
}else if(sceneBtn[0].attachEvent){//else attachEvent (<=IE8)
	for(var i =0; i<sceneBtn.length; i++){
        if(i>0 && i<5){
            sceneBtn[i].attachEvent("onclick", checkAns, false);//same but for legacy 
        }else if(i==5){
            sceneBtn[i].attachEvent("onclick", sub, false);//same but for legacy 
        }else{
            sceneBtn[i].attachEvent("onclick", setScene, false);//same but for legacy 
        }
    }
    document.getElementById("goTOScene3").attachEvent("onclick", checkName, false);
    document.getElementById("srtOver").attachEvent("onclick", srtOver, false);
    addMsg.attachEvent("onclick", addUserMsg, false);
}


