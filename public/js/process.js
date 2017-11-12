const microsoftApiKey = "9e1166d642c946c182e75b8cc4cf5dda";
const googleApiKey = "AIzaSyAegC2YEg7TclrJD_sDnJCSSyNjihnf93A";

function compareResults(microsoft, google) {
  // parse results
  var microsoftResults = JSON.parse(JSON.stringify(microsoft, null, 2));
  var googleResults = JSON.parse(JSON.stringify(google, null, 2));

  console.log("TSETSEFSDFSDFSFSDF");
  console.log(
    "microsoft:",
    microsoftResults.description.captions[0].confidence * 100
  );
  console.log(
    "google:",
    googleResults.responses[0].labelAnnotations[0].score * 100
  );

  // return results object of higher accuracy score
  return microsoftResults.description.captions[0].confidence * 100 >
    googleResults.responses[0].labelAnnotations[0].score * 100
    ? microsoft
    : google;
}

function processImage() {
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

  // Microsoft API call.
  console.log("FIRST AJAX CALL STARTING");
  $.ajax({
    url: uriBase + "?" + $.param(params),

    // Request headers.
    beforeSend: function(xhrObj) {
      xhrObj.setRequestHeader("Content-Type", headerType);
      xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", microsoftApiKey);
    },

    type: "POST",
    processData: false,
    data: inputType,
    success: function(data) {
      // Parse info to use for comparison
      var microsoftResults = JSON.parse(JSON.stringify(data, null, 2));

      // prepare request object
      var request = {};
      request["requests"] = [];

      // URL's and local files requests are structured differently
      // https://cloud.google.com/vision/docs/request#providing_the_image
      if (sourceImageUrl !== "") {
        request["requests"].push({
          image: {
            source: {
              imageUri: sourceImageUrl
            }
          },
          features: [
            {
              type: "LABEL_DETECTION"
            }
          ]
        });
      } else {
        // remove
        var formattedInput = preview.replace(/(.*,)/g, "");
        console.log("Formatted:", formattedInput);
        request["requests"].push({
          image: {
            content: formattedInput
          },
          features: [
            {
              type: "LABEL_DETECTION",
              maxResults: 10
            }
          ]
        });
      }
      console.log("FIRST AJAX CALL ENDING");
      // Google API call

      console.log("SECOND AJAX CALL STARTING");
      $.ajax({
        url: `https://vision.googleapis.com/v1/images:annotate?key=${googleApiKey}`,
        type: "POST",
        processData: false,
        data: request,
        success: function(data) {
          var googleResults = JSON.parse(JSON.stringify(data, null, 2));

          // get accurate results
          var accurateResults = compareResults(microsoftResults, googleResults);

          // microsoft
          try {
            $(".modal-body").append(
              "<h1 id='modal-results'>" +
                "I am " +
                (accurateResults.description.captions[0].confidence * 100
                ).toFixed(2) +
                "% sure that this is " +
                accurateResults.description.captions[0].text +
                "</h1>" +
                "<form action=/save method='post' id='submit-form' style='display: none;'>" +
                "<input type='text' name='url'>" +
                "<input type='text' name='confidence'>" +
                "<input type='text' name='text'>" +
                "<input type='text' name='tags'>" +
                "</form>"
            );

            // programmatically fill input form for /save
            $("input[name='url']").val = sourceImageUrl;
            $("input[name='confidence']").val = (results.description.captions[0]
              .confidence * 100
            ).toFixed(2);
            $("input[name='description']").val =
              results.description.captions[0].text;
            $("input[name='tags']").val = results.description.tags;
          } catch (error) {
            // Google had better results...
            $(".modal-body").append(
              "<h1 id='modal-results'>" +
                "I am " +
                (accurateResults.description.captions[0].confidence * 100
                ).toFixed(2) +
                "% sure that this is " +
                accurateResults.description.captions[0].text +
                "</h1>" +
                "<form action=/save method='post' id='submit-form' style='display: none;'>" +
                "<input type='text' name='url'>" +
                "<input type='text' name='confidence'>" +
                "<input type='text' name='text'>" +
                "<input type='text' name='tags'>" +
                "</form>"
            );

            // programmatically fill input form for /save
            $("input[name='url']").val = sourceImageUrl;
            $("input[name='confidence']").val = (results.responses
              .labelAnnotations[0].confidence * 100
            ).toFixed(2);
            $("input[name='description']").val =
              results.responses.labelAnnotations[0].description;
            $("input[name='tags']").val =
              results.responses.labelAnnotations[0].description;
          }

          $("#myModal").modal("show");

          console.log("SECOND AJAX CALL ENDING");
        }
      });
    }
  });

  // clear input
  document.getElementById("url").value = "";
}

/*
  Input requirements:

  Supported image formats: JPEG, PNG, GIF, BMP.
  Image file size must be less than 4MB.
  Image dimensions must be at least 50 x 50.
*/

// Cycle new API keys since they expire quickly :(
// https://azure.microsoft.com/en-gb/try/cognitive-services/
