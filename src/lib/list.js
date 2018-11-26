import { empty, createElement } from './helpers';
import { generateImage, generateTitle, generateCategory } from './converter';
import Lecture from './lecture';
import { clear } from './storage';

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
    this.url = '../lectures.json';
  }

  loadLectures() {
    return fetch(this.url)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Gat ekki sótt fyrirlestur');
        }
        return res.json();
      });
  }

  renderDataHTML(data) {
    data.lectures.map((item) => {
      if (item.category === 'html') {
        this.renderItem(item);
      }
    });
  }

  renderDataCSS(data) {
    data.lectures.map((item) => {
      if (item.category === 'css') {
        this.renderItem(item);
      }
    });
  }

  renderDataJS(data) {
    data.lectures.map((item) => {
      if (item.category === 'javascript') {
        this.renderItem(item);
      }
    });
  }

  /**
   * Sér um að setja allt inn í html-ið
   * @param {*} data 
   */
  renderData(data) {
    console.log(data.lectures); // Þurfum að fara í gegnum hvern einasta hlut og sækja thumbnail
    
    data.lectures.map((item) => {
      this.renderItem(item);
    });
  }

  renderItem(item) {
    const lecturediv = document.createElement('div');
    lecturediv.classList.add('fyrirlestur');
    this.container.appendChild(lecturediv);

    const imageElement = generateImage(item.thumbnail);
    imageElement.classList.add('thumbnail');
    lecturediv.appendChild(imageElement);

    const greytitlediv = document.createElement('div');
    greytitlediv.classList.add('fyrirlestur__titlecat');
    lecturediv.appendChild(greytitlediv);

    const categorydiv = document.createElement('div');
    categorydiv.classList.add('category');
    greytitlediv.appendChild(categorydiv);
    const categoryElement = generateCategory(item.category);
    categorydiv.appendChild(categoryElement);

    const titlediv = document.createElement('div');
    titlediv.classList.add('title');
    greytitlediv.appendChild(titlediv);
    const titleElement = generateTitle(item.title, item.slug);
    titlediv.appendChild(titleElement);

  }
  // Viljum skipta þessu upp, eitt fall fyrir mynd, eitt fyrir myndband, o.s.frv.

  showNotHTML(e) {
    const list = new List();
    empty(list.container);
    list.loadLectures()
      .then((data) => list.renderDataCSS(data));
    list.loadLectures()
      .then((data) => list.renderDataJS(data));

    const htmlbuttonNew = document.querySelector('.flokkar__htmlGreen');
    htmlbuttonNew.classList.add('flokkar__htmlGreen--hidden');
    const htmlbutton = document.querySelector('.flokkar__html');
    htmlbutton.classList.remove('flokkar__html--hidden');
  }

  showHTML(e) {
    const list = new List();
    console.log(list.container);
    empty(list.container);
    list.loadLectures()
      .then((data) => list.renderDataHTML(data));

    const htmlbutton = document.querySelector('.flokkar__html');
    htmlbutton.classList.add('flokkar__html--hidden');
    const htmlbuttonNew = document.querySelector('.flokkar__htmlGreen');
    htmlbuttonNew.classList.remove('flokkar__htmlGreen--hidden');
  }

  showNotCSS(e) {
    const list = new List();
    empty(list.container);
    list.loadLectures()
      .then((data) => list.renderDataHTML(data));
    list.loadLectures()
      .then((data) => list.renderDataJS(data));

    const cssbuttonNew = document.querySelector('.flokkar__cssGreen');
    cssbuttonNew.classList.add('flokkar__cssGreen--hidden');
    const cssbutton = document.querySelector('.flokkar__css');
    cssbutton.classList.remove('flokkar__css--hidden');
  }

  showCSS(e) {
    const list = new List();
    empty(list.container);
    list.loadLectures()
      .then((data) => list.renderDataCSS(data));

    const cssbutton = document.querySelector('.flokkar__css');
    cssbutton.classList.add('flokkar__css--hidden');
    const cssbuttonNew = document.querySelector('.flokkar__cssGreen');
    cssbuttonNew.classList.remove('flokkar__cssGreen--hidden');
  }

  showNotJS(e) {
    const list = new List();
    empty(list.container);
    list.loadLectures()
      .then((data) => list.renderDataHTML(data));
    list.loadLectures()
      .then((data) => list.renderDataCSS(data));

    const jsbuttonNew = document.querySelector('.flokkar__javascriptGreen');
    jsbuttonNew.classList.add('flokkar__javascriptGreen--hidden');
    const jsbutton = document.querySelector('.flokkar__javascript');
    jsbutton.classList.remove('flokkar__javascript--hidden');
  }

  showJavascript(e) {
    const list = new List();
    empty(list.container);
    list.loadLectures()
      .then((data) => list.renderDataJS(data));

    const jsbutton = document.querySelector('.flokkar__javascript');
    jsbutton.classList.add('flokkar__javascript--hidden');
    const jsbuttonNew = document.querySelector('.flokkar__javascriptGreen');
    jsbuttonNew.classList.remove('flokkar__javascriptGreen--hidden');
  }

  clearLocalStorage() {
    clear();
  }

  load() {
    empty(this.container);
    this.loadLectures()
      .then((data) => this.renderData(data));

    const HTMLbutton = document.querySelector('.flokkar__html');
    HTMLbutton.addEventListener('click', this.showHTML);
    const HTMLbuttonGreen = document.querySelector('.flokkar__htmlGreen');
    HTMLbuttonGreen.addEventListener('click', this.showNotHTML);
    
    const CSSbutton = document.querySelector('.flokkar__css');
    CSSbutton.addEventListener('click', this.showCSS);
    const CSSbuttonGreen = document.querySelector('.flokkar__cssGreen');
    CSSbuttonGreen.addEventListener('click', this.showNotCSS);

    const JSbutton = document.querySelector('.flokkar__javascript');
    JSbutton.addEventListener('click', this.showJavascript);
    const JSbuttonGreen = document.querySelector('.flokkar__javascriptGreen');
    JSbuttonGreen.addEventListener('click', this.showNotJS);

    const clearLocalst = document.querySelector('.clearLocal');
    clearLocalst.addEventListener('click', this.clearLocalStorage);
  }
}
