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
      let $listContainer = $('.list-group');
      let $listItem = $('<li>').addClass('list-group-item');      
      let $button = $('<button>').text(pokemon.name).addClass('btn btn-primary');
      $listItem.append($button);
      $listContainer.append($listItem);
    
        $button.on('click', function() {
          showDetails(pokemon);
      })
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
