const mqtt = require('mqtt')

const host = 'u80cea70.ala.us-east-1.emqxsl.com'
const port = '8084'
const topic = '/nodejs/mqtt'
const clientId = `mqtt_${Math.random().toString(36).slice(2)}`
const connectUrl = `mqtt://${host}:${port}`

if (argv[2] == 'listen') {
	listen()
} else if (argv[2] == 'post') {
	post(argv[3])
}

function connect() {
	return mqtt.connect(connectUrl, {
		clientId,
		clean: true,
		connectTimeout: 4000,
		username: 'luis',
		password: 'potato',
		reconnectPeriod: 1000
	})
}

function listen() {
	let client = connect()
	client.on('connect', () => {
		console.log('Connected')
		client.subscribe([topic], () => {
			console.log(`Subscribe to topic '${topic}'`)
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
		client.publish(topic, msg, { qos: 0, retain: false }, error => {
			if (error) console.error(error)
			else console.log('Message posted')
		})
	})
}
