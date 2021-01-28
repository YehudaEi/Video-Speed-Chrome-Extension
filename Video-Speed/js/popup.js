function updateStorageSpeed(speed = "--") {
    $("#speed").text(speed);
    chrome.storage.local.set({
        speed: speed
    });
}

function validSpeed(speed) {
    if (speed > 50 || speed < 0.25)
        return false;
    return true;
}

function showError(message) {
    document.getElementById('error').innerHTML = message;
}

function hideError() {
    document.getElementById('error').innerHTML = "";
}

function updateSpeed(newSpeed) {
    if (!validSpeed(newSpeed))
        showError("Invalid Speed (try change to " + newSpeed + ")");
    else {
        hideError();
        updateStorageSpeed(newSpeed);
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { message: "CHANGE_SPEED" });
        });
    }
}

$(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { message: "INIT" }, function (response) {
            chrome.storage.local.get("speed", function (result) {
                if (result.speed == undefined)
                    result.speed = 1;
                updateSpeed(result.speed);
            });
        });
    });

    $("#very_fast").click(function () {
        chrome.storage.local.get('speed', function (result) {
            var newSpeed = result.speed + 1;
            updateSpeed(newSpeed);
        });
    });
	
    $("#fast").click(function () {
        chrome.storage.local.get('speed', function (result) {
            var newSpeed = result.speed + 0.25;
            updateSpeed(newSpeed);
        });
    });

    $("#reset").click(function () {
        var newSpeed = 1;
        updateSpeed(newSpeed);
    });

    $("#slow").click(function () {
        chrome.storage.local.get('speed', function (result) {
            var newSpeed = result.speed - 0.25;
            updateSpeed(newSpeed);
        });
    })
	
    $("#very_slow").click(function () {
        chrome.storage.local.get('speed', function (result) {
            var newSpeed = result.speed - 1;
            updateSpeed(newSpeed);
        });
    });
});