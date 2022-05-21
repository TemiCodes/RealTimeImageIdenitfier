function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier("MobileNet",modelloaded)
}
function draw() {
  image(video, 0,0,300,300)
  classifier.classify(video,gotresults)
  
}
function modelloaded() {
  console.log("ML5 Loaded")
}
previousres=""
function gotresults(error,results) {
  if (error) {
    console.error(error)
  } else {
    if ((results[0].confidence > 0) && (previousres != results[0].label)) {
      console.log(results)
     document.getElementById("Opject_spam").innerHTML = results[0].label
     document.getElementById("Ac_Span").innerHTML = results[0].confidence.toFixed(3)
     previousres=results[0].label
     var synth = window.speechSynthesis
     speakdata="the object is " +results[0].label
     var utterthis =new SpeechSynthesisUtterance(speakdata)
     synth.speak(utterthis)
    }
  }
}