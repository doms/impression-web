// /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load("particles-js", "assets/particlesjs-config.json", function() {
  console.info("[INFO] particles.js config loaded");
});

// get URI to of local file to send to API
function getDataUri(url) {
  var canvas = document.createElement("canvas");
  canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
  canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

  canvas.getContext("2d").drawImage(this, 0, 0);

  // Get raw image data
  // callback(
  //   canvas.toDataURL("image/png")
  //   // .replace(/^data:image\/(png|jpg);base64,/, "")
  // );
  return canvas.toDataURL("image/png");

  // ... or get as Data URI
  // callback(canvas.toDataURL("image/png"));
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
      element.change(function() {
        element
          .next(element)
          .find("input")
          .val(element.val());
      });
      $(this)
        .find("button.btn-choose")
        .click(function() {
          element.click();
        });
      $(this)
        .find("input")
        .css("cursor", "pointer");
      $(this)
        .find("input")
        .mousedown(function() {
          $(this)
            .parents(".input-file")
            .prev()
            .click();
          return false;
        });
      return element;
    }
  });
}

$(function() {
  bs_input_file();
});
