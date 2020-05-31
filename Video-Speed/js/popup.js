function updateSpeed(speed = "--") {
    $("#speed").text(speed);
    chrome.storage.local.set({
        speed: speed
    });
}


$(function () {
    chrome.storage.local.get("speed", function (result) {
        if (result.speed == null)
            result.speed = "1";
        updateSpeed(result.speed);
    });

    $("#fast").click(function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.storage.local.get('speed', function(result) {
                var newSpeed = result.speed + 0.25;
                updateSpeed(newSpeed);
                chrome.tabs.sendMessage(tabs[0].id, { message: "CHANGE_SPEED" });
            });
        });
    });

    $("#reset").click(function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var newSpeed = 1;
            updateSpeed(newSpeed);
            chrome.tabs.sendMessage(tabs[0].id, { message: "CHANGE_SPEED" });
        });
    });

    $("#slow").click(function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.storage.local.get('speed', function(result) {
                var newSpeed = result.speed - 0.25;
                updateSpeed(newSpeed);
                chrome.tabs.sendMessage(tabs[0].id, { message: "CHANGE_SPEED" });
            });
        });
    })
  });