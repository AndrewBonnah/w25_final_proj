document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("gallery");
  
    fetch("des.json")
      .then((response) => response.json())
      .then((data) => {
        data.forEach(({ photo, title, shortdescription , longdescription}, index) => {
          // declare constant description values for each photo

          const imageBox = document.createElement("div");
          const img = document.createElement("img");


          imageBox.classList.add("image-box");
  
          // grab each photo and declare it's alt text as its short description from des.json

          img.src = `images/${photo}`;
          img.alt = shortdescription;
  
          // Add the <img> element to the imageBox container so it becomes visible on the page.
          // This places the image inside imageBox, making it visible in the document structure. 
          imageBox.appendChild(img);
  
          // Add sliding title if title exists and increment back and forth on either side of the
          // screen, gives it a more dynamic feel 
          if (title) {
            const titleDiv = document.createElement("div");
            titleDiv.classList.add("slide-title");
            titleDiv.textContent = title;

            if (index % 2 === 0) {
              titleDiv.classList.add("from-left");
            } else {
              titleDiv.classList.add("from-right");
            }
  
            imageBox.appendChild(titleDiv);
          }
  
          gallery.appendChild(imageBox);
  
          // pop-up box for event click, when any of the tiles on the screen are clicked this will expand and 
          // create a lightbox where the alternative backup image 2 is used instead of the thumbnail images 
      
          imageBox.addEventListener("click", () => {
            const lightbox = document.createElement("div");
            lightbox.classList.add("lightbox");
  

            // backupImg is called to the lightbox from folder as file image 1 file name with an "a" at the end
            // so photo1a.jpeg would be the backup for photo1.jpeg

            const backupFilename = photo.replace(/(\.[^.]+)$/, "a$1");
            const backupImg = document.createElement("img");
            backupImg.src = `images/${backupFilename}`;

            // alt text is assigned to shortdescription and if backup photo doesn't
            // exist it uses the photo 1 instead
            backupImg.alt = shortdescription;
            backupImg.onerror = () => {
              backupImg.src = `images/${photo}`;
            };
  
            // creates paragraph descriptions from des.json and saves it to desc
            const desc = document.createElement("p");
            desc.textContent = longdescription;
  
            // creates button and lightbox clsoing functionality
            const closeBtn = document.createElement("button");
            closeBtn.classList.add("close-lightbox");
            closeBtn.textContent = "Close";
            closeBtn.addEventListener("click", () => {
              document.body.removeChild(lightbox);
            });
            
            // adding elements to the lightbox to be displayed 
            lightbox.appendChild(backupImg);
            lightbox.appendChild(desc);
            lightbox.appendChild(closeBtn);
            document.body.appendChild(lightbox);
          });
        });
  
        // Observer for sliding slide-title in and out of view as the tiles come in to view.
        
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
  