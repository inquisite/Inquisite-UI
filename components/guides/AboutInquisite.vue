<template>
    <div class="row">
        <div id="fixed-back-button" class="sticky-top">
            <router-link to="/help/getting-started">
                <i class="fa fa-arrow-circle-o-left fa-3x"></i>
            </router-link>
        </div>
        <div class="col-sm-12">
            <div class="container">
                <div class="row bg-header">
                    <div class="col-sm-12 text-center">
                        <h1>About Inquisite</h1>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-10 offset-sm-1 mt-5">
                        <p>Inquisite is a tool for collaboratively organizing, assembling and sharing research data. It provides a hub for storage, discovery and reuse, encouraging the formation of open research communities and providing users access to content that previously might have languished in hidden databases, spreadsheets or text files. </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12 bg-lt-gray">
                        <div class="row">
                            <div class="col-sm-10 offset-sm-1">
                                <h3>Status</h3>
                                <p>Inquisite is <span class="highlight">currently in active development</span>. Core functionality — including the ability to create new repositories for your data, design and manage data schemata, and import and process tabular data — is now available, with user experience improvements being deployed periodically. The platform also features a spreadsheet-style data view with support for rudimentary editing and a map view for geospatial data; repository-level collaboration features; and data exporting functionality. Features underway and expected in the coming months include: a public-facing portal that allows users to search and discover data published by members of the Inquisite community; merge functionality enabling users to enrich their data by joining or cross-referencing other, similar data sets; support for additional data formats, including media files; and the ability to define relationships between types of data.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col-sm-10 offset-sm-1">
                        <h3>Why Use Inquisite?</h3>
                        <p>Born from faculty experiences with project-based teaching and research in the humanities and social sciences, Inquisite strives to meet several core needs:</p>
                        <p><strong>Stability &amp; Flexibility</strong><br/>
                        Inquisite’s repository-based data storage and sharing features ensure that data is secure throughout and beyond the duration of a long-term project. Thisconsistency — the ability to store data in a stable environment, aggregate data across discrete parts of a project, and document your data and schema in a central location — better equips teachers, students, and researchers to pursue multi-stage data-driven work. And, because Inquisite utilizes a graph database, it can store and process a wider range of data structures (and support a wider range of projects) than other commonly-used database options.</p>
                        <p><strong>Context &amp; Enrichment</strong><br/>
                        The ability to collaborate on, share, and explore data across the Inquisite ecosystem encourages students and researchers to develop new perspectives on their own work. Users can search for data on similar topics, or with similar schemata, in order to join external data sets to their own: a student collecting data on the public transit infrastructure of a city, for example, might discover another user’s data on the socioeconomic history of the same city and merge these repositories in order to explore the relationship between neighborhood income levels and city upkeep of subway stations.</p>
                        <p><strong>Recognition</strong><br/>
                        Inquisite opens the door for scholars to make their data available to others for use, citation, and review.</p>
                        <p><strong>Pedagogy</strong><br/>
                        Introducing data concepts and workflows into university classroom teaching can be resource-intensive and occasionally distract from content learning. Inquisite ofers a low-barrier-to-entry environment for storing and modeling data, encouraging educators to explore schemata and data structures as content-specific, contingent, and epistemological questions, as well as technical ones. It also includes visualization and analysis tools that allow users to quickly visualize their data in various ways, and the data portal presses users to think about their research in broader systems and contexts.</p>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col-sm-12 bg-lt-gray">
                        <div class="row">
                            <div class="col-sm-10 offset-sm-1">
                                <h3>How Does it Work?</h3>
                                <img src="assets/images/inquisite-home.png" class="img-fluid float-right info-img ml-3"/>
                                <p>The basic unit of Inquisite is the <span class="highlight">repository</span>. Repositories are self-contained sandboxes for research data that can be shared, explored, and combined. For example, you might create a repository for a particular project or research inquiry. When you sign up for Inquisite, your account comes pre-populated with your first repository. From the home view, you can define data types and schemata, upload data, enlist collaborators, and select a license and/or publish your repository data.</p>

                                <p>When you upload data to your repository, each data set will be associated with a particular <span class="highlight">schema</span>, or data model. A schema defines the fields that describe a “type of data.” For example, if you upload a spreadsheet that contains data about restaurants in New York City (such as addresses, cuisine types, ratings and reviews, reservation requirements, and payment options), you might name your data type “restaurant.” The schema of a repository defines all available data types and the rules governing their fields, as well as the types of relationships that may be created.</p>

                                <p>The data <span class="highlight">fields</span> — in this example: address, cuisine, rating, reservations required, payment options — are defined in the schema according to their name, internal code (which can be the same as the column name), type (see the Inquisite Guide to Data Types), description, and other settings. You can pre-design your schema and apply it to your data set, or let Inquisite process your data and auto-generate a schema that you can later edit. Established schemas may be reused as templates for new repositories, helping to ensure uniform data standards across multiple projects.</p>

                                <img src="assets/images/inquisite-field.png" class="img-fluid float-left info-img mr-3"/>

                                <p>Inquisite runs atop a graph database (specifically, the Neo4j platform). If you’re familiar with traditional relational databases or spreadsheets, graph databases look a bit diferent, utilizing a network structure to privilege entity relationships. This highly-adaptable structure makes Inquisite well-suited to handle a wide range of research data, from simple lists or spreadsheets to traditional relational databases to large, highly interrelated social networks. Whether you have regular, structured data (like an Excel file or .csv) or semi-structured data with variable fields (like a JSON file), the database undergirding Inquisite can model it.</p>

                                <p>As a result, <span class="highlight">nodes</span> are the basic unit of data in Inquisite repositories. They are analagous to rows in a spreadsheet or database table, in that they typically represent single instances within a data set (e.g., a person, an event, a document) and include all of the fields that correspond to that item. Unlike spreadsheet rows, however, any node in an Inquisite repository can be easily related to any other node, regardless of type. (Visually speaking, “nodes” in a network graph are represented by circles and the relationships between them, or edges, are represented by lines.)</p>

                                <p>By default, all data uploaded to Inquisite is only accessible to its creator. You can easily share access with collaborators, granting either read-only or full edit access to a repository. You can publish a project when it is ready, making it visible (and downloadable) to the public on the forthcoming public data portal, and attach one of a number of licenses to govern the use of your data.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col-sm-10 offset-sm-1">
                        <h3>How Do I Start?</h3>
                        <p>Currently, Inquisite is only available to users with an @nyu.edu email address. To get started, <router-link to="/signup">sign up for an account</router-link> using your NYU email address and NetID. Once you have created an account, your home screen will default to your first repository. To walk through the process of uploading and managing data with Inquisite, or to explore other resources, please return to the <router-link to="/help/getting-started">Getting Started guide</router-link>.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		name: 'about-inquisite',
        data: function() {
          return {}
        },
    }
</script>
