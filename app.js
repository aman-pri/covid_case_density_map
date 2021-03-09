const check='working';

mapboxgl.accessToken = 'pk.eyJ1IjoiYW1hbnByaXlhZGFyc2hpIiwiYSI6ImNrbHA0MXY0czBpODAydW53OTBwYW0yb3AifQ.a68RRekqC6uSdcNhM1PK3Q';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/dark-v10',
zoom: 1.3,

});

const extreme=200000;
const high=100000;
const mid=50000;
const low=10000;
const a=[];

const getColorTotal = count=>{
  if(count>extreme)
  {
    return "red";
  }
  if (count>high)
  {
    return "orange";
  }
  if(count>mid)
  {
    return "yellow";
  }
  if(count>low)
  {
    return "green";
  }
  else
  {
      return "lightgreen";
  }

}

const getColorRecovered = count=>{
  if(count>200000)
  {
    return "red";
  }
  if(count>100000)
  {
    return "yellow";
  }
  else {
    {
      return "green";
    }
  }
}

const getColorVaccinated = count=>{
  if(count>200000)
  {
    return "red";
  }
  if(count>100000)
  {
    return "yellow";
  }
  else {
    {
      return "green";
    }
  }
}



const getColorDead = count=>{
  if(count>200000)
  {
    return "red";
  }
  if(count>100000)
  {
    return "yellow";
  }
  else {
    {
      return "green";
    }
  }
}


function showInfected()
{
  fetch("./places.json")
    .then(function(places){
      return places.json()
    })
    .then(function(places){
      places.forEach(place =>{
        new mapboxgl.Marker({
          color: getColorTotal(place.infected),
          scale: 0.6

        })
        .setLngLat([place.longitude, place.latitude])
        .addTo(map);

      });
    });

}


function showRecovered()
{
  fetch("./places.json")
    .then(function(places){
      return places.json()
    })
    .then(function(places){
      places.forEach(place =>{
        new mapboxgl.Marker({
          color: getColorTotal(place.recovered),
          scale: 0.6

        })
        .setLngLat([place.longitude, place.latitude])
        .addTo(map);

      });
    });

}


function showVaccinated()
{
  fetch("./places.json")
    .then(function(places){
      return places.json()
    })
    .then(function(places){
      places.forEach(place =>{
        new mapboxgl.Marker({
          color: getColorTotal(place.vaccinated),
          scale: 0.6

        })
        .setLngLat([place.longitude, place.latitude])
        .addTo(map);

      });
    });

}


function showDead()
{
  fetch("./places.json")
    .then(function(places){
      return places.json()
    })
    .then(function(places){
      places.forEach(place =>{
        new mapboxgl.Marker({
          color: getColorTotal(place.dead),
          scale: 0.6
        })


        .setLngLat([place.longitude, place.latitude])
        .addTo(map);

      });
    });

}


let dropdown = document.getElementById('locality-dropdown');
dropdown.length = 0;

let defaultOption = document.createElement('option');
defaultOption.text = 'Choose State/Province';

dropdown.add(defaultOption);
dropdown.selectedIndex = 0;

fetch("./places.json")
  .then(function(places){
    return places.json()
  })
  .then(function(places){
    let option;
    places.forEach(place =>{
      option = document.createElement('option');
      option.text = place.name;
      option.value = place.name;
      dropdown.add(option);

    });
  });





  function getOption() {
    var text = dropdown.options[dropdown.selectedIndex].text;
    let i;
    let r;
    let v;
    let d;


    fetch("./places.json")
      .then(function(places){
        return places.json()
      })
      .then(function(places){

        places.forEach(place =>{
          if(place.name==text)
          {
            console.log(place.name);
            console.log(place.infected);
            i=place.infected;
            v=place.vaccinated;
            r=place.recovered;
            d=place.dead;

            var chart = new CanvasJS.Chart("chartContainer", {
              animationEnabled: true,
              theme: "dark2",
              title:{
                text: "Cases in "+text
              },
              axisY: {
                title: "CASES"
              },
              data: [{
                type: "column",
                showInLegend: true,
                legendMarkerColor: "grey",
                legendText: "TYPE",
                dataPoints: [
                  { y: i, label: "Infected" },
                  { y: r,  label: "Recovered" },
                  { y: v,  label: "Vaccinated" },
                  { y: d,  label: "Deceased" },

                ]
              }]
            });
            chart.render();
          }

        });
      });

    var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      theme: "dark2", // "light1", "light2", "dark1", "dark2"
      title:{
        text: text
      },
      axisY: {
        title: "CASES"
      },
      data: [{
        type: "column",
        showInLegend: true,
        legendMarkerColor: "grey",
        legendText: "TYPE",
        dataPoints: [
          { y: i, label: "Infected" },
          { y: r,  label: "Recovered" },
          { y: v,  label: "Vaccinated" },
          { y: d,  label: "Deceased" },

        ]
      }]
    });
    chart.render();
    //console.log(text);
  }



function showGraph()
{

}
