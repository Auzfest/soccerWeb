
async function getTeam(team, teamId, teamVenue) {
    const url = `https://${apiHost}/v3/players/squads?team=${teamId}`;
    const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-host': apiHost,
        'x-rapidapi-key': apiKey
        }
    };
try {
    const response = await fetch(url, options);
    const data = await response.json();
    const playerList = data.response;
    const players = playerList[0];

    console.log(players);
    console.log(team);
    const teamMain = document.getElementById('teamMain');
    teamMain.style.gridTemplateRows = '.1fr 0.5fr 0.3fr';
    const squaddiv = document.getElementById('squad');
    if (squaddiv.style.backgroundColor === 'transparent') {
        squaddiv.style.backgroundColor = '#E0E0E0';
        squaddiv.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)';
        squaddiv.style.display = 'grid';
    }
    const squadHeader = document.getElementById('squadHeader');
    if (squadHeader) {
        squadHeader.id = 'squadHeader';
        squadHeader.textContent = `${team.team.name} Squad`;
        squadHeader.style.textAlign = 'center';
        squadHeader.style.marginTop = '5rem';
        squaddiv.insertAdjacentElement('beforebegin', squadHeader);
    }
    // squaddiv.innerHTML = 'Players';
    squaddiv.className = 'squad';
    for (const [key, value] of Object.entries(players)){
        console.log(key, value);
        if (key == 'players') {
            value.forEach((player) => {
                const atag = document.createElement('a');
                atag.onclick = function() {
                    getSpecificPlayer(player.id, teamId);
                    return false
                        }
                const name = player.name;
                const number = player.number;
                const position = player.position;
                atag.textContent = `${name} - ${number} - ${position}`;
                squaddiv.appendChild(atag);
        })
    }
    }
    const teams = document.getElementById('teams');
    teams.className = 'specificTeam';


    return `<h2>${team.team.name}</h2>
    <img src="${team.team.logo}" alt="${team.team.name} logo">
    <p>${teamVenue}</p>
    <h3>Games</h3>
    <ul>
        <li>Total games played: ${team.fixtures.played.total}</li>
        <li>Wins: ${team.fixtures.wins.total}</li>
        <li>Losses: ${team.fixtures.loses.total}</li>
        <li>Draws: ${team.fixtures.draws.total}</li>
    </ul>
    <h3>Goals</h3>
    <ul>
        <li>For: ${team.goals.for.total.total}</li>
        <li>Against: ${team.goals.against.total.total}</li>
    </ul>`;


} catch (error) {
    console.error('Error fetching team:', error);
}
}



 async function getSpecificPlayer(playerId, teamId) {
    const url = `https://${apiHost}/v3/players?id=${playerId}&season=2023`;
    const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-host': apiHost,
        'x-rapidapi-key': apiKey
        }
    };
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        const player = data.response[0];
        console.log(player)
        const squaddiv = document.getElementById('squad');
        squaddiv.style.display = 'block';
        squaddiv.className = 'player';
        squaddiv.innerHTML = '';
        let playerNumber = "";
        if (player.player.number == null) {
            playerNumber = "No number";
        }
        else {
            playerNumber = player.player.number;
        }
        const atag = document.createElement('a');
        atag.onclick = function() {
            getSquadBack(teamId);
        }
        atag.textContent = 'Back to squad';
        squaddiv.appendChild(atag);
        let appearences = player.statistics[0].games.appearences;
        appearences = appearences.toFixed(0);

        const squaddivcontent = `<h2>${player.player.name}</h2>
        <img src="${player.player.photo}" alt="${player.player.name} photo">
        <h3>Nationality: ${player.player.nationality}</h3>
        <h3>Age: ${player.player.age}</h3>
        <h3>Position: ${player.statistics[0].games.position}</h3>
        <h3>Number: ${playerNumber}</h3>
        <h2>Season Statistics</h2>
        <h3>Rating: ${player.statistics[0].games.rating}</h3>
        <h3>Appearances: ${appearences}</h3>
        <h3>Goals: ${player.statistics[0].goals.total}</h3>
        <h3>Assists: ${player.statistics[0].goals.assists}</h3>
        <h3>
        `;
        squaddiv.insertAdjacentHTML("afterBegin",squaddivcontent);
        globalThis.scrollTo({ top: window.outerHeight/2 + 600 , left: 0, behavior: "smooth" });
    } catch (error) {
        console.error('Error fetching player:', error);
        const atag = document.createElement('a');
        atag.textContent = 'There was an error grabbing that player. <br> Click here to go back to squad';
        squaddiv.appendChild(atag);
    }
}

async function getSquadBack(teamId) {
    const url = `https://${apiHost}/v3/players/squads?team=${teamId}`;
    const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-host': apiHost,
        'x-rapidapi-key': apiKey
        }
    };
try {
    const response = await fetch(url, options);
    const data = await response.json();
    const playerList = data.response;
    const players = playerList[0];
    console.log(players);
    const squaddiv = document.getElementById('squad');
    squaddiv.className = 'squad';
    squaddiv.innerHTML = '';
    for (const [key, value] of Object.entries(players)){
        console.log(key, value);
        if (key == 'players') {
            value.forEach((player) => {
                const atag = document.createElement('a');
                atag.onclick = function() {
                    getSpecificPlayer(player.id, players);
                    return false
                        }
                const name = player.name;
                const number = player.number;
                const position = player.position;
                atag.textContent = `${name} - ${number} - ${position}`;
                squaddiv.appendChild(atag);
        })
    }
    }
} catch (error) {
    
}
}