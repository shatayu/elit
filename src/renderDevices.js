let urlencode = require("urlencode");

export function getCoordinates(name, displayName) {
    return firebase.database().ref("locations/" + name + "/").once("value")
        .then((snapshot) => {
            let data = snapshot.val();
            if (data == null) {
                return;
            }
            let keyCount = Object.keys(data).length;

            if (keyCount > 0) {
                let gotCurrentLocation = false;
                for (let key in data) {
                    if (gotCurrentLocation) {
                        return;
                    }

                    if (!gotCurrentLocation && data.hasOwnProperty(key)) {
                        let deviceData = data[key];
                        if (deviceData != null) {
                            console.log(deviceData);
                            let currentLatitude = parseFloat(deviceData["latitude"]);
                            let currentLongitude = parseFloat(deviceData["longitude"]);
                            let currentAccuracy = parseFloat(deviceData["accuracy"]);
                            let result = {
                                name: name,
                                lat: currentLatitude,
                                lng: currentLongitude,
                                accuracy: currentAccuracy,
                                displayName: displayName
                            };
                            return result;
                        }

                        gotCurrentLocation = true;
                    }
                }
            }
        })
}

export function makeAlerts(name, displayName, container) {
    firebase.database().ref("locations/" + name + "/").once("value")
        .then((snapshot) => {
            let data = snapshot.val();
            if (data == null) {
                return;
            }

            let keyCount = Object.keys(data).length;

            if (keyCount > 0) {
                for (let key in data) {
                    if (madeDiv) {
                        return;
                    }

                    let madeDiv = false;
                    if (!madeDiv && data.hasOwnProperty(key)) {
                        console.log("test");
                        let deviceData = data[key];

                        if (deviceData != null) {
                            let currentLatitude = parseFloat(deviceData["latitude"]);
                            let currentLongitude = parseFloat(deviceData["longitude"]);

                            let alertContainer = document.createElement("div");
                            alertContainer.classList.add("alertContainer");

                            alertContainer.innerHTML = "<div class='containerName' data-displayname=" + urlencode(displayName) + " data-lat=" + currentLatitude + " data-long=" + currentLongitude + ">"
                                + "<div class='alertName'>" + displayName + "</div>"
                                + "<textarea class='textAlert alert' placeholder='TEXT'></textarea><br />"
                                + "<textarea class='emailAlert alert' placeholder='EMAIL'></textarea>"
                                + "</div>";

                            container.append(alertContainer);
                            madeDiv = true;
                        }
                    }
                }
            }
        })
}