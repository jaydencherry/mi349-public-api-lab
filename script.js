const pokemonForm = document.getElementById("pokemon-form");
const pokemonSearch = document.getElementById("pokemon-search");
const randomButton = document.getElementById("random-button");
const pokemonResult = document.getElementById("pokemon-result");
const statusMessage = document.getElementById("status-message");

// Request Pokemon information from the API
async function getPokemon(name) {
    statusMessage.textContent = "Loading Pokémon...";
    pokemonResult.innerHTML = "";

    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(name)}`
        );

        if (!response.ok) {
            throw new Error("Pokémon not found");
        }

        const pokemon = await response.json();

        console.log(pokemon);

        displayPokemon(pokemon);

        statusMessage.textContent = `Successfully found ${pokemon.name}!`;
    } catch (error) {
        statusMessage.textContent = "Could not find that Pokémon. Try again.";
        console.error(error);
    }
}
// Display Pokemon information on the page
function displayPokemon(pokemon) {
    const image = pokemon.sprites.other["official-artwork"].front_default;

    const types = pokemon.types.map(type => type.type.name).join(", ");

    const abilities = pokemon.abilities.map(ability => ability.ability.name).join(", ");

    const stats = pokemon.stats.map(stat => {
        return `<li>${stat.stat.name}: ${stat.base_stat}</li>`;
    }).join("");

    pokemonResult.innerHTML = `
        <article class="pokemon-card">
            <h3>${pokemon.name}</h3>

            <img src="${image}" alt="${pokemon.name} artwork">

            <p><strong>Pokédex Number:</strong> #${pokemon.id}</p>
            <p><strong>Type:</strong> ${types}</p>
            <p><strong>Abilities:</strong> ${abilities}</p>

            <h4>Base Stats</h4>
            <ul>
                ${stats}
            </ul>
        </article>
    `;
}
getPokemon("pikachu");