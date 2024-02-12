const inp = document.querySelector(".ip-input");
const btn = document.querySelector(".get-info");
const form = document.querySelector(".input-div");
const ipInfo = document.querySelector(".ip-info");

const ipCard = document.querySelector(".ip-p");
const locationCard = document.querySelector(".location-p");
const timezoneCard = document.querySelector(".timezone-p");
const ispCard = document.querySelector(".isp-p");
const url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_Hlo1UiUhbEwwPKNYpFRk2fRxyjPyh&ipAddress=`;

document.addEventListener("DOMContentLoaded", async () => {
  const userIp = await getUserIp();

  if (!userIp) {
    return;
  }

  fetchInfo(userIp);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!inp.value) {
    return;
  }
  fetchInfo(inp.value);
});

const fetchInfo = async (ip) => {
  const res = await fetch(`${url}${ip}`);
  const data = await res.json();

  if (!data) {
    return;
  }

  ipCard.innerHTML = `${data.ip}`;
  ispCard.innerHTML = `${data.isp}`;
  timezoneCard.innerHTML = `UTC <span>${data.location.timezone}</span>`;
  locationCard.innerHTML = `${data.location.country}`;
  ipInfo.style.opacity = 1;

  renMap({ lat: data.location.lat, lng: data.location.lng });
};

const getUserIp = async () => {
  const res = await fetch("https://api.ipify.org/?format=json");
  const data = await res.json();
  return data.ip;
};

const renMap = (data) => {
  const oldMap = document.getElementById("map");
  if (oldMap) {
    oldMap.remove();
  }

  const el = document.createElement("div");

  el.setAttribute("id", "map");

  document.querySelector(".container").appendChild(el);

  var map = L.map("map").setView([data.lat, data.lng], 13);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
  L.marker([data.lat, data.lng]).addTo(map).openPopup();
};
