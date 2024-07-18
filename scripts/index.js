const apiKey = 'ba130179camsh650617c22f14e76p172eacjsn0e2c1b317777';
const apiHost = 'api-football-v1.p.rapidapi.com';

/**********************
Search Box Visibility 
***********************/ 
function toggleSearchBox() {
    const searchBox = document.getElementById('search-box');
    const toggleButton = document.getElementById('toggle-button');
    if (searchBox.classList.contains('hidden')) {
        searchBox.classList.remove('hidden');
        toggleButton.innerHTML = '▲';
    } else {
        searchBox.classList.add('hidden');
        toggleButton.innerHTML = '▼';
    }
}

/**********************
Get and Update Current Season
***********************/ 

async function getCurrentSeason(leagueId) {
    const response = await fetch(`https://${apiHost}/v3/leagues?id=${leagueId}`, {
        method: 'GET',
        headers: {
            'x-rapidapi-host': apiHost,
            'x-rapidapi-key': apiKey
        }
    });
    const data = await response.json();
    const currentSeason = data.response[0].seasons.find(season => season.current).year;
    return currentSeason;
}

async function updateStandingsSeason(leagueId) {
    const currentSeason = await getCurrentSeason(leagueId);
    const standings = document.getElementById('wg-api-football-standings');
    const fixtures = document.getElementById('wg-api-football-fixtures');

    if (standings) {
    standings.setAttribute('data-season', currentSeason);
    }
    else if (fixtures) {
    const currentDate = getCurrentDate();
    fixtures.setAttribute('data-season', currentSeason);
    }
    else {
        console.log(currentSeason);
        return currentSeason;
    }

    window.document.dispatchEvent(new Event("DOMContentLoaded", {
        bubbles: true,
        cancelable: true
      }));
}

function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**********************
Event Listeners
***********************/ 

document.addEventListener('DOMContentLoaded', function () {
    let fixtures = document.getElementById('wg-api-football-fixtures');
    if (fixtures) fixtures.setAttribute('data-date', getCurrentDate());
});


document.addEventListener('click', function (event) {

    if (!event.target.matches('._link')) return
    event.preventDefault()
    
    let id = event.target.getAttribute('data-league')

    updateStandingsSeason(id);

    let standings = document.getElementById('wg-api-football-standings')
    if (standings) {
        standings.innerHTML = ''
        standings.setAttribute('data-league', id);

    }
    else {
        let fixtures = document.getElementById('wg-api-football-fixtures')
        fixtures.innerHTML = ''
        fixtures.setAttribute('data-league', id);
    }


    window.document.dispatchEvent(new Event("DOMContentLoaded", {
      bubbles: true,
      cancelable: true
    }));
});

document.addEventListener('DOMContentLoaded', () => {
    fetchCountries();
});

/**********************
Fetch and Set Functions
***********************/ 

const fetchCountries = async () => {
    const url = `https://${apiHost}/v3/countries`;
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
        const countries = data.response;
        const countriesDropdown = document.getElementById('countries');
        countries.forEach((country, index) => {
            const option = document.createElement('option');
            option.value = country.code;
            option.textContent = country.name;
            countriesDropdown.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
};

const fetchLeagues = async () => {
    const selectedCountry = document.getElementById('countries').value;
    if (!selectedCountry) return;

    const url = `https://${apiHost}/v3/leagues?code=${selectedCountry}`;
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
        const leagues = data.response;
        const leaguesDropdown = document.getElementById('leagues');
        leaguesDropdown.innerHTML = '';
        const option = document.createElement('option');
        option.value = -1;
        option.textContent = '--Select League--';
        leaguesDropdown.appendChild(option);
        leagues.forEach(league => {
            if (league.country.code === selectedCountry) {
            const option = document.createElement('option');
            option.value = league.league.id;
            option.textContent = league.league.name;
            leaguesDropdown.appendChild(option);
            }
        });
    } catch (error) {
        console.error('Error fetching leagues:', error);
    }
};

async function getTeams(leagueId) {
    // replace season=2023 with season=${updateStandingsSeason(leagueId)} when api is updated
    const url = `https://${apiHost}/v3/teams?league=${leagueId}&season=2023`;
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
    const teams = data.response;
    console.log(teams);
    const div = document.getElementById('teams');
    if (div.className === 'specificTeam') {
        div.className = 'teams';
    }
    div.innerHTML = '';
    const squaddiv = document.getElementById('squad');
    const squadHeader = document.getElementById('squadHeader');
    if (squaddiv.innerHTML === '') {
        squaddiv.style.display = 'grid';
        squaddiv.style.backgroundColor = '#E0E0E0';
        squaddiv.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)';
    }
    else {
        squaddiv.innerHTML = '';
        squaddiv.style.backgroundColor = 'transparent';
        squaddiv.style.boxShadow = 'none';
        squadHeader.innerHTML = '';
    }

    const teamMain = document.getElementById('teamMain');
    teamMain.style.gridTemplateRows = '.1fr 1fr 0fr';
    teams.forEach(team => {
        let teamId = team.team.id;
        let teamVenue = 'Venue: ' + team.venue.name + '<br> Location: ' + team.venue.city + ', ' + team.team.country;
        const atag = document.createElement('a');
        atag.href = `teams.html?team=${teamId}`;
        atag.onclick = function() {
            getSpecificTeam(leagueId, teamId, teamVenue);
            return false
                }
        const name = document.createElement('h2');
        name.textContent = team.team.name;
        name.style.textAlign = 'center';
        const image = document.createElement('img');
        image.src = team.team.logo;
        atag.append(name);
        atag.append(image);
        div.appendChild(atag);
    });

} catch (error) {
    console.error('Error fetching teams:', error);
}
}

async function getSpecificTeam(leagueId, teamId, teamVenue) {
    // replace season=2023 with season=${updateStandingsSeason(leagueId)}
    const url = `https://${apiHost}/v3/teams/statistics?season=2023&team=${teamId}&league=${leagueId}`;
    const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-host': apiHost,
        'x-rapidapi-key': apiKey
        }
    };
try {
    const div = document.getElementById('teams');
    div.innerHTML = 'Loading...';
    const response = await fetch(url, options);
    const data = await response.json();
    const team = data.response;
    const teamStats = await getTeam(team, teamId, teamVenue);
    if (teamStats) {
        const atag = document.createElement('a');
        atag.textContent = 'Back to Teams';
        atag.onclick = function() {
            getTeams(leagueId);
            return false
        }
        div.innerHTML = '';
        div.appendChild(atag);
        div.insertAdjacentHTML("afterBegin", teamStats);
    }
    

}
catch (error) {
    console.error('Error fetching teams:', error);
    globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}
}


const setTable = async () => {
    const selectedLeague = document.getElementById('leagues').value;

    try {
        const standings = document.getElementById('wg-api-football-standings');
        if (standings) {
            standings.innerHTML = '';
            standings.setAttribute('data-league', selectedLeague);
        }
        else if (document.getElementById('wg-api-football-fixtures')) {
            const fixtures = document.getElementById('wg-api-football-fixtures');
            fixtures.innerHTML = '';
            fixtures.setAttribute('data-league', selectedLeague);   
            let id = fixtures.getAttribute('data-league')
            updateStandingsSeason(id);
        }
        else {
            const response = getTeams(selectedLeague);
            console.log(response);

        }

        window.document.dispatchEvent(new Event("DOMContentLoaded", {
            bubbles: true,
            cancelable: true
    }));
    } catch (error) {
        console.error('Error fetching leagues:', error);
    }

};