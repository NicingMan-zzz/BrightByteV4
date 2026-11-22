// BrightByte Studio - Main JavaScript

// 1. Mobile Navigation Menu Toggle
var menuBtn = document.getElementById("menu-toggle");
var navList = document.getElementById("nav-links");

if (menuBtn && navList) {
  menuBtn.addEventListener("click", function () {
    navList.classList.toggle("open");
  });
}

// 2. Simple Custom Cursor (Desktop only)
var cursor = document.createElement("div");
cursor.className = "custom-cursor";
document.body.appendChild(cursor);

document.addEventListener("mousemove", function (event) {
  cursor.style.opacity = "1";
  cursor.style.left = event.clientX + "px";
  cursor.style.top = event.clientY + "px";
});

document.addEventListener("mouseleave", function () {
  cursor.style.opacity = "0";
});

var interactiveItems = document.querySelectorAll("a, button, input, select, textarea");
for (var i = 0; i < interactiveItems.length; i++) {
  interactiveItems[i].addEventListener("mouseenter", function () {
    cursor.classList.add("cursor-hover");
  });
  interactiveItems[i].addEventListener("mouseleave", function () {
    cursor.classList.remove("cursor-hover");
  });
}

// 3. Services Table Category Filter (on services.html)
var filterButtons = document.querySelectorAll(".filter-btn");
var serviceRows = document.querySelectorAll(".service-row");

if (filterButtons.length > 0) {
  for (var j = 0; j < filterButtons.length; j++) {
    filterButtons[j].addEventListener("click", function () {
      var selected = this.getAttribute("data-category");

      for (var k = 0; k < filterButtons.length; k++) {
        filterButtons[k].classList.remove("active");
      }
      this.classList.add("active");

      for (var r = 0; r < serviceRows.length; r++) {
        var rowCategory = serviceRows[r].getAttribute("data-category");
        if (selected === "all" || rowCategory === selected) {
          serviceRows[r].style.display = "";
        } else {
          serviceRows[r].style.display = "none";
        }
      }
    });
  }
}

// 4. Contact Form Validation & Confirmation (on contact.html)
var contactForm = document.getElementById("contact-form");
var feedbackBox = document.getElementById("form-feedback");

if (contactForm && feedbackBox) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var fullName = document.getElementById("contactName").value.trim();
    var email = document.getElementById("email").value.trim();
    var phone = document.getElementById("phone").value.trim();
    var serviceSelect = document.getElementById("service");
    var serviceText = serviceSelect.options[serviceSelect.selectedIndex].text;
    var preferredDate = document.getElementById("preferredDate").value;
    var preferredTime = document.getElementById("preferredTime").value;
    var message = document.getElementById("message").value.trim();
    var agree = document.getElementById("agree").checked;

    var contactMethod = "";
    var radios = document.getElementsByName("contactMethod");
    for (var m = 0; m < radios.length; m++) {
      if (radios[m].checked) {
        contactMethod = radios[m].value;
      }
    }

    // Basic validation checks
    if (fullName.length < 2) {
      showFeedback("Please enter your full name.", false);
      return;
    }

    if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
      showFeedback("Please enter a valid email address.", false);
      return;
    }

    if (serviceSelect.value === "") {
      showFeedback("Please select a service package.", false);
      return;
    }

    if ((contactMethod === "Phone" || contactMethod === "WhatsApp") && phone === "") {
      showFeedback("Please provide your phone number for " + contactMethod + " contact.", false);
      return;
    }

    if (preferredTime !== "" && preferredDate === "") {
      showFeedback("Please select a date to go with your preferred time.", false);
      return;
    }

    if (preferredDate !== "") {
      var chosen = new Date(preferredDate + "T00:00:00");
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      if (chosen < today) {
        showFeedback("Please pick today or an upcoming date.", false);
        return;
      }
    }

    if (message.length < 15) {
      showFeedback("Please tell us a bit more about your project (at least 15 characters).", false);
      return;
    }

    if (!agree) {
      showFeedback("Please tick the confirmation box before submitting.", false);
      return;
    }

    var summary = "Thank you, " + fullName + "! Your inquiry for " + serviceText +
      " has been recorded. Our team in Kuala Lumpur will get back to you via " +
      (contactMethod || "Email") + " within 1 business day.";

    showFeedback(summary, true);
    contactForm.reset();
  });

  contactForm.addEventListener("reset", function () {
    feedbackBox.className = "form-feedback";
    feedbackBox.textContent = "";
  });
}

function showFeedback(text, isSuccess) {
  feedbackBox.textContent = text;
  if (isSuccess) {
    feedbackBox.className = "form-feedback show-success";
  } else {
    feedbackBox.className = "form-feedback show-error";
  }
}

// 5. Footer Year
var yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
