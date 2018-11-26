import { empty, createElement } from './helpers';
import { generateImage, generateTitle, generateCategory } from './converter';
import Lecture from './lecture';

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

    const categorydiv = document.createElement('div');
    categorydiv.classList.add('category');
    lecturediv.appendChild(categorydiv);
    const categoryElement = generateCategory(item.category);
    categorydiv.appendChild(categoryElement);

    const titlediv = document.createElement('div');
    titlediv.classList.add('title');
    lecturediv.appendChild(titlediv);
    const titleElement = generateTitle(item.title, item.slug);
    titlediv.appendChild(titleElement);

  }
  // Viljum skipta þessu upp, eitt fall fyrir mynd, eitt fyrir myndband, o.s.frv.

  showHTML(e) {
    const list = new List();
    console.log(list.container);
    empty(list.container);
    list.loadLectures()
      .then((data) => list.renderDataHTML(data));
  }

  showCSS(e) {
    const list = new List();
    empty(list.container);
    list.loadLectures()
      .then((data) => list.renderDataCSS(data));
  }

  showJavascript(e) {
    const list = new List();
    empty(list.container);
    list.loadLectures()
      .then((data) => list.renderDataJS(data));
  }

  load() {
    empty(this.container);
    this.loadLectures()
      .then((data) => this.renderData(data));

    const HTMLbutton = document.querySelector('.flokkar__html');
    HTMLbutton.addEventListener('click', this.showHTML);
    
    const CSSbutton = document.querySelector('.flokkar__css');
    CSSbutton.addEventListener('click', this.showCSS);

    const JSbutton = document.querySelector('.flokkar__javascript');
    JSbutton.addEventListener('click', this.showJavascript);
  }
}
