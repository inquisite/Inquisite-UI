<template>
<div class="row">
    <div class="col-sm-12">
        <div class="container">
            <div class="row bg-lt-gray">
                <div class="col-sm-12">
                    <h1>Getting started with Inquisite</h1>
                </div>
            </div>
            <div class="row"><div class="col spacerRow"></div></div>
            <div class="row">
                <div class="col-sm-12">
                    <p>
                        <h4>What is it?</h4>
                        Inquisite is a tool for collaboratively organizing, assembling and sharing
                        research data. It provides a hub for storage, discovery and reuse, encouraging the 
                        formation of open research communities and providing users access to content that previously might 
                        have languished unseen in old databases, spreadsheets or text files.
                    </p>
                    <p>
                        <h4>How does it work?</h4>
                        Inquisite users create <em>repositories</em>, self-contained sandboxes for research data that
                        can be shared, explored and remixed. Within a repository you can define as many types of data as
                        required each with its own set of specialized fields. Fields may contain text, numbers or more
                        complex information including dates (fuzzy or exact), mappable georeferences, media and more.
                        Fields can parse and validate the information they contain, enabling you to enforce rules and 
                        give structure to content such as inexact dates or georeferences that might be unprocessed text in 
                        a spreadsheet or database.
                    </p>
                    <p>
                        <em>Nodes</em> are the basic unit of data in a repository and include all of the fields 
                        associated with their data type. They are analogous to rows in a spreadsheet or database table 
                        in that they typically represent a single instance of something – a person, an event, a document – through 
                        data contained in their fields. Unlike in a spreadsheet or database, a node in an Inquisite repository can 
                        be easily related to any other node, regardless of type, forming a flexible
                        <a href="https://en.wikipedia.org/wiki/Graph_database">graph</a> structure. In contrast to the flat (spreadsheet),
                        hierarchical (as in XML) and relational (as used in many databases) arragements commonly employed to now graphs 
                        provide a highly malleable structure for research data that is well suited to modelling widely varied content,
                        from flat lists to traditional relational data to large, highly interrelated social networks.
                    </p>
                    <p> 
                        The <em>schema</em> of a repository defines all available data types and the rules governing their fields, as well as
                        the types of relationships that are allowed. You can use the schema to enfore validation rules for your data set. 
                        Inqusite schemas are flexible and designed to evolve with your research, over time becoming
                        an expression of your underlying methodology. Schemas can be shared and reused across repositories as template for new projects. 
                    </p>
                    <p>
                        Data added to Inquisite is, by default, only accessible to its creator. You can easily share access with collaborators if desired,
                        granting either read-only or full edit access to a repository. You can publish a project when it is ready, making it visible (and downloadable) to the 
                        public on the in-developnent Inquisite public data portal.
                    </p>

                    <figure class="figure pull-right" style="width: 700px; padding: 10px;">
                        <img src="/figures/dashboard.png" class="figure-img img-fluid rounded" alt="Dashboard"/>
                        <figcaption class="figure-caption">Dashboard</figcaption>
                    </figure>
                    <p>
                        <h4>Current status</h4>
                        Inquisite is currently in development. Core functionality, including the ability to create new
                        repositories for your data, manage repository data schemas (the structure of your data), and 
                        import data in CSV, TAB, Excel and GeoJSON formats with simple crosswalks is available. Basic
                        map and table-based visualizations of repository data are also supported. Current and planned 
                        development tasks are listed on the project 
                        <a href="http://clangers.collectiveaccess.org">bug/task tracker</a>, where you can track our progress
                        and report bugs and ideas.
                    </p>

                    <figure class="figure pull-left" style="width: 300px; padding: 10px;">
                        <img src="/figures/edit_repo.png" class="figure-img img-fluid rounded" alt="Edit repository"/>
                        <figcaption class="figure-caption">Edit repository</figcaption>
                    </figure>
                    <p>
                        <h4>How to get started</h4>
                        The first step is to <router-link to="/signup">sign up</router-link> for an 
                        Inquisite account. (<strong>note that you must have an NYU.edu email address to register for 
                            Inquisite</strong>). Upon registration you will be presented with the dashboard for an initial 
                            automatically created repository titled <em>My first repository</em>. You can change the 
                            name of the repository by clicking on the <em>Edit</em> as shown.
                    </p>
                    <p>
                        In addition to editing the name of your repository, you may specify the license to use for your
                        data, a project description and more. Changing the "published" drop-down from it's default setting
                        of "private" to "published" will cause the repository to be visible on the Inquisite public data portal,
                        so be sure to set that only when you're ready for the world to have access to your work.
                    </p>

                    <p>
                        <h4>Uploading data</h4>
                        You can upload CSV, TAB, Excel and GeoJSON format files to Inquisite. Rows in a data file are 
                        assumed to contain data for a single data type in your repository. For example, if you have set up data types 
                        in your repository for people, venues and performances Inquisite assumes that the file you're uploading is 
                        primarily concerned with <em>one</em> of those types. If a file is focussed on people then each row/record in the file 
                        is assumed to correspond to a specific person. 
                    </p>
                    <p>
                        You may set up types before import specifically defining the fields you require, or you can let the importer
                        create the type and fields for you. To upload a file click on <em>Upload data</em> in the menu bar at the 
                        top of the screen or click the <em>Data</em> button on your repository dashboard. Then select the file to upload 
                        and click <em>submit</em>. Inquisite will process the uploaded data file and present a preview of the data it can 
                        extract. Select the type of data in the file from the <em>Import as</em> drop-down, or set it to 
                        <em>&lt;Create new type&gt;</em> to have the importer create a new type for this data. Then examine each column 
                        in the preview and select the field that you want the data imported into. If no field is present in the type (or
                        you're creating a new type) then select <em>Do not import</em> to skip the data or <em>Create field...</em> to create 
                        a field with the name of the column. You can always rename these fields later in the schema editor. Once you have
                        all of the columns you wish to import mapped to fields in Inquisite click on <em>import</em>. Depending upon the 
                        size of the uploaded file, import may take from a few seconds to a few minutes to complete. A report with any
                        errors will be displayed when the import is complete.
                    </p>
                    <p>
                        <h4>Viewing data</h4>
                        To come
                    </p>  
                    <p>
                        <h4>Editing data</h4>
                        To come
                    </p>                    
                </div>
            </div>
        </div>
    </div>
</div>  
</template>