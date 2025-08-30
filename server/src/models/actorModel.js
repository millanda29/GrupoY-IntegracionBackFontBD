export default class Actor {
  constructor({ id_actor, nombre, url_foto = null, status }) {
    this.id_actor = id_actor;
    this.nombre = nombre;
    this.url_foto = url_foto; // nuevo campo opcional
    this.status = status;
  }
}
