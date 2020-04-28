/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/

/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/
/*** 
 * Global Scope
 ***/
const studentList = document.querySelectorAll('.student-item');

const showPage = (list, page) => {
   /*
    Loop over items in the list parameter
    -- If the index of a list item is ​>=​ the index of the first item that should be shown on the page
    -- ​&&​ the list item index is ​<=​ the index of the last item that should be shown on the page, show it
    */
   var startPage = 0;
   var endPage = 0;
   if (page > 1) {
      startPage = (page * 10) - 10;
      endPage = (page * 10) - 1;
   } else if (page === 1) {
      startPage = page - 1;
      endPage = startPage + 9;
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
showPage(studentList, 1);
/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
const appendPageLinks = (list) => {
   const numPages = Math.round(list.length / 10) + 1;
   const pageDiv = document.querySelector('.page');
   const div = document.createElement('div');
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
      if(a.textContent == 1){ a.className = 'active'};
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
appendPageLinks(studentList);