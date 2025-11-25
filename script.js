document.addEventListener("DOMContentLoaded", () => {
  
  // ===== MOBILE MENU TOGGLE =====
  const menuIcon = document.getElementById("menu-icon");
  const navLinks = document.getElementById("navLinks");

  if (menuIcon && navLinks) {
    menuIcon.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // ===== DROPDOWN MENU TOGGLE (FIXED) =====
  const servicesBtn = document.getElementById("servicesBtn");
  const servicesDropdown = document.getElementById("servicesDropdown");

  if (servicesBtn && servicesDropdown) {
    servicesBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Stop click from bubbling to document
      // Toggle the 'show' class instead of style.display
      servicesDropdown.classList.toggle("show");
    });
  }

  // Hide dropdown when clicking elsewhere
  document.addEventListener("click", (e) => {
    if (servicesDropdown && servicesDropdown.classList.contains('show')) {
      // Check if the click is NOT the button AND NOT inside the dropdown
      if (!servicesBtn.contains(e.target) && !servicesDropdown.contains(e.target)) {
        servicesDropdown.classList.remove("show");
      }
    }
  });


  // ===== IMPROVED: Close mobile menu on link click =====
  const mobileLinks = [
      ...document.querySelectorAll('#navLinks ul li a'),
      ...document.querySelectorAll('#servicesDropdown li a')
  ];
  mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
          if (window.innerWidth <= 992 && navLinks.classList.contains('active')) {
              navLinks.classList.remove("active");
          }
      });
  });
  
  const contactBtn = document.querySelector('.contact-btn');
  if(contactBtn) {
      contactBtn.addEventListener("click", () => {
          if (window.innerWidth <= 992 && navLinks.classList.contains('active')) {
              navLinks.classList.remove("active");
          }
      });
  }


  // ===== SUCCESS STORIES MODAL LOGIC =====
  
  // --- Testimonial Modal Elements ---
  const testimonialModal = document.getElementById("testimonial-modal");
  const modalBody = document.getElementById("modal-body");
  const closeModalBtn = document.querySelector(".modal-close");
  const storyCards = document.querySelectorAll(".story-card");
  
  // --- Image Modal Elements ---
  const imageModal = document.getElementById("image-modal");
  const imageModalContent = document.getElementById("image-modal-content");

  // --- Function to open the Testimonial Modal ---
  function openTestimonialModal(card) {
      // Check if the elements exist before trying to access innerHTML
      const profile = card.querySelector(".profile");
      const quote = card.querySelector(".quote");

      if (profile && quote && modalBody) {
          const profileHTML = profile.innerHTML;
          const quoteHTML = quote.innerHTML;

          modalBody.innerHTML = `
              <div class="profile">${profileHTML}</div>
              <p class="modal-quote">${quoteHTML}</p>
          `;

          if (testimonialModal) {
              testimonialModal.style.display = "flex";
          }
          document.body.classList.add("modal-open");

          // --- Add click listener for the avatar *inside* the modal ---
          const modalAvatar = modalBody.querySelector('.avatar');
          if (modalAvatar) {
              modalAvatar.addEventListener('click', (e) => {
                  const avatarSrc = e.currentTarget.querySelector('img')?.src;
                  if (avatarSrc) {
                      openImageModal(avatarSrc);
                  }
              });
          }
      }
  }

  // --- Function to close the Testimonial Modal ---
  function closeTestimonialModal() {
      if (testimonialModal) {
          testimonialModal.style.display = "none";
      }
      document.body.classList.remove("modal-open");
  }

  // --- Function to open the Image Modal ---
  function openImageModal(imageSrc) {
      if (imageModalContent) {
          imageModalContent.innerHTML = `<img src="${imageSrc}" alt="Maximized Profile">`;
      }
      if (imageModal) {
          imageModal.style.display = "flex";
      }
  }

  // --- Function to close the Image Modal ---
  function closeImageModal() {
      if (imageModal) {
          imageModal.style.display = "none";
      }
      if (imageModalContent) {
          imageModalContent.innerHTML = ""; // Clear content
      }
  }

  // --- Event Listeners for Testimonial Modal ---
  if (storyCards.length > 0 && testimonialModal && closeModalBtn) {
      storyCards.forEach(card => {
          card.addEventListener("click", () => {
              openTestimonialModal(card);
          });
      });

      closeModalBtn.addEventListener("click", closeTestimonialModal);
      testimonialModal.addEventListener("click", (event) => {
          if (event.target === testimonialModal) {
              closeTestimonialModal();
          }
      });
  }

  // --- Event Listener for Image Modal ---
  if (imageModal) {
      imageModal.addEventListener("click", () => {
          // Click anywhere on the image modal to close it
          closeImageModal();
      });
  }

});