
export default function(city, src) {
  url = "";
  if (src == "city"){
    let rootURL = 'http://167.71.206.17/cityname?name=';
    url = `${rootURL}${city}`;
  } else {
    let rootURL = 'http://167.71.206.17/latlong?latlong=';
    lat = city[0];
    long = city[1];
    url = `${rootURL}${lat},${long}`;
  }
  console.log(url);
  return fetch(url)
  .then(response => response.text())
  .then(result => JSON.parse(result))
  .catch(error => console.log('error', error));
}
