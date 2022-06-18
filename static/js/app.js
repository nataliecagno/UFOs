// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
let filters ={};

// 3. Use this function to update the filters. 
function updateFilters() {
  let changedElement = d3.select(this);
  let elementRevised = changedElement.property("value");
  let filterId= changedElement.attr("id");
  if (elementRevised){
    filters[filterId]= elementRevised;

  }
  else {
    delete filters[filterId];
  }

   filterTable();
  
  }
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable() {
    let updateFilters= tableData;

    Object.keys(filters).forEach((key) => {
      let userInput=d3.select("#"+key).property("value");
      if (userInput){
        updateFilters =updateFilters.filter(row => row[key] ===userInput)
      };
    
    }
    );
    buildTable(updateFilters)

    
  }
  
  // 2. Attach an event to listen for changes to each filter
  d3.selectAll("input").on("change",updateFilters)
  
  // Build the table when the page loads
  buildTable(tableData);
