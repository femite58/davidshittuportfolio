class FlexSliderComponent {
    carouselParent;
    flexCont;
    slideItems;
    prev;
    next;
    transition = '0.6s ease';
    interval = 5000;
    isMarquee = false;

    slideResizeConfig;
    autoSlide = false;
    infiniteSlide = false;

    autoSlideVar;

    draggable = false;

    initialSlidePos = 0;
    draggingPos = 0;
    initialXPos;
    minPos;
    showSlideNo;

    spaceBtwItem;
    slideExt;
    parW;
    flexW;

    dragEvHolder;
    stopDragEvHolder;
    realTimeResponsive = true;

    constructor({
        slideResizeConfig,
        autoSlide,
        infiniteSlide,
        selector,
        transition,
        interval,
        isMarquee,
        responsive,
    }) {
        this.slideResizeConfig = slideResizeConfig;
        this.autoSlide = autoSlide;
        this.infiniteSlide = infiniteSlide;
        this.transition = transition;
        this.interval = interval;
        this.isMarquee = isMarquee;
        this.realTimeResponsive = responsive;
        this.carouselParent = document.querySelector(selector);
        this.ngAfterViewInit();
    }

    ngOnInit() {}

    ngOnDestroy() {
        this.winResEv(false);
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.flexCont = this.carouselParent.querySelector('.flexCont');
            this.slideItems = this.flexCont.querySelectorAll('.carouselItem');
            this.next = this.carouselParent.querySelector('.next');
            this.prev = this.carouselParent.querySelector('.prev');
            this.responsive();
            if (this.realTimeResponsive) {
                this.winResEv(true);
            }
        }, 100);
    }

    winResEv(add) {
        const me = this;
        function resize() {
            me.responsive();
        }
        if (add) {
            window.addEventListener('resize', resize);
        } else {
            window.removeEventListener('resize', resize);
        }
    }

    responsive() {
        this.parW = +getComputedStyle(this.carouselParent).width.replace(
            'px',
            ''
        );
        let pL = +getComputedStyle(this.carouselParent).paddingLeft.replace(
            'px',
            ''
        );
        let pR = +getComputedStyle(this.carouselParent).paddingRight.replace(
            'px',
            ''
        );
        this.stopAutoSlide();
        this.parW = this.parW - pL - pR;
        this.spaceBtwItem = +getComputedStyle(
            this.slideItems[0]
        ).marginRight.replace('px', '');
        let condition = '';
        for (let eachConf of this.slideResizeConfig) {
            if (!eachConf.maxW) {
                condition += `if (this.parW >= ${eachConf.minW}) {
          this.genSlideNo(${eachConf.slideNo});
        }`;
            } else if (!eachConf.minW) {
                condition += `if (this.parW < ${eachConf.maxW}) {
          this.genSlideNo(${eachConf.slideNo});
        }`;
            } else {
                condition += `if (this.parW >= ${eachConf.minW} && this.parW < ${eachConf.maxW}) {
          this.genSlideNo(${eachConf.slideNo});
        }`;
            }
        }
        eval(condition);
    }

    startAutoSlide() {
        this.stopAutoSlide();
        if (this.isMarquee) {
            setTimeout(() => {
                this.slide(1);
            });
        }
        this.autoSlideVar = setInterval(() => {
            this.slide(1);
        }, this.interval);
    }

    stopAutoSlide() {
        clearInterval(this.autoSlideVar);
    }

    cloneCtrl(add) {
        if (add) {
            this.slideItems.forEach((each) => {
                let clone = each.cloneNode(true);
                clone['classList'].add('clone');
                this.flexCont.appendChild(clone);
            });
            this.slideItems = this.flexCont.querySelectorAll('.carouselItem');
        } else {
            this.slideItems.forEach((each) => {
                if (each.classList.contains('clone')) {
                    each.remove();
                }
            });
            this.slideItems = this.flexCont.querySelectorAll('.carouselItem');
        }
    }

    genSlideNo(no) {
        let slideItmNo = [].slice
            .call(this.slideItems)
            .filter((each) => !each.classList.contains('clone')).length;
        let clonesNo = [].slice
            .call(this.slideItems)
            .filter((each) => each.classList.contains('clone')).length;
        if (slideItmNo > no) {
            this.eventBinding(true);
            if (!clonesNo && this.infiniteSlide) {
                this.cloneCtrl(true);
            }
        } else {
            this.eventBinding(false);
            if (this.infiniteSlide) {
                this.cloneCtrl(false);
            }
        }
        let eachW = (this.parW - (no - 1) * this.spaceBtwItem) / no;
        this.slideItems.forEach((each) => {
            let img = each.querySelector('img');
            if (img) {
                let prevUrl = img.src;
                img.onerror = () => {
                    if (img.src.match(/(\.webp$)|\/f_webp\//)) {
                        // img.src = 'assets/freelancers/profile-default.png';
                        img.onerror = null;
                        return;
                    }
                    if (prevUrl.match(/\.[a-z]+$/i)) {
                        img.src = prevUrl.replace(/\.[a-z]+$/i, '.webp');
                    } else if (prevUrl.match(/\/f_avif\//)) {
                        img.src = prevUrl.replace(/\/f_avif\//, '/f_webp/');
                    }
                    img.onerror = null;
                };
            }
            each.style.width = `${eachW}px`;
        });
        this.showSlideNo = no;
        this.slideExt = eachW + this.spaceBtwItem;
        this.flexW = this.slideExt * this.slideItems.length;
        this.flexCont.style.width = `${this.flexW}px`;
        this.flexCont.style.left = '0px';
        this.initialSlidePos = 0;
        this.draggingPos = 0;
        this.minPos = (this.flexW - this.spaceBtwItem - this.parW) * -1;
    }

    eventBinding(bind) {
        if (bind) {
            this.draggable = true;
            this.prev.onclick = () => {
                this.slide(-1);
            };
            if (!this.infiniteSlide) {
                this.prev.classList.add('d-none');
                this.next.classList.remove('d-none');
            }
            this.next.onclick = () => {
                this.slide(1);
            };
            if (this.autoSlide && this.infiniteSlide) {
                this.startAutoSlide();
            }
        } else {
            this.draggable = false;
            this.prev.onclick = null;
            this.next.onclick = null;
            this.prev.classList.add('d-none');
            this.next.classList.add('d-none');
        }
    }

    dragStart(e) {
        const me = this;
        let target = e.target;
        if (
            target.classList.contains('prev') ||
            target.classList.contains('next') ||
            target.parentElement.classList.contains('prev') ||
            target.parentElement.classList.contains('next')
        )
            return;
        if (e.type != 'touchstart') {
            e.preventDefault();
        }
        this.carouselParent.style.cursor = 'grab';
        this.initialXPos = e.type == 'mousedown' ? e.x : e.touches[0].clientX;
        this.flexCont.style.transition = '0s';
        this.dragEvHolder = drag;
        this.stopDragEvHolder = stopDrag;
        if (e.type == 'touchstart') {
            this.stopAutoSlide();
        }

        function drag(e) {
            me.drag(e);
        }
        function stopDrag(e) {
            me.dragEnd(e);
        }
        if (e.type == 'mousedown') {
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', stopDrag);
        } else {
            document.addEventListener('touchmove', drag);
            document.addEventListener('touchend', stopDrag);
        }
    }

    drag(e) {
        let currPos = e.type == 'mousemove' ? e.x : e.touches[0].clientX;
        let diff = currPos - this.initialXPos;
        this.initialXPos = currPos;
        let finalPos = this.draggingPos + diff;
        if (!this.infiniteSlide) {
            if (
                (finalPos > 0 && diff > 0) ||
                (this.draggingPos < this.minPos && diff < 0)
            ) {
                finalPos = this.draggingPos + diff * 0.1;
            }
        } else {
            if (
                (finalPos > 0 && diff > 0) ||
                (this.draggingPos < this.minPos && diff < 0)
            ) {
                if (diff > 0) {
                    finalPos =
                        this.slideExt * (this.slideItems.length / 2) * -1;
                } else {
                    finalPos =
                        -1 *
                        (this.slideExt *
                            (this.slideItems.length / 2 - this.showSlideNo));
                }
                this.initialSlidePos = finalPos;
            }
        }
        this.draggingPos = finalPos;
        this.flexCont.style.left = `${finalPos}px`;
    }

    dragEnd(e) {
        const me = this;
        if (e.type == 'mouseup') {
            document.removeEventListener('mousemove', me.dragEvHolder);
            document.removeEventListener('mouseup', me.stopDragEvHolder);
        } else {
            document.removeEventListener('touchmove', me.dragEvHolder);
            document.removeEventListener('touchend', me.stopDragEvHolder);
        }
        this.carouselParent.style.cursor = 'default';
        let isA = false;
        let path = e.path || e.composedPath();
        for (let i = 0; i < path.length - 2; i++) {
            if (
                path[i].tagName == 'A' &&
                path[i].href != 'javascript:void(0)'
            ) {
                isA = true;
            }
        }
        if (!this.infiniteSlide) {
            if (this.draggingPos > 0) {
                if (isA) {
                    e.target.onclick = (s) => {
                        s.preventDefault();
                        s.stopPropagation();
                    };
                }
                this.flexCont.style.transition = '0.1s ease';
                this.flexCont.style.left = '0px';
                this.draggingPos = 0;
                this.initialSlidePos = 0;
                this.prev.classList.add('d-none');
                this.next.classList.remove('d-none');
                return;
            } else if (this.draggingPos < this.minPos) {
                if (isA) {
                    e.target.onclick = (s) => {
                        s.preventDefault();
                        s.stopPropagation();
                    };
                }
                this.flexCont.style.transition = '0.1s ease';
                this.flexCont.style.left = `${this.minPos}px`;
                this.draggingPos = this.minPos;
                this.initialSlidePos = this.minPos;
                this.next.classList.add('d-none');
                this.prev.classList.remove('d-none');
                return;
            }
        }
        let slideDiff, finalPos;
        this.flexCont.style.transition = '0.3s ease';
        if (this.draggingPos < this.initialSlidePos) {
            slideDiff =
                (this.initialSlidePos - this.draggingPos) % this.slideExt;
            if (slideDiff > 0.1 * this.slideExt) {
                finalPos = this.draggingPos - (this.slideExt - slideDiff);
            } else {
                this.flexCont.style.transition = '0.1s ease';
                finalPos = this.draggingPos + slideDiff;
            }
            if (!this.infiniteSlide) {
                if (+finalPos.toFixed(2) <= +this.minPos.toFixed(2)) {
                    this.next.classList.add('d-none');
                    this.prev.classList.remove('d-none');
                } else {
                    this.next.classList.remove('d-none');
                    this.prev.classList.remove('d-none');
                }
            }
        } else if (this.draggingPos > this.initialSlidePos) {
            slideDiff =
                (this.draggingPos - this.initialSlidePos) % this.slideExt;
            if (slideDiff > 0.1 * this.slideExt) {
                finalPos = this.draggingPos + (this.slideExt - slideDiff);
            } else {
                this.flexCont.style.transition = '0.1s ease';
                finalPos = this.draggingPos - slideDiff;
            }
            if (!this.infiniteSlide) {
                if (+finalPos.toFixed(0) >= 0) {
                    this.prev.classList.add('d-none');
                    this.next.classList.remove('d-none');
                } else {
                    this.next.classList.remove('d-none');
                    this.prev.classList.remove('d-none');
                }
            }
        } else {
            if (isA) {
                e.target.onclick = null;
            }
        }
        if (finalPos != undefined) {
            if (isA) {
                e.target.onclick = (s) => {
                    s.preventDefault();
                    s.stopPropagation();
                };
            }
            this.flexCont.style.left = `${finalPos}px`;
            this.draggingPos = finalPos;
            this.initialSlidePos = finalPos;
        }
        if (e.type == 'touchend' && this.autoSlide && this.infiniteSlide) {
            this.startAutoSlide();
        }
    }

    slide(n) {
        if (!this.infiniteSlide) {
            if (
                (n == 1 &&
                    +this.initialSlidePos.toFixed(2) <=
                        +this.minPos.toFixed(2)) ||
                (n == -1 && +this.initialSlidePos.toFixed(0) >= 0)
            )
                return;
            if (n == 1) {
                this.prev.classList.remove('d-none');
            }
            if (n == -1) {
                this.next.classList.remove('d-none');
            }
        }
        let finalPos = this.initialSlidePos - n * this.slideExt;
        if (this.infiniteSlide) {
            let resetPos;
            if (
                (finalPos < this.minPos && n == 1) ||
                (finalPos > 0 && n == -1)
            ) {
                if (finalPos < this.minPos && n == 1) {
                    resetPos =
                        this.slideExt *
                        (this.slideItems.length / 2 - this.showSlideNo);
                } else {
                    resetPos = this.slideExt * (this.slideItems.length / 2);
                }
                this.flexCont.style.transition = '0s';
                this.flexCont.style.left = `-${resetPos}px`;
                finalPos = -resetPos - n * this.slideExt;
            }
        }
        setTimeout(() => {
            this.flexCont.style.transition = this.transition;
            this.flexCont.style.left = `${finalPos}px`;
            this.initialSlidePos = finalPos;
            this.draggingPos = finalPos;
            if (!this.infiniteSlide) {
                if (
                    n == 1 &&
                    +this.initialSlidePos.toFixed(2) <= +this.minPos.toFixed(2)
                ) {
                    this.next.classList.add('d-none');
                }
                if (n == -1 && this.initialSlidePos >= 0) {
                    this.prev.classList.add('d-none');
                }
            }
        }, 10);
    }
}
