const LOCALSTORAGE_KEY = 'saved_lectures';
let lectureArray = [];

export function loadSavedLectures() {
  const saved = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY));

  if (saved) {
    lectureArray = saved;
    return lectureArray;
  }
  return [];
}

export function saveLectures(slug) {
  if (!lectureArray.includes(slug)) {
    lectureArray.push(slug);
  }
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(lectureArray));
  console.log(lectureArray);
}
