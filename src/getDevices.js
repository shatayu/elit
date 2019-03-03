// returns promise containing an array of device names belonging to the user
export function getDevices(user) {
    return firebase.database().ref("users/" + user + "/devices/").once("value")
        .then((snapshot) => {
            let data = snapshot.val();

            let devices = [];

            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    devices.push({
                        name: data[key].name,
                        displayName: data[key].displayName
                    });
                }
            }

            return devices;
        })
}