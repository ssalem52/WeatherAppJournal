/* Global Variables */
const baseURI = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = '&appid=b08f99ec50b160ba0b254c262733988a&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    const newZip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getOpenWeatherData(baseURI,newZip, apiKey)
    .then(function(data){

        postData('/addWeatherData', {temp:data.main.temp, date:newDate, feelings:feelings})
    })
    .then(
        updateUI()
    )
}

//Async GET Request function to OpenWeather API
    const getOpenWeatherData = async (baseURI, zip, key)=>{

        const res = await fetch(baseURI+zip+key)
        try {
      
          const data = await res.json();
        //   console.log(data)
          return data;
        }  catch(error) {
          console.log("error", error);
          // appropriately handle the error
    }
}


// Post Data
const postData = async (url = '', data = {})=>{
console.log(data)
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        // console.log(newData);
        return newData
    }catch(error) {
        console.log("error", error);
    }

}

const updateUI = async () => {
    const request = await fetch('/projectData');
    try{
        const allData = await request.json();
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('content').innerHTML = allData.feelings;
    }catch(error){
        console.log("error", error);
      }
    }