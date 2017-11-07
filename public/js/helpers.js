// /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load("particles-js", "../particlesjs-config.json", function() {
  console.info("particles.js config loaded");
});

function handle(e) {
  if (e.keyCode === 13) {
    processImage();
  }
  return false;
}

function previewFile() {
  var preview = document.getElementById("sourceImage");
  var fileType;

  var file = document.querySelector("input[type=file]").files[0];
  var reader = new FileReader();

  reader.addEventListener(
    "loadend",
    function() {
      preview.src = reader.result;

      // send to API to get analyzed
      processImage();
    },
    false
  );

  if (file) {
    fileType = file.type;
    reader.readAsDataURL(file);
  }
}

function makeBlob(dataURL) {
  var BASE64_MARKER = ";base64,";
  if (dataURL.indexOf(BASE64_MARKER) == -1) {
    var parts = dataURL.split(",");
    var contentType = parts[0].split(":")[1];
    var raw = decodeURIComponent(parts[1]);
    return new Blob([raw], { type: contentType });
  }

  var parts = dataURL.split(BASE64_MARKER);
  var contentType = parts[0].split(":")[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;

  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}

// handle file upload
function handleFileUpload() {
  $(".input-file").before(function() {
    if (
      !$(this)
        .prev()
        .hasClass("input-ghost")
    ) {
      var element = $(
        "<input type='file' accept='image/*' onchange='previewFile();' id='test' class='input-ghost' style='visibility:hidden; height:0'>"
      );
      element.attr("name", $(this).attr("name"));

      // link custom browse button to hidden one
      $(this)
        .find("button.btn-primary")
        .click(function() {
          element.click();
        });

      return element;
    }
  });
}

$(function() {
  handleFileUpload();
});

// handle modal
$(document).ready(function() {
  $(".signup").addClass("login-select");
  $(".tab").click(function() {
    var X = $(this).attr("id");

    if (X == "signup") {
      $("#login").removeClass("login-select");
      $("#signup").addClass("login-select");
      $("#loginbox").hide(300);
      $("#signupbox").show(300);
      $("#forgetbox").hide(300);
    } else {
      $("#signup").removeClass("login-select");
      $("#login").addClass("login-select");
      $("#signupbox").hide(300);
      $("#loginbox").show(300);
      $("#forgetbox").hide(300);
    }
  });

  $(".forgot-button").click(function() {
    $("#signupbox").hide(300);
    $("#loginbox").hide(300);
    $("#forgetbox").show(300);
  });
});

// Get the modal
var modal = document.getElementById("id01");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// launch demo
var demo = $("#demo");
demo.on("click", function() {
  $(this)
    .closest("form")
    .submit();
});

// save results to user
var submitForm = $("#save-results");
submitForm.on("click", function() {
  $("#submit-form").submit();
});
