mapboxgl.accessToken =
  "pk.eyJ1IjoiZGVuaXMwZmYiLCJhIjoiY2t1ZTdtd2cwMDl5YzJxbnY4eGNiMm9vNiJ9.u0lk5q5JcHKO1UbK0rxg9g";
var map = new mapboxgl.Map({
  container: "contacts-map",
  center: [2.336442699576196,48.860873684102955],
  zoom: 15.8,
  style: "mapbox://styles/denis0ff/ckuea0f082xa017mv6rqk73e6",
});
map.addControl(new mapboxgl.NavigationControl());
const marker1 = new mapboxgl.Marker( {color: '#030303'})
.setLngLat([2.336337620511131,48.86090734107478])
.addTo(map);
 
const marker2 = new mapboxgl.Marker({ color: '#666666'})
.setLngLat([2.333344305782475,48.860109087714164])
.addTo(map);

const marker3 = new mapboxgl.Marker({ color: '#666666'})
.setLngLat([2.332874359105517,48.86191596091476])
.addTo(map);

const marker4 = new mapboxgl.Marker({ color: '#666666'})
.setLngLat([2.3366019690007533,48.86248904186195])
.addTo(map);

const marker5 = new mapboxgl.Marker({ color: '#666666'})
.setLngLat([2.3398382089669667,48.86079132028803])
.addTo(map);