import { empty, createElement } from './helpers';
import { generateImage, generateTitle, generateCategory } from './converter';
import Lecture from './lecture'; // Hvað er málið?
import { clear, saveTypes, removeTypes, loadSavedTypes, loadSavedLectures } from './storage';

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
// Element, Gildi týpur og virkjar og DOM öðruvísi
// slug: html-element, js-basic, js-dom

  renderItem(item) {
    console.log('item í renderItem ', item);
    const lecturediv = document.createElement('div');
    lecturediv.classList.add('fyrirlestur');
    this.container.appendChild(lecturediv);

    if (item.slug === 'html-element' || item.slug === 'js-basic' || item.slug === 'js-dom') {
      const greydiv = document.createElement('div');
      greydiv.classList.add('greydiv');
      const categorydiv = document.createElement('div');
      categorydiv.classList.add('category');
      const categoryElement = generateCategory(item.category);
      categorydiv.appendChild(categoryElement);
      greydiv.appendChild(categorydiv);

      const titlediv = document.createElement('div');
      titlediv.classList.add('title');
      const titleElement = generateTitle(item.title, item.slug);
      titlediv.appendChild(titleElement);
      greydiv.appendChild(titlediv);

      lecturediv.appendChild(greydiv);

      if (loadSavedLectures().includes(item.title)) {
        const checkdiv = document.createElement('div');
        checkdiv.appendChild(document.createTextNode('\u2713'));
        checkdiv.classList.add('check');
        greydiv.appendChild(checkdiv);
      }
    }
    else {
      const imageElement = generateImage(item.thumbnail);
      imageElement.classList.add('thumbnail');
      lecturediv.appendChild(imageElement);

      const textdiv = document.createElement('div');
      textdiv.classList.add('fyrirlestur__text');
      lecturediv.appendChild(textdiv);

      const titlecatdiv = document.createElement('div');
      titlecatdiv.classList.add('fyrirlestur__titlecat');
      textdiv.appendChild(titlecatdiv);

      const categorydiv = document.createElement('div');
      categorydiv.classList.add('category');
      titlecatdiv.appendChild(categorydiv);
      const categoryElement = generateCategory(item.category);
      categorydiv.appendChild(categoryElement);

      const titlediv = document.createElement('div');
      titlediv.classList.add('title');
      titlecatdiv.appendChild(titlediv);
      const titleElement = generateTitle(item.title, item.slug);
      titlediv.appendChild(titleElement);

      if (loadSavedLectures().includes(item.title)) {
        const checkdiv = document.createElement('div');
        checkdiv.appendChild(document.createTextNode('\u2713'));
        checkdiv.classList.add('check');
        textdiv.appendChild(checkdiv);
      }
    }
    

  }
  // Viljum skipta þessu upp, eitt fall fyrir mynd, eitt fyrir myndband, o.s.frv.

  removeHTML(e) {
    removeTypes('HTML');
    const list = new List();
    empty(list.container);

    if (loadSavedTypes().includes('CSS')) {
      list.loadLectures()
        .then((data) => list.renderDataCSS(data));
    }
    if (loadSavedTypes().includes('Javascript')) {
      list.loadLectures()
        .then((data) => list.renderDataJS(data));
    }
    else {
      list.loadLectures()
        .then((data) => list.renderData(data));
    }

    const htmlbuttonNew = document.querySelector('.flokkar__htmlGreen');
    htmlbuttonNew.classList.add('flokkar__htmlGreen--hidden');
    const htmlbutton = document.querySelector('.flokkar__html');
    htmlbutton.classList.remove('flokkar__html--hidden');
  }

  showHTML(e) {
    saveTypes('HTML');
    const list = new List();
    empty(list.container);
    list.loadLectures()
      .then((data) => list.renderDataHTML(data));
    
    if (loadSavedTypes().includes('CSS')) {
      list.loadLectures()
        .then((data) => list.renderDataCSS(data));
    }
    if (loadSavedTypes().includes('Javascript')) {
      list.loadLectures()
        .then((data) => list.renderDataJS(data));
    }

    const htmlbutton = document.querySelector('.flokkar__html');
    htmlbutton.classList.add('flokkar__html--hidden');
    const htmlbuttonNew = document.querySelector('.flokkar__htmlGreen');
    htmlbuttonNew.classList.remove('flokkar__htmlGreen--hidden');
  }

  removeCSS(e) {
    removeTypes('CSS');
    const list = new List();
    empty(list.container);

    if (loadSavedTypes().includes('HTML')) {
      list.loadLectures()
        .then((data) => list.renderDataHTML(data));
    }
    if (loadSavedTypes().includes('Javascript')) {
      list.loadLectures()
        .then((data) => list.renderDataJS(data));
    }
    else {
      list.loadLectures()
        .then((data) => list.renderData(data));
    }

    const cssbuttonNew = document.querySelector('.flokkar__cssGreen');
    cssbuttonNew.classList.add('flokkar__cssGreen--hidden');
    const cssbutton = document.querySelector('.flokkar__css');
    cssbutton.classList.remove('flokkar__css--hidden');
  }

  showCSS(e) {
    saveTypes('CSS');
    const list = new List();
    empty(list.container);

    if (loadSavedTypes().includes('HTML')) {
      list.loadLectures()
        .then((data) => list.renderDataHTML(data));
    }

    list.loadLectures()
      .then((data) => list.renderDataCSS(data));

    if (loadSavedTypes().includes('Javascript')) {
      list.loadLectures()
        .then((data) => list.renderDataJS(data));
    }

    const cssbutton = document.querySelector('.flokkar__css');
    cssbutton.classList.add('flokkar__css--hidden');
    const cssbuttonNew = document.querySelector('.flokkar__cssGreen');
    cssbuttonNew.classList.remove('flokkar__cssGreen--hidden');
  }

  removeJS(e) {
    removeTypes('Javascript');
    const list = new List();
    empty(list.container);

    if (loadSavedTypes().includes('HTML')) {
      list.loadLectures()
        .then((data) => list.renderDataHTML(data));
    }
    if (loadSavedTypes().includes('CSS')) {
      list.loadLectures()
        .then((data) => list.renderDataCSS(data));
    }
    else {
      list.loadLectures()
        .then((data) => list.renderData(data));
    }

    const jsbuttonNew = document.querySelector('.flokkar__javascriptGreen');
    jsbuttonNew.classList.add('flokkar__javascriptGreen--hidden');
    const jsbutton = document.querySelector('.flokkar__javascript');
    jsbutton.classList.remove('flokkar__javascript--hidden');
  }

  showJavascript(e) {
    saveTypes('Javascript');
    const list = new List();
    empty(list.container);

    if (loadSavedTypes().includes('HTML')) {
      list.loadLectures()
        .then((data) => list.renderDataHTML(data));
    }
    if (loadSavedTypes().includes('CSS')) {
      list.loadLectures()
        .then((data) => list.renderDataCSS(data));
    }
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
    HTMLbuttonGreen.addEventListener('click', this.removeHTML);
    
    const CSSbutton = document.querySelector('.flokkar__css');
    CSSbutton.addEventListener('click', this.showCSS);
    const CSSbuttonGreen = document.querySelector('.flokkar__cssGreen');
    CSSbuttonGreen.addEventListener('click', this.removeCSS);

    const JSbutton = document.querySelector('.flokkar__javascript');
    JSbutton.addEventListener('click', this.showJavascript);
    const JSbuttonGreen = document.querySelector('.flokkar__javascriptGreen');
    JSbuttonGreen.addEventListener('click', this.removeJS);

    const clearLocalst = document.querySelector('.clearLocal');
    clearLocalst.addEventListener('click', this.clearLocalStorage);
  }
}
