<template>
	<div class="childCircle" :style="childCircleBaseStyles" @mouseover="selfHoverIn" @mouseleave="selfHoverOut" :class="{ childCircleEnd: !withChilds, side }">
		<slot>
			{{ content[index].name }}
		</slot>
	</div>
</template>

<script>
import { tween, easing, delay, spring, chain } from 'popmotion'

export default {
	name: "mz-circle-menu-item",
	props: {
		content: {
			type: Array,
			required: true
		},
		index: {
			type: Number,
			required: true
		},
		radius: {
			type: Object,
			required: true
		},
		withChilds: {
			type: Boolean,
			default: a => false
		},
		side: {
			type: Boolean,
			default: a => false
		}
	},
	data () {
		return {
			selfBiasUpdateInterval: false,
			bias: {
				x: 0,
				y: 0
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
		childCircleBaseStyles () {
			return {
				left: this.bias.x + this.radius.inner + this.circleBasePosition.x + 'px',
				top: this.bias.y + this.radius.inner + this.circleBasePosition.y + 'px',
			}
		}
	},
	methods: {
		selfHoverIn () {
			console.log('in');
		},
		selfHoverOut () {
			console.log('out');
		}
	}
}
</script>

<style lang="less">
.childCircle {
	pointer-events: all;
	position: absolute;
	width: 100px;
	margin: -50px 0 0 -50px;
	line-height: 100px;
	height: 100px;
	user-select: none;
	transition: opacity 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}
.childCircleEnd {
	border-radius: 100%;
	background: #fff;
	box-shadow: 0 2px 6px 1px rgba(0, 0, 0, 0.2);
	&:hover {
		box-shadow: 0 2px 7px 2px rgba(0, 0, 0, 0.3);
		cursor: pointer;
	}
}
.side {
	opacity: 0.3;
}
</style>
