# CR Smart Plant

CR Smart Plant is a smart watering system built with a Raspberry Pi. The system uses soil moisture sensors to measure the soil. If the soil is too dry, the watering starts by opening the solenoid for the pot and starts the pump.

# Features
- Automatic watering of plants
- Trend logging for soil moisture
- iOS user interface (Coming soon)

# Install

## Requirements
- Node.js
- MongoDB

[Tutorial for installation of MongoDB and Node.js](http://yannickloriot.com/2016/04/install-mongodb-and-node-js-on-a-raspberry-pi/)

## Install
```
cd /home/pi/Documents/
git clone https://github.com/crundberg/cr-smart-plant
cd cr-smart-plant
npm install
```

## Add to autostart
```
sudo cp /home/pi/Documents/cr-smart-plant/autostart/crsmartplant /etc/init.d/
sudo chmod +x /etc/init.d/crsmartplant
sudo update-rc.d crsmartplant defaults
sudo /etc/init.d/crsmartplant start
```

# Schematics
Coming soon.

## Required parts
- 1 Raspberry Pi
- 1 Pump
- 1 Relay for pump
- 1 MCP3008

## Optional parts
- Lamp
- Relay for lamp

## Parts for each pot
- 1 soil moisture sensor
- 1 solenoid
- 1 relay for solenoid