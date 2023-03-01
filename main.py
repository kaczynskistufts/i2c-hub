temp = 0
strip: neopixel.Strip = None
humid = 0
lux = 0
def checkTemp():
    if temp > 75:
        strip.show_color(neopixel.colors(NeoPixelColors.RED))
        pins.digital_write_pin(DigitalPin.P8, 1)
    else:
        strip.show_color(neopixel.colors(NeoPixelColors.GREEN))
        pins.digital_write_pin(DigitalPin.P8, 0)
def showData():
    OLED.write_string_new_line("temperature")
    OLED.write_num_new_line(temp)
    OLED.write_string_new_line("humidity")
    OLED.write_num_new_line(humid)
    OLED.write_string_new_line("lux")
    OLED.write_num_new_line(lux)
def changeBrightness():
    if lux > 200:
        strip.clear()
        strip.show()
    else:
        strip.show()
def controlLightBulb():
    if lux > 400:
        pins.digital_write_pin(DigitalPin.P2, 0)
    else:
        pins.digital_write_pin(DigitalPin.P2, 1)

def getData():
    global temp, humid, lux
    temp = grove.aht20_read_temperature_f()
    humid = grove.aht20_read_humidity()
    lux = BH1750.get_intensity()

def on_forever():
    global strip
    strip = neopixel.create(DigitalPin.P0, 30, NeoPixelMode.RGB)
    BH1750.on()
    OLED.init(128, 64)
    getData()
    showData()
    checkTemp()
    basic.pause(5000)
    changeBrightness()
    controlLightBulb()
basic.forever(on_forever)
