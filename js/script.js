/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing
/*** 
 * Global Scope
 ***/
const studentList = document.querySelectorAll('li.student-item');
const pageLimit = 10;
const div = document.createElement('div');

const showPage = (list, page) => {
   var startPage = 0;
   var endPage = 0;
   if (page > 1) {
      startPage = (page * pageLimit) - pageLimit;
      endPage = (page * pageLimit);
   } else if (page === 1) {
      startPage = page - 1;
      endPage = startPage + (pageLimit - 1);
   } else {
      console.log('Please pass Number bigger than 0')
   };
   for (let i = 0; i < list.length; i++) {
      if (i >= startPage && i <= endPage) {
         list[i].style.display = '';
      } else {
         list[i].style.display = 'none';
      }
   }
}
/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
const appendPageLinks = (list) => {
   const numPages = Math.round(list.length / 10) + 1;
   const pageDiv = document.querySelector('.page');

   div.className = 'pagination';
   pageDiv.appendChild(div);
   const ul = document.createElement('ul');
   div.appendChild(ul);
   for (let i = 1; i <= numPages; i++) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      ul.appendChild(li);
      li.appendChild(a);
      a.textContent = i;
      if (a.textContent == 1) {
         a.className = 'active'
      };
      a.addEventListener('click', (e) => {
         const viewPage = parseInt(e.target.textContent);
         showPage(list, viewPage);
         const links = document.querySelectorAll('a');
         for (let i = 0; i < links.length; i++) {
            links[i].className = '';
         }
         e.target.className = 'active';
      });
   };
};
/*** 
Searchbar 
***/
const studentNames = document.querySelectorAll('.student-details h3');

const searchBar = () => {
   const page = document.querySelector('.page-header');
   const searchDiv = document.createElement('div');

   searchDiv.className = 'student-search';
   const input = document.createElement('input');
   const searchButton = document.createElement('button');
   searchDiv.appendChild(input);
   input.placeholder = 'Search for students...';
   searchDiv.appendChild(searchButton);
   searchButton.type = 'submit';
   searchButton.textContent = 'Search';
   page.appendChild(searchDiv);

   searchButton.addEventListener('click', (e) => {
      e.preventDefault();
      search(input.value, studentNames);
   });
   input.addEventListener('keyup', (e) => {
      e.preventDefault();
      if (input.value != '') {
         search(input.value, studentNames);
      } else {
         showPage(studentList, 1);
      }
   });
};
const search = (searchInput, names) => {
   let searchResults = [];
   for (let i = 0; i < names.length; i++) {
      if ((searchInput.length !== 0) && (names[i].textContent.toLowerCase().includes(searchInput.toLowerCase()))) {
         names[i].parentNode.parentNode.style.display = '';
         searchResults.push(names[i].parentNode.parentNode);
         div.innerHTML = '';
      } else {
         names[i].parentNode.parentNode.style.display = 'none';
         div.innerHTML = '';
      }
   }
   showPage(searchResults, 1);
   appendPageLinks(searchResults);
};

//Call the functions
searchBar();
showPage(studentList, 1);
appendPageLinks(studentList);