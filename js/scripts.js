//Pokemon Array wrapped in IIFE

let pokemonRepository = (function () {
  let pokemonList = [
    { name: 'Bulbasaur', height: 7, type: ['grass, poison'] },
    { name: 'Butterfree', height: 3, type: ['bug', 'flying'] },
    { name: 'Charizard', height: 5, type: ['fire', 'flying'] },
  ];

  //Function to add list item button
  function addListItem(pokemon){
    let listContainer = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokeButton');
    listItem.appendChild(button);
    listContainer.appendChild(listItem)

    button.addEventListener('click', function(){
      showDetails(pokemon);
  });

  //To remove bullet points from list
  listContainer.style.listStyleType = 'none';

    //function to show pokemon details
   function showDetails(pokemon){
     console.log(pokemon);
  }
  }
  // Function to add pokemon items if consitions are met.
    function add(pokemon) {
     if (pokemon && typeof pokemon === 'object' && 'name' in pokemon && 'height' in pokemon && 'type' in pokemon)
    {
      pokemonList.push(pokemon);
     } else {
       console.log('Invalid input: $Json.stringify(pokemon) is not a valid pokemon');
     }
   }
  
  function getAll() {
    return pokemonList;
  }

  // to make pokemon list accessible outside of function
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
  };
})();
//adding pokemon to list if conditions are met
pokemonRepository.add({ name: "Pikachu", height: 0.3, type: ["electric"] });

//forEach loop over pokemon array
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon)
});

// *SUPRECEDED CODE!
// //loops through pokemonList variable
// for (let i = 0; i < pokemonList.length; i++) {
//   //extracts certain data and prints to DOM. html tags added for styling
//   if (pokemonList[i].height > 5) {
//     document.write('<div class="card"><span class="list-item">' + pokemonList[i].name + '</span> Height: ' + pokemonList[i].height + '. <br> That\'s a big Pokemon!</div>');
//   } else {
//     document.write('<div class="card"><span class="list-item">' + pokemonList[i].name + '</span> Height: ' + pokemonList[i].height + '</div>');
//   }
// }

  //extracts certain data and prints to DOM. html tags added for styling
//  if (pokemon.height > 5) {
//  document.write('<div class="card"><span class="list-item">' + pokemon.name + '</span> Height: ' + pokemon.height + '. <br> That\'s a big Pokemon!</div>');
// } else {
//  document.write('<div class="card"><span class="list-item">' + pokemon.name + '</span> Height: ' + pokemon.height + '</div>');
// }

