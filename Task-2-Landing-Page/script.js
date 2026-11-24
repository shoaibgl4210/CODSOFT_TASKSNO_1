// MOBILE NAVIGATION

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("show");
    menuBtn.setAttribute("aria-expanded", isOpen);
    menuBtn.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
});

// FAQ ACCORDION

document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
        const item = button.parentElement;
        const wasActive = item.classList.contains("active");

        document.querySelectorAll(".faq-item").forEach(faq => {
            faq.classList.remove("active");
        });

        if (!wasActive) {
            item.classList.add("active");
        }
    });
});

// SCROLL REVEAL ANIMATION

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => {
    observer.observe(element);
});

// ENQUIRY FORM

document.getElementById("enquiryForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("studentName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const course = document.getElementById("course").value;
    const currentClass = document.getElementById("class").value;
    const message = document.getElementById("message").value.trim();

    if (!/^[6-9][0-9]{9}$/.test(phone)) {
        document.getElementById("formMessage").style.color = "#ff7777";
        document.getElementById("formMessage").textContent =
            "Please enter a valid 10-digit Indian mobile number.";
        return;
    }

    const whatsappNumber = "91XXXXXXXXXX"; // Replace with institute WhatsApp number

    const whatsappMessage =
        `Hello Al-Azhar Classes!\n\n` +
        `Name: ${name}\n` +
        `Phone: ${phone}\n` +
        `Course: ${course}\n` +
        `Class: ${currentClass}\n` +
        `Message: ${message || "Not provided"}`;

    const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    if (!/^91[6-9][0-9]{9}$/.test(whatsappNumber)) {
        document.getElementById("formMessage").style.color = "#ff7777";
        document.getElementById("formMessage").textContent =
            "Enquiry form is in demo mode. Configure the institute WhatsApp number to enable submissions.";
        return;
    }

    window.open(whatsappURL, "_blank");
    document.getElementById("formMessage").textContent =
        "Your WhatsApp enquiry is ready. Please send it to the institute.";
});

// DYNAMIC YEAR

document.getElementById("year").textContent = new Date().getFullYear();
