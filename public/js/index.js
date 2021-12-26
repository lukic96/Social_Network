// Button for scroll on top

var scrollArrowTop = $("#up");

window.onscroll = function () {
  scrollingFunction();
}

function scrollingFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollArrowTop.css("display", "block");
  } else {
    scrollArrowTop.css("display", "none");
  }
}

scrollArrowTop.click(function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

// LOGIN ALERT

// $(document).ready(function () {
//   var isAlert = "<%= isAlert %>";
  
//   if (isAlert === true) {
//     var alertTitle = "<%= alertTitle %>";

//     console.log(alertTitle);
//     alert(alertTitle);
//   }
// })


// $(document).ready(function() {
//   if(response == "user exists") {
//     alert("The user already exists");
//   }
// });

// $("#login").click(function() {
//   var username = $("#username").val();
//   var password = $("#password").val();
//   $.ajax({
//     type: "POST",
//     url: "/login",
//     dataType: "json",
//     data: {
//       loginUser: username,
//       loginPassword: password
//     },
//     success: function(data) {
//       // alert(data.newErr);
//       $("#bla")(data.newErr); // testing
//     }
//   })
// });

// Comment display text

$("#comment").click(function() {
  $("#commentForm").toggleClass("d-none");
});

// Like & Dislike animation

$("#like").click(function() {
  $(this).addClass("hvr-push");
  setTimeout(function () {
    $("#like").removeClass("hvr-push");
}, 300);
});

$("#dislike").click(function() {
  $(this).addClass("hvr-push");
  setTimeout(function () {
    $("#dislike").removeClass("hvr-push");
}, 300);
});

// Like & Dislike value sending

$("#like").click(function() {
  let lvalue = $(this).data("value");
  $.ajax({
    type: "POST",
    url: "/like",
    dataType: "json",
    data: {
      lvalue: lvalue
    },
    success: function(data) {
      $("#numLikes").html(data.lvalueBack);
    }
  });
});

$("#dislike").click(function() {
  let dvalue = $(this).data("value");
  $.ajax({
    type: "POST",
    url: "/dislike",
    dataType: "json",
    data: {
      dvalue: dvalue
    },
    success: function(data) {
      $("#numDislikes").html(data.dvalueBack);
    }
  });
});



