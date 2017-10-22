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

  var file = document.querySelector("input[type=file]").files[0];
  var reader = new FileReader();

  reader.addEventListener(
    "load",
    function() {
      preview.src = reader.result;

      // send to API to get analyzed
      processImage();
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}

// base64 -> raw binary
function binEncode(data) {
  var binArray = [];
  var datEncode = "";

  for (i = 0; i < data.length; i++) {
    binArray.push(data[i].charCodeAt(0).toString(2));
  }
  for (j = 0; j < binArray.length; j++) {
    var pad = padding_left(binArray[j], "0", 8);
    datEncode += pad + " ";
  }
  function padding_left(s, c, n) {
    if (!s || !c || s.length >= n) {
      return s;
    }
    var max = (n - s.length) / c.length;
    for (var i = 0; i < max; i++) {
      s = c + s;
    }
    return s;
  }
  return binArray.join("");
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
