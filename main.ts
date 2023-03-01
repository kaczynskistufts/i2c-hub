let temp = 0
let humid = 0
let strip: neopixel.Strip = null
function showData () {
    OLED.writeStringNewLine("temperature")
    OLED.writeNumNewLine(temp)
    OLED.writeStringNewLine("humidity")
    OLED.writeNumNewLine(humid)
}
function getData () {
    temp = grove.aht20ReadTemperatureF()
    humid = grove.aht20ReadHumidity()
}
basic.forever(function () {
    strip = neopixel.create(DigitalPin.P0, 30, NeoPixelMode.RGB)
    OLED.init(128, 64)
    getData()
    showData()
    basic.pause(5000)
})
