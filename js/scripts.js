const url = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
const loadingElement = document.querySelector("#loading");
const postsContainer = document.querySelector("#posts-container");
const inputName = document.querySelector("#nome");

// função para encontrar o nome passado pelo input
const btn = document.querySelector("#botao")
btn.addEventListener('click', function (e) {
  e.preventDefault();
  const nmPoke = document.querySelector("#nome");
  getPokemonName(nmPoke.value);
  inputName.value = '';
  postsContainer.innerHTML = '';
})


async function getPokemonName(nmPoke) {
  const response = await fetch(`${url}`);
  const data = await response.json();
  const arrayNomes = [];
  data.results.forEach((result) => {
    arrayNomes.push(result.name);
  })

  if (arrayNomes.includes(nmPoke)) {
    const div = document.createElement("div");
    const nome = document.createElement("h2");
    const tipo1 = document.createElement("p");
    const tipo2 = document.createElement("p");
    const linkAPI = document.createElement("a");
    const img = document.createElement("img");
    const urlPoke = data.results[arrayNomes.indexOf(nmPoke)].url;
    const response2 = await fetch(urlPoke);
    const data2 = await response2.json();
    console.log(data2)
    tipo1.innerText = data2.types[0].type.name;
    if (data2.types[1]) tipo2.innerText = data2.types[1].type.name;
    nome.innerText = nmPoke.toUpperCase();
    linkAPI.innerText = "Mais informações";
    linkAPI.setAttribute("href", `https://bulbapedia.bulbagarden.net/wiki/${nmPoke}_(Pok%C3%A9mon)`);
    linkAPI.setAttribute("target", "_blank");
    img.setAttribute("src", data2.sprites.front_default);

    div.appendChild(nome);
    div.appendChild(img);
    div.appendChild(tipo1);
    div.appendChild(tipo2);
    div.appendChild(linkAPI);
    postsContainer.appendChild(div);
  } else {
    alert('Informe um nome válido');
  }
}