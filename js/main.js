// DXN Marketing Website JavaScript

// DOM Elements
document.addEventListener("DOMContentLoaded", function () {
  // Theme Toggle
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  // Theme Toggle
  const themeToggle2 = document.getElementById("theme-toggle-out");
  // Check for saved theme preference or use default
  const savedTheme = localStorage.getItem("theme") || "light-mode";
  body.classList.add(savedTheme);

  // Update icon based on current theme
  updateThemeIcon(savedTheme === "dark-mode");

  // Theme toggle functionality
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      if (body.classList.contains("light-mode")) {
        body.classList.replace("light-mode", "dark-mode");
        localStorage.setItem("theme", "dark-mode");
        updateThemeIcon(true);
      } else {
        body.classList.replace("dark-mode", "light-mode");
        localStorage.setItem("theme", "light-mode");
        updateThemeIcon(false);
      }
    });
  }
  // Theme toggle functionality
  if (themeToggle2) {
    themeToggle2.addEventListener("click", function () {
      if (body.classList.contains("light-mode")) {
        body.classList.replace("light-mode", "dark-mode");
        localStorage.setItem("theme", "dark-mode");
        updateThemeIcon(true);
      } else {
        body.classList.replace("dark-mode", "light-mode");
        localStorage.setItem("theme", "light-mode");
        updateThemeIcon(false);
      }
    });
  }

  function updateThemeIcon(isDark) {
    if (themeToggle) {
      themeToggle.innerHTML = isDark
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
    }
  }
  function updateThemeIcon(isDark) {
    if (themeToggle2) {
      themeToggle2.innerHTML = isDark
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
    }
  }
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      mobileMenuBtn.innerHTML = navMenu.classList.contains("active")
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });
  }

  // Product Modals
  const productCards = document.querySelectorAll(".product-card");
  const modals = document.querySelectorAll(".modal");
  const closeButtons = document.querySelectorAll(".modal-close");

  if (productCards.length > 0) {
    productCards.forEach((card) => {
      const detailsBtn = card.querySelector(".btn-details");
      if (detailsBtn) {
        const modalId = detailsBtn.getAttribute("data-modal");
        const modal = document.getElementById(modalId);

        detailsBtn.addEventListener("click", function () {
          if (modal) {
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
          }
        });
      }
    });
  }

  if (closeButtons.length > 0) {
    closeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const modal = button.closest(".modal");
        if (modal) {
          modal.style.display = "none";
          document.body.style.overflow = "auto";
        }
      });
    });
  }

  // Close modal when clicking outside
  window.addEventListener("click", function (event) {
    modals.forEach((modal) => {
      if (event.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  });

  // Product Filters
  const filterButtons = document.querySelectorAll(".filter-btn");
  const productItems = document.querySelectorAll(".product-card");

  if (filterButtons.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"));

        // Add active class to clicked button
        this.classList.add("active");

        const filter = this.getAttribute("data-filter");

        // Show/hide products based on filter
        productItems.forEach((item) => {
          if (filter === "all") {
            item.style.display = "block";
          } else {
            if (item.classList.contains(filter)) {
              item.style.display = "block";
            } else {
              item.style.display = "none";
            }
          }
        });
      });
    });
  }

  // Product Search
  const searchInput = document.getElementById("product-search");

  if (searchInput && productItems.length > 0) {
    searchInput.addEventListener("keyup", function () {
      const searchValue = this.value.toLowerCase();

      productItems.forEach((item) => {
        const title = item
          .querySelector(".product-title")
          .textContent.toLowerCase();
        const description = item
          .querySelector(".product-description")
          .textContent.toLowerCase();

        if (title.includes(searchValue) || description.includes(searchValue)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  }

  // Branch Locator
  const countrySelect = document.getElementById("country-select");
  const citySelect = document.getElementById("city-select");
  const branchesTable = document.getElementById("branches-table");

  if (countrySelect && citySelect && branchesTable) {
    const tbody = branchesTable.querySelector("tbody");

    countrySelect.addEventListener("change", function () {
      const selectedCountry = this.value;
      citySelect.innerHTML = '<option value="">اختر المحافظة</option>';
      citySelect.disabled = !selectedCountry;
      tbody.innerHTML = "";

      if (selectedCountry) {
        branchData[selectedCountry].cities.forEach((city) => {
          citySelect.insertAdjacentHTML(
            "beforeend",
            `<option value="${city}">${city}</option>`
          );
        });
      }
    });

    citySelect.addEventListener("change", function () {
      const selectedCountry = countrySelect.value;
      const selectedCity = this.value;
      tbody.innerHTML = "";

      if (selectedCountry && selectedCity) {
        const branches = branchData[selectedCountry].branches.filter(
          (branch) => branch.city === selectedCity
        );

        branches.forEach((branch) => {
          // جدول
          tbody.insertAdjacentHTML(
            "beforeend",
            `
            <tr>
              <td>${branch.name}</td>
              <td>${branch.address}</td>
              <td>${branch.phone}</td>
              <td><a href="${branch.whatslink}" target="_blank"><i class="fab fa-whatsapp"></i></a></td>
              <td><a href="${branch.mapUrl}" target="_blank"><i class="fas fa-map-marker-alt"></i></a></td>
            </tr>
          `
          );

          // بطاقة
          const cardsContainer = document.getElementById("branches-cards");
          cardsContainer.insertAdjacentHTML(
            "beforeend",
            `
            <div class="branch-card">
              <h3>${branch.name}</h3>
              <p><strong>العنوان:</strong> ${branch.address}</p>
              <p><strong>الهاتف:</strong> ${branch.phone}</p>
              <a href="${branch.whatslink}" target="_blank">رابط whatsapp</a><br>
              <a href="${branch.mapUrl}" target="_blank">عرض على الخريطة</a>
            </div>
          `
          );
        });
      }
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item");

  if (faqItems.length > 0) {
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");

      question.addEventListener("click", function () {
        // Toggle active class
        item.classList.toggle("active");

        // Update icon
        const icon = question.querySelector("i");
        if (icon) {
          icon.className = item.classList.contains("active")
            ? "fas fa-minus"
            : "fas fa-plus";
        }
      });
    });
  }

  // Smart Popup
  const smartPopup = document.querySelector(".smart-popup");
  const popupCloseBtn = document.querySelector(".smart-popup-close");

  if (smartPopup && popupCloseBtn) {
    // Show popup after 5 seconds
    setTimeout(function () {
      smartPopup.classList.add("show");
    }, 5000);

    // Close popup
    popupCloseBtn.addEventListener("click", function () {
      smartPopup.classList.remove("show");
    });
  }

  // Protected Page
  const passwordForm = document.getElementById("password-form");
  const protectedContent = document.getElementById("protected-content");

  if (passwordForm && protectedContent) {
    passwordForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const passwordInput = document.getElementById("password-input");
      const password = passwordInput.value;

      if (password === "ali1234asekria1234") {
        passwordForm.style.display = "none";
        protectedContent.style.display = "block";
      } else {
        alert("كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.");
        passwordInput.value = "";
      }
    });
  }

  // Contact Form
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;
      const sendMethod = document.querySelector(
        'input[name="send-method"]:checked'
      ).value;

      // Here you would typically send the form data to a server
      // For now, we'll just show a success message
      alert("تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.");
      contactForm.reset();
    });
  }

  // Newsletter Form
  const newsletterForm = document.getElementById("newsletter-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("newsletter-email").value;

      // Here you would typically send the email to a server
      // For now, we'll just show a success message
      alert("شكراً لاشتراكك في النشرة الإخبارية!");
      newsletterForm.reset();
    });
  }

  // Product Share Buttons
  const shareButtons = document.querySelectorAll(".product-share-btn");

  if (shareButtons.length > 0) {
    shareButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault();

        const platform = this.getAttribute("data-platform");
        const productUrl = window.location.href;
        const productTitle = document.querySelector(".modal-title").textContent;

        let shareUrl = "";

        switch (platform) {
          case "facebook":
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              productUrl
            )}`;
            break;
          case "twitter":
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
              productTitle
            )}&url=${encodeURIComponent(productUrl)}`;
            break;
          case "whatsapp":
            shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
              productTitle + " " + productUrl
            )}`;
            break;
          case "telegram":
            shareUrl = `https://t.me/share/url?url=${encodeURIComponent(
              productUrl
            )}&text=${encodeURIComponent(productTitle)}`;
            break;
        }

        if (shareUrl) {
          window.open(shareUrl, "_blank");
        }
      });
    });
  }

  // Lazy Loading for Images
  if ("IntersectionObserver" in window) {
    const lazyImages = document.querySelectorAll("img[data-src]");

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    const lazyImages = document.querySelectorAll("img[data-src]");

    lazyImages.forEach((img) => {
      img.src = img.dataset.src;
      img.removeAttribute("data-src");
    });
  }
});

// Product Search Function
function searchProducts() {
  const searchInput = document.getElementById("product-search");
  const searchValue = searchInput.value.toLowerCase();
  const productItems = document.querySelectorAll(".product-card");

  productItems.forEach((item) => {
    const title = item
      .querySelector(".product-title")
      .textContent.toLowerCase();
    const description = item
      .querySelector(".product-description")
      .textContent.toLowerCase();

    if (title.includes(searchValue) || description.includes(searchValue)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// Copy Product Link Function
function copyProductLink(productId) {
  const url = window.location.href.split("#")[0] + "#" + productId;

  // Create temporary input element
  const tempInput = document.createElement("input");
  tempInput.value = url;
  document.body.appendChild(tempInput);

  // Select and copy
  tempInput.select();
  document.execCommand("copy");

  // Remove temporary element
  document.body.removeChild(tempInput);

  // Show success message
  alert("تم نسخ رابط المنتج بنجاح!");
}
