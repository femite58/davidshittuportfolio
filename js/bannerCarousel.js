class FlexSliderComponent {
    carouselParent;
    flexCont;
    slideItems;
    prev;
    next;

    indicatorListener;
    slideResizeConfig;
    autoSlide = false;
    infiniteSlide = false;
    slideSpeed = 0.6;
    interval = 5000;
    timingFunction = 'ease';
    startImmediately = false;
    canDrag = true;

    indicators;
    onIndChng;
    onClick;

    autoSlideVar;
    immediateStart;
    ind = 0;

    draggable = false;

    initialSlidePos = 0;
    draggingPos = 0;
    initialXPos;
    minPos = 0;
    showSlideNo;

    spaceBtwItem;
    slideExt;
    parW;
    flexW;

    dragEvHolder;
    stopDragEvHolder;

    mobs;
    indSub;
    count = 0;

    constructor({
        parent,
        slideResizeConfig,
        autoSlide = false,
        infiniteSlide = false,
        slideSpeed = 0.6,
        interval = 5000,
        timingFunction = 'ease',
        startImmediately = false,
        canDrag = true,
        onClick = (event) => {},
        onIndChng = (ind) => {},
    }) {
        this.carouselParent = parent;
        this.slideResizeConfig = slideResizeConfig;
        this.autoSlide = autoSlide;
        this.infiniteSlide = infiniteSlide;
        this.slideSpeed = slideSpeed;
        this.interval = interval;
        this.timingFunction = timingFunction;
        this.startImmediately = startImmediately;
        this.canDrag = canDrag;
        this.onClick = onClick;
        this.onIndChng = onIndChng;
        this.ngAfterViewInit();
    }

    ngOnDestroy() {
        this.stopAutoSlide();
        this.winResEv(false);
        if (this.indSub) {
            this.indSub.unsubscribe();
        }
    }

    initiateEvent() {
        //     (mouseenter)="canDrag ? stopAutoSlide() : null"
        // (mouseleave)="
        //     canDrag && draggable && autoSlide && infiniteSlide
        //         ? startAutoSlide()
        //         : null
        // "
        // (mousedown)="canDrag && draggable ? dragStart($event) : null"
        // (touchstart)="canDrag && draggable ? dragStart($event) : null"
        this.carouselParent.addEventListener('mouseenter', (e) => {
            if (this.canDrag) this.stopAutoSlide();
        });
        this.carouselParent.addEventListener('mouseleave', (e) => {
            if (this.canDrag && this.draggable && this.autoSlide) {
                this.startAutoSlide();
            }
        });
        this.carouselParent.addEventListener('mousedown', (e) => {
            if (this.canDrag && this.draggable) this.dragStart(e);
        });
        this.carouselParent.addEventListener('touchstart', (e) => {
            if (this.canDrag && this.draggable) this.dragStart(e);
        });
    }

    initiateDom() {
        const cloneParentBefore = document.createElement('div');
        const carouselItems = Array.from(
            this.carouselParent.querySelectorAll('.carouselItem')
        );
        carouselItems.forEach((el) => {
            const clone = el.cloneNode(true);
            cloneParentBefore.appendChild(clone);
        });
        cloneParentBefore.classList.add('cloneParent');
        const cloneParentAfter = cloneParentBefore.cloneNode(true);
        cloneParentBefore.classList.add('before');
        cloneParentAfter.classList.add('after');
        this.carouselParent.appendChild(cloneParentBefore);
        this.carouselParent.appendChild(cloneParentAfter);
    }

    ngAfterViewInit() {
        this.initiateEvent();
        if (this.infiniteSlide) {
            this.initiateDom();
        }
        this.flexCont = this.carouselParent.querySelector('.flexCont');
        this.slideItems = this.flexCont.querySelectorAll('.carouselItem');
        this.count = this.slideItems.length;
        this.next = this.carouselParent.querySelector('.next');
        this.prev = this.carouselParent.querySelector('.prev');
        this.indicators =
            this.carouselParent.querySelectorAll('.indicatorItem');
        if (this.indicators.length) {
            this.indicators.forEach((el, i) => {
                el.onclick = () => {
                    this.indicatorSlide(i);
                };
            });
        }
        this.mobs = new MutationObserver(async () => {
            const curitems = this.flexCont.querySelectorAll('.carouselItem');
            this.count = [].slice
                .call(curitems)
                .filter((e) => !e.classList.contains('clone')).length;
            const nonChecked = this.flexCont.querySelector(
                '.carouselItem:not(.checked)'
            );
            const preserve = curitems.length - this.slideItems.length;
            this.indicators =
                this.carouselParent.querySelectorAll('.indicatorItem');
            if (this.indicators.length) {
                this.indicators.forEach((el, i) => {
                    el.onclick = () => {
                        this.indicatorSlide(i);
                    };
                });
            }
            if (!preserve && !nonChecked) return;
            this.mobs.disconnect();
            this.cloneCtrl(false);
            setTimeout(() => {
                this.genSlideNo(this.showSlideNo, preserve);
            });
        });
        this.responsive();
        this.winResEv(true);
        if (this.indicatorListener) {
            this.indSub = this.indicatorListener.subscribe((ind) => {
                this.indicatorSlide(ind, false);
            });
        }
    }

    indicatorSlide(n, transit = true) {
        this.ind = n;
        this.initialSlidePos = this.infiniteSlide
            ? (this.count + n) * this.slideExt * -1
            : n * this.slideExt * -1;
        this.flexCont.style.transition = `${transit ? this.slideSpeed : 0}s ${
            this.timingFunction
        }`;
        this.flexCont.style.left = `${this.initialSlidePos}px`;
        this.draggingPos = this.initialSlidePos;
        this.setIndicator();
    }

    winResEv(add) {
        if (add) {
            window.addEventListener('resize', this.responsive);
        } else {
            window.removeEventListener('resize', this.responsive);
        }
    }

    responsive = () => {
        this.parW = +getComputedStyle(this.carouselParent).width.replace(
            'px',
            ''
        );
        const pL = +getComputedStyle(this.carouselParent).paddingLeft.replace(
            'px',
            ''
        );
        const pR = +getComputedStyle(this.carouselParent).paddingRight.replace(
            'px',
            ''
        );
        this.stopAutoSlide();
        this.parW = this.parW - pL - pR;
        this.spaceBtwItem = +getComputedStyle(
            this.slideItems[0]
        ).marginRight.replace('px', '');
        for (const eachConf of this.slideResizeConfig) {
            if (!eachConf.maxW) {
                if (this.parW >= eachConf.minW) {
                    this.genSlideNo(eachConf.slideNo);
                }
            } else if (!eachConf.minW) {
                if (this.parW < eachConf.maxW) {
                    this.genSlideNo(eachConf.slideNo);
                }
            } else {
                if (this.parW >= eachConf.minW && this.parW < eachConf.maxW) {
                    this.genSlideNo(eachConf.slideNo);
                }
            }
        }
    };

    startAutoSlide() {
        this.stopAutoSlide();
        if (this.startImmediately) {
            this.immediateStart = setTimeout(() => {
                this.slide(1);
            }, 100);
        }
        this.autoSlideVar = setInterval(() => {
            this.slide(1);
        }, this.interval);
    }

    stopAutoSlide() {
        clearInterval(this.autoSlideVar);
        clearTimeout(this.immediateStart);
    }

    canClone = false;

    async cloneCtrl(add) {
        if (add) {
            this.canClone = true;
            await new Promise((rsv) => {
                setTimeout(() => {
                    let clones = this.carouselParent.querySelectorAll(
                        '.cloneParent.after .carouselItem'
                    );
                    clones.forEach((e) => {
                        e.classList.add('clone');
                        e.classList.add('after');
                        this.flexCont.appendChild(e);
                    });
                    clones = this.carouselParent.querySelectorAll(
                        '.cloneParent.before .carouselItem'
                    );
                    for (let i = clones.length - 1; i > -1; i--) {
                        const first =
                            this.flexCont.querySelector('.carouselItem');
                        clones[i].classList.add('clone');
                        clones[i].classList.add('before');
                        this.flexCont.insertBefore(clones[i], first);
                    }
                    rsv('done');
                });
            });
        } else {
            const removeClones = (clss) => {
                const cloneParent = this.carouselParent.querySelector(
                    `.cloneParent.${clss}`
                );
                const clones = this.flexCont.querySelectorAll(`.clone.${clss}`);
                for (let i = 0; i < clones.length; i++) {
                    clones[i].classList.remove('clone');
                    clones[i].classList.remove(clss);
                    cloneParent.appendChild(clones[i]);
                }
            };
            removeClones('before');
            removeClones('after');
            this.canClone = false;
        }
        this.slideItems = this.flexCont.querySelectorAll('.carouselItem');
        this.slideItems.forEach((el) => el.classList.add('checked'));
    }

    async genSlideNo(no, preservePos = 0) {
        this.mobs.disconnect();
        if (this.count > no) {
            this.eventBinding(true);
            if (this.infiniteSlide) {
                await this.cloneCtrl(true);
            }
        } else {
            this.eventBinding(false);
            if (this.infiniteSlide) {
                await this.cloneCtrl(false);
            }
        }
        const eachW = (this.parW - (no - 1) * this.spaceBtwItem) / no;
        this.slideItems.forEach((each, i) => {
            each.style.width = `${eachW}px`;
            each.onclick = (e) => {
                this.onClick({
                    event: e,
                    index: this.infiniteSlide
                        ? i % (this.slideItems.length / 3)
                        : i,
                });
            };
        });
        this.showSlideNo = no;
        this.slideExt = eachW + this.spaceBtwItem;
        this.flexW = this.slideExt * this.slideItems.length;
        this.flexCont.style.width = `${this.flexW}px`;
        this.flexCont.style.transition = '0s';
        this.initialSlidePos =
            preservePos > 0 && this.count > no && this.infiniteSlide
                ? this.initialSlidePos <=
                  (this.count - preservePos) * this.slideExt * -1
                    ? this.initialSlidePos - preservePos * this.slideExt
                    : this.initialSlidePos
                : this.count > no && this.infiniteSlide
                ? this.slideExt * this.count * -1
                : 0;
        this.setIndicator();
        this.flexCont.style.left = `${this.initialSlidePos}px`;
        this.draggingPos = this.initialSlidePos;
        this.minPos = (this.flexW - this.spaceBtwItem - this.parW) * -1;
        this.mobs.observe(this.flexCont, { subtree: true, childList: true });
    }

    eventBinding(bind) {
        if (bind) {
            this.draggable = true;
            if (this.next && this.prev) {
                this.next.onclick = () => {
                    this.slide(1);
                };
                this.prev.onclick = () => {
                    this.slide(-1);
                };
                if (!this.infiniteSlide) {
                    this.prev.classList.add('d-none');
                    this.next.classList.remove('d-none');
                }
            }
            if (this.autoSlide && this.infiniteSlide) {
                this.startAutoSlide();
            }
        } else {
            this.draggable = false;
            if (this.prev && this.next) {
                this.prev.onclick = null;
                this.next.onclick = null;
                this.prev.classList.add('d-none');
                this.next.classList.add('d-none');
            }
        }
    }

    dragStart(e) {
        const target = e.target;
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

        if (e.type == 'touchstart') {
            this.stopAutoSlide();
        }

        if (e.type == 'mousedown') {
            document.addEventListener('mousemove', this.drag);
            document.addEventListener('mouseup', this.dragEnd);
        } else {
            document.addEventListener('touchmove', this.drag);
            document.addEventListener('touchend', this.dragEnd);
        }
    }

    drag = (e) => {
        const currPos = e.type == 'mousemove' ? e.x : e.touches[0].clientX;
        const diff = currPos - this.initialXPos;
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
                +(this.draggingPos - this.slideExt).toFixed(3) <
                    +this.minPos.toFixed(3) &&
                diff < 0
            ) {
                finalPos =
                    this.slideExt *
                    (this.count * 2 - this.showSlideNo - 1) *
                    -1;
                this.initialSlidePos = finalPos;
            } else if (+(finalPos + this.slideExt).toFixed(3) > 0 && diff > 0) {
                finalPos = this.slideExt * (this.count + 1) * -1;
                this.initialSlidePos = finalPos;
            }
        }
        this.draggingPos = finalPos;
        this.flexCont.style.left = `${finalPos}px`;
    };

    dragEnd = (e) => {
        if (e.type == 'mouseup') {
            document.removeEventListener('mousemove', this.drag);
            document.removeEventListener('mouseup', this.dragEnd);
        } else {
            document.removeEventListener('touchmove', this.drag);
            document.removeEventListener('touchend', this.dragEnd);
        }
        this.carouselParent.style.cursor = 'default';
        let isA = false;
        const path = e.path || e.composedPath();
        for (let i = 0; i < path.length - 2; i++) {
            if (
                path[i].tagName == 'A' &&
                path[i].href != 'javascript:void(0)'
            ) {
                isA = true;
            }
        }
        if (!this.infiniteSlide) {
            if (+this.draggingPos.toFixed(3) > 0) {
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
                this.setIndicator();
                return;
            } else if (+this.draggingPos.toFixed(3) < +this.minPos.toFixed(3)) {
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
                this.setIndicator();
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
        } else if (
            +this.draggingPos.toFixed(3) > +this.initialSlidePos.toFixed(3)
        ) {
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
            this.setIndicator();
        }
        if (e.type == 'touchend' && this.autoSlide && this.infiniteSlide) {
            this.startAutoSlide();
        }
    };

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
                (+(finalPos - this.slideExt).toFixed(3) <
                    +this.minPos.toFixed(3) &&
                    n == 1) ||
                (+(finalPos + this.slideExt).toFixed(3) > 0 && n == -1)
            ) {
                if (
                    +(finalPos - this.slideExt).toFixed(3) <
                        +this.minPos.toFixed(3) &&
                    n == 1
                ) {
                    resetPos =
                        this.slideExt * (this.count * 2 - this.showSlideNo - 1);
                } else {
                    resetPos =
                        this.slideExt * (this.count * 2 - this.showSlideNo);
                }
                this.flexCont.style.transition = '0s';
                this.flexCont.style.left = `-${resetPos}px`;
                finalPos = -resetPos - n * this.slideExt;
            }
        }
        setTimeout(() => {
            this.flexCont.style.transition = `${this.slideSpeed}s ${this.timingFunction}`;
            this.flexCont.style.left = `${finalPos}px`;
            this.initialSlidePos = finalPos;
            this.setIndicator();
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

    setIndicator() {
        this.ind = +(
            ((this.initialSlidePos * -1) / this.slideExt) %
            this.count
        ).toFixed(0);
        this.ind = this.ind >= this.count ? 0 : this.ind;
        this.onIndChng(this.ind);
        if (!this.indicators.length) return;
        this.indicators.forEach((el, i) => {
            if (i == this.ind) {
                el.classList.add('activeInd');
            } else {
                el.classList.remove('activeInd');
            }
        });
    }
}
