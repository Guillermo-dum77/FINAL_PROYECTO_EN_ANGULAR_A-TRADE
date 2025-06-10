# A-trade - Ecommerce en Angular con Blockchain

Este proyecto es una aplicación de comercio electrónico desarrollada en Angular, que integra un contrato inteligente en Solidity para gestionar productos y transacciones de forma descentralizada utilizando Web3, Ganache y Truffle.

---

## 📦 Instalación y Configuración

### 1. Clonar el repositorio

```
git clone https://github.com/Guillermo-dum77/FINAL_PROYECTO_EN_ANGULAR_A-TRADE.git
cd FINAL_PROYECTO_EN_ANGULAR_A-TRADE
```
### 2. Instalar las dependencias

```
npm install
```

### 3. Iniciar Ganache

Abre Ganache y selecciona o crea un espacio de trabajo. Usa el puerto 7545 (por defecto).

### 4. Compilar y migrar el Contrato

```
truffle compile
truffle migrate
```
### 5. Reemplazar ABI y dirección del contrato

Copia el contenido del ABI generado (Ecommerce.json) en el archivo:

```
src/assets/contract-config.json
```

Asegúrate de actualizar la dirección del contrato desplegado en la propiedad "contractAddress" de ese mismo archivo.

### 6. Importar cuenta de Ganache a MetaMask

Importa la clave privada de la primera cuenta de Ganache a MetaMask.

Conéctate a la red personalizada http://127.0.0.1:7545

### 7. Ejecutar la aplicación Angular

```
ng serve
```

## ⚠️ Posibles Riesgos en la Ejecución

No ejecutar Ganache o configurarlo en el puerto correcto (7545).

No actualizar correctamente la dirección del contrato o el ABI.

Usar una red incorrecta en MetaMask (debe ser localhost:7545).

No importar las cuentas de Ganache en MetaMask correctamente.

Migrar el contrato varias veces sin limpiar la red anterior.

## ✅ Pruebas Realizadas
Funcionalidad probada manualmente:

Agregar productos desde el panel de administrador.

Visualizar productos desde el panel de cliente (/shop).

Comprar productos desde ambas interfaces.

Verificación de estado del producto como "vendido" tras la compra.

### Pruebas automatizadas del contrato inteligente (Truffle)

```
truffle test
```
