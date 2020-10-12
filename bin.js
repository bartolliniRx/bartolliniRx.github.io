note[0].DOM.addEventListener('click', function() {
  console.log(note[0].name);
})
note[1].DOM.addEventListener('click', function() {
  console.log(note[1].name);
})
note[2].DOM.addEventListener('click', function() {
  console.log(note[2].name);
})
note[3].DOM.addEventListener('click', function() {
  console.log(note[3].name);
})
note[4].DOM.addEventListener('click', function() {
  console.log(note[4].name);
})
note[5].DOM.addEventListener('click', function() {
  console.log(note[5].name);
})

for(i=0; i<12; i++){
  note[i].nr = i+1;
  note[i].DOM = notesDOM[i];
}

<div>
    Left click for <br><b><span class="blue">note</span></b>
</div>
<div>
    Right click for <br><b><span class="red">root</span></b>
</div>

<div class="right">
    <div class="results">
        <div class="scaleName">
            <b><span class="red">C</span></b> natural minor
        </div>
        <div class="notesOfScale">
            <span class="red noteInScale">C</span> <span class="noteInScale">D#</span>
        </div>

    </div>
</div>

function compareNotes(notes){
  const qon = notes.length;
  let correctScales = [];
  scales.forEach((item, i) => {
    if(qon>item.quantity) continue;
    notes.forEach((el, j) => {

    });

  });

}
