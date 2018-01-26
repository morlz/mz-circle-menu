<template>
<div class="menuWrapper" :style="mainStyles">
	<div class="mainButton" @click="mainCircleClickHandler">
		<slot name="button" :open="open">
			<svg class="menu">
				<path d="M10 15 40 15" class="menuL l1" />
				<path d="M10 25 40 25" class="menuL l1" />
				<path d="M10 35 40 35" class="menuL l1" />
			</svg>
		</slot>
		<div class="mainButtonVisible" :class="{ mainButtonActive: open }">
			<slot name="buttonX">
				<svg class="x">
					<path d="M15 15 35 35" class="xl x1" />
					<path d="M15 35 35 15" class="xl x2" />
				</svg>
			</slot>
		</div>
	</div>
	<div class="mainAction">
		<div class="shadowCiecle" :style="shadowCiecleStyles"/>
		<div class="mainCircle" :style="mainCircleStyles">
			<mz-circle-menu-item
				v-for="menuItem, menuItemIndex in menuItems"
				:content="menuItems"
				:index="menuItemIndex"
				:key="menuItemIndex"
				:radius="mainCircle.radius"
				:style="childCircleBaseStyles"
				:with-childs="!!menuItem.childs"
				:side="openedChildIndex != -1 && openedChildIndex != menuItemIndex"
				>
				<mz-circle-menu v-if="menuItem.childs" :items="menuItem.childs" top="50%" left="50%" with-margin ref="childs">
					<div class="childName" slot="button" :style="{ opacity: +!props.open }" slot-scope="props">
						{{ menuItem.name }}
					</div>
				</mz-circle-menu>
			</mz-circle-menu-item>

			<svg class="lines" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<filter id="dropshadow" height="130%">
						<feGaussianBlur  stdDeviation="3" />
						<feOffset dx="2" dy="2" result="offsetblur"/>

						<feComponentTransfer>
							<feFuncA type="linear" slope="1"/>
						</feComponentTransfer>

						<feMerge>
							<feMergeNode/>
							<feMergeNode in="SourceGraphic"/>
						</feMerge>
					</filter>
				</defs>
				<mz-circle-menu-connector
					v-for="menuItem, menuItemIndex in menuItems"
					:content="menuItems"
					:index="menuItemIndex"
					:key="menuItemIndex"
					:radius="mainCircle.radius"
					:side="openedChildIndex != -1 && openedChildIndex != menuItemIndex" />
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
import mzCircleMenuItem from '@/components/mzCircleMenuItem.vue'
import mzCircleMenuConnector from '@/components/mzCircleMenuConnector.vue'
import mzCircleMenu from '@/components/mzCircleMenu.vue'

export default {
	name: 'mz-circle-menu',
	props: {
		items: {
			type: Array,
			required: true
		},
		top: {
			type: String,
			default: a => "0"
		},
		left: {
			type: String,
			default: a => "0"
		},
		withMargin: {
			type: Boolean,
			default: a => false
		}
	},
	components: {
		mzCircleMenuItem,
		mzCircleMenuConnector,
		mzCircleMenu
	},
	data() {
		return {
			open: false,
			mainCircle: {
				radius: {
					inner: 0,
					outer: 50
				},
				shadow: {
					inner: 300,
					outer: 5
				}
			},
			openedChildRefIndex: -1
		}
	},
	watch: {
		open (n) {
			if (n) {
				this.$emit('open')
				this.mainCircleOpen()
			}

			if (!n) {
				this.$emit('close')
				this.mainCircleClose()
			}
		}
	},
	computed: {
		openedChildIndex () {
			if (this.openedChildRefIndex == -1) return -1
			let withChildsCount = 0
			for (var i = 0; i < this.items.length; i++) {
				if (this.items[i].childs) withChildsCount++
				if (withChildsCount == this.openedChildRefIndex + 1) {
					return i
				}
			}
			return -1
		},
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
				//'box-shadow': `0 0 ${this.mainCircle.radius.inner * 2}px ${this.mainCircle.radius.inner}px rgba(0, 0, 0, 1)`
			}
		},
		menuItems () {
			return this.items
		},
		mainStyles () {
			return {
				top: this.top,
				left: this.left,
				'margin-top': this.withMargin ? "-25px" : null,
				'margin-left': this.withMargin ? "-25px" : null,
			}
		}
	},
	methods: {
		checkOpenedChilds (index) {
			return a => {
				if (this.$refs.childs)
					this.openedChildRefIndex = this.$refs.childs.findIndex(vm => vm.open)
				else
					this.openedChildRefIndex = -1

				if (this.$refs.childs)
					this.$refs.childs.map((vm, vmIndex) => vmIndex != index ? vm.$emit('wannaClose') : null)
			}
		},
		closeEventHandler () {
			if (this.$refs.childs)
				this.$refs.childs.map(vm => vm.$emit('wannaClose'))

			this.open = false
		},
		mainCircleClickHandler() {
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
					to: 0,
					duration: 200,
					ease: easing.easeInOut
				}).start(v => this.mainCircle.shadow.outer = v)
			})

			delay(350).start({
				complete: a => tween({
					from: this.mainCircle.radius.inner,
					to: 300,
					duration: 500,
					//ease: easing.easeInOut
				}).start(v => this.mainCircle.radius.inner = v)
			})

			delay(650).start({
				complete: a => tween({
					from: this.mainCircle.shadow.inner,
					to: 0,
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
	},
	mounted () {
		this.$on('wannaClose', this.closeEventHandler)

		if (this.$refs.childs)
			this.$refs.childs.map((vm, index) => vm.$on(['open', 'close'], this.checkOpenedChilds(index)))
	},
	beforeDestroy () {
		this.$off('wannaClose', this.closeEventHandler)

		if (this.$refs.childs)
			this.$refs.childs.map((vm, index) => vm.$off(['open', 'close'], this.checkOpenedChilds(index)))
	}
}
</script>

<style lang="less">
.menuWrapper {
    width: 50px;
    position: absolute;
    .mainButton {
        position: absolute;
        width: 50px;
        height: 50px;
        line-height: 50px;
        z-index: 25;
        cursor: pointer;
		display: grid;
		align-items: center;
		justify-content: center;
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

		.childName {
			line-height: 18px;
			transition: all 0.3s ease-in-out;
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
			pointer-events: none;
            .lines {
				pointer-events: none;
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
