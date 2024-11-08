// listing element
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;
const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;


document.getElementById('resume-form')?.addEventListener('submit', function(event){
    event.preventDefault();


// Get refrences to form elements using their IDs
const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;


    //type assertion
    const usernameElement = document.getElementById('username') as HTMLInputElement;
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const phoneElement = document.getElementById('phone') as HTMLInputElement;
    const educationElement = document.getElementById('education') as HTMLInputElement;
    const experienceElement = document.getElementById('experience') as HTMLInputElement;
    const skillsElement = document.getElementById('skills') as HTMLInputElement;
    

if (profilePictureInput && nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement && usernameElement) {
        
        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skills = skillsElement.value;
        const username = usernameElement.value;
       
        // picture elements
const profilePictureFile = profilePictureInput.files?.[0];
const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : '';

   //Create Resume Output
const resumeHTML = `
<h2><b>Editable Resume<b/></h2>
${profilePictureURL ? `<img src="${profilePictureURL}" alt="profile Picture" class="profilePicture">` : ''}
<h3>Personal Information</h3>
<p><strong>Name:</strong> <span id="edit-name" class="editable"> ${name} </span> </p>
<p><strong>Email:</strong> <span id="edit-email" class="editable"> ${email} </span> </p>
<p><strong>Phone Number:</strong> <span id="edit-phone" class="editable"> ${phone} </span> </p>

<h3>Education</h3>
<p id="edit-education" class="editable">${education}</p>

<h3>Experience</h3>
<p id="edit-experience" class="editable">${experience}</p>

<h3>Skills</h3>
<p id="edit-skills" class="editable">${skills}</p>
`;

//Display the generated resume
resumeDisplayElement.innerHTML = resumeHTML;

//Generate a shareable URL with the username only
const shareableURL=
`${window.location.origin}?username=${encodeURIComponent(username)}`;
// Display the shareable link
shareableLinkContainer.style.display = 'block';
shareableLinkElement.href = shareableURL;
shareableLinkElement.textContent = shareableURL;

// Save data to localStorage
localStorage.setItem(username, JSON.stringify({ name, email, phone, education, experience, skills, profilePictureURL }));
}
});

// Handle PDF download
downloadPdfButton.addEventListener('click', () => {
window.print(); // Opens the print dialog and allows saving as PDF
});

// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', () => {
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
if (username) {
const savedResumeData = localStorage.getItem(username);
if (savedResumeData) {
    const resumeData = JSON.parse(savedResumeData);
    // Populate form fields with saved data
    (document.getElementById('username') as HTMLInputElement).value = username;
    (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
    (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
    (document.getElementById('phone') as HTMLInputElement).value = resumeData.phone;
    (document.getElementById('education') as HTMLInputElement).value = resumeData.education;
    (document.getElementById('experience') as HTMLInputElement).value = resumeData.experience;
    (document.getElementById('skills') as HTMLInputElement).value = resumeData.skills;
}
}
});