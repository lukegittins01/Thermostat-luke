$(document).ready(function() {
  var thermostat = new Thermostat();
  $('#temp').text(thermostat.temp);

  $('#up').on('click', function() { // event listener
    thermostat.up(); // update model
    updateTemperature();// update view
  });

  $('#down').click(function() {
    thermostat.down();
    updateTemperature();
  });

  $('#resetTemp').click(function() {
    thermostat.resetTemp();
    updateTemperature();
  });

  $('#turnOnPSM').click(function() {
    thermostat.turnOnPSM();
    $('#powerSaving').text('on')
    updateTemperature();
  })

  $('#turnOffPSM').click(function() {
    thermostat.turnOffPSM();
    $('#powerSaving').text('off')
    updateTemperature();
  })

  function updateTemperature() {
    $('#temp').text(thermostat.temp);
    if(thermostat.energyUsage() === 'low-usage') {
      $('#temp').css('color', 'green')
    } else if(thermostat.energyUsage() === 'medium-usage') {
      $('#temp').css('color', 'black')
    } else {
      $('#temp').css('color', 'red')
    }
  }
});
