// Header background color
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if(window.pageYOffset > 10) {
        header.style.backgroundColor = '#121235e9';
        header.style.boxShadow = '0px 5px 10px rgba(0,0,0,0.3)'
    } else {
        header.style.backgroundColor = 'transparent';
        header.style.boxShadow = 'none'
    }
})

// removing default button settings
document.querySelectorAll('.btn').forEach( btn => {
   btn.addEventListener('click', (event) => {
      event.preventDefault();
   });
});

// Listings from Remotive API
const listings = document.querySelector('.job-listings');
// Job descrption modal
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal.container');
const modalHeading = document.querySelector('.modal-name');
const modalInfo = document.querySelector('.modal-info');
const modalDescription = document.querySelector('.modal-description');
// for category filter
const input = document.querySelector('.category');
const submit = document.querySelector('.submit');

function fetchData(query) {
   let url = `https://remotive.io/api/remote-jobs?category=${query}`;

   fetch(url)
   .then( response => {
      return response.json();
   })
   .then( data => {
      let jobs = data.jobs;
      
      jobs.forEach(job => {
      //    Box for job posting
         let listing = document.createElement('div');
         listing.classList.add('listing');

      //    Job company
         let companyName = document.createElement('h3');
         companyName.classList.add('name');
         companyName.innerHTML = job.company_name;
         
      //    Job title
         let companyInfo = document.createElement('p');
         companyInfo.classList.add('info');
         companyInfo.innerHTML = job.title;

      //   Job type
         let jobType = document.createElement('p');
         jobType.classList.add('type');
         jobType.innerHTML = job.job_type;

      //   Job location
         let jobLocation = document.createElement('p');
         jobLocation.classList.add('location');
         jobLocation.innerHTML = job.candidate_required_location;
         
      //   Verification star
         let verify = document.createElement('span');
         verify.classList.add('verify');
         verify.innerHTML = '&#9733;Verified'

      //   Know more button
         let details = document.createElement('a');
         details.classList.add('btn');
         details.innerHTML = "Know More";

      
   //    Open the job description
         details.addEventListener('click', () => {
         modal.style.display = 'block';  
         //   event.target.parentNode.children gives an array of child elements within listing div
         modalHeading.innerHTML =  event.target.parentNode.children[0].innerHTML;
         modalInfo.innerHTML =  event.target.parentNode.children[1].innerHTML;
         modalDescription.innerHTML = job.description;
         
         // Closing the modal
         window.addEventListener( 'click', (event) => {
               if(event.target == modal || event.target.className == 'close') {
                  modal.style.display = 'none';
               }
         });
      }); 
      
      // Appending all info to listing div
         listing.appendChild(companyName);
         listing.appendChild(companyInfo);
         listing.appendChild(jobType);
         listing.appendChild(jobLocation);
         listing.appendChild(verify);
         listing.appendChild(details);
         listings.appendChild(listing);
      });         
   }).catch( (err) => {
      console.log(err)
   });
}


// display standard listings when window loads
window.addEventListener('load', fetchData('all-others'));

// filter listings based on input
submit.addEventListener( 'click', () => {
   event.preventDefault();

   const inputValue = input.value;  
   input.value = 'Select Category';  
   listings.innerHTML = ' ';

   fetchData(inputValue);
});
