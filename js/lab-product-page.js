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

 if (localStorage.getItem("comment") == null)
 {
    commentsContainer = [];
    typeComment.style.display = "none";
    sendComment.style.display = "none" ;
    displayEmptyParagra.style.display = "block" ;
    displayEmptyParagra.innerHTML = "there is any reviews YET!";
    console.log("fadya")
 }
 else
 {
    commentsContainer = JSON.parse(localStorage.getItem("comment"));
    console.log(commentsContainer[2])
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
            comment : typeComment.value
        }
        commentsContainer.push(valueOfComment);
        localStorage.setItem("comment" ,JSON.stringify(commentsContainer ));
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
          for (var i = 0 ; i < commentsContainer.length ; i++)
          {
           temp += `<div class="col-md-3">
           <img src="../imges/bbbb.jpg" class="w-100 my-2" >
            </div>
            <div  class="col-md-9">             
            <span class="my-2 displayEmpty">`+commentsContainer[i].comment+`</span>
            </div>`;
            
          }   
          singleCommentHolder.innerHTML = temp;
        //   console.log(commentsContainer)

       
  };
  //            temp += `<p class="my-2">`+commentsContainer[i].comment+`</p>`



//img shange ----------------------------------------------------------//
var image=document.getElementById("zoom_03");


function hover(image) {
    image.setAttribute('src', 'imges/laptops/dell1.jpg');
  }
  
  function unhover(image) {
    image.setAttribute('src', 'imges/laptops/dell4.jpg');
  }
