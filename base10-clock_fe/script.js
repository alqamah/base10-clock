//1d_hr = 100min, 1d_min = 100sec
//1 d_time = 1.20 standard hour
function updateClocks() {
    const now = new Date();

    // Standard Time Calculation
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    const stdHoursText = hours.toString().padStart(2, '0');
    const stdMinutesText = minutes.toString().padStart(2, '0');
    const stdSecondsText = seconds.toString().padStart(2, '0');

    // Update Standard Clock DOM
    const stdClock = document.getElementById('standard-clock');
    stdClock.querySelector('.hours').textContent = stdHoursText;
    stdClock.querySelector('.minutes').textContent = stdMinutesText;
    stdClock.querySelector('.seconds').textContent = stdSecondsText;
    stdClock.querySelector('.ampm').textContent = ampm;

    // Decimal Time Calculation
    const msSinceMidnight = (now.getHours() * 60*60*1000) +
        (now.getMinutes() * 60*1000) +
        (now.getSeconds() * 1000) +
        now.getMilliseconds();

    // 24h*60m*60s*1000ms = 20dh*100dm*100ds*1000dms 

     /*   
    //ERROR
    const decimalMs = (msSinceMidnight / 24*60*60*1000) * (20*100*100*1000);

    const decS = Math.floor(decimalMs*1000);
    const decM = decS*100;
    const decH = decM*100;
    */
    

    
    //DEFAULT
     const decimalMs = (msSinceMidnight / 86400000) * 200000000;

    let decH = Math.floor(decimalMs / 10000000);
    const decM = Math.floor((decimalMs % 10000000) / 100000);
    const decS = Math.floor((decimalMs % 100000) / 1000);
    const decAmPm = decH >= 10 ? 'PM' : 'AM';
    
    console.log(decS);

    decH = decH % 10;
    decH = decH ? decH : 10;

    const decHoursText = decH.toString().padStart(2, '0');
    const decMinutesText = decM.toString().padStart(2, '0');
    const decSecondsText = decS.toString().padStart(2, '0');

    // Update Decimal Clock DOM
    const decClock = document.getElementById('decimal-clock');
    decClock.querySelector('.hours').textContent = decHoursText;
    decClock.querySelector('.minutes').textContent = decMinutesText;
    decClock.querySelector('.seconds').textContent = decSecondsText;
    decClock.querySelector('.ampm').textContent = decAmPm;
}

// Initial update
updateClocks();

// update every 100ms
setInterval(updateClocks, 100);
