/* eslint linebreak-style: ["error", "windows"] */

import { createElement } from './helpers';

/**
 * Hér koma föll sem sjá um að búa til element fyrir sérhverja týpu af elementum á síðunni
 */

/**
 * Býr til element fyrir myndir. Ef mynd er ekki til staðar, eins og í nokkrum tilvikum
 * á forsíðu er búið til annað div í staðinn sem er breytt í gráan kassa.
 */
export function generateImage(imagePath) {
  if (!imagePath) {
    const greydiv = document.createElement('div');
    greydiv.classList.add('greydiv');
    return greydiv;
  }
  const imageElement = createElement('img');
  imageElement.src = `${imagePath}`;
  imageElement.classList.add('thumbnail');
  return imageElement;
}
/**
 * Býr til element fyrir titla á forsíðu. Þeir hafa linka sem samsvara
 * viðeigandi fyrirlestri, fengnir með slug.
 */
export function generateTitle(title, slug) {
  const link = document.createElement('a');
  link.href = `fyrirlestur.html?slug=${slug}`;
  const titleElement = createElement('h2', title);

  link.appendChild(titleElement);
  return link;
}
/**
 * Býr til element fyrir category fyrirlesturs, þ.e. html, css eða javascript
 */
export function generateCategory(category) {
  return createElement('h3', category);
}
/**
 * Býr til element fyrir texta.
 */
export function generateText(text) {
  return createElement('p', text);
}
/**
 * Býr til element fyrir quotes. Hver þeirra hefur texta og attribute.
 */
export function generateQuote(quote) {
  const quoteElement = document.createElement('blockquote');
  quoteElement.classList.add('quote');
  const quoteText = generateText(quote.data);
  quoteText.classList.add('quote__data');

  const quoteAttribute = generateText(quote.attribute);
  quoteAttribute.classList.add('quote__attribute');
  quoteElement.appendChild(quoteText);
  quoteElement.appendChild(quoteAttribute);
  return quoteElement;
}
/**
 * Býr til element fyrir heading. Tekur inn size sem tilgreinir hvaða
 * gerð af heading skal búa til (h1, h2, h3 o.s.frv.).
 */
export function generateHeading(heading, size) {
  return createElement(size, heading);
}
/**
 * Býr til element fyrir kóða. Utan um kóðann er pre element til að fá
 * eðlilegt útlit og uppsetningu.
 */
export function generateCode(code) {
  const preElement = document.createElement('pre');
  const codeElement = createElement('code', code);
  preElement.appendChild(codeElement);
  return preElement;
}
/**
 * Býr til element fyrir hvert stak í lista.
 */
export function generateList(listitem) {
  return createElement('li', listitem);
}
/**
 * Býr til element fyrir youtube myndbönd.
 */
export function generateYoutube(youtube) {
  const videoElement = document.createElement('iframe');
  videoElement.src = youtube;
  videoElement.frameborder = '0';
  videoElement.allowfullscreen = '0';
  return videoElement;
}
