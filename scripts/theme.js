/**********************
Theme functions
***********************/ 
// html for dark mode toggle
{/* <section class="theme">
<div>
    <a href="/" class="theme" id="mode" mode="dark">🌙</a>                
</div>
</section> */}

// document.addEventListener('click', function (event) {
//     if (!event.target.matches('.theme')) return;
//     event.preventDefault();

//     let mode = event.target.getAttribute('mode');
//     let standings = document.getElementById('wg-api-football-standings');
//     if(!standings) standings = document.getElementById('wg-api-football-fixtures');

//     standings.innerHTML = '';

//     if (mode === 'dark') {
//         let body = document.querySelector('body')
//         let nav = document.querySelector('nav')
//         let a = document.querySelector('a')
//         let searchSection = document.querySelector('.search')
//         let popularSection = document.querySelector('.popularLeagues')
//         let toggleButton = document.getElementById('toggle-button');
//         body.style.backgroundColor = '#010000'
//         body.style.color = '#FFFFFF'
//         nav.style.backgroundColor = '#5D5D5D'
//         a.style.color = '#FFFFFF'
//         searchSection.style.backgroundColor = '#5D5D5D'
//         popularSection.style.backgroundColor = '#5D5D5D'
//         toggleButton.style.backgroundColor = '#010000'
//         toggleButton.style.borderColor = '#FFFFFF'
//         standings.setAttribute('data-theme', 'dark');
//         standings.style.backgroundColor = 'rgba(0, 0, 0, 0)';
//         event.target.setAttribute('mode', 'light');
//         event.target.textContent = '☀️';
//     } else if (mode === 'light') {
//         standings.setAttribute('data-theme', 'light');
//         event.target.setAttribute('mode', 'dark');
//         event.target.textContent = '🌙';
//         window.location.reload();
//     }

//     window.document.dispatchEvent(new Event('DOMContentLoaded', {
//         bubbles: true,
//         cancelable: true
//     }));
// });