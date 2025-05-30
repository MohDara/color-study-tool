// Global variables
let currentColorBlindnessType = 'normal';

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeSliders();
    updateAllDisplays();
});

function initializeSliders() {
    // RGB sliders
    document.getElementById('red').addEventListener('input', updateRGB);
    document.getElementById('green').addEventListener('input', updateRGB);
    document.getElementById('blue').addEventListener('input', updateRGB);
    
    // CMY sliders
    document.getElementById('cyan').addEventListener('input', updateCMY);
    document.getElementById('magenta').addEventListener('input', updateCMY);
    document.getElementById('yellow').addEventListener('input', updateCMY);
    
    // HSI sliders
    document.getElementById('hue').addEventListener('input', updateHSI);
    document.getElementById('saturation').addEventListener('input', updateHSI);
    document.getElementById('intensity').addEventListener('input', updateHSI);
    
    // Color blindness buttons
    document.getElementById('normal-vision').addEventListener('click', () => setColorBlindness('normal'));
    document.getElementById('protanopia').addEventListener('click', () => setColorBlindness('protanopia'));
    document.getElementById('deuteranopia').addEventListener('click', () => setColorBlindness('deuteranopia'));
    document.getElementById('tritanopia').addEventListener('click', () => setColorBlindness('tritanopia'));
    
    // Calculator functionality
    document.getElementById('calculate-btn').addEventListener('click', calculateIntensity);
    document.getElementById('calc-r-input').addEventListener('input', validateInput);
    document.getElementById('calc-g-input').addEventListener('input', validateInput);
    document.getElementById('calc-b-input').addEventListener('input', validateInput);
    
    // HSI Calculator functionality
    document.getElementById('calculate-hsi-btn').addEventListener('click', calculateHSI);
    document.getElementById('hsi-r-input').addEventListener('input', validateHSIInput);
    document.getElementById('hsi-g-input').addEventListener('input', validateHSIInput);
    document.getElementById('hsi-b-input').addEventListener('input', validateHSIInput);
    
    // Auto-calculate on Enter key
    document.getElementById('calc-r-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculateIntensity();
    });
    document.getElementById('calc-g-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculateIntensity();
    });
    document.getElementById('calc-b-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculateIntensity();
    });
    
    // HSI Auto-calculate on Enter key
    document.getElementById('hsi-r-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculateHSI();
    });
    document.getElementById('hsi-g-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculateHSI();
    });
    document.getElementById('hsi-b-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculateHSI();
    });
}

function updateRGB() {
    const r = parseInt(document.getElementById('red').value);
    const g = parseInt(document.getElementById('green').value);
    const b = parseInt(document.getElementById('blue').value);
    
    // Update value displays
    document.getElementById('red-value').textContent = r;
    document.getElementById('green-value').textContent = g;
    document.getElementById('blue-value').textContent = b;
    
    // Update color display
    const rgbColor = `rgb(${r}, ${g}, ${b})`;
    document.getElementById('rgb-display').style.backgroundColor = rgbColor;
    
    // Update text displays
    document.getElementById('rgb-text').textContent = rgbColor;
    document.getElementById('hex-text').textContent = rgbToHex(r, g, b);
    
    // Update intensity calculator
    updateIntensityCalculator(r, g, b);
    
    // Update color blindness display
    updateColorBlindnessDisplay();
}

function updateIntensityCalculator(r, g, b) {
    // Calculate each component
    const redComponent = 0.299 * r;
    const greenComponent = 0.587 * g;
    const blueComponent = 0.144 * b;
    const totalIntensity = redComponent + greenComponent + blueComponent;
    const intensityPercent = (totalIntensity / 255) * 100;
    
    // Update calculation display
    document.getElementById('calc-red').textContent = r;
    document.getElementById('calc-green').textContent = g;
    document.getElementById('calc-blue').textContent = b;
    
    document.getElementById('calc-red-result').textContent = redComponent.toFixed(3);
    document.getElementById('calc-green-result').textContent = greenComponent.toFixed(3);
    document.getElementById('calc-blue-result').textContent = blueComponent.toFixed(3);
    
    document.getElementById('calc-intensity').textContent = totalIntensity.toFixed(3);
    document.getElementById('calc-intensity-percent').textContent = intensityPercent.toFixed(1) + '%';
    
    // Update intensity bar
    const intensityFill = document.getElementById('intensity-fill');
    intensityFill.style.width = intensityPercent + '%';
    
    // Color the bar based on intensity
    if (intensityPercent < 25) {
        intensityFill.style.background = 'linear-gradient(90deg, #000, #333)';
    } else if (intensityPercent < 50) {
        intensityFill.style.background = 'linear-gradient(90deg, #333, #666)';
    } else if (intensityPercent < 75) {
        intensityFill.style.background = 'linear-gradient(90deg, #666, #999)';
    } else {
        intensityFill.style.background = 'linear-gradient(90deg, #999, #fff)';
    }
}

// Interactive Calculator Functions
function calculateIntensity() {
    const r = parseInt(document.getElementById('calc-r-input').value) || 0;
    const g = parseInt(document.getElementById('calc-g-input').value) || 0;
    const b = parseInt(document.getElementById('calc-b-input').value) || 0;
    
    // Validate inputs
    if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
        alert('Please enter values between 0 and 255 for all RGB components.');
        return;
    }
    
    // Calculate intensity components
    const redComponent = 0.299 * r;
    const greenComponent = 0.587 * g;
    const blueComponent = 0.144 * b;
    const totalIntensity = redComponent + greenComponent + blueComponent;
    const intensityPercent = (totalIntensity / 255) * 100;
    
    // Update color preview
    const rgbColor = `rgb(${r}, ${g}, ${b})`;
    document.getElementById('calc-color-preview').style.backgroundColor = rgbColor;
    
    // Show calculation steps
    document.getElementById('calc-steps').style.display = 'block';
    document.getElementById('step-r').textContent = r;
    document.getElementById('step-g').textContent = g;
    document.getElementById('step-b').textContent = b;
    document.getElementById('step-r-calc').textContent = redComponent.toFixed(3);
    document.getElementById('step-g-calc').textContent = greenComponent.toFixed(3);
    document.getElementById('step-b-calc').textContent = blueComponent.toFixed(3);
    document.getElementById('final-intensity').textContent = totalIntensity.toFixed(3);
    document.getElementById('final-percentage').textContent = intensityPercent.toFixed(1) + '%';
    
    // Update intensity bar
    const intensityFill = document.getElementById('calc-intensity-fill');
    intensityFill.style.width = intensityPercent + '%';
    
    // Color the bar based on intensity
    if (intensityPercent < 25) {
        intensityFill.style.background = 'linear-gradient(90deg, #000, #444)';
    } else if (intensityPercent < 50) {
        intensityFill.style.background = 'linear-gradient(90deg, #444, #888)';
    } else if (intensityPercent < 75) {
        intensityFill.style.background = 'linear-gradient(90deg, #888, #bbb)';
    } else {
        intensityFill.style.background = 'linear-gradient(90deg, #bbb, #fff)';
    }
    
    // Show result summary
    document.getElementById('result-summary').style.display = 'block';
    document.getElementById('summary-rgb').textContent = `${r}, ${g}, ${b}`;
    document.getElementById('summary-intensity').textContent = totalIntensity.toFixed(1);
    document.getElementById('summary-percent').textContent = intensityPercent.toFixed(1) + '%';
    
    // Add animation effect
    document.getElementById('calc-steps').style.animation = 'slideIn 0.5s ease';
    document.getElementById('result-summary').style.animation = 'slideIn 0.5s ease';
}

function validateInput() {
    const inputs = ['calc-r-input', 'calc-g-input', 'calc-b-input'];
    inputs.forEach(id => {
        const input = document.getElementById(id);
        let value = parseInt(input.value);
        
        if (isNaN(value)) {
            input.value = 0;
        } else if (value < 0) {
            input.value = 0;
        } else if (value > 255) {
            input.value = 255;
        }
    });
}

function setCalculatorRGB(r, g, b) {
    document.getElementById('calc-r-input').value = r;
    document.getElementById('calc-g-input').value = g;
    document.getElementById('calc-b-input').value = b;
    calculateIntensity();
}

function updateCMY() {
    const c = parseInt(document.getElementById('cyan').value);
    const m = parseInt(document.getElementById('magenta').value);
    const y = parseInt(document.getElementById('yellow').value);
    
    // Update value displays
    document.getElementById('cyan-value').textContent = c + '%';
    document.getElementById('magenta-value').textContent = m + '%';
    document.getElementById('yellow-value').textContent = y + '%';
    
    // Convert CMY to RGB for display
    const rgb = cmyToRgb(c, m, y);
    const rgbColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    document.getElementById('cmy-display').style.backgroundColor = rgbColor;
    
    // Update text display
    document.getElementById('cmy-text').textContent = `C:${c}% M:${m}% Y:${y}%`;
}

function updateHSI() {
    const h = parseInt(document.getElementById('hue').value);
    const s = parseInt(document.getElementById('saturation').value);
    const i = parseInt(document.getElementById('intensity').value);
    
    // Update value displays
    const hueColors = ['Red', 'Orange', 'Yellow', 'Yellow-Green', 'Green', 'Blue-Green', 'Cyan', 'Blue', 'Purple', 'Magenta', 'Pink', 'Red'];
    const hueIndex = Math.floor(h / 30);
    const hueColor = hueColors[hueIndex] || 'Red';
    
    document.getElementById('hue-value').textContent = `${h}° (${hueColor})`;
    document.getElementById('saturation-value').textContent = s + '%';
    document.getElementById('intensity-value').textContent = i + '%';
    
    // Convert HSI to RGB for display
    const rgb = hsiToRgb(h, s / 100, i / 100);
    const rgbColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    document.getElementById('hsi-display').style.backgroundColor = rgbColor;
    
    // Update text display
    document.getElementById('hsi-text').textContent = `H:${h}° S:${s}% I:${i}%`;
}

function setColorBlindness(type) {
    currentColorBlindnessType = type;
    
    // Update button states
    document.querySelectorAll('.cb-buttons button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(type === 'normal' ? 'normal-vision' : type).classList.add('active');
    
    // Update display
    updateColorBlindnessDisplay();
    
    // Update info
    const descriptions = {
        'normal': 'All cones functioning normally',
        'protanopia': 'Missing red cones (L-cones) - difficulty distinguishing red and green',
        'deuteranopia': 'Missing green cones (M-cones) - difficulty distinguishing red and green',
        'tritanopia': 'Missing blue cones (S-cones) - difficulty distinguishing blue and yellow'
    };
    
    const typeNames = {
        'normal': 'Normal Vision',
        'protanopia': 'Protanopia (No Red Cones)',
        'deuteranopia': 'Deuteranopia (No Green Cones)',
        'tritanopia': 'Tritanopia (No Blue Cones)'
    };
    
    document.getElementById('cb-type').textContent = typeNames[type];
    document.getElementById('cb-description').textContent = descriptions[type];
}

function updateColorBlindnessDisplay() {
    const r = parseInt(document.getElementById('red').value);
    const g = parseInt(document.getElementById('green').value);
    const b = parseInt(document.getElementById('blue').value);
    
    let modifiedColor;
    switch(currentColorBlindnessType) {
        case 'protanopia':
            modifiedColor = simulateProtanopia(r, g, b);
            break;
        case 'deuteranopia':
            modifiedColor = simulateDeuteranopia(r, g, b);
            break;
        case 'tritanopia':
            modifiedColor = simulateTritanopia(r, g, b);
            break;
        default:
            modifiedColor = {r, g, b};
    }
    
    const rgbColor = `rgb(${modifiedColor.r}, ${modifiedColor.g}, ${modifiedColor.b})`;
    document.getElementById('cb-display').style.backgroundColor = rgbColor;
}

function updateAllDisplays() {
    updateRGB();
    updateCMY();
    updateHSI();
    updateColorBlindnessDisplay();
}

// Utility functions
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function cmyToRgb(c, m, y) {
    // Convert percentages to 0-1 range, then to RGB
    const cNorm = c / 100;
    const mNorm = m / 100;
    const yNorm = y / 100;
    
    const r = Math.round(255 * (1 - cNorm));
    const g = Math.round(255 * (1 - mNorm));
    const b = Math.round(255 * (1 - yNorm));
    
    return {r, g, b};
}

function hsiToRgb(h, s, i) {
    // Convert HSI to RGB
    h = h * Math.PI / 180; // Convert to radians
    
    let r, g, b;
    
    if (h < 2 * Math.PI / 3) {
        b = i * (1 - s);
        r = i * (1 + s * Math.cos(h) / Math.cos(Math.PI / 3 - h));
        g = 3 * i - (r + b);
    } else if (h < 4 * Math.PI / 3) {
        h = h - 2 * Math.PI / 3;
        r = i * (1 - s);
        g = i * (1 + s * Math.cos(h) / Math.cos(Math.PI / 3 - h));
        b = 3 * i - (r + g);
    } else {
        h = h - 4 * Math.PI / 3;
        g = i * (1 - s);
        b = i * (1 + s * Math.cos(h) / Math.cos(Math.PI / 3 - h));
        r = 3 * i - (g + b);
    }
    
    // Clamp values to 0-255 range
    r = Math.max(0, Math.min(255, Math.round(r * 255)));
    g = Math.max(0, Math.min(255, Math.round(g * 255)));
    b = Math.max(0, Math.min(255, Math.round(b * 255)));
    
    return {r, g, b};
}

// Color blindness simulation functions
function simulateProtanopia(r, g, b) {
    // Protanopia simulation (missing L-cones)
    return {
        r: Math.round(0.567 * r + 0.433 * g + 0 * b),
        g: Math.round(0.558 * r + 0.442 * g + 0 * b),
        b: Math.round(0.242 * r + 0.758 * b)
    };
}

function simulateDeuteranopia(r, g, b) {
    // Deuteranopia simulation (missing M-cones)
    return {
        r: Math.round(0.625 * r + 0.375 * g + 0 * b),
        g: Math.round(0.7 * r + 0.3 * g + 0 * b),
        b: Math.round(0.3 * r + 0.7 * b)
    };
}

function simulateTritanopia(r, g, b) {
    // Tritanopia simulation (missing S-cones)
    return {
        r: Math.round(0.95 * r + 0.05 * g + 0 * b),
        g: Math.round(0.433 * g + 0.567 * b),
        b: Math.round(0.475 * g + 0.525 * b)
    };
}

function setRGBExample(r, g, b) {
    document.getElementById('red').value = r;
    document.getElementById('green').value = g;
    document.getElementById('blue').value = b;
    updateRGB();
}

// RGB to HSI Calculator Functions
function calculateHSI() {
    const r = parseInt(document.getElementById('hsi-r-input').value) || 0;
    const g = parseInt(document.getElementById('hsi-g-input').value) || 0;
    const b = parseInt(document.getElementById('hsi-b-input').value) || 0;
    
    // Validate inputs
    if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
        alert('Please enter values between 0 and 255 for all RGB components.');
        return;
    }
    
    // Normalize RGB values to 0-1 range
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;
    
    // Calculate Intensity
    const intensity = (rNorm + gNorm + bNorm) / 3;
    
    // Calculate Saturation
    const minVal = Math.min(rNorm, gNorm, bNorm);
    const saturation = intensity === 0 ? 0 : 1 - (minVal / intensity);
    
    // Calculate Hue
    let hue = 0;
    if (saturation !== 0) {
        const numerator = 0.5 * ((rNorm - gNorm) + (rNorm - bNorm));
        const denominator = Math.sqrt((rNorm - gNorm) ** 2 + (rNorm - bNorm) * (gNorm - bNorm));
        
        if (denominator !== 0) {
            const theta = Math.acos(numerator / denominator);
            hue = bNorm <= gNorm ? theta : (2 * Math.PI - theta);
            hue = hue * (180 / Math.PI); // Convert to degrees
        }
    }
    
    // Update color preview
    const rgbColor = `rgb(${r}, ${g}, ${b})`;
    document.getElementById('hsi-color-preview').style.backgroundColor = rgbColor;
    
    // Show calculation steps
    document.getElementById('hsi-calc-steps').style.display = 'block';
    
    // Update normalized values
    document.getElementById('norm-r').textContent = rNorm.toFixed(3);
    document.getElementById('norm-g').textContent = gNorm.toFixed(3);
    document.getElementById('norm-b').textContent = bNorm.toFixed(3);
    
    // Update intensity calculation
    document.getElementById('hsi-intensity-calc').textContent = intensity.toFixed(3);
    
    // Update saturation calculation
    document.getElementById('min-value').textContent = minVal.toFixed(3);
    document.getElementById('hsi-saturation-calc').textContent = saturation.toFixed(3);
    
    // Update hue calculation
    document.getElementById('hsi-hue-calc').textContent = hue.toFixed(1) + '°';
    
    // Update final results
    document.getElementById('final-hue').textContent = hue.toFixed(1) + '°';
    document.getElementById('final-saturation').textContent = (saturation * 100).toFixed(1) + '%';
    document.getElementById('final-intensity-val').textContent = (intensity * 100).toFixed(1) + '%';
    
    // Show visual representation
    document.getElementById('hsi-visual').style.display = 'block';
    
    // Update hue wheel indicator
    const hueIndicator = document.getElementById('hue-indicator');
    const hueAngle = hue - 90; // Adjust for CSS rotation (0° = top)
    hueIndicator.style.transform = `rotate(${hueAngle}deg)`;
    
    // Update saturation and intensity bars
    const saturationFill = document.getElementById('saturation-fill');
    const intensityFillHSI = document.getElementById('intensity-fill-hsi');
    
    saturationFill.style.width = (saturation * 100) + '%';
    intensityFillHSI.style.width = (intensity * 100) + '%';
    
    document.getElementById('sat-percent').textContent = (saturation * 100).toFixed(1) + '%';
    document.getElementById('int-percent').textContent = (intensity * 100).toFixed(1) + '%';
    
    // Color the saturation bar based on hue
    const hueColor = `hsl(${hue}, 100%, 50%)`;
    saturationFill.style.background = `linear-gradient(90deg, #ccc, ${hueColor})`;
    
    // Color the intensity bar
    intensityFillHSI.style.background = `linear-gradient(90deg, #000, ${rgbColor})`;
    
    // Add animation effect
    document.getElementById('hsi-calc-steps').style.animation = 'slideIn 0.5s ease';
    document.getElementById('hsi-visual').style.animation = 'slideIn 0.5s ease';
}

function validateHSIInput() {
    const inputs = ['hsi-r-input', 'hsi-g-input', 'hsi-b-input'];
    inputs.forEach(id => {
        const input = document.getElementById(id);
        let value = parseInt(input.value);
        
        if (isNaN(value)) {
            input.value = 0;
        } else if (value < 0) {
            input.value = 0;
        } else if (value > 255) {
            input.value = 255;
        }
    });
}

function setHSICalculatorRGB(r, g, b) {
    document.getElementById('hsi-r-input').value = r;
    document.getElementById('hsi-g-input').value = g;
    document.getElementById('hsi-b-input').value = b;
    calculateHSI();
}
