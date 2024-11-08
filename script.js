var _a;
// listing element
var form = document.getElementById('resume-form');
var resumeDisplayElement = document.getElementById('resume-display');
var shareableLinkContainer = document.getElementById('shareable-link-container');
var shareableLinkElement = document.getElementById('shareable-link');
var downloadPdfButton = document.getElementById('download-pdf');
(_a = document.getElementById('resume-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    var _a;
    event.preventDefault();
    // Get refrences to form elements using their IDs
    var profilePictureInput = document.getElementById('profilePicture');
    //type assertion
    var usernameElement = document.getElementById('username');
    var nameElement = document.getElementById('name');
    var emailElement = document.getElementById('email');
    var phoneElement = document.getElementById('phone');
    var educationElement = document.getElementById('education');
    var experienceElement = document.getElementById('experience');
    var skillsElement = document.getElementById('skills');
    if (profilePictureInput && nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement && usernameElement) {
        var name_1 = nameElement.value;
        var email = emailElement.value;
        var phone = phoneElement.value;
        var education = educationElement.value;
        var experience = experienceElement.value;
        var skills = skillsElement.value;
        var username = usernameElement.value;
        // picture elements
        var profilePictureFile = (_a = profilePictureInput.files) === null || _a === void 0 ? void 0 : _a[0];
        var profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : '';
        //Create Resume Output
        var resumeHTML = "\n<h2><b>Editable Resume<b/></h2>\n".concat(profilePictureURL ? "<img src=\"".concat(profilePictureURL, "\" alt=\"profile Picture\" class=\"profilePicture\">") : '', "\n<h3>Personal Information</h3>\n<p><strong>Name:</strong> <span id=\"edit-name\" class=\"editable\"> ").concat(name_1, " </span> </p>\n<p><strong>Email:</strong> <span id=\"edit-email\" class=\"editable\"> ").concat(email, " </span> </p>\n<p><strong>Phone Number:</strong> <span id=\"edit-phone\" class=\"editable\"> ").concat(phone, " </span> </p>\n\n<h3>Education</h3>\n<p id=\"edit-education\" class=\"editable\">").concat(education, "</p>\n\n<h3>Experience</h3>\n<p id=\"edit-experience\" class=\"editable\">").concat(experience, "</p>\n\n<h3>Skills</h3>\n<p id=\"edit-skills\" class=\"editable\">").concat(skills, "</p>\n");
        //Display the generated resume
        resumeDisplayElement.innerHTML = resumeHTML;
        //Generate a shareable URL with the username only
        var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
        // Display the shareable link
        shareableLinkContainer.style.display = 'block';
        shareableLinkElement.href = shareableURL;
        shareableLinkElement.textContent = shareableURL;
        // Save data to localStorage
        localStorage.setItem(username, JSON.stringify({ name: name_1, email: email, phone: phone, education: education, experience: experience, skills: skills, profilePictureURL: profilePictureURL }));
    }
});
// Handle PDF download
downloadPdfButton.addEventListener('click', function () {
    window.print(); // Opens the print dialog and allows saving as PDF
});
// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            // Populate form fields with saved data
            document.getElementById('username').value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('phone').value = resumeData.phone;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('experience').value = resumeData.experience;
            document.getElementById('skills').value = resumeData.skills;
        }
    }
});
