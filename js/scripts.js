let pokemonList = [
  { name: 'Bulbasaur', height: 7, type: ['grass, poison'] },
  { name: 'Butterfree', height: 3, type: ['bug', 'flying'] },
  { name: 'Charizard', height: 5, type: ['fire', 'flying'] }
];

//loops through pokemonList variable
for (let i = 0; i < pokemonList.length; i++) {
  //extracts certain data and prints to DOM. html tags added for styling
  if (pokemonList[i].height > 5) {
    document.write('<div class="card"><span class="list-item">' + pokemonList[i].name + '</span> Height: ' + pokemonList[i].height + '. <br> That\'s a big Pokemon!</div>');
  } else {
    document.write('<div class="card"><span class="list-item">' + pokemonList[i].name + '</span> Height: ' + pokemonList[i].height + '</div>');
  }
}