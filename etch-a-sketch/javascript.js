let size = 16;

window.onload = (event) => {
   initialize();

   // setup button action
   const button = document.querySelector("button");
   button.addEventListener('click', () => {
      size = Math.min(Number.parseInt(prompt("Specify a grid size", size)), 100);
      console.log(size);
      initialize();
   });
};

function initialize() {
   const grid = document.querySelector("#grid-root");
   grid.textContent = '';

   // calculate size of each square and subtract border
   console.log(size);
   const width = (600 / size);

   // create grid
   for (const row of Array(size).keys()) {
      const rowDiv = document.createElement("div");
      rowDiv.className = "row";
      for (const column of Array(size).keys()) {
         const div = document.createElement("div");
         div.className = "square";
         div.style.cssText = `width: ${width}px; height: ${width}px; opacity: 0;`;
         div.addEventListener('mouseover', () => {
            div.style.opacity = Math.min(Number.parseFloat(div.style.opacity) + 0.1, 1)
         });
         rowDiv.appendChild(div);
      }
      grid.appendChild(rowDiv);
   }
}