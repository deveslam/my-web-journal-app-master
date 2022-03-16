// API Key from OpenWeatherMap
const apiKey = "c4868332b8d415611db25163166d9c4c";
const apiUrl = "http://localhost:8080/";

/* Global Variables */
const zipCodeElement = document.getElementById('zip');
const feelingsCodeElement = document.getElementById('feelings');
const tempElement = document.getElementById('temp');
const dateElement = document.getElementById('date');
const contentElement = document.getElementById('content');

// Creating catchError function
const catchError = (error) => console.error('We found some errors => ', error);

// Add function to existing HTML element by AddEventListener
document.getElementById('generate').addEventListener('click', onClickGenerate);

// Post data to API
function onClickGenerate() {
    let data = {
        zipCode: zipCodeElement.value,
        content: feelingsCodeElement.value,
        date: new Date()
    };

    //Post data to API to get ZIP info
    getZipCodeInfo(data.zipCode).then(zipInfo => {
        //Return and alert if city not found
        if (zipInfo.cod != 200)
            return alert(zipInfo.message)

        // Post data to server to be saved and displayed
        data.temp = zipInfo.list[0].main.temp;
        postDateToServer(data);
    }).catch(catchError);
};

// Get ZIP code information from API via Async function
async function getZipCodeInfo(zipCode) {
    return await (await fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}${apiKey}`)).json()
}

// Post data to Server to be saved
async function postDateToServer(data) {
    let response = await fetch(`${apiUrl}postData`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    try {
        if (!response.ok) {
            alert('Unsuccessful Process!');
            return;
        }
        response.json().then(data => {
            if (response.ok)
                updateUI();//Update UI
            else
                alert('Unsuccessful Process!');
        }).catch(catchError);

    } catch (error) {
        catchError(error);
    }
}

// Update UI function
async function updateUI() {
    let response = await fetch(`${apiUrl}getAll`);
    try {
        response.json().then(data => {
            dateElement.innerHTML = `Date Is: ${data.date}`;
            tempElement.innerHTML = `Temp Is: ${data.temp}`;
            contentElement.innerHTML = `My Feelings Is: ${data.content}`;
        }).catch(catchError);
    } catch (error) {
        catchError(error);
    }
}
/* Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
*/