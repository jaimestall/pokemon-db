const url = "https://ragnarokapi.herokuapp.com/api/v1.0/monster";
const loadingElement = document.querySelector("#loading");
const postsContainer = document.querySelector("#posts-container");

const btn = document.querySelector("#botao")
btn.addEventListener('click', function (e) {
  e.preventDefault();
  const idMonstro = document.querySelector("#id");
  const value = id.value;
  getAllPosts(value);
})


async function getAllPosts(idMon) {
  const response = await fetch(`${url}/${idMon}`);
  console.log(response)

  const data = await response.json();
  console.log(data);

  loadingElement.classList.add("hide");

  const div = document.createElement("div");
  const nome = document.createElement("h2");
  const urlAPI = document.createElement("a");

  nome.innerText = data.name;
  urlAPI.innerText = "Mais informações";
  urlAPI.setAttribute("href", `https://ratemyserver.net/index.php?page=mob_db&mob_id=${data.id}`)
  urlAPI.setAttribute("target", "_blank")

  div.appendChild(nome);
  div.appendChild(urlAPI);

  postsContainer.appendChild(div);
}