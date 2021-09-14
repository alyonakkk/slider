@@include('./Slider.js');

class Settings {
    _checkBox;
    _createBtn;
    _addImg;
    _imgsContainer;

    _imgArray = [];
    _indicators = true;
    _orientation = true;

    constructor() {
        this._checkBox = document.querySelectorAll('.js-checkbox');
        this._createBtn = document.querySelector('.js-create');
        this._addImg = document.querySelector('.js-add-file');
        this._imgsContainer = document.querySelector('.js-imgs-container');
        this.listeners(this._imgsContainer, this._imgArray);
    }

    listeners(container, array) {        
        this._addImg.addEventListener('change', () => {
            let file = this._addImg.files[0];

            if (file) {
                let reader = new FileReader();
                reader.onload = function (e) {
                    let idOfImgContainer = Date.now();
                    let image = e.target.result;
                    let wrapper = document.createElement('div');
                    let del = document.createElement('img');
                    let img = document.createElement('img');

                    del.setAttribute('src', '/img/remove.png');
                    del.classList.add('add-pic__img-remove');
                    wrapper.classList.add('add-pic__img-wrapper');
                    wrapper.classList.add('js-img-wrapper' + idOfImgContainer);
                    img.setAttribute('src', image);
                    img.classList.add('add-pic__img');
                    wrapper.appendChild(del);
                    wrapper.appendChild(img);
                    container.appendChild(wrapper);
                    array.push(image);

                    let imgWrapper = document.querySelector('.js-img-wrapper' + idOfImgContainer);
                    imgWrapper.addEventListener('click', () => {
                        container.removeChild(wrapper);

                        let index = array.indexOf(image);
                        array.splice(index, 1);
                    })
                }
                reader.readAsDataURL(file);
            }
        })

        this._checkBox.forEach(box => {
            box.addEventListener('click', () => {
                box.classList.toggle('checkbox-disable');

                if (box.classList.contains('checkbox-disable')) {
                    if (box.id === 'indicators') this._indicators = false;
                    if (box.id === 'orientation') this._orientation = false;
                } else {
                    if (box.id === 'indicators') this._indicators = true;
                    if (box.id === 'orientation') this._orientation = true;
                }
            });
        });

        this._createBtn.addEventListener('click', () => {
            let slider = new Slider(this._indicators, this._orientation, this._imgArray);
        });
    }
}