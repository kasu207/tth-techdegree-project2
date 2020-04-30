/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
const studentList = document.querySelectorAll('li.student-item');
const pageLimit = 10;
const paginationDiv = document.createElement('div');
const error = document.createElement('p');
error.className = 'error';

//Funtction to display Students to the page
// accepts parameter: 
// # list = array of students
// # page = Int of page user wants to display
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
//Functtion to delete Pagination

const delPagination = () => {
   paginationDiv.innerHTML = '';
}
const delError = () => {
   error.innerHTML = '';
}
//Funtction to add pagelinks to the page
// accepts parameter: 
// # list = array
const appendPageLinks = (list) => {
   const numPages = Math.round(list.length / 10) + 1;
   const pageDiv = document.querySelector('.page');

   pageDiv.appendChild(paginationDiv);
   paginationDiv.className = 'pagination';
   const ul = document.createElement('ul');
   paginationDiv.appendChild(ul);
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
const searchBar = () => {
   const studentNames = document.querySelectorAll('.student-details h3');
   const page = document.querySelector('.page-header');
   const searchDiv = document.createElement('div');
   searchDiv.className = 'student-search';

   const input = document.createElement('input');
   searchDiv.appendChild(input);

   input.placeholder = 'Search for students...';

   const searchButton = document.createElement('button');
   searchDiv.appendChild(searchButton);

   searchButton.type = 'submit';
   searchButton.textContent = 'Search';

   searchDiv.appendChild(error);
   page.appendChild(searchDiv);

   //Function to add search trough student 
   // accepts parameter: 
   // # searchInput = input in Search Field
   // # names = array of student names
   const search = (searchInput, names) => {
      let searchResults = [];
      for (let i = 0; i < names.length; i++) {
         if ((searchInput.length !== 0) && (names[i].textContent.toLowerCase().includes(searchInput.toLowerCase()))) {
            names[i].parentNode.parentNode.style.display = '';
            searchResults.push(names[i].parentNode.parentNode);
            delPagination();
            delError();
         } else {
            names[i].parentNode.parentNode.style.display = 'none';
            delPagination();
            delError();
         }
      }
      if (searchResults == 0) {
         error.textContent = 'Sorry no user found with that name';
      }
      showPage(searchResults, 1);
      appendPageLinks(searchResults);
   };

   searchButton.addEventListener('click', (e) => {
      e.preventDefault();
      search(input.value, studentNames);
   });

   input.addEventListener('keyup', (e) => {
      e.preventDefault();
      if (input.value != '') {
         search(input.value, studentNames);
      } else {
         delPagination();
         showPage(studentList, 1);
         appendPageLinks(studentList)
      }
   });
};

//Call the functions
searchBar();
showPage(studentList, 1);
appendPageLinks(studentList);