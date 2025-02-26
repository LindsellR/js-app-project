let pokemonRepository = (function () {
  let pokemonList = [
    { name: 'Bulbasaur', height: 7, type: ['grass, poison'] },
    { name: 'Butterfree', height: 3, type: ['bug', 'flying'] },
    { name: 'Charizard', height: 5, type: ['fire', 'flying'] }
  ];

  function add(pokemon) {
    if (typeof pokemon === 'object' && pokemon !== null
    ) {
      pokemonList.push(pokemon);
    } else {
      alert('Invalid input');
    }
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();


// //loops through pokemonList variable
// for (let i = 0; i < pokemonList.length; i++) {
//   //extracts certain data and prints to DOM. html tags added for styling
//   if (pokemonList[i].height > 5) {
//     document.write('<div class="card"><span class="list-item">' + pokemonList[i].name + '</span> Height: ' + pokemonList[i].height + '. <br> That\'s a big Pokemon!</div>');
//   } else {
//     document.write('<div class="card"><span class="list-item">' + pokemonList[i].name + '</span> Height: ' + pokemonList[i].height + '</div>');
//   }
// }

pokemonRepository.getAll().forEach(function (pokemon) {
  let listContainer = document.querySelector('.pokemon-list');
  let listItem = document.createElement('li');
  let button = document.createElement('button');
  button.innerText = pokemon.name;
  button.classList.add('pokeButton');
  listContainer.appendChild(button);

  //extracts certain data and prints to DOM. html tags added for styling
//  if (pokemon.height > 5) {
//  document.write('<div class="card"><span class="list-item">' + pokemon.name + '</span> Height: ' + pokemon.height + '. <br> That\'s a big Pokemon!</div>');
// } else {
//  document.write('<div class="card"><span class="list-item">' + pokemon.name + '</span> Height: ' + pokemon.height + '</div>');
// }
});
