// Time formatting
function time_format(d) {
  hours = format_two_digits(d.getHours());
  minutes = format_two_digits(d.getMinutes());
  return hours + ":" + minutes;
}

function format_two_digits(n) {
  return n < 10 ? '0' + n : n;
}

// Time offset
function offset(hour, min, dt) {
  const d0 = new Date(2020, 1, 1, Number(hour), Number(min));
  var d = new Date(d0.getTime() - 1000*60*dt);
  var day_offset = "";
  if (d.getDate()==2) {
    day_offset = " (+1)";
  } else if (d.getDate()==31) {
    day_offset = " (-1)";
  }
  return time_format(d)+day_offset;
}

// Converts 
function convert_utc_to_local(time_utc) {
  var date = new Date();
  var dt = date.getTimezoneOffset();

  var matches = time_utc.match(/^(\d{2}):(\d{2})$/i);
  if (matches != undefined) {
    time_local = offset(matches[1], matches[2], dt);
  } else {
    time_local = time_utc;
  }

  return time_local;
}

function toggle_timezone() {
  $('span[class*="time"]').each(function() {
    var time_utc = $(this).attr('data-utc');
    if($('#timezone-toggle').prop('checked')) {
      // Show in local time
      $(this).text(convert_utc_to_local(time_utc));
    } else {
      // Show in UTC
      $(this).text(time_utc);
    }
  });
}

