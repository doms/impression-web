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

function getBase64Image(url) {
  var img = new Image();

  img.setAttribute("crossOrigin", "anonymous");

  img.onload = function() {
    var canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(this, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    alert(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
  };

  img.src = url;
}

// base64 -> raw binary (because Microsoft is childish)
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
  console.log("binArray: ", binArray);
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
        "<input type='file' id='test' class='input-ghost' style='visibility:hidden; height:0'>"
      );
      element.attr("name", $(this).attr("name"));

      // update the input text when we upload an image
      element.change(function() {
        element
          .next(element)
          .find("input")
          .val(element.val());
      });

      // this allows for the custom image upload button rather than the gross "choose file" button
      $(this)
        .find("button.btn-choose")
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
