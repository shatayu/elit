let deviceListHandler = require("./deviceList");
let deviceList = require("./getDevices");
let renderDevices = require("./renderDevices");

let axios = require("axios");
let queryString = require("query-string");
let urlencode = require("urlencode");

// deviceListHandler.handle();


// Initialize and add the map
let provider = new firebase.auth.GoogleAuthProvider();

// let currentUser = firebase.auth().currentUser;
let signInButton = document.getElementById("signin");

document.getElementById("signin").addEventListener("click", () => {
    firebase.auth().signInWithPopup(provider).then(async (result) => {
        /*

            <div id="addDevices">
                <div id="addDeviceLabel">Enter a new device serial ID here</div>
                <input type="text" id="addDeviceText" />
                <div id="addDeviceButton" style="background-color: cyan">Add new device</div>
            </div>

            <div id="map"></div>
        */
        // addDevices.style.visibility = "visible";
        // mapDiv.style.visibility = "visible";
        // 
        // This gives you a Google Access Token. You can use it to access the Google API.
        let container = document.createElement("div");
        container.id = "container";
        document.getElementById("body").append(container);


        let mapDiv = document.createElement("div");
        mapDiv.id = "map";

        container.append(mapDiv);

        let subcontainer = document.createElement("div");
        subcontainer.id = "subcontainer";
        container.append(subcontainer);


        let addDevices = document.createElement("div");
        addDevices.id = "addDevices";

        addDevices.innerHTML = ''
            + '<textarea id="addDeviceText" placeholder="Enter a serial code for a new device here"></textarea>'
            // + '<div class="addDeviceLabel">Enter a new name for a new device here</div>'
            + '<textarea id="addDeviceNameText" placeholder="Enter a new name for a new device here"></textarea>'
            + '<div id="addDeviceButton" style="background-color: cyan">Add new device</div>';

        subcontainer.append(addDevices);

        let alertsDiv = document.createElement("div");
        alertsDiv.id = "alertsContainer";
        subcontainer.append(alertsDiv);

        signInButton.style.display = "none";

        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // let refreshInterval = 30 * 1000;
        // setInterval(async () => {

        // }, refreshInterval);

        let devices = await deviceList.getDevices(user.uid);

        let coordinatePromises = [];
        for (let i = 0; i < devices.length; ++i) {
            let potentialCoordinates = renderDevices.getCoordinates(devices[i].name, devices[i].displayName);
            coordinatePromises.push(potentialCoordinates);
        }

        let coordinates = await Promise.all(coordinatePromises);

        let map;

        let foundFirstCoordinate = false;
        console.log("coordinates.length: " + coordinates.length);
        for (let i = 0; i < coordinates.length; ++i) {
            if (coordinates[i] != undefined) {
                if (!foundFirstCoordinate) {
                    console.log("not undefined");
                    renderDevices.makeAlerts(coordinates[i].name, coordinates[i].displayName, alertsDiv);

                    map = new google.maps.Map(
                        document.getElementById('map'), { zoom: 11, center: coordinates[i] });
                    foundFirstCoordinate = true;
                }

                let marker = new google.maps.Marker({ position: coordinates[i], map: map, title: coordinates[i].displayName })

                let circle = new google.maps.Circle({
                    map: map,
                    radius: coordinates[i].accuracy,
                    center: coordinates[i],
                    fillColor: "#AA0000"
                });
            }
        }



        document.getElementById("addDeviceButton").addEventListener("click", () => {
            registerDevice(user);
        })



    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
})

function registerDevice(user) {
    let textbox = document.getElementById("addDeviceText");
    let deviceName = textbox.value;

    let displayNameBox = document.getElementById("addDeviceNameText");
    let displayName = displayNameBox.value;

    if (deviceName.length > 0) {
        let key = firebase.database().ref("users/" + user.uid + "/devices").push().key;
        firebase.database().ref("users/" + user.uid + "/devices/" + key).update({
            name: deviceName,
            displayName: displayName
        });
    }

    textbox.innerHTML = "";
    displayNameBox.innerHTML = "";
}

// email/text alerts

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function validatePhone(p) {
    var phoneRe = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    var digits = p.replace(/\D/g, "");
    return phoneRe.test(digits);
}

let sentText = false;
let sentEmail = false;
setInterval(() => {
    let emails = document.getElementsByClassName("emailAlert");

    for (let i = 0; i < emails.length; ++i) {
        let element = emails[i];
        let email = element.value;
        console.log(email);

        let parent = element.parentNode;
        let latitude = parent.dataset.lat;
        let longitude = parent.dataset.long;
        let displayName = urlencode.decode(parent.dataset.displayname);

        // sendgrid email api key: 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
        let body = urlencode("View " + displayName + " at https://www.google.com/maps/place/" +
            latitude + "," + longitude);

        // send the email a message
        if (validateEmail(email) && !sentEmail) {


            console.log(latitude + ", " + longitude);
            console.log("View " + displayName + " at https://www.google.com/maps/place/" +
                latitude + "," + longitude);


            axios.post(urlText);

            // send an email
            let urlEmail = "https://eggshell-llama-7225.twil.io/email?to=" + email + "&subject=" + urlencode("Location of " + displayName) + "&body=" + body;
            console.log(urlEmail);
            axios.post(urlEmail);
            sentEmail = true;
        }
    }

    let phones = document.getElementsByClassName("textAlert");

    for (let i = 0; i < phones.length; ++i) {
        let element = phones[i];
        let phone = element.value;
        console.log(phone);

        let parent = element.parentNode;
        let latitude = parent.dataset.lat;
        let longitude = parent.dataset.long;
        let displayName = urlencode.decode(parent.dataset.displayname);

        // sendgrid email api key: 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
        let body = urlencode("View " + displayName + " at https://www.google.com/maps/place/" +
            latitude + "," + longitude);

        // send the email a message
        if (validatePhone(phone) && !sentText) {


            console.log(latitude + ", " + longitude);
            console.log("View " + displayName + " at https://www.google.com/maps/place/" +
                latitude + "," + longitude);

            let urlText = "https://eggshell-llama-7225.twil.io/sms?message=" + body;

            axios.post(urlText);

            sentText = true;
        }
    }
}, 1000);



//console.log(urlencode("sample from js"));

// sendgrid base 64 api key: U0cuQU03ZlN6ZW1UUUtWc21oUVNaT0Z0QS5Ma0VWN3pOeTBJejhudnUxeTYyLXI2VnlaeHBiM00tNm9EcElhbkdsZFI0

//let data = --data '{"personalizations":[{"to":[{"email":"john.doe@example.com","name":"John Doe"}],"subject":"Hello, World!"}],"content": [{"type": "text/plain", "value": "Heya!"}],"from":{"email":"sam.smith@example.com","name":"Sam Smith"},"reply_to":{"email":"sam.smith@example.com","name":"Sam Smith"}}'



// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey("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");
// const msg = {
//     to: 'shatayukulkarni@gmail.com',
//     from: 'test@example.com',
//     subject: 'Sending with SendGrid is Fun',
//     text: 'and easy to do anywhere, even with Node.js',
//     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// sgMail.send(msg);