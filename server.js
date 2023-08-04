const WebSocket = require('ws');

// Crear un servidor WebSocket en el puerto 8080 (o el puerto que desees)
const wss = new WebSocket.Server({ port: 8080 });

// Evento que se activa cuando un cliente se conecta al servidor WebSocket
wss.on('connection', (ws) => {
  console.log('Cliente conectado');

  ws.on('message', (message) => {
    console.log(`Mensaje recibido: ${message}`);

    // Decodificar el mensaje recibido desde la app móvil
    const decodedMessage = JSON.parse(message);

    // Verificar el tipo de medio enviado (imagen o video)
    const mediaType = decodedMessage.type;
    const mediaData = decodedMessage.data;

    // Aquí puedes procesar los datos según el tipo de medio
    if (mediaType === 'image' || mediaType === 'video') {
      // Enviar el contenido multimedia a la app móvil
      ws.send(JSON.stringify(decodedMessage));
    }
  });

  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});

console.log('Servidor WebSocket en ejecución en el puerto 8080');
