window.resolution = (function (exports) {
    class Resolution {
        constructor() {
            this.scaleX = 1;
            this.scaleY = 1;
            this.loadNum = 0;
        }

        init(designWidth, designHeight, cb = new Function()) {
            this.designWidth = designWidth / 2;
            this.designHeight = designHeight / 2;
            this.container = document.querySelector('#Game');
            // this.onMobile = userAgent.indexOf('Mobile') > -1;
            const userAgent = window.navigator.userAgent.toLowerCase();
            this.onMobile = /mobile|android|iphone|ipad|ipod|windows phone|blackberry/i.test(userAgent);
            const userAgent2 = window.navigator.userAgent;
            this.onSafari = userAgent2.indexOf('Safari') > -1;
            window.addEventListener("resize", () => {
                requestAnimationFrame(this.resize.bind(this))
            });
            window.addEventListener("orientationchange", (e) => {
                requestAnimationFrame(this.resize.bind(this))
            });
            setTimeout(() => {
                this.resize();
                cb && cb();
            }, 0.1e3);
        }

        get clientWidth() {
            return window.innerWidth || document.body.clientWidth;
        }
        get clientHeight() {
            return window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight;
        }

        resize() {
            var scaleX = 1;
            var scaleY = 1;
            var canvasWidth = this.clientWidth;
            var canvasHeight = this.clientHeight;
            scaleX = scaleY = Math.min(scaleX, scaleY);
            canvasWidth = Math.ceil(this.clientWidth * scaleX);
            canvasHeight = Math.ceil(this.clientHeight * scaleY);
            if (typeof cc != 'undefined' && cc.game?.container) {
                const DESIGN_WIDTH = 1080;    // 竖屏设计宽
                const DESIGN_HEIGHT = 1920;  // 竖屏设计高
                const DESIGN_ASPECT_RATIO = DESIGN_WIDTH / DESIGN_HEIGHT; // 竖屏设计宽高比 ≈0.5625
                const currentAspectRatio = canvasWidth / canvasHeight;
                if (currentAspectRatio <= DESIGN_ASPECT_RATIO) {
                    cc.view.setDesignResolutionSize(DESIGN_WIDTH, DESIGN_HEIGHT, cc.view._rpFixedWidth);
                    console.log(`当前屏幕宽高比(${currentAspectRatio.toFixed(4)}) ≤ 设计宽高比(${DESIGN_ASPECT_RATIO})，宽适配模式`);
                } else {
                    cc.view.setDesignResolutionSize(DESIGN_WIDTH, DESIGN_HEIGHT, cc.view._rpFixedHeight);
                    console.log(`当前屏幕宽高比(${currentAspectRatio.toFixed(4)}) > 设计宽高比(${DESIGN_ASPECT_RATIO})，高适配模式`);
                }
                // }
            }
        }
    }
    return new Resolution();
}({}));