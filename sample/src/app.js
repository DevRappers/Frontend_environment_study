// import axios from "axios";
//
// document.addEventListener("DOMContentLoaded", async () => {
//   const res = await axios.get("api/users");
//
//   console.log(res);
//
//   document.body.innerHTML = (res.data || [])
//     .map(user => {
//       return `<div>${user.id}: ${user.name}</div>`;
//     })
//     .join("");
// });

import form from "./form";
import result from "./result";
import "./app.css";

let resultEl;
let formEl;

document.addEventListener("DOMContentLoaded", async () => {
  formEl = document.createElement("div");
  formEl.innerHTML = form.render();
  document.body.appendChild(formEl);

  resultEl = document.createElement("div");
  resultEl.innerHTML = await result.render();
  document.body.appendChild(resultEl);
});

if (module.hot) {
  console.log("핫모듈 켜짐.");

  module.hot.accept("./result", async () => {
    console.log("result module 변경됨.");
    resultEl.innerHTML = await result.render();
  });

  module.hot.accept("./form", async () => {
    console.log("form module 변경됨.");
    formEl.innerHTML = await form.render();
  });
}
