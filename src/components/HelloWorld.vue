<template>
<div class="menuWrapper">
	<div class="mainButton" @click="mainCircleClickHandler">
		<svg class="menu">
			<path d="M10 15 40 15" class="menuL l1" />
			<path d="M10 25 40 25" class="menuL l1" />
			<path d="M10 35 40 35" class="menuL l1" />
		</svg>
		<div class="mainButtonVisible" :class="{ mainButtonActive: open }">
			<svg class="x">
				<path d="M15 15 35 35" class="xl x1" />
				<path d="M15 35 35 15" class="xl x2" />
			</svg>
		</div>
	</div>
	<div class="mainAction">
		<div class="shadowCiecle" :style="shadowCiecleStyles"/>
		<div class="mainCircle" :style="mainCircleStyles">
			<item :content="menuItems" :index="menuItemIndex" v-for="menuItem, menuItemIndex in menuItems" :key="menuItemIndex" :radius="mainCircle.radius" :style="childCircleBaseStyles" />
			<svg class="lines" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<filter id="dropshadow" height="130%">
						<feGaussianBlur  stdDeviation="3" /> <!-- stdDeviation is how much to blur -->
						<feOffset dx="2" dy="2" result="offsetblur"/> <!-- how much to offset -->

						<feComponentTransfer>
							<feFuncA type="linear" slope="1"/> <!-- slope is the opacity of the shadow -->
						</feComponentTransfer>

						<feMerge>
							<feMergeNode/> <!-- this contains the offset blurred image -->
							<feMergeNode in="SourceGraphic"/> <!-- this contains the element that the filter is applied to -->
						</feMerge>
					</filter>
				</defs>
				<connector
					:content="menuItems"
					:index="menuItemIndex"
					v-for="menuItem, menuItemIndex in menuItems"
					:key="menuItemIndex"
					:radius="mainCircle.radius" />
			</svg>
		</div>
	</div>
</div>
</template>

<script>
import {
	tween,
	easing,
	delay,
	spring,
	chain
} from 'popmotion'
import item from '@/components/item.vue'
import connector from '@/components/connector.vue'

export default {
	components: {
		item,
		connector
	},
	data() {
		return {
			open: false,
			menuItems: [{
					name: 'Home'
				},
				{
					name: 'Navalny'
				},
				{
					name: 'Politics'
				},
				{
					name: 'Politics'
				},
			],
			mainCircle: {
				radius: {
					inner: 0,
					outer: 30
				},
				shadow: {
					inner: 300,
					outer: 5
				}
			}
		}
	},
	computed: {
		mainCircleStyles() {
			let r = this.mainCircle.radius.outer * 2 + 'px'
			let bias = -(this.mainCircle.radius.outer) + 'px'
			let circleHeight = this.mainCircle.radius.outer - this.mainCircle.radius.inner
			if (circleHeight < 0) circleHeight = 0
			let border = `${circleHeight}px solid rgba(255, 255, 255, 1)`
			let boxShadow = `0 0 ${this.mainCircle.shadow.outer}px #fff,
							 inset 0 0 ${this.mainCircle.shadow.inner}px #fff`

			return {
				width: r,
				height: r,
				left: bias,
				top: bias,
				border,
				'box-shadow': boxShadow
			}
		},
		childCircleBaseStyles() {
			return {
				transform: `scale(${this.mainCircle.radius.inner / 300})`
			}
		},
		shadowCiecleStyles () {
			return {
				'box-shadow': `0 0 ${this.mainCircle.radius.inner * 2}px ${this.mainCircle.radius.inner}px rgba(0, 0, 0, 1)`
			}
		}
	},
	methods: {
		mainCircleClickHandler() {
			this.open ? this.mainCircleClose() : this.mainCircleOpen()
			this.open = !this.open
		},
		mainCircleOpen() {
			tween({
				from: this.mainCircle.shadow.outer,
				to: 150,
				duration: 300,
				ease: easing.easeInOut
			}).start(v => this.mainCircle.shadow.outer = v)


			delay(150).start({
				complete: e => tween({
					from: this.mainCircle.radius.outer,
					to: 300,
					duration: 500,
					ease: easing.easeInOut
				}).start(v => this.mainCircle.radius.outer = v)
			})

			delay(300).start({
				complete: e => tween({
					from: this.mainCircle.shadow.outer,
					to: 5,
					duration: 200,
					ease: easing.easeInOut
				}).start(v => this.mainCircle.shadow.outer = v)
			})

			//inner 350 950

			delay(350).start({
				complete: a => tween({
					from: this.mainCircle.radius.inner,
					to: 295,
					duration: 500,
					//ease: easing.easeInOut
				}).start(v => this.mainCircle.radius.inner = v)
			})

			delay(650).start({
				complete: a => tween({
					from: this.mainCircle.shadow.inner,
					to: 5,
					duration: 300,
					//ease: easing.easeInOut
				}).start(v => this.mainCircle.shadow.inner = v)
			})
		},
		mainCircleClose() {
			tween({
				from: this.mainCircle.shadow.inner,
				to: 150,
				duration: 150,
				//ease: easing.easeInOut
			}).start(v => this.mainCircle.shadow.inner = v)

			delay(150).start({
				complete: a => tween({
					from: this.mainCircle.radius.inner,
					to: 0,
					duration: 500,
					//ease: easing.easeInOut
				}).start(v => this.mainCircle.radius.inner = v)
			})

			delay(100).start({
				complete: e => tween({
					from: this.mainCircle.shadow.outer,
					to: 150,
					duration: 300,
					ease: easing.easeInOut
				}).start(v => this.mainCircle.shadow.outer = v)
			})

			delay(200).start({
				complete: e => tween({
					from: this.mainCircle.radius.outer,
					to: 50,
					duration: 500,
					ease: easing.easeInOut
				}).start(v => this.mainCircle.radius.outer = v)
			})

			delay(400).start({
				complete: e => tween({
					from: this.mainCircle.shadow.outer,
					to: 5,
					duration: 200,
					ease: easing.easeInOut
				}).start(v => this.mainCircle.shadow.outer = v)
			})
		}
	}
}
</script>

<style lang="less">
.menuWrapper {
    width: 50px;
    position: absolute;
    top: 30px;
    left: 30px;
    .mainButton {
        position: absolute;
        width: 50px;
        height: 50px;
        line-height: 50px;
        z-index: 25;
        cursor: pointer;
		.x {
			width: 100%;
			height: 100%;
			.xl {
				stroke: #c4c4c4;
				stroke-width: 4px;
			}
		}
		.menu {
			width: 100%;
			height: 100%;
			.menuL {
				stroke: #c4c4c4;
				stroke-width: 6px;
			}
		}
    }

    .mainButtonVisible {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        box-sizing: border-box;
        border-radius: 100%;
        transition: all 0.7s ease-in-out;
        z-index: 15;
        width: 50px;
        height: 50px;
        margin: -25px 0 0 -25px;
        transform: scale(0);
    }

    .mainButtonActive {
        background: #fff;
        box-shadow: 0 0 10px rgb(255, 255, 255);
        transform: scale(1);
    }

    .mainAction {
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        margin: 25px 0 0 25px;
		.shadowCiecle {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 19;
			background: rgba(0, 0, 0, 0.5);
			border-radius: 100%;
		}
        .mainCircle {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 20;
            background: transparent;
            //border: 10px solid #fff;
            box-sizing: border-box;
            width: 50px;
            height: 50px;
            border-radius: 100%;
            .lines {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
