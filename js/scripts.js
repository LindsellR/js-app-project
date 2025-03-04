let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // Function to add pokemon items if conditions are met
  function add(pokemon) {
    if (pokemon && typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log(`Invalid input: ${JSON.stringify(pokemon)} is not a valid pokemon`);
    }
  }

  function getAll() {
    return pokemonList;
  }

  // Function to add list item button
  function addListItem(pokemon) {
    let listContainer = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokeButton');
    listItem.appendChild(button);
    listContainer.appendChild(listItem);

    // To remove bullet points from list
    listItem.style.listStyleType = 'none';

    button.addEventListener('click', () => showDetails(pokemon));
  }

  // To access pokemon from API
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
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
      });
  }

  // Function to load pokemon details
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        // return item;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // Function to show the modal
  function showModal(title, text, img) {
    let modalContainer = document.querySelector('#modal-container');

    // Clear existing modal content
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    // Add modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let pokemonName = document.createElement('h1');
    pokemonName.innerText = title;

    let pokemonHeight = document.createElement('p');
    pokemonHeight.innerText = text;


    let pokemonImage = document.createElement('img');
    pokemonImage.setAttribute('src', img);
    pokemonImage.setAttribute('width', '100%');
    pokemonImage.setAttribute('height', '100%');

    modal.appendChild(closeButtonElement);
    modal.appendChild(pokemonName);
    modal.appendChild(pokemonHeight);
    modal.appendChild(pokemonImage);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');

    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
  }

  // Function to hide the modal
  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  })

  // Function to show pokemon details
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon.name, `Height: ${pokemon.height}`, pokemon.imageUrl);
    });
  }

  // Return functions to be accessible outside the IIFE
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };

})();

// Load data - addListItem loaded last
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});


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

