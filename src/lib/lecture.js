/* eslint linebreak-style: ["error", "windows"] */

import {
  generateImage, generateText, generateQuote, generateHeading,
  generateList, generateCode, generateYoutube,
} from './converter';
import { saveLectures, loadSavedLectures, removeLectures } from './storage';
import { createElement } from './helpers';

export default class Lecture {
  constructor() {
    this.container = document.querySelector('.lecture');
    this.url = '../../lectures.json';
    this.header = document.querySelector('.header');
  }
  /**
   * Finnur réttan titil á fyrirlestri út frá slug
   */

  findTitle(slug) {
    let title;
    switch (slug) {
      case 'sagan':
        title = 'Sagan';
        break;
      case 'element':
        title = 'Element';
        break;
      case 'a11y':
        title = 'Aðgengi';
        break;
      case 'syntax':
        title = 'Málfræði';
        break;
      case 'box':
        title = 'Box model';
        break;
      case 'flexbox':
        title = 'Flexbox';
        break;
      case 'responsive':
        title = 'Skalanleg vefhönnun';
        break;
      case 'basic':
        title = 'Gildi, týpur og virkjar';
        break;
      case 'programs':
        title = 'Forrit';
        break;
      case 'functions':
        title = 'Föll';
        break;
      case 'array':
        title = 'Array & objects';
        break;
      case 'dom':
        title = 'DOM & vafrinn';
        break;
      case 'example':
        title = 'Dæmi';
        break;
      default: break;
    }
    return title;
  }

  /**
 * Hleður inn gögnum fyrir hvern fyrirlestur.
 * slug = Kóði fyrir slóðina á tiltekinn fyrirlestur.
 */

  loadLecture(slug) {
    // Setjum titil og flokk inn í header.
    const slugArray = slug.split('-');
    const slugCategory = slugArray[0];
    const slugTitle = slugArray[1];
    const realTitle = this.findTitle(slugTitle);
    const title = generateHeading(realTitle, 'h1');
    title.classList.add('header__h1');
    const category = generateHeading(slugCategory, 'h2');
    category.classList.add('header__h2');

    const titlediv = document.querySelector('.header__title');
    titlediv.appendChild(category);
    titlediv.appendChild(title);

    // Athugum hvort fyrirlesturinn sé vistaður - birtum "Fyrirlestur kláraður"
    // neðst ef svo er, annars "Klára fyrirlestur"
    const savedArray = loadSavedLectures();
    if (savedArray.includes(document.querySelector('.header__h1').textContent)) {
      const finishLecture = document.querySelector('.footer__finish');
      finishLecture.classList.add('footer__finish--hidden');
      const finishedLecture = document.querySelector('.footer__finished');
      finishedLecture.classList.remove('footer__finished--hidden');
    }

    /**
     * Nær í fyrirlestrana og ef það tekst þá er gögnum skilað fyrir
     * viðeigandi fyrirlestur, út frá slug.
     */
    return fetch(this.url)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Gat ekki sótt fyrirlestra');
        }
        return res.json();
      })
      .then((data) => {
        const found = data.lectures.find(i => i.slug === slug);
        if (!found) {
          throw new Error('Fyrirlestur fannst ekki');
        }
        // Birtum rétta mynd í header.
        const headerImage = document.querySelector('.header__image');
        const headerimageElement = createElement('img');
        headerimageElement.src = found.image;
        headerimageElement.classList.add('fyrirlestur__headerimg');
        headerImage.appendChild(headerimageElement);

        return found;
      });
  }
  /**
  *
  * Fer í gegnum öll JSON gögnin og mappar þau.
  */

  renderData(data) {
    data.content.map((item) => {
      this.renderItem(item);
      return true;
    });
  }
  /**
   * Fer í gegnum hvern item í fyrirlestrargagnafylkinu og meðhöndlar þá
   * mismunandi eftir því hvers konar gögn er um að ræða.
   */

  renderItem(item) {
    if (item.type === 'image') {
      const imageElement = generateImage(item.data);
      imageElement.classList.add('img');
      const imageText = document.createElement('p');
      imageText.classList.add('image__caption');
      imageText.appendChild(document.createTextNode(item.caption));
      this.container.appendChild(imageElement);
      this.container.appendChild(imageText);
    } else if (item.type === 'text') {
      const textElement = generateText(item.data);
      textElement.classList.add('text');
      this.container.appendChild(textElement);
    } else if (item.type === 'quote') {
      const quoteElement = generateQuote(item);
      this.container.appendChild(quoteElement);
    } else if (item.type === 'heading') {
      const headingElement = generateHeading(item.data, 'h2');
      headingElement.classList.add('heading');
      this.container.appendChild(headingElement);
    } else if (item.type === 'list') { // Búum til óraðaðan lista og bætum við sérhverju staki í honum sem li.
      const listElement = document.createElement('ul');
      listElement.classList.add('list');

      for (let i = 0; i < item.data.length; i += 1) {
        const listitem = generateList(item.data[i]);
        listitem.classList.add('list__tag');
        listElement.appendChild(listitem);
        this.container.appendChild(listElement);
      }
    } else if (item.type === 'code') {
      const codeElement = generateCode(item.data);
      codeElement.classList.add('code');
      this.container.appendChild(codeElement);
    } else if (item.type === 'youtube') {
      const videoElement = generateYoutube(item.data);
      videoElement.classList.add('youtube');
      this.container.appendChild(videoElement);
    }
  }

  /**
   * Atburðarhandler fyrir að klára fyrirlestur.
   * Setjum inn "Fyrirlestur kláraður" og felum "Klára fyrirlestur"
   * Vistum svo fyrirlesturinn.
   */

  finishLecture() {
    const finishLecture = document.querySelector('.footer__finish');
    finishLecture.classList.add('footer__finish--hidden');
    const finishedLecture = document.querySelector('.footer__finished');
    finishedLecture.classList.remove('footer__finished--hidden');
    saveLectures(document.querySelector('.header__h1').textContent);
  }
  /**
   * Atburðarhandler fyrir að taka til baka að hafa klárað fyrirlestur.
   * Setjum inn "Klára fyrirlestur" og felum "Fyrirlestur kláraður"
   * Fjarlægjum fyrirlesturinn úr localStorage.
   */

  unfinishLecture() {
    const finishedLecture = document.querySelector('.footer__finished');
    finishedLecture.classList.add('footer__finished--hidden');
    const unfinishedLecture = document.querySelector('.footer__finish');
    unfinishedLecture.classList.remove('footer__finish--hidden');
    removeLectures(document.querySelector('.header__h1').textContent);
  }

  /**
   * Hleður inn fyrirlestrum - kallað á í index.js.
   * Hleður inn vistuðum fyrirlestrum og býr til event handlera fyrir að klára
   * og "afklára" fyrirlestur.
   */
  load() {
    const qs = new URLSearchParams(window.location.search);
    const slug = qs.get('slug');

    loadSavedLectures();

    this.loadLecture(slug).then(data => this.renderData(data));
    const finishButton = document.querySelector('.footer__finish');
    finishButton.addEventListener('click', this.finishLecture);
    const finishedButton = document.querySelector('.footer__finished');
    finishedButton.addEventListener('click', this.unfinishLecture);
  }
}
