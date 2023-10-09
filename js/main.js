console.log(document.getElementsByTagName('h1'))
console.log(document.getElementsByTagName('h1')[0])
console.log(document.getElementsByTagName('h1')[0].innerHTML)


const apiKey = `2e75c13178802cda1d04720b10040415`
const apiURL = "http://api.openweathermap.org/geo/1.0/direct?q={city},{state},{country}&limit={limit}&appid=2e75c13178802cda1d04720b10040415"

const addWeather = (temp_max,temp_min,forecast,humidity) => {
    const html = `<div class="WeatherInfo">
    <div class="high_card mx-auto mb-5" style="width: 25rem;">
        <ul class="list-group list-group-flush">
        <li class="list-group-item bg-danger">High</li>
        <li class="list-group-item">${temp_max}</li>
        </ul>
    </div>
    <div class="low_card mx-auto mb-5" style="width: 25rem;">
        <ul class="list-group list-group-flush">
        <li class="list-group-item bg-success">Low</li>
        <li class="list-group-item">${temp_min}</li>
        </ul>
    </div>
    </div>
    `;
let card = document.getElementById("row1");
card.insertAdjacentHTML("afterbegin", html)

}


const getData = async (city,state,country)  =>{
    let response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=1&appid=2e75c13178802cda1d04720b10040415`)
   
    const data = await response.json()
    console.log(data)
    lat = data[0].lat
    lon = data[0].lon
    return {lat,lon}}

const btn = document.getElementById('submit-button')
console.log(btn)

btn.addEventListener('click', async () => {
    console.log('click')
 
    const city = document.getElementById('city').value
    const state = document.getElementById('state').value
    const country = document.getElementById('country').value

    const {lat,lon} = await getData(city,state,country)
    console.log(lat)
    console.log(lon)
    getWeather(lat,lon)
})

const getWeather = async (lat,lon) => {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2e75c13178802cda1d04720b10040415&units=imperial`)
    let data = await response.json()
    console.log(data)
    addWeather(data.main.temp_max,data.main.temp_min,data)
}