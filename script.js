document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("gallery");
  
    fetch("des.json")
      .then((response) => response.json())
      .then((data) => {
        data.forEach(({ photo, title, description }, index) => {
          const imageBox = document.createElement("div");
          imageBox.classList.add("image-box");
  
          const img = document.createElement("img");
          img.src = `images/${photo}`;
          img.alt = title;
  
          imageBox.appendChild(img);
  
          // Add sliding title
          if (title) {
            const titleDiv = document.createElement("div");
            titleDiv.classList.add("slide-title");
            titleDiv.textContent = title;
  
            // Alternate the direction of sliding in
            if (index % 2 === 0) {
              titleDiv.classList.add("from-left");
            } else {
              titleDiv.classList.add("from-right");
            }
  
            imageBox.appendChild(titleDiv);
          }
  
          gallery.appendChild(imageBox);
  
          // Add lightbox click event
          imageBox.addEventListener("click", () => {
            const lightbox = document.createElement("div");
            lightbox.classList.add("lightbox");
  
            const backupFilename = photo.replace(/(\.[^.]+)$/, "a$1");
            const backupImg = document.createElement("img");
            backupImg.src = `images/${backupFilename}`;
            backupImg.alt = title;
            backupImg.onerror = () => {
              backupImg.src = `images/${photo}`;
            };
  
            const desc = document.createElement("p");
            desc.textContent = description;
  
            const closeBtn = document.createElement("button");
            closeBtn.classList.add("close-lightbox");
            closeBtn.textContent = "Close";
            closeBtn.addEventListener("click", () => {
              document.body.removeChild(lightbox);
            });
  
            lightbox.appendChild(backupImg);
            lightbox.appendChild(desc);
            lightbox.appendChild(closeBtn);
            document.body.appendChild(lightbox);
          });
        });
  
        // Observer for sliding in and out titles
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const title = entry.target.querySelector(".slide-title");
              if (title) {
                const fromLeft = title.classList.contains("from-left");
  
                if (entry.isIntersecting) {
                  title.classList.add("slide-in");
                  title.classList.remove("slide-out-left", "slide-out-right");
                } else {
                  title.classList.remove("slide-in");
                  // Slide out in opposite direction
                  title.classList.add(fromLeft ? "slide-out-right" : "slide-out-left");
                }
              }
            });
          },
          { threshold: 0.5 }
        );
  
        document.querySelectorAll(".image-box").forEach((box) =>
          observer.observe(box)
        );
      })
      .catch((error) => {
        console.error("Error loading des.json:", error);
      });
  });
  