export default class Elenco {
  constructor({ id_elenco, id_pelicula, id_actor, personaje, url_personaje = null, status }) {
    this.id_elenco = id_elenco;
    this.id_pelicula = id_pelicula;
    this.id_actor = id_actor;
    this.personaje = personaje;
    this.url_personaje = url_personaje; // nuevo campo opcional
    this.status = status;
  }
}
