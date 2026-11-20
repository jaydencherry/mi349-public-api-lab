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

        statusMessage.textContent = `Successfully found ${pokemon.name}!`;
    } catch (error) {
        statusMessage.textContent = "Could not find that Pokémon. Try again.";
        console.error(error);
    }
}

// Test the API connection
getPokemon("pikachu");