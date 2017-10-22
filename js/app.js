// /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load("particles-js", "assets/particlesjs-config.json", function() {
  console.info("[INFO] particles.js config loaded");
});

function handle(e) {
  if (e.keyCode === 13) {
    processImage();
  }
  return false;
}

function previewFile() {
  var preview = document.getElementById("img-preview");
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

// https://stackoverflow.com/a/34064793
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
function bs_input_file() {
  $(".input-file").before(function() {
    if (
      !$(this)
        .prev()
        .hasClass("input-ghost")
    ) {
      var element = $(
        "<input type='file' onchange='previewFile();' id='test' class='input-ghost' style='visibility:hidden; height:0'>"
      );
      element.attr("name", $(this).attr("name"));

      // this allows for the custom image upload button rather than the gross "choose file" button
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
  bs_input_file();
});
