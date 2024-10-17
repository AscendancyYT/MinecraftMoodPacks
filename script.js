const modPackForm = document.getElementById('modPackForm');
const modsRange = document.getElementById('modsRange');
const optimizationRange = document.getElementById('optimizationRange');
const totalCost = document.getElementById('totalCost');
const modsCount = document.getElementById('modsCount');
const optimizationLevel = document.getElementById('optimizationLevel');

const costPerMod = 1000;  // Cost per mod is now 1000 UZS
const costPerOptimization = 4000;  // Cost per optimization level is now 4000 UZS

function updateModsCount() {
  modsCount.textContent = modsRange.value;
  updateTotalCost();
}

function updateOptimizationLevel() {
  optimizationLevel.textContent = optimizationRange.value;
  updateTotalCost();
}

function updateTotalCost() {
  const total = (modsRange.value * costPerMod) + (optimizationRange.value * costPerOptimization);
  totalCost.textContent = total;
}

modPackForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const telegram = document.getElementById('telegram').value;
  const theme = document.getElementById('theme').value;
  const mods = modsRange.value;
  const optimization = optimizationRange.value;
  const total = (mods * costPerMod) + (optimization * costPerOptimization);

  const orderDate = new Date().toLocaleDateString('en-GB');

  const message = `New Order from ${name} (@${telegram})\nTheme: ${theme}\nMods: ${mods}\nOptimization Level: ${optimization}\nTotal Cost: ${total} UZS\nOrder Date: ${orderDate}`;

  const telegramConfig = {
    token: '7704101995:AAGiXCmmOJN064tVSa4hZO83jpV-lcbXVBI',
    chat_id: '-1002351928462',
    text: message
  };

  const telegramURL = `https://api.telegram.org/bot${telegramConfig.token}/sendMessage?chat_id=${telegramConfig.chat_id}&text=${encodeURIComponent(telegramConfig.text)}`;

  fetch(telegramURL)
    .then(response => {
      if (response.ok) {
        alert('Order submitted successfully!');
        modPackForm.reset();
        updateModsCount(); // Reset to 1 mod
        updateOptimizationLevel(); // Reset to 1 optimization level
      } else {
        alert('Failed to send the order to Telegram.');
      }
    })
    .catch(error => {
      alert('Error: ' + error.message);
    });
});
