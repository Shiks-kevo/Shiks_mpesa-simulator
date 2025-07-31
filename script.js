document.getElementById('simForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const method = document.getElementById('method').value;
  const name = document.getElementById('recipientName').value.trim().toUpperCase();
  const number = document.getElementById('recipientNumber').value.trim();
  const amount = parseFloat(document.getElementById('amount').value).toFixed(2);

  const transactionCode = generateCode();
  const now = new Date();
  const date = now.toLocaleDateString('en-GB'); // dd/mm/yyyy
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const balance = (Math.random() * 10000 + 100).toFixed(2); // Random balance Ksh100–10,000
  const dailyLimit = "499,970.00";

  let recipientLine = "";

  if (method === "pochi") {
    recipientLine = `sent to ${name} ${number}`;
  } else if (method === "till") {
    recipientLine = `sent to Till Number ${number}`;
  } else if (method === "paybill") {
    recipientLine = `sent to Paybill Number ${number}`;
  } else {
    alert("Please select a valid payment method.");
    return;
  }

  const message = `${transactionCode} Confirmed.\nKsh${amount} ${recipientLine}\non ${date} at ${time}.\nNew M-PESA balance is Ksh${balance}.\nTransaction cost, Ksh0.00.\nAmount you can transact within the day is ${dailyLimit}.\nEarn interest daily on Ziidi MMF, Dial *334#`;

  document.getElementById('messageText').innerText = message;
  document.getElementById('output').style.display = 'block';
});

function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ123456789';
  let code = '';
  for (let i = 0; i < 10; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function copyMessage() {
  const text = document.getElementById('messageText').innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert('Message copied to clipboard!');
  });
}
