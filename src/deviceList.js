function stringGenerate(name) {
    let result = name + ", " + name + ", wherefore art thou hiding?";
    return result;
}

export function handle() {
    let devices = ["phone", "laptop", "backpack", "luggage", "tablet", "purse", "jacket"];
    let interval = 1000;

    let currentDeviceIndex = 0;
    setInterval(() => {
        let deviceSpan = document.getElementById("deviceList");
        deviceSpan.innerHTML = stringGenerate(
            devices[currentDeviceIndex % devices.length]
        );
        ++currentDeviceIndex;
    }, interval);
}