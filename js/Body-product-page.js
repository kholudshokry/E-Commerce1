var addReview = document.getElementById("addReview");
var typeComment = document.getElementById("typeComment");
var sendComment = document.getElementById("sendComment");
var typeComment = document.getElementById("typeComment"); // hold text area..
var validateComment = document.getElementById("validateComment");  // small tag cuz if user wrote nothing
var displayReviews = document.getElementById("displayReviews"); // hold button to display comments from localstorage;
var displayEmptyParagra = document.getElementById("displayEmptyParagra"); //hold paragraph for display local storage is empty;
var singleCommentHolder = document.getElementById("singleCommentHolder");
var commentsContainer ;  //array to store comments in local 
// var getComments =[]; // array to get comments from local storage
addReview.addEventListener("click" ,displayArea);

if (localStorage.getItem("body") == null)
{
   bodycontainer = [];
   typeComment.style.display = "none";
   sendComment.style.display = "none" ;
   displayEmptyParagra.style.display = "block" ;
   displayEmptyParagra.innerHTML = "there is any reviews YET!";
   console.log("fadya")
}
else
{
    bodycontainer= JSON.parse(localStorage.getItem("body"));
   console.log(bodycontainer[2])
   typeComment.style.display = "none";
   sendComment.style.display = "none" ;
   makeSureIfLSEmpty();

}
function displayArea() 
{  
   typeComment.style.display = "block";
   sendComment.style.display = "block";
   displayEmptyParagra.style.display = "none" ;

  
}
function takeComments() 
{ 
   if (typeComment.value == "")
   {       
       validateComment.style.display = "block";
   }
   else
   {        
       validateComment.style.display = "block";
       validateComment.innerHTML = "your review send thankyou!";
       var valueOfComment = 
       {
        body : typeComment.value
       }
       bodycontainer.push(valueOfComment);
       localStorage.setItem("body" ,JSON.stringify(bodycontainer ));
       makeSureIfLSEmpty();
       clearTextArea();

   }
 }

 sendComment.addEventListener("click" , takeComments)
 function clearTextArea()
  {  
   typeComment.value = "";

 }
   
 function makeSureIfLSEmpty()
  { 
         var temp = "";
         for (var i = 0 ; i < bodycontainer.length ; i++)
         {
          temp += `<div class="col-md-3">
          <img src="../imges/bbbb.jpg" class="w-100 my-2" >
           </div>
           <div  class="col-md-9">             
           <span class="my-2 displayEmpty">`+bodycontainer[i].body+`</span>
           </div>`;
           
         }   
         singleCommentHolder.innerHTML = temp;
       //   console.log(commentsContainer)

      
 };
 //            temp += `<p class="my-2">`+commentsContainer[i].comment+`</p>`



//img shange ----------------------------------------------------------//
var image=document.getElementById("zoom_03");


function hover(image) {
    image.setAttribute('src', 'imges/Body Care img/olaypr2.PNG');
  }
  
  function unhover(image) {
    image.setAttribute('src', 'imges/Body Care img/best3.PNG');
  }
