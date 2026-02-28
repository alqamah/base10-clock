let currentTimeZone = 'Asia/Kolkata';

/**
 * Updates the standard and decimal clocks on the page.
 */
function updateClocks() {
    const now = new Date();

    // 1. Get localized standard time parts
    // We use Intl.DateTimeFormat to reliably get time in different zones
    const formatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: currentTimeZone,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        fractionalSecondDigits: 3,
        hour12: false
    });

    try {
        const parts = formatter.formatToParts(now);
        const timeParts = {};
        parts.forEach(({ type, value }) => timeParts[type] = value);

        const h = parseInt(timeParts.hour);
        const m = parseInt(timeParts.minute);
        const s = parseInt(timeParts.second);
        const ms = parseInt(timeParts.fractionalSecond);

        // 2. Update Standard Display
        const stdClock = document.getElementById('standard-clock');
        if (stdClock) {
            stdClock.innerText = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        }

        // 3. Decimal Calculation
        // Standard day has 86,400,000 milliseconds
        const msSinceMidnight = (h * 3600000) + (m * 60000) + (s * 1000) + ms;

        // Map 86.4M ms to 100M decimal ms (10-hour day)
        // 1 day = 10 decimal hours
        // 1 decimal hour = 100 decimal minutes
        // 1 decimal minute = 100 decimal seconds
        // 1 decimal second = 1000 decimal milliseconds
        const totalDecMs = (msSinceMidnight / 86400000) * 100000000;

        let decH = Math.floor(totalDecMs / 10000000);
        const decM = Math.floor((totalDecMs % 10000000) / 100000);
        const decS = Math.floor((totalDecMs % 100000) / 1000);

        const decClock = document.getElementById('decimal-clock');
        if (decClock) {
            // Updating DOM with just the decimal time values
            decClock.innerHTML = `
                <span class="val">${decH}:${decM.toString().padStart(2, '0')}:${decS.toString().padStart(2, '0')}</span>
            `;
        }
    } catch (e) {
        console.error("Error formatting time for zone:", currentTimeZone, e);
    }
}

/**
 * Sets the active timezone and updates the UI.
 */
function setTimeZone(tz, btn) {
    currentTimeZone = tz;
    const tzLabel = document.getElementById('tz-id');
    if (tzLabel) {
        tzLabel.innerText = tz;
    }

    // Update button visual state
    document.querySelectorAll('.controls button').forEach(b => b.classList.remove('active'));
    if (btn) {
        btn.classList.add('active');
    }
}

/**
 * Toggles the visibility of the conversion logic formula block.
 */
function toggleFormula() {
    const formulas = document.querySelectorAll('.formula-block');
    formulas.forEach(f => {
        f.classList.toggle('hidden');
    });
}

// Global exposure for HTML onclick attributes
window.setTimeZone = setTimeZone;
window.toggleFormula = toggleFormula;

// Initial execution and heart-beat
document.addEventListener('DOMContentLoaded', () => {
    updateClocks();
    setInterval(updateClocks, 100);
});
