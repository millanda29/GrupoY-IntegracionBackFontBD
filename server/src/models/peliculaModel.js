export default class Pelicula {
  constructor({
    id_pelicula,
    titulo,
    anio,
    genero,
    duracion,
    descripcion,
    fecha_estreno,
    director,
    musica,
    historia,
    guion,
    url_portada,
    status
  }) {
    this.id_pelicula = id_pelicula;
    this.titulo = titulo;
    this.anio = anio;
    this.genero = genero;
    this.duracion = duracion;
    this.descripcion = descripcion;
    this.fecha_estreno = fecha_estreno;
    this.director = director;
    this.musica = musica;
    this.historia = historia;
    this.guion = guion;
    this.url_portada = url_portada;
    this.status = status;
  }
}
