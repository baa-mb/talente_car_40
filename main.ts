function hole_neigung() {
    gerade_links = gerade_rad
    gerade_rechts = gerade_rad * rad_rechts_korrektur
    kurve_links = kurve_rad * -1
    kurve_rechts = kurve_rad
    // if (links_soll > 255) {
    // links_soll = 255
    // } else if (links_soll < -255) {
    // links_soll = -255
    // }
    links_soll = Math.min(Math.max(gerade_links + kurve_links, -255), 255)
    rechts_soll = Math.min(Math.max(gerade_rechts + kurve_rechts, -255), 255)
}
function init() {
    radio.setGroup(26)
    basic.showIcon(IconNames.Diamond)
    hebe_winkel = 70
    motor_rechts = robotbit.Motors.M1A
    motor_links = robotbit.Motors.M2A
    rad_rechts_korrektur = 1
    robotbit.MotorStopAll()
}
radio.onReceivedValue(function (info, wert) {
    if (info == "gerade") {
        gerade_get = wert
        gerade_rad = Math.round(Math.map(gerade_get, -45, 45, -255, 255))
    } else if (info == "kurve") {
        kurve_get = wert
        kurve_get = 0
        kurve_rad = Math.round(Math.map(kurve_get, -45, 45, -255, 255))
        serial.writeValue("kurve_rad", kurve_rad)
    } else if (info == "kupplung") {
        if (wert == 0) {
            robotbit.Servo(robotbit.Servos.S1, 0)
        } else {
            robotbit.Servo(robotbit.Servos.S1, hebe_winkel)
        }
    }
})
input.onButtonPressed(Button.B, function () {
    if (oben) {
        robotbit.Servo(robotbit.Servos.S1, 0)
    } else {
        robotbit.Servo(robotbit.Servos.S1, hebe_winkel)
    }
    oben = !(oben)
})
let rechts_ist = 0
let links_ist = 0
let oben = false
let gerade_get = 0
let kurve_get = 0
let hebe_winkel = 0
let rechts_soll = 0
let links_soll = 0
let kurve_rechts = 0
let kurve_rad = 0
let kurve_links = 0
let gerade_rechts = 0
let gerade_rad = 0
let gerade_links = 0
let rad_rechts_korrektur = 0
let motor_rechts = 0
let motor_links = 0
rad_rechts_korrektur = 0
init()
let rechts_rad = 0
let links_rad = 0
robotbit.Servo(robotbit.Servos.S1, 0)
basic.forever(function () {
    hole_neigung()
    // if (rechts_soll > 255) {
    // rechts_soll = 255
    // } else if (rechts_soll < -255) {
    // rechts_soll = -255
    // }
    if (links_ist < links_soll) {
        links_ist = Math.min(links_ist + 12, links_soll)
    } else if (links_ist > links_soll) {
        links_ist = Math.max(links_ist - 12, links_soll)
    }
    if (rechts_ist < rechts_soll) {
        rechts_ist = Math.min(rechts_ist + 12, rechts_soll)
    } else if (rechts_ist > rechts_soll) {
        rechts_ist = Math.max(rechts_ist - 12, rechts_soll)
    }
    if (links_soll == 0 && rechts_soll == 0 && links_ist == 0 && rechts_ist == 0) {
        robotbit.MotorStopAll()
    } else {
        robotbit.MotorRun(motor_links, links_ist)
        robotbit.MotorRun(motor_rechts, rechts_ist)
    }
    // serial.writeLine("links: " + motor_links + " rechts_ist: " + rechts_ist)
    basic.pause(10)
})
control.inBackground(function () {

})
