<template>
<div id="app" :style="{ background: bg }">
	<img src="./assets/logo.png">
	<mz-circle-menu :items="menuItems" top="30px" left="30px" />
</div>
</template>

<script>
import mzCircleMenu from './components/mzCircleMenu'

export default {
	name: "App",
	data () {
		return {
			bg: 'rgb(0, 0, 0)',
			menuItems: [{
					name: 'Home'
				},
				{
					name: 'Navalny'
				},
				{
					name: 'Puten',
					childs: [
						{
							name: "Nalog",
							childs: [
								{
									name: "DACHA",
									childs: [
										{
											name: "KREML",
											childs: [
												{ name: "RKN" },
												{ name: "MVD" },
												{ name: "SBER" },
												{ name: "USA" },
											]
										},
										{ name: "Krem" },
									]
							 	},
								{ name: "Armiya" },
								{ name: "FSB" },
								{ name: "MVD" },
							]
						},
						{ name: "Krem" },
					]
				},
				{
					name: 'Medvedev ZHULIK',
					childs: [
						{
							name: "Nalog",
							childs: [
								{ name: "Bagam,i" },
								{ name: "YAHTA" },
								{ name: "YAHTA2" },
							]
						},
						{ name: "srok" },
					]
				},
			],
		}
	},
	components: {
		mzCircleMenu
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
