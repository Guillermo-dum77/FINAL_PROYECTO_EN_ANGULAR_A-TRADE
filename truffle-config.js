module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Dirección local
      port: 8545,            // Puerto estándar de Ganache
      network_id: "*",       // Cualquier red
    },
  },

  // Opciones para Mocha (opcional)
  mocha: {
    // timeout: 100000
  },

  // Configuración del compilador de Solidity
  compilers: {
    solc: {
      version: "0.8.21", // Asegúrate de que coincida con la versión que usas en el contrato
    }
  },

  // Truffle DB (opcional y desactivado por defecto)
  // db: {
  //   enabled: false
  // }
};
