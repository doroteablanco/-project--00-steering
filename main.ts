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
            datalogger.log(datalogger.createCV("Angle - Actuator 1", 1234567890))
        } else if (value == 2) {
            log_indicator = false
            basic.showIcon(IconNames.No)
        } else {
        	
        }
    }
    if (name == angle_signal) {
        if (log_indicator) {
            led.toggle(0, 0)
            datalogger.log(
            datalogger.createCV("Angle - Actuator 1", value),
            datalogger.createCV("Time", timeanddate.dateTime())
            )
        }
        display.show(value)
    }
})
let angle_signal = ""
let log_control = ""
let display: grove.TM1637 = null
let log_indicator = false
radio.setGroup(21)
log_indicator = false
display = grove.createDisplay(DigitalPin.P1, DigitalPin.P15)
datalogger.includeTimestamp(FlashLogTimeStampFormat.Milliseconds)
datalogger.setColumnTitles(
"Angle - Actuator 1",
"Time"
)
basic.showIcon(IconNames.SmallDiamond)
basic.forever(function () {
    radio.sendValue(angle_signal, pins.map(
    pins.analogReadPin(AnalogPin.P0),
    0,
    1023,
    0,
    180
    ))
})
