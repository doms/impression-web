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

  // Display the image.
  var sourceImageUrl = getDataUri(document.getElementById("test").value);
  document.querySelector("#sourceImage").src = sourceImageUrl;

  console.warn(sourceImageUrl);
  /*
  Input requirements:

  Supported image formats: JPEG, PNG, GIF, BMP.
  Image file size must be less than 4MB.
  Image dimensions must be at least 50 x 50.
  */

  // Perform the REST API call.
  $.ajax({
    url: uriBase + "?" + $.param(params),

    // Request headers.
    beforeSend: function(xhrObj) {
      xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
      xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
    },

    type: "POST",

    // Request body.
    data: '{"url": ' + '"' + sourceImageUrl + '"}'
  })
    .done(function(data) {
      // Parse info we want from results
      var results = JSON.parse(JSON.stringify(data, null, 2));

      // console.log(results.description);

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
