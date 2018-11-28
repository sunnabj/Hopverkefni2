/* eslint linebreak-style: ["error", "windows"] */

import { empty } from './helpers';
import { generateImage, generateTitle, generateCategory } from './converter';
import { saveTypes, removeTypes, loadSavedTypes, loadSavedLectures } from './storage';

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
    this.url = '../lectures.json';
  }

  /**
   * Nær í json fyrirlestragögn. Skilar villu ef gögnin ekki í lagi.
   */

  loadLectures() {
    return fetch(this.url)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Gat ekki sótt fyrirlestur');
        }
        return res.json();
      });
  }

  /**
  * Fer í gegnum öll fyrirlestrargögnin og birtir þau
  */

  renderData(data) {
    data.lectures.map((item) => {
      this.renderItem(item);
    });
  }

/**
 * Fer í gegnum öll gögnin, en birtir bara fyrirlestra að ákveðinni gerð,
 * þ.e. css, html eða javascript, sem kemur inn sem argumentið type.
 */
  renderDataSpecial(data, type) {
    data.lectures.map((item) => {
      if (item.category === type) {
        this.renderItem(item);
      }
    });
  }

  /**
   * Býr til div og klasanöfn fyrir hverja gerð af hlutum sem birtast á forsíðunni.
   */

  renderItem(item) {
    // Þetta div heldur utan um öll gögnin
    const lecturediv = document.createElement('div');
    lecturediv.classList.add('fyrirlestur');
    this.container.appendChild(lecturediv);

    // Hér er thumbnail fyrir fyrirlestur, eða grár kassi ef engin er myndin
    const imageElement = generateImage(item.thumbnail);
    lecturediv.appendChild(imageElement);

    // Textadiv heldur utan um annað en mynd
    const textdiv = document.createElement('div');
    textdiv.classList.add('fyrirlestur__text');
    lecturediv.appendChild(textdiv);

    // Sér div heldur utan um titil og flokk
    const titlecatdiv = document.createElement('div');
    titlecatdiv.classList.add('fyrirlestur__titlecat');
    textdiv.appendChild(titlecatdiv);

    // Hér koma div fyrir titil og flokk
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

    // Ef fyrirlestur hefur verið kláraður kemur tjekkmerki
    if (loadSavedLectures().includes(item.title)) {
      const checkdiv = document.createElement('div');
      checkdiv.appendChild(document.createTextNode('\u2713'));
      checkdiv.classList.add('check');
      textdiv.appendChild(checkdiv);
    }
  }

  /**
   * Event handler ef HTML sían er valin efst.
   * Búinn er til nýr listi sem hleður inn HTML gögnum og einnig
   * CSS og/eða javascript gögnum ef þau eru valin.
   * Birtir svo grænan HTML takka og fjarlægir þann eðlilega.
   */

  showHTML(e) {
    saveTypes('HTML');
    const list = new List();
    empty(list.container);
    list.loadLectures()
      .then((data) => list.renderDataSpecial(data, 'html'));

    if (loadSavedTypes().includes('CSS')) {
      list.loadLectures()
        .then((data) => list.renderDataSpecial(data, 'css'));
    }
    if (loadSavedTypes().includes('Javascript')) {
      list.loadLectures()
        .then((data) => list.renderDataSpecial(data, 'javascript'));
    }

    const htmlbutton = document.querySelector('.flokkar__html');
    htmlbutton.classList.add('flokkar__html--hidden');
    const htmlbuttonNew = document.querySelector('.flokkar__htmlGreen');
    htmlbuttonNew.classList.remove('flokkar__htmlGreen--hidden');
  }

  /**
 * Event handler ef hætt er að velja HTML síuna efst.
 * Búinn er til nýr listi sem hleður inn CSS gögnum og/eða Javascript
 * gögnum ef þau eru valin, en ef ekkert er valið er öllu hlaðið inn.
 * Birtir svo eðlilega HTML takkann og fjarlægir þann græna.
 */

  removeHTML(e) {
    removeTypes('HTML');
    const list = new List();
    empty(list.container);

    if (loadSavedTypes().includes('CSS')) {
      list.loadLectures()
        .then((data) => list.renderDataSpecial(data, 'css'));
    }
    if (loadSavedTypes().includes('Javascript')) {
      list.loadLectures()
        .then((data) => list.renderDataSpecial(data, 'javascript'));
    } if (!(loadSavedTypes().includes('Javascript') || loadSavedTypes().includes('CSS'))) {
      list.loadLectures()
        .then((data) => list.renderData(data));
    }

    const htmlbuttonNew = document.querySelector('.flokkar__htmlGreen');
    htmlbuttonNew.classList.add('flokkar__htmlGreen--hidden');
    const htmlbutton = document.querySelector('.flokkar__html');
    htmlbutton.classList.remove('flokkar__html--hidden');
  }
  /**
   * Event handler ef CSS sían er valin efst.
   * Búinn er til nýr listi sem hleður inn CSS gögnum og einnig
   * HTML og/eða javascript gögnum ef þau eru valin.
   * Birtir svo grænan CSS takka og fjarlægir þann eðlilega.
   */

  showCSS(e) {
    saveTypes('CSS');
    const list = new List();
    empty(list.container);

    if (loadSavedTypes().includes('HTML')) {
      list.loadLectures()
        .then((data) => list.renderDataSpecial(data, 'html'));
    }

    list.loadLectures()
      .then((data) => list.renderDataSpecial(data, 'css'));

    if (loadSavedTypes().includes('Javascript')) {
      list.loadLectures()
        .then((data) => list.renderDataSpecial(data, 'javascript'));
    }

    const cssbutton = document.querySelector('.flokkar__css');
    cssbutton.classList.add('flokkar__css--hidden');
    const cssbuttonNew = document.querySelector('.flokkar__cssGreen');
    cssbuttonNew.classList.remove('flokkar__cssGreen--hidden');
  }
  /**
 * Event handler ef hætt er að velja CSS síuna efst.
 * Búinn er til nýr listi sem hleður inn HTML gögnum og/eða Javascript
 * gögnum ef þau eru valin, en ef ekkert er valið er öllu hlaðið inn.
 * Birtir svo eðlilega CSS takkann og fjarlægir þann græna.
 */

  removeCSS(e) {
    removeTypes('CSS');
    const list = new List();
    empty(list.container);

    if (loadSavedTypes().includes('HTML')) {
      list.loadLectures()
        .then((data) => list.renderDataSpecial(data, 'html'));
    }
    if (loadSavedTypes().includes('Javascript')) {
      list.loadLectures()
        .then((data) => list.renderDataSpecial(data, 'javascript'));
    } if (!(loadSavedTypes().includes('HTML') || loadSavedTypes().includes('HTML'))) {
      list.loadLectures()
        .then((data) => list.renderData(data));
    }

    const cssbuttonNew = document.querySelector('.flokkar__cssGreen');
    cssbuttonNew.classList.add('flokkar__cssGreen--hidden');
    const cssbutton = document.querySelector('.flokkar__css');
    cssbutton.classList.remove('flokkar__css--hidden');
  }
  /**
   * Event handler ef Javascript sían er valin efst.
   * Búinn er til nýr listi sem hleður inn Javascript gögnum og einnig
   * HTML og/eða CSS gögnum ef þau eru valin.
   * Birtir svo grænan Javascript takka og fjarlægir þann eðlilega.
   */

  showJavascript(e) {
    saveTypes('Javascript');
    const list = new List();
    empty(list.container);

    if (loadSavedTypes().includes('HTML')) {
      list.loadLectures()
        .then((data) => list.renderDataSpecial(data, 'html'));
    }
    if (loadSavedTypes().includes('CSS')) {
      list.loadLectures()
        .then((data) => list.renderDataSpecial(data, 'css'));
    }
    list.loadLectures()
      .then((data) => list.renderDataSpecial(data, 'javascript'));

    const jsbutton = document.querySelector('.flokkar__javascript');
    jsbutton.classList.add('flokkar__javascript--hidden');
    const jsbuttonNew = document.querySelector('.flokkar__javascriptGreen');
    jsbuttonNew.classList.remove('flokkar__javascriptGreen--hidden');
  }
  /**
 * Event handler ef hætt er að velja Javascript síuna efst.
 * Búinn er til nýr listi sem hleður inn HTML gögnum og/eða CSS
 * gögnum ef þau eru valin, en ef ekkert er valið er öllu hlaðið inn.
 * Birtir svo eðlilega Javascript takkann og fjarlægir þann græna.
 */

  removeJS(e) {
    removeTypes('Javascript');
    const list = new List();
    empty(list.container);

    if (loadSavedTypes().includes('HTML')) {
      list.loadLectures()
        .then((data) => list.renderDataSpecial(data, 'html'));
    }
    if (loadSavedTypes().includes('CSS')) {
      list.loadLectures()
        .then((data) => list.renderDataSpecial(data, 'css'));
    } if (!(loadSavedTypes().includes('HTML') || loadSavedTypes().includes('CSS'))) {
      list.loadLectures()
        .then((data) => list.renderData(data));
    }

    const jsbuttonNew = document.querySelector('.flokkar__javascriptGreen');
    jsbuttonNew.classList.add('flokkar__javascriptGreen--hidden');
    const jsbutton = document.querySelector('.flokkar__javascript');
    jsbutton.classList.remove('flokkar__javascript--hidden');
  }

  /**
   * Á þetta er kallað þegar forsíðan er keyrð, í gegnum index.js.
   * Hleður inn fyrirlestrargögnin og þegar það er komið
   * er farið í gegnum þau og fyrirlestraryfirlitið smíðað
   * Býr einnig til event handlera fyrir takkana uppi sem sjá um 
   * að sía eftir fyrirlestrargerð.
   */

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
  }
}
