const url = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
const loadingElement = document.querySelector("#loading");
const postsContainer = document.querySelector("#posts-container");

const btn = document.querySelector("#botao")
btn.addEventListener('click', function (e) {
  e.preventDefault();
  const nmPoke = document.querySelector("#nome");
  getPokemonName(nmPoke.value);
})

async function getPokemonName(nmPoke) {
  const response = await fetch(`${url}`);
  const data = await response.json();
  const arrayNomes = [];
  data.results.forEach((result) => {
    arrayNomes.push(result.name)
  })
  if (arrayNomes.includes(nmPoke)) {
    const div = document.createElement("div");
    const nome = document.createElement("h2");
    const urlAPI = document.createElement("a");
    nome.innerText = nmPoke.toUpperCase();
    urlAPI.innerText = "Mais informações";
    urlAPI.setAttribute("href", `https://bulbapedia.bulbagarden.net/wiki/${nmPoke}_(Pok%C3%A9mon)`);
    urlAPI.setAttribute("target", "_blank");
    div.appendChild(nome);
    div.appendChild(urlAPI);
    postsContainer.appendChild(div);
  }
}