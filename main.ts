function defDireccion (comV: number, rumV: number) {
    direccion = comV - rumV
    if (direccion < 0) {
        direccion = direccion + 360
    }
}
function mostrar () {
    OLED.writeString("Orientacion: ")
    OLED.writeNum(input.compassHeading())
    OLED.writeStringNewLine("   ")
    OLED.writeString("Temperatura: ")
    OLED.writeNum(input.temperature())
    OLED.writeStringNewLine("   ")
    OLED.writeString("Rumbo: ")
    OLED.writeNum(rumbo)
    OLED.writeStringNewLine("    ")
    OLED.writeString("Direccion: ")
    OLED.writeNum(direccion)
    OLED.writeStringNewLine("    ")
    OLED.writeStringNewLine("Nov")
    OLED.writeStringNewLine("2020")
    OLED.newLine()
    OLED.newLine()
    basic.pause(500)
}
input.onButtonPressed(Button.A, function () {
    rumbo = rumbo + 10
    if (rumbo >= 360) {
        rumbo = rumbo - 360
    }
})
function servoLaser () {
    temp = direccion + 90
    if (temp > 45 && temp < 135) {
        pins.digitalWritePin(DigitalPin.P12, 1)
        servos.P0.setAngle(temp)
    } else {
        pins.digitalWritePin(DigitalPin.P12, 0)
    }
}
input.onButtonPressed(Button.AB, function () {
    rumbo = rumbo + 100
    if (rumbo >= 400) {
        rumbo = rumbo - 400
    }
})
input.onButtonPressed(Button.B, function () {
    rumbo = rumbo + 1
    if (direccion >= 360) {
        rumbo = rumbo
    }
})
let temp = 0
let direccion = 0
let rumbo = 0
let rumV = 0
let comV = 0
rumbo = 0
direccion = 0
servos.P0.setPulse(1500)
servos.P0.setRange(0, 180)
servos.P0.setAngle(90)
OLED.init(128, 64)
for (let index = 0; index <= 100; index++) {
    OLED.drawLoading(index)
}
OLED.clear()
basic.forever(function () {
    defDireccion(input.compassHeading(), rumbo)
    mostrar()
    servoLaser()
    basic.pause(200)
})
