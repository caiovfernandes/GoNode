module.exports = {
  dialect: 'postgres',
  host: '127.0.0.1',
  username: 'postgres',
  password: 'docker',
  database: 'gonodemodulo2',
  operatorAliases: false,
  define: {
    timestamps: true, // Adiciona duas colunas à toda tabela, created at e updated at.
    underscored: true, // Para utilizar snake case.
    underscoredAll: true
  }
}
