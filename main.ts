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
    datalogger.log(datalogger.createCV("Angle - Steering", 123.123))
})
input.onButtonPressed(Button.B, function () {
    log_indicator = false
    radio.sendValue(log_control, 2)
    basic.showIcon(IconNames.No)
    datalogger.log(datalogger.createCV("Angle - Steering", 321.321))
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
    radio.sendValue(angle_signal, value)
    if (log_indicator) {
        led.toggle(0, 0)
        datalogger.log(
        datalogger.createCV("Angle - Steering", value),
        datalogger.createCV("Time", timeanddate.dateTime())
        )
    }
    display.show(value)
})
