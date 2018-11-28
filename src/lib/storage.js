/* eslint linebreak-style: ["error", "windows"] */

const LOCALSTORAGE_KEY = 'saved_lectures'; // Heldur utan um kláraða fyrirlestra
let lectureArray = []; // Fylki fyrir kláraða fyrirlestra
const LOCALSTORAGE_KEY2 = 'saved_types'; // Heldur utan um týpur sem er búið að velja (HTML, CSS eða JS)
let typeArray = []; // Fylki fyrir týpurnar

/**
 * Nær í vistaða fyrirlestra og skilar fylkinu fyrir þá
 */
export function loadSavedLectures() {
  const saved = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY));

  if (saved) {
    lectureArray = saved;
    return lectureArray;
  }
  return [];
}
/**
 * Vistar fyrirlestra, vistar ekki sama fyrirlesturinn tvisvar.
 */
export function saveLectures(slug) {
  if (!lectureArray.includes(slug)) {
    lectureArray.push(slug);
  }
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(lectureArray));
  console.log(lectureArray); // Muna að fjarlægja
}
/**
 * Fjarlægir fyrirlestra úr localstorage - gerist þegar ýtt er á fyrirlestur kláraður
 */
export function removeLectures(slug) {
  const index = lectureArray.indexOf(slug);
  if (index > -1) {
    lectureArray.splice(index, 1);
  }
  console.log(lectureArray); // Muna að taka út
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(lectureArray));
}
/**
 * Hreinsar localstorage, þurfum í sjálfu sér ekki á að halda
 */
export function clear() {
  window.localStorage.clear();
  lectureArray = [];
}
/**
 * Nær í týpur sem er búið að velja á forsíðu - skilar fylki með þeim.
 */
export function loadSavedTypes() {
  const saved = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY2));

  if (saved) {
    typeArray = saved;
    return typeArray;
  }
  return [];
}
/**
 * Vistar týpur sem er búið að velja á forsíðu
 */
export function saveTypes(type) {
  typeArray.push(type);
  localStorage.setItem(LOCALSTORAGE_KEY2, JSON.stringify(typeArray));
  console.log(typeArray); // Muna að taka út
}
/**
 * Tekur út týpur af forsíðu, gerist þegar maður hakar aftur í þær
 */
export function removeTypes(type) {
  const index = typeArray.indexOf(type);
  if (index > -1) {
    typeArray.splice(index, 1);
  }
  console.log(typeArray); // Muna að taka út.
  localStorage.setItem(LOCALSTORAGE_KEY2, JSON.stringify(typeArray));
}
