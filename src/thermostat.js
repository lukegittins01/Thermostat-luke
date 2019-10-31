'use strict';

function Thermostat() {
  this.DEFAULT_TEMPERATURE = 20;
  this.temp = this.DEFAULT_TEMPERATURE;
  this.MIN_TEMP = 10;
  this.MAX_LIMIT_PSM_ON = 25;
  this.MAX_LIMIT_PSM_OFF = 32;
  this.powerSavingMode = true;
  this.MEDIUM_ENERGY_USAGE_LIMIT = 18;
}

Thermostat.prototype.getCurrentTemp = function(){
  return this.temp
}

Thermostat.prototype.up = function(){
  if(this.isMaxTemp()){
    return;
  }
  this.temp += 1
}

Thermostat.prototype.down = function(){
  if(this.isMinTemp()){
    return;
  }
  this.temp -= 1
}

Thermostat.prototype.isMinTemp = function(){
  return this.temp === this.MIN_TEMP
}

Thermostat.prototype.isMaxTemp = function(){
  if(this.isPowerSavingModeOn() === false){
    return this.temp === this.MAX_LIMIT_PSM_OFF
  }
  return this.temp === this.MAX_LIMIT_PSM_ON
}

Thermostat.prototype.isPowerSavingModeOn = function(){
  return this.powerSavingMode === true;
}

Thermostat.prototype.turnOffPSM = function(){
  this.powerSavingMode = false;
}

Thermostat.prototype.turnOnPSM = function(){
  this.powerSavingMode = true;
}

Thermostat.prototype.resetTemp = function(){
  this.temp = this.DEFAULT_TEMPERATURE;
}

Thermostat.prototype.energyUsage = function(){
  if(this.temp < this.MEDIUM_ENERGY_USAGE_LIMIT){
    return 'low-usage';
  }

  if(this.temp >= this.MEDIUM_ENERGY_USAGE_LIMIT && this.temp <= this.MAX_LIMIT_PSM_ON){
    return 'medium-usage';
  }

  return 'high-usage';
}
