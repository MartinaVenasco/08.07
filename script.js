const formEl = document.querySelector(".todoform");
const inputEl = formEl.querySelector("input");
const listEl = document.querySelector(".tasklist"); // lista

// const API_URL = "https://openlibrary.org/subjects/harry_potter.json";
const SITE_URL = "https://openlibrary.org";
const BASE_API_URL = "https://openlibrary.org/search.json?q=";
formEl.addEventListener("submit", function (event) {
  event.preventDefault();

  const inputValue = inputEl.value;
  const searchFormatted = inputValue.replaceAll(" ", "+");
  const apiURL = `${BASE_API_URL}/${searchFormatted}`;

  console.log("chiamata api", apiURL);
  fetch(apiURL)
    .then((response) => {
      const json = response.json();
      console.log({ json });
      return json;
    })
    .then((json) => {
      console.log(json);
      listEl.innerHTML = json.docs
        .map((doc) => {
          return `<li>${doc.title} <button data-key="${doc.key}">DETTAGLI</button></li>`;
        })
        // così togliamo la "," tra un elmento e l'altro
        .join("");
    })
    .catch((err) => {
      console.error(err);
      listEl.innerHTML = `${err}`;
      return [];
    })

    .finally(() => {
      console.log("questo è il finally");
    });
});
