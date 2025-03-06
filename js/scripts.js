let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function getAll() {
    return pokemonList;
  }
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
   // To access pokemon from API
   function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        console.log(json);
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
      //add details to the pokemon
      .then(function (details) {
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
        item.abilities = details.abilities
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // Function to add list item button
  function addListItem(pokemon) {
        let listContainer = document.querySelector('.list-group');
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item');        
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('btn', 'btn-primary');
        listItem.appendChild(button);
        listContainer.appendChild(listItem);
    
    
        button.addEventListener('click', () => showDetails(pokemon));
      }
    
      function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
          showModal(pokemon);
        });
      }
    
      // Function to show the modal
    function showModal(item) {
    
      $('#pokemon-name').text(item.name);
    
      $('#pokemon-image-front').attr("src", item.imageUrlFront);
    
      $('#pokemon-image-back').attr("src", item.imageUrlBack);
    
      $('#pokemon-height').text( "Height : " + item.height);
    
      $('#pokemon-weight').text("Weight : " + item.weight);
    
      let types = item.types.map(type => type.type.name).join(', ');
      $('#pokemon-types').text("Types: " + types);
    
      
      let abilities = item.abilities.map(ability => ability.ability.name).join(', ');
      $('#pokemon-abilities').text("Abilities: " + abilities);
    
     $('#modal-container').modal('show')
    
      }
    
      // Function to hide the modal
      function hideModal() {
         $('#modal-container').removeClass('is-visible');
      }
    
      window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();
        }
      })
    
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




// Add modal content
    // let pokemonName = document.createElement('h1');
    // pokemonName.innerText = title;

    // let pokemonHeight = document.createElement('p');
    // pokemonHeight.innerText = text;


    // let pokemonImage = document.createElement('img');
    // pokemonImage.setAttribute('src', img);
    // pokemonImage.setAttribute('width', '100%');
    // pokemonImage.setAttribute('height', '100%');

    // modal.appendChild(closeButtonElement);
    // modal.appendChild(pokemonName);
    // modal.appendChild(pokemonHeight);
    // modal.appendChild(pokemonImage);
    // modalContainer.appendChild(modal);


// // Load data - adListItem loaded last.
// pokemonRepository.loadList().then(function(){
//   pokemonRepository.getAll().forEach(function(pokemon){
//     pokemonRepository.addListItem(pokemon);
//   });
// })
  
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

