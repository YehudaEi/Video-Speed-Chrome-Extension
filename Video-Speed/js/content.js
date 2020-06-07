chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var message = request.message;
    if (message == "CHANGE_SPEED") {
        chrome.storage.local.get('speed', function (result) {
            updateSpeed(result.speed);
        });
    }
    if (message == "INIT") {
        updateStorageToRealSpeed();
        sendResponse({ message: "DONE" });
    }
});

function updateSpeed(speed = "1") {
    videos = document.getElementsByTagName("video");
    for (var i = 0; i < videos.length; i++) {
        videos[i].playbackRate = speed;
    }
    audios = document.getElementsByTagName("audio");
    for (var i = 0; i < audios.length; i++) {
        audios[i].playbackRate = speed;
    }
}

function updateStorageToRealSpeed() {
    var playbackRate = document.getElementsByTagName("video")[0].playbackRate;
    chrome.storage.local.set({
        speed: playbackRate
    });
}
