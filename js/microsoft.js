/*
  Input requirements:

  Supported image formats: JPEG, PNG, GIF, BMP.
  Image file size must be less than 4MB.
  Image dimensions must be at least 50 x 50.
*/

function processImage() {
  // Get new key: https://azure.microsoft.com/en-gb/try/cognitive-services/
  var subscriptionKey = "9e1166d642c946c182e75b8cc4cf5dda";
  var uriBase =
    "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze";

  // Request parameters.
  var params = {
    visualFeatures: "Description",
    details: "",
    language: "en"
  };

  var preview = document.getElementById("sourceImage").src;
  var sourceImageUrl = document.getElementById("url").value;

  console.log("preview.src:", preview);

  // add photo to img tag if from URL
  if (sourceImageUrl) {
    document.querySelector("#sourceImage").src = sourceImageUrl;
  }

  // dynamically create request header
  var headerType =
    sourceImageUrl === "" ? "application/octet-stream" : "application/json";
  console.log("headerType: ", headerType);

  // set data to send depending on headerType
  var inputType =
    headerType === "application/octet-stream"
      ? makeBlob(preview)
      : '{"url": ' + '"' + sourceImageUrl + '"}';
  console.log("inputType:", inputType);

  // Perform the REST API call.
  $.ajax({
    url: uriBase + "?" + $.param(params),

    // Request headers.
    beforeSend: function(xhrObj) {
      xhrObj.setRequestHeader("Content-Type", headerType);
      xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
    },

    type: "POST",

    processData: false,

    // Request body.
    data: inputType
  })
    .done(function(data) {
      // $("div.modal-backdrop").remove();

      // Parse info we want from results
      var results = JSON.parse(JSON.stringify(data, null, 2));

      console.log(results.description);

      // text description
      $(".modal-body").append(
        "<h1 id='modal-results'>" +
          "I am " +
          (results.description.captions[0].confidence * 100).toFixed(1) +
          "% sure that this is " +
          results.description.captions[0].text +
          "</h1>"
      );

      // $(".modal-results").remove("h1");
      $("#myModal").modal("show");
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      // Display error message.
      var errorString =
        errorThrown === ""
          ? "Error. "
          : errorThrown + " (" + jqXHR.status + "): ";
      errorString +=
        jqXHR.responseText === ""
          ? ""
          : jQuery.parseJSON(jqXHR.responseText).message;
      alert(errorString);
    });

  // clear input
  document.getElementById("url").value = "";
}
