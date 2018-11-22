import { createElement } from './helpers';

export function generateImage(imagePath) {
  if (!imagePath) {
    return document.createElement('div');
    // Má nota css til að teikna grátt og jafn stórt
  }
  const imageElement = createElement('img');
  imageElement.src = `../../${imagePath}`;
  return imageElement;
}

export function generateTitle(title, slug) {
  const link = document.createElement('a');
  link.href = `/fyrirlestur.html?slug=${slug}`;
  // slug = linkurinn sem við ætlum að hafa
  const titleElement = document.createElement('h1');
  titleElement.appendChild(document.createTextNode(title));

  link.appendChild(titleElement);
  return link;
}

export function generateCategory(category) {
  const categoryElement = document.createElement('h2');
  categoryElement.appendChild(document.createTextNode(category));
  return categoryElement;
}

export function generateText(text) {
  const textElement = document.createElement('p');
  textElement.appendChild(document.createTextNode(text));
  return textElement;
}

export function generateQuote(quote) {
  const quoteElement = document.createElement('blockquote');
  const quoteText = generateText(quote.data);
  const quoteAttribute = generateText(quote.attribute);
  quoteElement.appendChild(quoteText);
  quoteElement.appendChild(quoteAttribute);
  return quoteElement;
}

export function generateHeading(heading) {
  const headingElement = document.createElement('h1');
  headingElement.appendChild(document.createTextNode(heading));
  return headingElement;
}

export function generateCode(code) {
  const preElement = document.createElement('pre');
  const codeElement = document.createElement('code');
  codeElement.appendChild(document.createTextNode(code));
  preElement.appendChild(codeElement);
  return preElement;
}

export function generateList(listitem) {
  const listdata = document.createElement('li');
  listdata.appendChild(document.createTextNode(listitem));
  return listdata;
}

export function generateYoutube(youtube) {
  const videoElement = document.createElement('iframe');
  videoElement.src = youtube;
  return videoElement;
}
