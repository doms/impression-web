// local files are weird, so you have to convert them to get them to work

function processImage() {
  // Get new key: https://azure.microsoft.com/en-gb/try/cognitive-services/
  var subscriptionKey = "2d23052d48564cf19b54bb302da30626";
  var uriBase =
    "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze";

  // Request parameters.
  var params = {
    visualFeatures: "Description",
    details: "",
    language: "en"
  };

  var dataInBase64;
  var dataInBinary;

  var sourceImageUrl = document.getElementById("url").value;
  document.querySelector("#sourceImage").src = sourceImageUrl;

  // check if image was uploaded or if from URL
  if (sourceImageUrl.indexOf("C:") > -1) {
    dataInBase64 = getBase64Image(
      $(".results")
        .nextAll("img")
        .first()
    );

    console.log("DATA IN BASE64:", dataInBase64);

    // get raw binary from encoded image
    dataInBinary = binEncode(dataInBase64);
  } else {
    // something
  }

  /*
  Input requirements:

  Supported image formats: JPEG, PNG, GIF, BMP.
  Image file size must be less than 4MB.
  Image dimensions must be at least 50 x 50.
  */

  console.log("sourceImageUrl:", sourceImageUrl);

  // dynamically create request header
  var headerType =
    sourceImageUrl.indexOf("data:image") > -1
      ? "multipart/form-data"
      : "application/json";
  console.log("headerType: ", headerType);

  // TODO: set data type depending on header
  var inputType =
    headerType === "multipart/form-data"
      ? dataInBinary
      : '{"url": ' + '"' + sourceImageUrl + '"}';

  // Perform the REST API call.
  $.ajax({
    url: uriBase + "?" + $.param(params),

    // Request headers.
    beforeSend: function(xhrObj) {
      xhrObj.setRequestHeader("Content-Type", headerType);
      xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
    },

    type: "POST",

    // Request body.
    data: inputType
  })
    .done(function(data) {
      // Parse info we want from results
      var results = JSON.parse(JSON.stringify(data, null, 2));

      console.log(results.description);

      // text description
      $(".results").append(
        "<h1 id='modal-results'>" +
          "I am " +
          (results.description.captions[0].confidence * 100).toFixed(1) +
          "% sure that this is " +
          results.description.captions[0].text +
          "</h1>"
      );
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
}
