class Slider {
    _container;
    _wrapper;
    _imgsArray;
    _imgs;
    _indicators;
    _indicator;
    _prevBtn;
    _nextBtn;
    _prevClone;
    _nextClone;

    _step;
    _last;
    _width = null;
    _height = null;

    constructor(indicators, orientation, arrayOfImg) {
        this._step = 0;
        this._last = 1;

        this._indicators = document.querySelector('.js-indicators');
        this._indicators.innerHTML = '';

        this._container = document.querySelector('.js-container');
        this._wrapper = document.querySelector('.js-wrapper');

        this._imgsArray = document.querySelector('.js-imgs');
        this._imgsArray.innerHTML = '';
        this._imgsArray.style.left = this._step + 'px';
        this._imgsArray.style.top = this._step + 'px';

        this._prevBtn = document.querySelector('.js-prev');
        this._prevClone = this._prevBtn.cloneNode(true);
        this._prevBtn.parentNode.replaceChild(this._prevClone, this._prevBtn);

        this._nextBtn = document.querySelector('.js-next');
        this._nextClone = this._nextBtn.cloneNode(true);
        this._nextBtn.parentNode.replaceChild(this._nextClone, this._nextBtn);

        this.render(arrayOfImg);
        this.indicatorsCheck(indicators, orientation);
        this.orientationCheck(indicators, orientation);
    }

    render(arrayOfImg) {
        let buttons = document.querySelector('.js-buttons');

        if (arrayOfImg.length !== 0) {
            buttons.classList.add('buttons__buttons-visible');

            arrayOfImg.forEach(image => {
                let img = document.createElement('img');
                img.setAttribute('src', image);
                img.classList.add('slider__img');
                img.classList.add('js-img');
                this._imgsArray.appendChild(img);
            });
            this._imgs = document.querySelectorAll('.js-img');
            this._width = this._imgs[0].offsetWidth;
            this._height = this._imgs[0].offsetHeight;
        } else {
            buttons.classList.remove('buttons__buttons-visible');
        }
    }

    indicatorsCheck(indicators, orientation) {
        let indicatorID = 0;
        let count = null;

        if (indicators === true && this._imgs.length !== 0) {
            this._indicators.classList.add('controls__indicators-visible');

            if (orientation === true){
                count = this._width;
            } else {
                count = this._height
            }

            this._imgs.forEach(image => {
                let div = document.createElement('div');
                div.classList.add('controls__indicator');
                div.classList.add('js-indicator' + indicatorID);
                this._indicators.appendChild(div);
                indicatorID -= count;
            });

            this.indicatorActive(this._step, this._last);
        } else {
            this._indicators.classList.remove('controls__indicators-visible');
        }
    }

    orientationCheck(indicators, orientation) {
        if (orientation === false) {
            this._container.classList.add('slider__container-vertical');
            this._wrapper.classList.add('slider__imgs-wrapper-vertical');
            this._imgsArray.classList.add('slider__imgs-vertical');
            this._imgs.forEach(el => {
                el.classList.add('slider__img-vertical');
            });

            this._prevClone.classList.add('buttons__prev-vertical');
            this._nextClone.classList.add('buttons__next-vertical');
            this.moveVertical(indicators);
        } else {
            this._container.classList.remove('slider__container-vertical');
            this._wrapper.classList.remove('slider__imgs-wrapper-vertical');
            this._imgsArray.classList.remove('slider__imgs-vertical');
            this._imgs.forEach(el => {
                el.classList.remove('slider__img-vertical');
            });

            this._prevClone.classList.remove('buttons__prev-vertical');
            this._nextClone.classList.remove('buttons__next-vertical');
            this.moveHorizontal(indicators);
        }
    }

    moveHorizontal(indicators) {
        this._prevClone.addEventListener('click', () => {
            this._step += this._width;
            if (this._step > 0) {
                this._step = -(this._width * (this._imgs.length - 1));
            }
            this._imgsArray.style.left = this._step + 'px';
            if (indicators === true) {
                this.indicatorActive(this._step, this._last);
            }
        });

        this._nextClone.addEventListener('click', () => {
            this._step -= this._width;
            if (this._step <= -(this._width * this._imgs.length)) {
                this._step = 0;
            }
            this._imgsArray.style.left = this._step + 'px';
            if (indicators === true) {
                this.indicatorActive(this._step, this._last);
            }
        });
    }

    moveVertical(indicators) {
        this._prevClone.addEventListener('click', () => {
            this._step += this._height;
            if (this._step > 0) {
                this._step = -(this._height * (this._imgs.length - 1));
            }
            this._imgsArray.style.top = this._step + 'px';
            if (indicators === true) {
                this.indicatorActive(this._step, this._last);
            }
        });

        this._nextClone.addEventListener('click', () => {
            this._step -= this._height
            if (this._step <= -(this._height * this._imgs.length)) {
                this._step = 0;
            }
            this._imgsArray.style.top = this._step + 'px';
            if (indicators === true) {
                this.indicatorActive(this._step, this._last);
            }
        });
    }

    indicatorActive(id, last) {
        if (last <= 0) {
            document.querySelector('.js-indicator' + last).classList.remove('controls__indicator-active');
        }
        document.querySelector('.js-indicator' + id).classList.add('controls__indicator-active');
        this._last = id;
    }
}