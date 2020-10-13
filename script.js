//SCALES

function Scale(name, notes){
    this.name = name;
    this.notes = notes;
    this.quantity = notes.length;
}

const scales = [];
scales.push(
new Scale('Major',[1, 3, 5, 6, 8, 10, 12]),
new Scale('Dorian',[1, 3, 4, 6, 8, 10, 11]),
new Scale('Phrygian',[1, 2, 4, 6, 8, 9, 11]),
new Scale('Lydian',[1, 3, 5, 7, 8, 10, 12]),
new Scale('Mixolydian',[1, 3, 5, 6, 8, 10, 11]),
new Scale('Natural Minor',[1, 3, 4, 6, 8, 9, 11]),
new Scale('Locrian',[1, 2, 4, 6, 7, 9, 11])
);

//SORT FUNCTION

const compareNr = (a, b) => a - b;

//DOM

const notesDOM = document.querySelectorAll('.noteS');
const rootBtn = {
  DOM : document.querySelector('.rootBtn')
}
const searchButton = document.querySelector('.searchActive');
const resultsDiv = document.querySelector('.results');

//NOTES

function Note(name){
  this.name = name;
}

const note = [];

note.push(
new Note('C'),
new Note('C#'),
new Note('D'),
new Note('D#'),
new Note('E'),
new Note('F'),
new Note('F#'),
new Note('G'),
new Note('G#'),
new Note('A'),
new Note('A#'),
new Note('B')
);

//STYLES

function sActiveNote(note){
  if(note.active) note.DOM.classList.add("chosen");
  else note.DOM.classList.remove("chosen");
}
function sActiveRootBtn(r) {
  if(r.active) r.DOM.classList.add("rootBtnActive");
  else r.DOM.classList.remove("rootBtnActive");
}
function sActiveRootNote(r) {
  if(r.root) r.DOM.classList.add("rootNote");
  else r.DOM.classList.remove("rootNote");
}

//ROOT NOTE

rootNote = 0;
rootBtn.active = 0;
function activateRootButton() {
  (rootBtn.active) ? rootBtn.active = 0 : rootBtn.active = 1;
  sActiveRootBtn(rootBtn);
  console.log(rootBtn.active + " " + rootNote);
}
rootBtn.DOM.addEventListener('click', _=> {
  activateRootButton();
})

//NOTES PROPERTIES

note.forEach((el, i, arr) => {
  el.nr = i+1;
  el.DOM = notesDOM[i];
  el.active = 0;
  el.root = 0;
  el.DOM.addEventListener('click', _=> {
    if(rootBtn.active) {
      if(rootNote){
        arr[rootNote-1].root = 0;
        sActiveRootNote(arr[rootNote-1]);
      }
      rootNote = el.nr;
      el.root = 1;
      el.active = 1;
      activateRootButton();
    } else if(el.active) {
      el.active = 0
      if(el.root) rootNote = 0;
      el.root = 0;
    } else el.active = 1;
    sActiveNote(el);
    sActiveRootNote(el);
    console.log(el.name + " " + el.nr + " " + el.active + " " + el.root);
  })
});

//COMPARING NOTES

const compareNotes = (notes) => {
  const qon = notes.length;
  let correctScales = [];
  scales.forEach((item, i) => {
    //if(qon>item.quantity) continue;
    for(j=0; j<qon; j++){
      if(item.notes.indexOf(notes[j]) == -1) break;
      if(j==qon-1) correctScales.push(i);
    };

  });
  console.log("scales: " + correctScales);
  return correctScales;
}

//SHOWING RESULTS

function showResults(results,root) {
  if(!results.length) return "<span>None of scales found :/</span><span><i>try with different notes</i></span>";
  let offset = root;
  root = note[root-1].name;
  let toHTML = '';
  results.forEach((item, i) => {
    toHTML += `
    <div class="scaleName">
      <b><span class="red">${root}</span></b> ${scales[item].name.toLowerCase()}
    </div>
    <div class="notesOfScale">`;
    scales[results[i]].notes.forEach((el, j) => {
      let isRed = '';
      if(j==0) isRed = 'red '
      let noteNumber = el+offset-2;
      if (noteNumber>11) noteNumber -= 12;
      console.log(noteNumber);
      toHTML += `<span class="${isRed}noteInScale">${note[noteNumber].name}</span> `
    });
    toHTML += '</div>';
    console.log("==");
  });
  return toHTML;
}

//SAVING NOTES

let activeNotes;
searchButton.addEventListener('click', _=>{
  let rootNoteS = rootNote;

  let activeNotes = [];
  note.forEach((el, i, arr) => {
    if(el.active) activeNotes.push(el.nr);
  });
  console.log(activeNotes);

  if(!rootNoteS) rootNoteS = activeNotes[0];

  if(rootNoteS){
    let offset = rootNoteS - 1;
    activeNotes.forEach((el, i, arr) => {
      arr[i] -= offset;
      if(arr[i]<1) arr[i] += 12;
    });
    activeNotes.sort(compareNr);
    console.log(activeNotes);
  }
  resultsDiv.innerHTML = showResults(compareNotes(activeNotes),rootNoteS);
})
