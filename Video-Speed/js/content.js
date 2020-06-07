chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var message = request.message;
    if(message == "CHANGE_SPEED"){
        chrome.storage.local.get('speed', function(result) {
            updateSpeed(result.speed);
        });
    }
});

function updateSpeed(speed = "1") {
    //console.log("Updated Speed: " + speed);
    videos = document.getElementsByTagName("video");
    for(var i = 0; i < videos.length; i++){
        videos[i].playbackRate = speed;
    }
    audios = document.getElementsByTagName("audio");
    for(var i = 0; i < audios.length; i++){
        audios[i].playbackRate = speed;
    }
}
