import L from "leaflet";
import logobleu from './images/logo bleu.png';
import logorouge from './images/logo rouge.png';

export var userIcon = L.icon({
  iconUrl: logobleu,
  iconSize: [36, 41],
  iconAnchor: [18, 41],
  popupAnchor: [0, -41],
});

export var otherIcon = L.icon({
  iconUrl: logorouge,
  iconSize: [36, 41],
  iconAnchor: [18, 41],
  popupAnchor: [0, -41],
});
