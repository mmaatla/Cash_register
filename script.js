document.addEventListener("DOMContentLoaded", function () {
  const priceInput = document.getElementById("price");
  const cashInput = document.getElementById("cash");
  const changeDueDiv = document.getElementById("change-due");
  const changeLeftDiv = document.getElementById("change-left");
  const purchaseBtn = document.getElementById("purchase-btn");
  const updateCidBtn = document.getElementById("update-cid-btn");

  updateCidBtn.addEventListener("click", function () {
    updateCID();
  });

  purchaseBtn.addEventListener("click", function () {
    const price = parseFloat(priceInput.value);
    const cash = parseFloat(cashInput.value);

    if (isNaN(price) || isNaN(cash)) {
      alert("Please enter valid numbers for price and cash.");
      return;
    }

    if (cash < price) {
      alert("Customer does not have enough money to purchase the item");
      return;
    }

    if (cash === price) {
      changeDueDiv.textContent =
        "No change due - customer paid with exact cash";
      return;
    }

    const cid = getCID();
    const result = calculateChange(price, cash, cid);
    changeDueDiv.textContent = result;
  });

  function calculateChange(price, cash, cid) {
    const currencyUnits = {
      PENNY: 0.01,
      NICKEL: 0.05,
      DIME: 0.1,
      QUARTER: 0.25,
      ONE: 1,
      FIVE: 5,
      TEN: 10,
      TWENTY: 20,
      "ONE HUNDRED": 100,
    };

    let change = cash - price;
    let cidTotal = cid.reduce((sum, unit) => sum + unit[1], 0);
    let changeArr = [];

    if (change > cidTotal) {
      return "Status: INSUFFICIENT_FUNDS";
    } else if (change === cidTotal) {
      return `Status: CLOSED ${cid
        .map((unit) => `${unit[0]}: $${unit[1].toFixed(2)}`)
        .join(" ")}`;
    } else {
      for (let i = cid.length - 1; i >= 0; i--) {
        const unitName = cid[i][0];
        const unitValue = currencyUnits[unitName];
        let unitAmount = cid[i][1];
        let amountToReturn = 0;

        while (change >= unitValue && unitAmount > 0) {
          change -= unitValue;
          change = Math.round(change * 100) / 100;
          unitAmount -= unitValue;
          amountToReturn += unitValue;
        }

        if (amountToReturn > 0) {
          changeArr.push([unitName, amountToReturn]);
        }
      }

      if (change > 0) {
        return "Status: INSUFFICIENT_FUNDS";
      } else {
        return `Status: OPEN ${changeArr
          .map((unit) => `${unit[0]}: $${unit[1].toFixed(2)}`)
          .join(" ")}`;
      }
    }
  }

  function updateCID() {
    const cid = [
      ["PENNY", parseFloat(document.getElementById("cid-penny").value)],
      ["NICKEL", parseFloat(document.getElementById("cid-nickel").value)],
      ["DIME", parseFloat(document.getElementById("cid-dime").value)],
      ["QUARTER", parseFloat(document.getElementById("cid-quarter").value)],
      ["ONE", parseFloat(document.getElementById("cid-one").value)],
      ["FIVE", parseFloat(document.getElementById("cid-five").value)],
      ["TEN", parseFloat(document.getElementById("cid-ten").value)],
      ["TWENTY", parseFloat(document.getElementById("cid-twenty").value)],
      ["ONE HUNDRED", parseFloat(document.getElementById("cid-hundred").value)],
    ];
  }

  function getCID() {
    const cid = [
      ["PENNY", parseFloat(document.getElementById("cid-penny").value)],
      ["NICKEL", parseFloat(document.getElementById("cid-nickel").value)],
      ["DIME", parseFloat(document.getElementById("cid-dime").value)],
      ["QUARTER", parseFloat(document.getElementById("cid-quarter").value)],
      ["ONE", parseFloat(document.getElementById("cid-one").value)],
      ["FIVE", parseFloat(document.getElementById("cid-five").value)],
      ["TEN", parseFloat(document.getElementById("cid-ten").value)],
      ["TWENTY", parseFloat(document.getElementById("cid-twenty").value)],
      ["ONE HUNDRED", parseFloat(document.getElementById("cid-hundred").value)],
    ];
    return cid;
  }
});
