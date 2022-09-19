const url = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
const loadingElement = document.querySelector("#loading");
const postsContainer = document.querySelector("#posts-container");
const inputName = document.querySelector("#nome");

// função para encontrar o nome passado pelo input
const btn = document.querySelector("#botao")
btn.addEventListener('click', function (e) {
  e.preventDefault();
  const nmPoke = document.querySelector("#nome");
  getPokemonData(nmPoke.value.toLowerCase());
  inputName.value = '';
  postsContainer.innerHTML = '';
})

async function getPokemonData(nmPoke) {
  // requisição da API para trazer nome e url de todos os pokemon disponíveis
  const response = await fetch(`${url}`);
  const data = await response.json();
  console.log(data.results)

  // array para verificação de nome
  const arrayNomes = [];
  data.results.forEach((result) => {
    arrayNomes.push(result.name);
  })

  // variável contendo o valor da url que será passada na segunda requisição
  const urlPoke = data.results[arrayNomes.indexOf(nmPoke)].url;

  // segunda requisição para trazer dados mais específicos de cada pokémon
  const requisicao2 = await fetch(urlPoke);
  const dadosPokemon = await requisicao2.json();
  console.log(dadosPokemon)

  if (arrayNomes.includes(dadosPokemon.species.name)) {
    const div = document.createElement("div");
    const number = document.createElement("p");
    const nome = document.createElement("h2");
    const tipo1 = document.createElement("p");
    const tipo2 = document.createElement("p");
    const linkAPI = document.createElement("a");
    const img = document.createElement("img");
    tipo1.innerText = `Tipo 1: ${dadosPokemon.types[0].type.name.toUpperCase()}`;
    number.innerText = `Número: ${dadosPokemon.id}`;
    if (dadosPokemon.types[1]) tipo2.innerText = `Tipo 2: ${dadosPokemon.types[1].type.name.toUpperCase()}`;
    nome.innerText = dadosPokemon.species.name.toUpperCase();
    linkAPI.innerText = "Mais informações";
    linkAPI.setAttribute("href", `https://bulbapedia.bulbagarden.net/wiki/${nmPoke}_(Pok%C3%A9mon)`);
    linkAPI.setAttribute("target", "_blank");
    img.setAttribute("src", dadosPokemon.sprites.front_default);
    div.appendChild(nome);
    div.appendChild(img);
    div.appendChild(number);
    div.appendChild(tipo1);
    div.appendChild(tipo2);
    div.appendChild(linkAPI);
    postsContainer.appendChild(div);
  } else {
    alert('Informe um nome válido');
  }
}