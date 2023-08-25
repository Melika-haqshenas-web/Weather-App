let locBtn = document.getElementById('location-button')
let pop = document.getElementById('popup')
let no = document.getElementById('no')
let closeBtn = document.getElementById('close-icon')
let _inp = document.getElementById('chose-location')
let locationName = document.getElementById('location')
let dayname = document.getElementById('dayname')
let day = document.getElementById('day')
let weatherTemp = document.getElementById('weather-temp')
let weatherDesc = document.getElementById('weather-desc')
let changeLoc = document.getElementById('changeloc')
let tempMax = document.getElementById('max_temp')
let tempMin = document.getElementById('min_temp')
let humidity = document.getElementById('humi')
let wind = document.getElementById('wind')
let day1 = document.getElementById('day1')
let day2 = document.getElementById('day2')
let day3 = document.getElementById('day3')
let day4 = document.getElementById('day4')
let dayTemp = document.querySelectorAll('.day-temp')
let _li = document.querySelectorAll('#week-list li')
let toast = document.getElementById('toast')
let weatherIcon = document.getElementById('weather-icon')
let iconInfo = document.querySelectorAll('.week-list>li>i')
console.log(iconInfo);
let lan = null
let lon = null
let kelTemp = null
let celTemp = null
let maxTemp = null
let minTemp = null
let hum = null
let win = null
let main = null
const apiKey = '9fb5356c702981a744c09899a74032cb'
let city = 'Tehran'

// SET DATE
const days = ["Sun" , "Mon" , "Tus" , "Wed" , "Thu" , "Fri" , "Sat"]
const fullDays = ['Sunday' , 'Monday' ,  'Tusday' , 'Wednsday' , 'Thursday' , 'Friday' , 'Saterday']
const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sepr", "Oct", "Nov", "Dec"];
const icon = [
    {Clear: 'bi bi-brightness-high'},
    {Thunderstorm: 'bi bi-cloud-lightning'},
    {Drizzle: 'bi bi-cloud-drizzle'},
    {Rain: 'bi bi-cloud-rain'},
    {Snow: 'bi bi-cloud-snow'},
    {Haze: 'bi bi-cloud-haze2'},
    {Mist: 'bi bi-cloud-fog2'},
    {Sand: 'bi bi-cloud-sun'},
    {Ash: 'bi bi-cloud-slash'},
    {Smoke: 'bi bi-cloud-haze2'},
    {Dust: 'bi bi-wind'},
    {Squall: 'bi bi-cloud-haze2'},
    {Fog: 'bi bi-cloud-fog2'},
    {Tornado: 'bi bi-tornado'},
    {Clouds: 'bi bi-cloud'}
]
let flag = ''
let _day = new Date()

// SET DATE INFO

let _dayNext2 = new Date(_day)
_dayNext2.setDate(_day.getDate() + 1)
let dayDay2 = _dayNext2.getDate() + ' 00:00:00'

let _dayNext3 = new Date(_day)
_dayNext3.setDate(_day.getDate() + 2)
let dayDay3 = _dayNext3.getDate() + ' 00:00:00'

let _dayNext4 = new Date(_day)
_dayNext4.setDate(_day.getDate() + 3)
let dayDay4 = _dayNext4.getDate() + ' 00:00:00'


day2.innerHTML = days[_dayNext2.getDay()]
day3.innerHTML = days[_dayNext3.getDay()]
day4.innerHTML = days[_dayNext4.getDay()]


// SET DATE CURRENT
nameDay = _day.getDay()

dayname.innerHTML = fullDays[nameDay]
day1.innerHTML = days[nameDay]
day.innerHTML = _day.getDate()+' '+ months[_day.getMonth()]+' '+_day.getFullYear();



// SET FIRST WEATHER

function showCurrent(city , apiKey){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(res1 => res1.json())
    .then(response1 =>{
        const weatherData = response1
        console.log(weatherData);
        kelTemp = weatherData.main.temp
        celTemp = changeKeltoCel(kelTemp)
        kelTemp = weatherData.main.temp_max
        maxTemp = changeKeltoCel(kelTemp)
        kelTemp = weatherData.main.temp_min
        minTemp = changeKeltoCel(kelTemp)
        weatherTemp.innerHTML = celTemp+'℃'
        dayTemp[0].innerHTML = celTemp+'℃'
        tempMax.innerHTML = maxTemp+'℃'
        tempMin.innerHTML = minTemp+'℃'

        //SET ICON
        main = weatherData.weather[0].main
        choseIcon(main, weatherIcon , 'weather-icon')
        choseIcon(main, iconInfo[0] , 'day-icon')
        



        locationName.innerHTML = weatherData.name+', ' + weatherData.sys.country
        weatherDesc.innerHTML = weatherData.weather[0].description
        humidity.innerHTML = weatherData.main.humidity + ' %'
        wind.innerHTML = Math.round(weatherData.wind.speed * 3.6) +' Km/h'



        lat = weatherData.coord.lat
        lon = weatherData.coord.lon
        showInfo(lat , lon)
    })
    .catch(function(err)
    {
        toast.style.display = 'flex'
        setTimeout(() => {
            toast.style.display = 'none'
        }, 3500);
    });
}showCurrent(city , apiKey)


function showInfo(lat , lon){
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then(res2 => res2.json())
    .then(response2 =>{
        const weatherForecasts = response2
        console.log(weatherForecasts);
        weatherForecasts.list.map((val)=>{
            let text = val.dt_txt
            text = text.slice(8 , 19)
            if(text == dayDay2){
                kelTemp = val.main.temp
                celTemp = changeKeltoCel(kelTemp)
                dayTemp[1].innerHTML = celTemp+'℃'

                main = val.weather[0].main
                choseIcon(main , iconInfo[1] , 'day-icon')

                _li[1].addEventListener('click' , ()=>{
                    kelTemp = val.main.temp
                    celTemp = changeKeltoCel(kelTemp)
                    nameDay = _dayNext2.getDay()
                    kelTemp = val.main.temp_max
                    maxTemp = changeKeltoCel(kelTemp)
                    kelTemp = val.main.temp_min
                    minTemp = changeKeltoCel(kelTemp)
                    hum = val.main.humidity
                    win = Math.round(val.wind.speed * 3.6)
                    let desc = val.weather[0].description
                    let date = _dayNext2.getDate()
                    let month = months[_dayNext2.getMonth()]
                    let year = _dayNext2.getFullYear()
                    main = val.weather[0].main
                    choseIcon(main , weatherIcon , 'weather-icon')
                    changeWeatherSide(desc , celTemp , nameDay , date , month ,  year , maxTemp , minTemp , hum , win)
                })
            }
            if(text == dayDay3){
                kelTemp = val.main.temp
                celTemp = changeKeltoCel(kelTemp)
                dayTemp[2].innerHTML = celTemp+'℃'

                main = val.weather[0].main
                choseIcon(main , iconInfo[2] , 'day-icon')

                _li[2].addEventListener('click' , ()=>{
                    kelTemp = val.main.temp
                    celTemp = changeKeltoCel(kelTemp)
                    nameDay = _dayNext3.getDay()
                    kelTemp = val.main.temp_max
                    maxTemp = changeKeltoCel(kelTemp)
                    kelTemp = val.main.temp_min
                    minTemp = changeKeltoCel(kelTemp)
                    hum = val.main.humidity
                    win = Math.round(val.wind.speed * 3.6)
                    let desc = val.weather[0].description
                    let date = _dayNext3.getDate()
                    let month = months[_dayNext3.getMonth()]
                    let year = _dayNext3.getFullYear()
                    main = val.weather[0].main
                    choseIcon(main , weatherIcon , 'weather-icon')
                    changeWeatherSide(desc , celTemp , nameDay , date , month ,  year , maxTemp , minTemp , hum , win)
                })
            }
            if(text == dayDay4){
                kelTemp = val.main.temp
                celTemp = changeKeltoCel(kelTemp)
                dayTemp[3].innerHTML = celTemp+'℃'

                main = val.weather[0].main
                choseIcon(main , iconInfo[3] , 'day-icon')

                _li[3].addEventListener('click' , ()=>{
                    kelTemp = val.main.temp
                    celTemp = changeKeltoCel(kelTemp)
                    nameDay = _dayNext4.getDay()
                    kelTemp = val.main.temp_max
                    maxTemp = changeKeltoCel(kelTemp)
                    kelTemp = val.main.temp_min
                    minTemp = changeKeltoCel(kelTemp)
                    hum = val.main.humidity
                    win = Math.round(val.wind.speed * 3.6)
                    let desc = val.weather[0].description
                    let date = _dayNext4.getDate()
                    let month = months[_dayNext4.getMonth()]
                    let year = _dayNext4.getFullYear()
                    main = val.weather[0].main
                    choseIcon(main , weatherIcon , 'weather-icon')
                    changeWeatherSide(desc , celTemp , nameDay , date , month ,  year , maxTemp , minTemp , hum , win)
                })
            }
        })
    })
}

function changeKeltoCel(KelTemp){
    let celTemp = Math.round(KelTemp-273.15)
    return celTemp
}

function choseIcon(main , wichI , className){
    for(let i in icon){
        let key = i;
        let val = icon[i]
        for(let j in val){
            let subKey = j;
            let subVal = val[j]
            if(subKey == main){
                wichI.setAttribute('class' , `${subVal} ${className}`)
                // if(className == 'weather-icon'){
                //     // console.log('yes');
                //     iconInfo[0].setAttribute('class' , `${subVal} day-icon`)
                // }
            }

        }
    
    }
}
// CLICK
_li.forEach((val)=>{
    val.addEventListener('click' , ()=>{
        _li.forEach((val) =>{
            val.classList.remove('active')
        })
        val.classList.add('active')
    })
})
_li[0].addEventListener('click' , ()=>{
    console.log(main);
    showCurrent(city , apiKey)
    nameDay = _day.getDay()
    dayname.innerHTML = fullDays[nameDay]
    day.innerHTML = _day.getDate()+' '+ months[_day.getMonth()]+' '+_day.getFullYear();
    choseIcon(main , weatherIcon , 'weather-icon')
})

function changeWeatherSide(desc , celTemp , nameDay , date , month ,  year , maxTemp , minTemp , hum , win){
    dayname.innerHTML = fullDays[nameDay]
    day.innerHTML = date+' '+ month+' '+year;
    weatherTemp.innerHTML = celTemp+'℃'
    weatherDesc.innerHTML = desc
    tempMax.innerHTML = maxTemp+'℃'
    tempMin.innerHTML = minTemp+'℃'
    humidity.innerHTML = hum + ' %'
    wind.innerHTML = win +' Km/h'
}

// SEARCH
function doClick(){
    city = _inp.value
    showCurrent(city , apiKey)
    _inp.value = null
    pop.style.display = 'none'
    no.style.display = 'none'
    _li[0].click()
}
changeLoc.addEventListener('click' , ()=>{
    doClick()
})
_inp.addEventListener('keyup' , ({key}) =>{
    if (key === "Enter") {
        doClick()
    }
})


// BTN CLOSE & BTN OPEN
locBtn.addEventListener('click' , ()=>{
    pop.style.display = 'flex'
    no.style.display = 'block'
})
closeBtn.addEventListener('click' , ()=>{
    pop.style.display = 'none'
    no.style.display = 'none'
})