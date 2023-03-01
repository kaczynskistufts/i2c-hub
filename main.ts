let temp = 0
let strip: neopixel.Strip = null
let humid = 0
let lux = 0
function checkTemp () {
    if (temp > 75) {
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
        pins.digitalWritePin(DigitalPin.P8, 1)
    } else {
        strip.showColor(neopixel.colors(NeoPixelColors.Green))
        pins.digitalWritePin(DigitalPin.P8, 0)
    }
}
function showData () {
    OLED.writeStringNewLine("temperature")
    OLED.writeNumNewLine(temp)
    OLED.writeStringNewLine("humidity")
    OLED.writeNumNewLine(humid)
    OLED.writeStringNewLine("lux")
    OLED.writeNumNewLine(lux)
}
function changeBrightness () {
    if (lux > 200) {
        strip.clear()
        strip.show()
    } else {
        strip.show()
    }
}
function controlLightBulb () {
    if (lux < 400) {
        pins.digitalWritePin(DigitalPin.P2, 1)
    } else {
        pins.digitalWritePin(DigitalPin.P2, 0)
    }
}
function getData () {
    temp = grove.aht20ReadTemperatureF()
    humid = grove.aht20ReadHumidity()
    lux = BH1750.getIntensity()
}
basic.forever(function () {
    strip = neopixel.create(DigitalPin.P0, 30, NeoPixelMode.RGB)
    BH1750.on()
    OLED.init(128, 64)
    getData()
    showData()
    checkTemp()
    basic.pause(5000)
    changeBrightness()
    controlLightBulb()
})
