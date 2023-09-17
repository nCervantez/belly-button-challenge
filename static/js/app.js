//URL for the data used in this project. Contains 3 arrays.
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

//Verify access to the url
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

//Log all data from the json objects
d3.json(url).then((data) => {
    console.log("Data: ", data);
});

//function to create the bar chart 
function hBar(id) {
    d3.json(url).then(function(data) {
      
      //All data from the samples array. 
      let sampleData = data.samples;
      console.log("Bar Chart Data", sampleData);

      //This will update the charts based on the dropdown change
      let chartData = sampleData.find(sample => sample.id === id);
      let barVal = chartData.sample_values.slice(0,10).reverse(); //Reverse the lists to have it in desc order for plotly.
      let barLabels = chartData.otu_ids.slice(0,10).map((id) => `OTU ${id}`).reverse(); //Reverse the lists to have it in desc order for plotly.
      let barDesc = chartData.otu_labels.slice(0,10).reverse(); //Reverse the lists to have it in desc order for plotly.
      console.log(barVal);
      console.log(barLabels);
      console.log(barDesc);

      //creating the hBar chart
      let trace = {
        x: barVal,
        y: barLabels,
        text: barDesc,
        type: 'bar',
        orientation: 'h'
      };
      
      //Layout for size of chart
      var layout = {
        height: 600,
        width: 500
      };

      Plotly.newPlot('bar', [trace], layout);

})};

function bubbleChart(id) {
    d3.json(url).then(function(data) {
      
      //All data from the samples array. 
      let sampleData1 = data.samples;
      console.log("Bub Chart Data", sampleData1);
      //This will update the charts based on the dropdown change
      let chartData1 = sampleData1.find(sample => sample.id === id);
      let bubVal = chartData1.sample_values.reverse(); //Reverse the lists to have it in desc order for plotly.
      let bubLabels = chartData1.otu_ids.reverse(); //Reverse the lists to have it in desc order for plotly.
      let bubDesc = chartData1.otu_labels.reverse(); //Reverse the lists to have it in desc order for plotly.
  
      //creating the bubble chart
      let trace1 = {
        x: bubLabels,
        y: bubVal,
        text: bubDesc,
        mode: 'markers',
        marker: {color: bubLabels, 
                 size: bubVal}
};

      Plotly.newPlot('bubble', [trace1]);
})};

// Function to populate the demographic info chart


function metaData(id) {
    d3.json(url).then(function(data) {
      let demoData = data.metadata;
      console.log("Meta Data: ", demoData);
  
      // Use the find method to locate the entry with the specified ID
      let subjectData = demoData.find(sample => sample.id === id);
  
      // Check if the subjectData is found
      if (subjectData) {
        console.log("Subject Data: ", subjectData);
        
        // Now, you can access specific key-value pairs within subjectData
        console.log("Ethnicity:", subjectData.ethnicity);
        console.log("Gender:", subjectData.gender);
        console.log("Age:", subjectData.age);
        console.log("Location:", subjectData.location);
        console.log("bbtype:", subjectData.bbtype);
        console.log("wfreq:", subjectData.wfreq);
      } else {
        console.log("Subject Data not found for ID:", id);
      }
    });
  }

  
  metaData(940);
//Starts the charts and webpage
d3.json(url).then((data) => {

    //Setting the names list to add to the dropdown menu
    let namesList = data.names;
    console.log("id list", namesList);
    let dropdown = d3.select("#selDataset");
    
    //Will loop through the names list and add each id number to the drop down list
    for (var i = 0; i < namesList.length; i++) {
        (function(item) {
            dropdown.append("option").text(item).property("value", item);
        })(namesList[i]);
    };

    // Event listener for dropdown change. This will update the hBar function and pull the relevant data 
    //for the chart
    dropdown.on("change", function () {
        let id = this.value;
        //Updates the hBar function with the new selected ID
        hBar(id);
        bubbleChart(id);
        
        console.log("This is the value of the id", id)
        
    });
    // Initialize the chart with the first option in our list
    hBar(namesList[0]);
    bubbleChart(namesList[0]);
    
    console.log("Initial starting ID value", namesList[0]);
});