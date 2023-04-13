const mqtt = require('mqtt')

/***
 * Browser
 * Using MQTT over WebSocket with ws and wss protocols
 * EMQX's ws connection default port is 8083, wss is 8084
 * Note that you need to add a path after the connection address, such as /mqtt
 */
const url = 'mqtt://nat-serv/tasmota_83C121'
/***
 * Node.js
 * Using MQTT over TCP with mqtt and mqtts protocols
 * EMQX's mqtt connection default port is 1883, mqtts is 8883
 */
// const url = 'mqtt://broker.emqx.io:1883'

// Create an MQTT client instance
const options = {
  // Clean session
  clean: true,
  connectTimeout: 4000,
  // Authentication
  clientId: 'DVES_83C121',
  username: 'admin',
  password: 'admin',
}
const client  = mqtt.connect(url, options)
client.on('connect', function () {
  console.log('Connected')
  // Subscribe to a topic
  client.subscribe('tasmota_83C121', function (err) {
    if (!err) {
      // Publish a message to a topic
      client.publish('test', 'Hello mqtt')
      console.log("subscribed !")
    }
  })
})
/*
// Receive messages
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})

client.on('message', function (topic, payload, packet) {
    // Payload is Buffer
    console.log(`Topic: ${topic}, Message: ${payload.toString()}, QoS: ${packet.qos}`)
  })*/