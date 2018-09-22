function MakeDatePicker(mainElement, obj) {
  const months = {
    Jan: {
      name: "January",
      short: "Jan",
      number: 1,
      days: 31
    },
    Feb: {
      name: "February",
      number: 2,
      short: "Feb",
      days: 28
    },
    Mar: {
      name: "March",
      short: "Mar",
      number: 3,
      days: 31
    },
    Apr: {
      name: "April",
      short: "Apr",
      number: 4,
      days: 30
    },
    May: {
      name: "May",
      short: "May",
      number: 5,
      days: 31
    },
    Jun: {
      name: "June",
      short: "Jun",
      number: 6,
      days: 30
    },
    Jul: {
      name: "July",
      short: "Jul",
      number: 7,
      days: 31
    },
    Aug: {
      name: "August",
      short: "Aug",
      number: 8,
      days: 31
    },
    Sep: {
      name: "September",
      short: "Sep",
      number: 9,
      days: 30
    },
    Oct: {
      name: "October",
      short: "Oct",
      number: 10,
      days: 31
    },
    Nov: {
      name: "November",
      short: "Nov",
      number: 11,
      days: 30
    },
    Dec: {
      name: "December",
      short: "Dec",
      number: 12,
      days: 31
    }
  };

  const startYear = 1915;
  const mainContainer = document.querySelector(`${mainElement}`);
  let yearsData = "";
  for (let i = startYear; i <= new Date().getFullYear(); i++) {
    yearsData += `<option value="${i}"> ${i} </option>`;
  }
  let monthsData = "";
  Object.entries(months).forEach(([key, val]) => {
    monthsData += `<option value="${val.name}" > ${val.name} </option>`;
  });
  let dayeData = "";
  let currentMonthDayes = 31;
  function makeDays() {
    dayeData = "";
    for (let i = 1; i <= currentMonthDayes; i++) {
      dayeData += `<option value="${i}"> ${i} </option>`;
    }
    return dayeData;
  }
  makeDays();
  let hiddenInput = `<input type="hidden" name="date-picker" value="${
    mainContainer.getAttribute("data-date")
      ? mainContainer.getAttribute("data-date")
      : ""
  }" />`;
  function MakeHiddenValue() {
    let hiddenInput = document.querySelector(`[name="date-picker"]`);
    hiddenInput.value = "";
    let seperetSymbol = "-";
    document
      .querySelectorAll(".date-picker > select")
      .forEach((select, index) => {
        if (index === 2) {
          seperetSymbol = "";
        }
        if (select.getAttribute("data-type") === "month") {
          let currentMount = Object.entries(months).filter(([key, val]) => {
            return val.name === select.value;
          });
          currentMonthShortName = currentMount[0][1].short;
          hiddenInput.value += currentMonthShortName + seperetSymbol;
        } else {
          hiddenInput.value += select.value + seperetSymbol;
        }
      });
  }
  mainContainer.innerHTML = `<div class="date-picker"> <select data-type="day">${dayeData} </select>  <select data-type="month"> ${monthsData} </select> <select data-type="year">${yearsData} </select> ${hiddenInput} </div>`;
  document.querySelectorAll(".date-picker > select").forEach(select => {
    select.addEventListener("change", function(e) {
      switch (e.target.getAttribute("data-type")) {
        case "day":
          break;
        case "month":
          let daysContainer = mainContainer.querySelector(`[data-type="day"]`);
          let selectedDay = daysContainer.value;
          let currentMount = Object.entries(months).filter(([key, val]) => {
            return val.name === e.target.value;
          });
          currentMonthDayes = currentMount[0][1].days;
          let days = makeDays();
          daysContainer.innerHTML = days;
          if (selectedDay <= currentMonthDayes) {
            daysContainer.value = selectedDay;
          }
          break;
        case "year":
          break;
        default:
          break;
      }
      MakeHiddenValue();
    });
  });
  if (mainContainer.getAttribute("data-date")) {
    let date = mainContainer.getAttribute("data-date").split("-");
    document
      .querySelectorAll(".date-picker > select")
      .forEach((select, index) => {
        if (select.getAttribute("data-type") === "month") {
          let currentMount = Object.entries(months).filter(([key, val]) => {
            return val.short === date[index];
          });
          currentMonthFullName = currentMount[0][1].name;
          select.value = currentMonthFullName;
        } else {
          select.value = date[index];
        }
      });
  }
}
MakeDatePicker("#app", {});
