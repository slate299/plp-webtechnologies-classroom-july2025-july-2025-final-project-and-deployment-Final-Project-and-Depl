// Mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// ---------- Stay Listings Data ----------
const stays = [
  {
    id: 1,
    name: "Cozy Urban Loft",
    location: "Nairobi City Center",
    price: 5000,
    category: "city",
    img: "assets/images/stay1.jpg",
    desc: "A modern loft in the heart of Nairobi, perfect for solo travelers or couples.",
  },
  {
    id: 2,
    name: "Lakeview Getaway",
    location: "Naivasha",
    price: 7000,
    category: "countryside",
    img: "assets/images/stay2.jpg",
    desc: "Relax with stunning lake views and serene surroundings.",
  },
  {
    id: 3,
    name: "Mountain Cabin Retreat",
    location: "Mt. Kenya",
    price: 8000,
    category: "countryside",
    img: "assets/images/stay3.jpg",
    desc: "Escape into nature with this rustic yet cozy cabin.",
  },
  {
    id: 4,
    name: "Luxury Penthouse Suite",
    location: "Westlands, Nairobi",
    price: 15000,
    category: "luxury",
    img: "assets/images/stay4.jpg",
    desc: "Enjoy top-class amenities and panoramic city views.",
  },
];

// ---------- Render Function ----------
const stayGrid = document.getElementById("stayGrid");

function renderStays(list) {
  stayGrid.innerHTML = "";
  list.forEach((stay) => {
    const card = document.createElement("div");
    card.classList.add("stay");
    card.innerHTML = `
      <img src="${stay.img}" alt="${stay.name}">
      <h3>${stay.name}</h3>
      <p>${stay.location}</p>
      <p><strong>KES ${stay.price.toLocaleString()}</strong></p>
      <p>${stay.desc}</p>
      <a href="contact.html" class="btn-small">Book Now</a>
    `;
    stayGrid.appendChild(card);
  });
}

// Initial render
renderStays(stays);

// ---------- Search ----------
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = stays.filter(
    (stay) =>
      stay.name.toLowerCase().includes(query) ||
      stay.location.toLowerCase().includes(query)
  );
  renderStays(filtered);
});

// ---------- Filter by Category ----------
const filterBtns = document.querySelectorAll(".filter-btn");
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const category = btn.dataset.category;
    if (category === "all") {
      renderStays(stays);
    } else {
      renderStays(stays.filter((stay) => stay.category === category));
    }
  });
});

// ---------- Sort ----------
const sortSelect = document.getElementById("sortSelect");
sortSelect.addEventListener("change", () => {
  let sorted = [...stays];
  if (sortSelect.value === "low-high") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortSelect.value === "high-low") {
    sorted.sort((a, b) => b.price - a.price);
  }
  renderStays(sorted);
});

// ---------- Contact Form Validation ----------
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  const formMessage = document.getElementById("formMessage");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || message === "") {
      formMessage.textContent = "⚠️ Please fill in all fields.";
      formMessage.style.color = "red";
      return;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
      formMessage.textContent = "⚠️ Enter a valid email address.";
      formMessage.style.color = "red";
      return;
    }

    formMessage.textContent = "✅ Message sent successfully!";
    formMessage.style.color = "green";
    contactForm.reset();
  });
}
