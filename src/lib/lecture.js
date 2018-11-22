import { generateImage, generateText, generateQuote, generateHeading, generateList, generateCode, generateYoutube } from './converter';

export default class Lecture {
  constructor() {
    this.container = document.querySelector('.lecture');
    this.url = '../lectures.json';
  }

  loadLecture(slug) {
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
        return found;
      });
  }

  renderData(data) {
    console.log(data.content);
    data.content.map((item) => {
      this.renderItem(item);
    });

  }

  renderItem(item) {
    if (item.type === 'image') {
      const imageElement = generateImage(item.data);
      const imageText = document.createElement('h3');
      imageText.appendChild(document.createTextNode(item.caption));
      // const imageText = generateText(item.caption);
      this.container.appendChild(imageElement);
      this.container.appendChild(imageText);
    }
    else if (item.type === 'text') {
      const textElement = generateText(item.data);
      this.container.appendChild(textElement);
    }
    else if (item.type === 'quote') {
      const quoteElement = generateQuote(item);
      // quoteElement.setAttribute(item.attribute);
      this.container.appendChild(quoteElement);
    }
    else if (item.type === 'heading') {
      const headingElement = generateHeading(item.data);
      this.container.appendChild(headingElement);
    }
    else if (item.type === 'list') {
      const listElement = document.createElement('ul');

      for (let i = 0; i < item.data.length; i += 1) {
        const listitem = generateList(item.data[i]);
        listElement.appendChild(listitem);
        this.container.appendChild(listElement);
      }
    }
    else if (item.type === 'code') {
      const codeElement = generateCode(item.data);
      this.container.appendChild(codeElement);
    }
    else if (item.type === 'youtube') {
      const videoElement = generateYoutube(item.data);
      this.container.appendChild(videoElement);
    }

  }

  load() {
    const qs = new URLSearchParams(window.location.search);
    const slug = qs.get('slug');

    this.loadLecture(slug).then((data) => this.renderData(data));
  }
}