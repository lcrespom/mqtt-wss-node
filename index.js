const mqtt = require('mqtt')

const connectUrl = `mqtt://test.mosquitto.org`
const topic = '/nodejs/mqtt'

function connect() {
	console.log('Tring to connect to ' + connectUrl)
	return mqtt.connect(connectUrl)
}

function listen() {
	let client = connect()
	client.on('connect', () => {
		console.log('Connected')
		client.subscribe(topic, () => {
			console.log(`Subscribed to topic '${topic}'`)
		})
	})
	client.on('message', (topic, payload) => {
		console.log('Received Message:', topic, payload.toString())
	})
}

function post(msg) {
	if (!msg) {
		console.error('Error: missing message parameter')
		return
	}
	let client = connect()
	client.on('connect', () => {
		console.log('Connected')
		client.publish(topic, msg, error => {
			if (error) console.error(error)
			else console.log('Message posted')
			client.end()
		})
	})
}

if (process.argv[2] == 'listen') {
	listen()
} else if (process.argv[2] == 'post') {
	post(process.argv[3])
} else {
	console.error('Incorrect parameters')
}
