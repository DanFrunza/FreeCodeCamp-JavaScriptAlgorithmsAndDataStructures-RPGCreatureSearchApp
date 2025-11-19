const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const creatureName = document.getElementById("creature-name");
const creatureId = document.getElementById("creature-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");


searchButton.addEventListener("click", async () => {
    const nameOrId = searchInput.value;
    try {

        const res = await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${nameOrId}`);
        if (!res.ok) {
            alert("Creature not found");
            return;
        }

        const data = await res.json();
        
        creatureName.innerText = data.name;
        creatureId.innerText = data.id;
        weight.innerText = data.weight;
        height.innerText = data.height;

        types.innerHTML = "";
        data.types.forEach(t => {
            const span = document.createElement('span');
            span.innerText = t.name.toUpperCase();
            types.appendChild(span);
        });

        const getStatValue = (statName) => {
            const stat = data.stats.find(s => s.name === statName);
            return stat ? stat.base_stat : 'N/A';
        };

        hp.innerText = getStatValue('hp');
        attack.innerText = getStatValue('attack');
        defense.innerText = getStatValue('defense');
        specialAttack.innerText = getStatValue('special-attack');
        specialDefense.innerText = getStatValue('special-defense');
        speed.innerText = getStatValue('speed');

    }catch(err){
        
        console.error("Error fetching creature data:", err);
        alert("An error occurred while fetching creature data.");
        return;
    }
});