<template>
	<path :d="linePath" stroke="white" fill="transparent" class="line" />
</template>

<script>
import { tween, easing, delay, spring, chain } from 'popmotion'

export default {
	props: ['content', 'index', 'radius'],
	data () {
		return {
			updateShiftInterval: false,
			shift: {
				from: {
					x: 1,
					y: 1
				},
				to: {
					x: 1,
					y: 1
				}
			}
		}
	},
	computed: {
		circleBasePosition () {
			let	r = this.radius.outer,
				angleOne = (Math.PI / 2) / this.content.length,
				angle = (this.index * angleOne + angleOne / 2)

			return {
				x: r * Math.cos(angle),
				y: r * Math.sin(angle)
			}
		},
		center () {
			return {
				x: this.radius.outer - (this.radius.outer - this.radius.inner),
				y: this.radius.outer - (this.radius.outer - this.radius.inner),
			}
		},
		childCircleBaseStyles () {
			return {
				left: this.bias.x + this.radius.inner + this.circleBasePosition.x + 'px',
				top: this.bias.y + this.radius.inner + this.circleBasePosition.y + 'px',
			}
		},
		cords () {
			let shift = this.shift

			return {
				from: {
					base: {
						x: this.center.x + this.circleBasePosition.x,
						y: this.center.y + this.circleBasePosition.y
					},
					bias: {
						x: -200 * shift.from.x,
						y: -10 + 100 * shift.from.y
					}
				},
				to: {
					base: {
						x: this.center.x,
						y: this.center.y
					},
					bias: {
						x: 200 * shift.to.x,
						y: -100 * shift.to.y
					}
				}
			}
		},
		linePath () {
			return 	`M${this.cords.from.base.x} ${this.cords.from.base.y}` +

					/* relative */

					`C ${this.cords.from.base.x + this.cords.from.bias.x} ` +
					`${this.cords.from.base.y + -this.cords.from.bias.y}, ` +
					`${this.cords.to.base.x + this.cords.to.bias.x} ` +
					`${this.cords.to.base.y + -this.cords.to.bias.y}, ` +

					/* absolute

					`C ${ this.cords.from.bias.x} ` +
					`${ -this.cords.from.bias.y}, ` +
					`${ this.cords.to.bias.x} ` +
					`${ -this.cords.to.bias.y}, ` +

					*/
					`${this.cords.to.base.x} ${this.cords.to.base.y}`
		}
	},
	methods: {
		updateShift () {
			let to = {
				from: { x: Math.random(), y: Math.random() * 2 - 1 },
				to: { x: Math.random(), y: Math.random() * 2 - 1 }
			}

			tween({ from: this.shift.from, to: to.from, duration: 0x1488, ease: easing.easeInOut }).start(v => this.shift.from = v)
			tween({ from: this.shift.to, to: to.to, duration: 0x1488, ease: easing.easeInOut }).start(v => this.shift.to = v)
		}
	},
	mounted () {
		this.updateShift()
		setTimeout(a => {
			this.updateShiftInterval = setInterval(a => this.updateShift(), 0x1488)//0x9C4
		}, 0x1488 / this.content.length * this.index)

	},
	beforeDestroy () {
		if (this.updateShiftInterval)
			clearInterval(this.updateShiftInterval)
	}
}
</script>

<style lang="less">
.line {
	stroke-width: 5px;
	//filter: drop-shadow( -5px -5px 30px #fff );
	filter:url(#dropshadow);
}
</style>
