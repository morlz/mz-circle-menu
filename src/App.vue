<template>
<div id="app" :style="{ background: bg }">
	<img src="./assets/logo.png">
	<HelloWorld/>
</div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
	data () {
		return {
			bg: 'rgb(0, 0, 0)'
		}
	},
	components: {
		HelloWorld
	},
	methods: {
		getNum () {
			return Math.round(Math.random() * 255)
		}
	},
	mounted () {
		let upd = a => this.bg = `rgb(${this.getNum()}, ${this.getNum()}, ${this.getNum()})`
		upd()
		setInterval(upd, 3e3)
	}
}
</script>

<style>
body,
html {
	width: 100%;
	height: 100%;
	margin: 0;
	padding: 0;
}

#app {
	transition: background 3s ease-in-out;
	width: 100%;
	height: 100%;
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
