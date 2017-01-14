var rpio = require('rpio');
var config = require('./config');

rpio.spiBegin();
rpio.spiChipSelect(1);

function getValue(channel) {
	
	// Turn on power to sensor
	rpio.write(config.gpio.SoilSensor, rpio.HIGH);
	rpio.msleep(2000);

    // Prepare TX buffer [trigger byte = 0x01] [channel 0 = 0x80 (128)] [placeholder = 0x01]
    var txBuffer = new Buffer([0x01, (8 + channel << 4), 0x01]);
    var rxBuffer = new Buffer(txBuffer.byteLength);

	// Send TX buffer and recieve RX buffer
    rpio.spiTransfer(txBuffer, rxBuffer, txBuffer.length);

    // Extract value from output buffer. Ignore first byte.
    var junk = rxBuffer[0],
        MSB = rxBuffer[1],
        LSB = rxBuffer[2];

    // Ignore first six bits of MSB, bit shift MSB 8 positions and
    // finally combine LSB and MSB to get a full 10 bit value
    var value = ((MSB & 3) << 8) + LSB;
    
	// Turn off power to sensor
	rpio.write(config.gpio.SoilSensor, rpio.LOW);
	
	// Return value
    return value;
}

module.exports = {
	getValue: function(channel) {
		return getValue(channel-1);
	}
};