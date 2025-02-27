//Pokemon Array wrapped in IIFE

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

// Function to add pokemon items if consitions are met!! 
function add(pokemon) {
  if (pokemon && typeof pokemon === 'object' && 
    'name' in pokemon  &&
    'detailsUrl' in pokemon){
    pokemonList.push(pokemon);
  } else {
    console.log('Invalid input: $Json.stringify(pokemon) is not a valid pokemon');
  }
}

function getAll() {
  return pokemonList;
}
  //Function to add list item button
function addListItem(pokemon){
    let listContainer = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokeButton');
    listItem.appendChild(button);
    listContainer.appendChild(listItem);
    //To remove bullet points from list
    listContainer.style.listStyleType = ('none')
    button.addEventListener('click', function(){
    showDetails(pokemon);
});
}

  //To access pokemon from API
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
})
.then(function (json) {
    json.results.forEach(function (item) {
      let pokemon = {
        name: item.name,
        detailsUrl: item.url
};
    add(pokemon);
});
})  
.catch(function (e) {
  console.error(e);
})
}

// Function to load pokemon details
function loadDetails(item) {
  let url = item.detailsUrl;
  return fetch(url).then(function (response) {
  return response.json();
  })
  .then(function (details) {
    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.types = details.types;
})  
.catch(function (e) {
  console.error(e);
});
}
    //function to show pokemon details
function showDetails(pokemon) {
  loadDetails(pokemon).then(function () {
    console.log(pokemon);
  });
}
      
   // to make pokemon list accessible outside of function
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };

})();

// Load data - adListItem loaded last.
pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
})
  
// *SUPRECEDED CODE!
//   // Function to add pokemon items if consitions are met!!
//     function add(pokemon) {
//      if (pokemon && typeof pokemon === 'object' && 'name' in pokemon && 'height' in pokemon && 'type' in pokemon)
//     {
//       pokemonList.push(pokemon);
//      } else {
//        console.log('Invalid input: $Json.stringify(pokemon) is not a valid pokemon');
//      }
//    }
  
//   function getAll() {
//     return pokemonList;
//   }

//   // to make pokemon list accessible outside of function!!
//   return {
//     add: add,
//     getAll: getAll,
//     addListItem: addListItem,
//   };

  
// })();
// //adding pokemon to list if conditions are met!!
// pokemonRepository.add({ name: "Pikachu", height: 0.3, type: ["electric"] });

// //forEach loop over pokemon array!!
// pokemonRepository.getAll().forEach(function (pokemon) {
//   pokemonRepository.addListItem(pokemon)
// });


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

