let motorActive = false;

export function initControls(){
    window.addEventListener('keydown', function(event) {
        if (event.key === 'm') {
            motorActive = !motorActive;
            console.log(motorActive ? 'Motor gestartet' : 'Motor gestoppt');
        }
    });
}

export function getMotorActive(){
    return motorActive;
}

export function updateMotorUI(){
    const motorStatus = document.getElementById('motor-status');
    if (motorStatus) {
        motorStatus.innerText = motorActive ? 'Motor: AN 🟢 (m)' : 'Motor: AUS 🔴 (m)';
    }
}