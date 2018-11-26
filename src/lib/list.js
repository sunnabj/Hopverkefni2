import { empty, createElement } from './helpers';
import { generateImage, generateTitle, generateCategory } from './converter';

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

  /**
   * Sér um að setja allt inn í html-ið
   * @param {*} data 
   */
  renderData(data) {
    console.log(data.lectures); // Þurfum að fara í gegnum hvern einasta hlut og sækja thumbnail
    
    data.lectures.map((item) => {
      this.renderItem(item);
    });

    /*
    const dataElement = createElement('p', JSON.stringify(data));
    this.container.appendChild(dataElement);
    */
    /*
    const element = document.createElement('p');
    element.appendChild(document.createTextNode(JSON.stringify(data)));
    this.container.appendChild(element);
    */
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

  load() {
    empty(this.container);
    this.loadLectures()
      .then((data) => this.renderData(data));
  }
}
