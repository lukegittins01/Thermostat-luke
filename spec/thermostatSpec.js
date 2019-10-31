'use strict';

describe('Thermostat', function(){

var thermostat;

beforeEach(function(){
  thermostat = new Thermostat();
});

  it('Starts at 20 degrees', function(){
    expect(thermostat.getCurrentTemp()).toEqual(20);
  });

  it('Can increase the temperature by 1', function(){
    thermostat.up();
    expect(thermostat.getCurrentTemp()).toEqual(21);
  });

  it('Can decrease the temperature by 1', function(){
    thermostat.down();
    expect(thermostat.getCurrentTemp()).toEqual(19);
  });

  it('Will have a min limit', function(){
    for (var i = 0; i < 11; i++){
      thermostat.down();
    }
    expect(thermostat.getCurrentTemp()).toEqual(10);
  });

  it('Will have a max limit', function(){
    for (var i = 0; i < 6; i++){
      thermostat.up();
    }
    expect(thermostat.getCurrentTemp()).toEqual(25);
  });

  it('is Power Saving mode on by default', function(){
    expect(thermostat.isPowerSavingModeOn()).toEqual(true);
  });

  it('can turn Power Saving Mode off', function(){
    thermostat.turnOffPSM();
    expect(thermostat.isPowerSavingModeOn()).toEqual(false);
  });

  it('can turn Power Saving Mode back on', function(){
    thermostat.turnOffPSM();
    expect(thermostat.isPowerSavingModeOn()).toEqual(false);
    thermostat.turnOnPSM();
    expect(thermostat.isPowerSavingModeOn()).toEqual(true);
  });

  describe('When power saving mode is on', function(){
    it('Have a max temp of 25 degrees', function(){
      for (var i = 0; i < 6; i++){
        thermostat.up();
      }
      expect(thermostat.getCurrentTemp()).toEqual(25);
    });
  });

  describe('When power saving mode is off', function(){
    it('Have a max temp of 32 degrees', function(){
      thermostat.turnOffPSM();
      for (var i = 0; i < 13; i++){
        thermostat.up();
      }
      expect(thermostat.getCurrentTemp()).toEqual(32);
    });
  });


  it('can be reset to default temp', function(){
    for (var i = 0; i < 6; i++){
      thermostat.up();
    }
    thermostat.resetTemp();
    expect(thermostat.getCurrentTemp()).toEqual(20);
  });

  describe('displaying usage levels', function() {
  describe('when the temperature is below 18 degrees', function() {
    it('it is considered low-usage', function() {
      for (var i = 0; i < 3; i++) {
        thermostat.down();
      }
      expect(thermostat.energyUsage()).toEqual('low-usage');
    });
  });

  describe('when the temperature is between 18 and 25 degrees', function() {
    it('it is considered medium-usage', function() {
      expect(thermostat.energyUsage()).toEqual('medium-usage');
    });
  });

  describe('when the temperature is anything else', function() {
    it('it is considered high-usage', function() {
      thermostat.powerSavingMode = false;
      for (var i = 0; i < 6; i++) {
        thermostat.up();
      }
      expect(thermostat.energyUsage()).toEqual('high-usage');
    });
  });
});

});
