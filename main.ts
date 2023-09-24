datalogger.onLogFull(function () {
    log_indicator = false
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
})
input.onButtonPressed(Button.A, function () {
    timeanddate.set24HourTime(0, 0, 0)
    radio.sendValue(log_control, 1)
    log_indicator = true
    basic.showIcon(IconNames.Yes)
    datalogger.log(datalogger.createCV("Angle - Steering", 1234567890))
})
input.onButtonPressed(Button.B, function () {
    log_indicator = false
    radio.sendValue(log_control, 2)
    basic.showIcon(IconNames.No)
})
radio.onReceivedValue(function (name, value) {
    if (name == log_control) {
        if (value == 1) {
            timeanddate.set24HourTime(0, 0, 0)
            log_indicator = true
            basic.showIcon(IconNames.Yes)
        } else if (value == 2) {
            log_indicator = false
            basic.showIcon(IconNames.No)
        } else {
        	
        }
    }
})
let value = 0
let log_control = ""
let log_indicator = false
radio.setGroup(21)
log_indicator = false
let display = grove.createDisplay(DigitalPin.P1, DigitalPin.P15)
datalogger.includeTimestamp(FlashLogTimeStampFormat.Milliseconds)
datalogger.setColumnTitles(
"Angle - Steering",
"Time"
)
basic.showIcon(IconNames.SmallDiamond)
basic.forever(function () {
	
})
loops.everyInterval(100, function () {
    let angle_signal = ""
    value = pins.map(
    pins.analogReadPin(AnalogPin.P0),
    0,
    1023,
    0,
    180
    )
    display.show(value)
    radio.sendValue(angle_signal, value)
    if (log_indicator) {
        led.toggle(0, 0)
        datalogger.log(
        datalogger.createCV("Angle - Steering", value),
        datalogger.createCV("Time", timeanddate.dateTime())
        )
    }
})
