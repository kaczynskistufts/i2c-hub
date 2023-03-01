temp = 0
humid = 0
strip: neopixel.Strip = None
def showData():
    OLED.write_string_new_line("temperature")
    OLED.write_num_new_line(temp)
    OLED.write_string_new_line("humidity")
    OLED.write_num_new_line(humid)
def getData():
    global temp, humid
    temp = grove.aht20_read_temperature_f()
    humid = grove.aht20_read_humidity()

def on_forever():
    global strip
    strip = neopixel.create(DigitalPin.P0, 30, NeoPixelMode.RGB)
    OLED.init(128, 64)
    getData()
    showData()
    basic.pause(5000)
basic.forever(on_forever)
