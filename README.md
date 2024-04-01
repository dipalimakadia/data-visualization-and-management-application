# Data Visualization and Management Application

## **Table of Contents**
 - [Overview](#Overview)
 - [Features](#Features)
     - [Graph Visualization](#GraphVisualization)
     - [Table Management](#TableManagement)
     - [Adding notes for Feedback/Suggestions](#Notes)
 - [Technologies Used](#TechUsed)
 - [Implementation](#Implementation)
     - [App Formation](#AppFormation)
     - [SPA Routing and Data Retrieval](#SPA)
     - [Graph Visualization](#GV)
     - [Table Management](#TM)
     - [Additional Features](#AdditionalFeatures)
     - [Bonus Features](#BonusFeatures)
 - [Demo](#Demo)
     - [Homepage](#HomepageDemo)
     - [Graph](#GraphDemo)
     - [Table](#TableDemo)
     - [Notes](#NotesDemo)

***

<a id="Overview"></a>
## Overview
This single-page application (SPA) is a comprehensive data visualization and management tool built using React. It comprises two main sections: "Graph" and "Table," enabling users to visualize data through graphs and manage data in a tabular format. Additionally, it includes a "Notes" component with functionalities for adding, editing, and deleting notes or feedback.

<a id="Features"></a>
## Features

<a id="GraphVisualization"></a>
### Graph Visualization
1. **Bar Graph:** Displays valuable data points: # of cores and TDP for all processors.
2. **Pie Graph:** Presents data insights in a pie chart format for No. of Essentials Status. 

<a id="TableManagement"></a>
### Table Management
- Displays the complex data retrieved from the API. 
- Provides several features to easily access the data in table: 
    1. Filtering
    2. Sorting
    3. Pagination
    4. Searching
    5. Row Selection for comparison purpose.
    6. Export to CSV file.

<a id="Notes"></a>
### Adding notes for Feedback/Suggestions
- **View Notes:** Allows users to view all previous notes and also provide any feedback or suggestions if they have.
- **Add Note:** Allows users to add new notes or feedback.
- **Edit Note:** Provides functionality to edit existing notes.
- **Delete Note:** Enables users to delete notes or feedback entries.

##

This application serves as a comprehensive tool for data visualization, management, and collaboration, empowering users to make informed decisions and insights while efficiently managing data and communication through the Notes component.

***

<a id="TechUsed"></a>
## Technologies Used

* React.js
* React Hooks
* React Router DOM
* Axios
* Bootstrap CSS
* React Bootstrap Icons (react-bootstrap-icons)
* Highcharts
* Material React Table (material-react-table)
* Material UI
* Export To CSV (export-to-csv)
* AOS Library (Animation on Scroll)
* Firebase & Firestore (database)
* GitHub

***
<a id="Implementation"></a>
## Implementation

<a id="AppFormation"></a>
### App Formation
- The front-end framework utilized is **React**, along with **React Hooks** for managing state and lifecycle methods efficiently.
- Styling for the application is achieved using **Bootstrap**, including components like navbar, modal, and icons provided by **bootstrap-icons**. Additionally, CSS is used for custom styling, and React-specific icons are integrated using **react-bootstrap-icons**.

<a id="SPA"></a>
### SPA Routing and Data Retrieval
- The application is structured with **React components** such as navbar, homepage, table, graph, notes, and footer to maintain a modular and organized codebase.
- The routing in the front-end is handled using **react-router-dom**, utilizing components like **Router**, **Route**, **Routes**, and **Link** to manage navigation within the React application.
- Data retrieval from an external API (API_DATA.json) is implemented using **Axios** handling API calls and managing responses.

<a id="GV"></a>
### Graph Visualization
- Graphs (Bar and Pie) are implemented using **Highcharts** to create interactive and visually appealing charts and graphs in the web application.

<a id="TM"></a>
### Table Management
- For the table component, **material-react-table** is utilized, along with additional functionalities. 
- Additional functionalities such as sorting, filtering, search, comparison, and pagination are implemented using **Material UI**.
- Lazy loading is implemented using React's **Suspense** feature, ensuring that components are loaded asynchronously to improve performance and reduce initial load times in the application.

<a id="AdditionalFeatures"></a>
### Additional Features
- Data can be downloaded in CSV or Excel format using the **export-to-csv library**, providing users with the ability to export data for offline analysis or sharing.
- Integration with a backend server for fetching and updating data from a database is achieved through **Firebase** and **Firestore**.

<a id="BonusFeatures"></a>
### Bonus Features
- The application allows users to edit the data displayed in the table, with changes saved to **local storage** to maintain user modifications across sessions. Additionally, a "clear local storage" functionality is implemented to clear the stored data when the user clicks on it.
- Animations are implemented using the **AOS** Library, enhancing the user experience with smooth and visually appealing transitions and effects throughout the application.

***

<a id="Demo"></a>
## Demo

<a id="HomepageDemo"></a>
### Homepage
https://github.com/dipalimakadia/data-visualization-and-management-application/assets/37415891/00224d48-f353-4ff4-b40c-e16eb78f2a16

<a id="GraphDemo"></a>
### Graph
https://github.com/dipalimakadia/data-visualization-and-management-application/assets/37415891/7a6d2c65-403e-4351-b0e8-ccde9f013c12

<a id="TableDemo"></a>
### Table
https://github.com/dipalimakadia/data-visualization-and-management-application/assets/37415891/56717b94-fd7b-47b3-9600-ebf396ebae1c

<a id="NotesDemo"></a>
### Notes
https://github.com/dipalimakadia/data-visualization-and-management-application/assets/37415891/52b91878-f4c1-4cc8-a7cb-b862e331591c

