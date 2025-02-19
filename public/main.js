import '../styles/main.scss';
import sortStudent from '../utils/data/sortStudent';
import header from '../components/header';
import { students, voldysArmy } from '../utils/data/arrays';
import renderToDOM from '../utils/renderToDOM';
import studentsOnDom from '../utils/data/studentsOnDom';

// ********** HTML Components  ********** //
// the basic HMTL structure of app
const htmlStructure = () => {
  const domString = `
  <div id="header-container" class="header mb-3"></div>
  <div id="form-container" class="container mb-3 text-center"></div>
  <div id="filter-container" class="container mb-3"></div>
  <div id="student-container" class="container d-flex"></div>
  `;

  renderToDOM('#app', domString);
};

const startSortingBtn = () => {
  const domString = '<button type="button" class="btn btn-info" id="start-sorting">Start the Sorting Ceremony!</button>';

  renderToDOM('#form-container', domString);
};

const studentAreas = () => {
  const domString = `<div id="students">No Students</div>
  <div id="voldy">No Death Eaters</div>`;

  renderToDOM('#student-container', domString);
};

const filterBtnRow = () => {
  const domString = `<div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" id="filter--hufflepuff" class="btn btn-warning btn-sm">Hufflepuff</button>
      <button type="button" class="btn btn-primary btn-sm" id="filter--ravenclaw">Ravenclaw</button>
      <button type="button" class="btn btn-success btn-sm" id="filter--slytherin">Slytherin</button>
      <button type="button" class="btn btn-danger btn-sm" id="filter--gryffindor">Gryffindor</button>
      <button type="button" class="btn btn-secondary btn-sm" id="filter--all">All</button>
    </div>`;

  renderToDOM('#filter-container', domString);
};

// ********** LOGIC  ********** //
// sorts student to a house and then place them in the students array

const form = () => {
  const domString = `<form id="sorting" class="d-flex flex-column form-floating ">
    <input
    type="text"
    class="form-control mb-1"
    id="student-name"
    placeholder="Enter a name"
    required
  />
  <label for="floatingInputValue">Name to be sorted</label>
<button type="submit" class="btn btn-success">Get Sorted!</button>
</form>`;

  renderToDOM('#form-container', domString);

  // has to be put on the DOM after form is on DOM, not before
  // on form submit, sort student
  document.querySelector('#sorting').addEventListener('submit', sortStudent);
};

const events = () => {
  // get form on the DOM on button click
  document.querySelector('#start-sorting').addEventListener('click', () => {
    // put html elements on the DOM on click
    form(); // form
    filterBtnRow(); // filter buttons
    studentAreas(); // students and voldy's army divs
  });
  // target expel buttons to move to voldys army
  document.querySelector('#student-container').addEventListener('click', (e) => {
    if (e.target.id.includes('expel')) {
      const [, id] = e.target.id.split('--');
      const index = students.findIndex((student) => student.id === Number(id));

      // move from one array to another
      voldysArmy.push(...students.splice(index, 1));
      // get both sets of students on the DOM
      studentsOnDom('#students', students);
      studentsOnDom('#voldy', voldysArmy);
    }
  });
  // target filter buttons on Dom
  document.querySelector('#filter-container').addEventListener('click', (e) => {
    if (e.target.id.includes('filter')) {
      const [, house] = e.target.id.split('--');

      if (house === 'all') {
        studentsOnDom('#students', students);
      } else if (house) {
        const filter = students.filter((student) => student.house === house);
        studentsOnDom('#students', filter, house);
      }
    }
  });
};

// add form to DOM on start-sorting click.
// Add events for form after the form is on the DOM

const startApp = () => {
  htmlStructure(); // always load first
  header();
  startSortingBtn();
  events(); // always load last
};

startApp();
