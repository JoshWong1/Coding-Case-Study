const app = document.getElementById("root");
const title = document.createElement("h1");
const img = document.createElement("img");
const next = document.createElement("button");
const prev = document.createElement("button");
const date = document.createElement("p");
const transcript = document.createElement("p");
const br = document.createElement("p");
const textDiv = document.createElement("div");
var id = 0;

textDiv.className = "text";
title.textContent = "Cyber City Comics";
transcript.className = "text";
br.textContent = "";

next.textContent = "Next";
next.onclick = function (event) {
  id += 1;
  load();
};

prev.textContent = "Previous";
prev.onclick = function (event) {
  id -= 1;
  load();
};

let url_str = document.URL;
let url = new URL(url_str);
console.log(url_str);
if (url.searchParams.has("pg")) {
  id = parseInt(url.searchParams.get("pg"));
}
load();

function load() {
  // Create a request variable and assign a new XMLHttpRequest object to it.
  var request = new XMLHttpRequest();
  var num;
  if (id == 0) {
    num = "";
  } else {
    num = id + "/";
  }
  var queryParams = new URLSearchParams(window.location.search);
  queryParams.set("pg", id);
  history.replaceState(null, null, "?" + queryParams.toString());
  // Open a new connection, using the GET request on the URL endpoint
  request.open("GET", "https://xkcd.com/" + num + "info.0.json", true);

  request.onload = function () {
    if (request.status < 200 || request.status >= 400) {
      window.alert("Invalid page number");
    } else {
      // Begin accessing JSON data
      var data = JSON.parse(this.response);

      img.src = data.img;
      img.alt = data.alt;
      date.textContent =
        "Date released: " + data.month + "/" + data.day + "/" + data.year;
      transcript.textContent = data.transcript.replace(/[\[\]{()}]/g, "");

      app.appendChild(title);
      app.appendChild(prev);
      app.appendChild(next);
      app.appendChild(br);
      app.appendChild(img);

      if (id <= 0) {
        app.removeChild(prev);
      }
      app.appendChild(date);
      app.appendChild(textDiv);
      textDiv.appendChild(transcript);
    }
  };

  // Send request
  request.send();
}
