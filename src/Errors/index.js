module.exports = {
  emptyStringField: (value, fild) => {
    if (value.length === 0 || typeof value !== "string") {
      throw new Error(`Gentileza preencher o campo ${fild} corretamente.`);
    }
  },

  maximumSizeField: (value, fild, size) => {
    if (value.length > size) {
      throw new Error(
        `${fild} excede o tamanho máximo permitido (maxímo caracteres = ${size}).`
      );
    }
  },

  minimumSizeField: (value, fild, size) => {
    if (value.length < size) {
      throw new Error(
        `${fild} é menor que o tamanho minimo exigido (mínimo caracteres = ${size}).`
      );
    }
  },

  notFound: (entity) => {
    throw new Error(`Não foi localizado ${entity} na base de dados`)
  }
};