<template>
    <div class="footer-padding">
        <div class="row" v-if="currentPage == null || currentPage == 'creating-repo'">
            <div id="fixed-back-button" class="sticky-top">
                <router-link to="/help/getting-started">
                    <i class="fa fa-arrow-circle-o-left fa-3x"></i>
                </router-link>
            </div>
            <div class="col-sm-12">
                <div class="container">
                    <div class="row bg-header">
                        <div class="col-sm-12 text-center">
                            <h1>Working With Structured Data</h1>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-10 offset-sm-1 mt-5">
                            <h3>Creating and Describing Your Repository</h3>
                            <p>Repositories are at the core of Inquisite’s functionality. You can think of a repository as a space for storing, viewing, collaborating on, and enriching your data.</p>

                            <p>Typically, a repository is associated with a particular project or research question: you might create a repository to hold all the data having to do with your dissertation on the architectural history of New York City or a collaborative class project on archive digitization. Your new Inquisite account comes pre-loaded with your first empty repository, but you can create as many as you need.</p>

                            <img src="assets/images/inquisite-home.png" class="img-fluid"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 bg-lt-gray">
                            <div class="row">
                                <div class="col-sm-10 offset-sm-1">
                                    <p>By clicking on the “Edit” button on the home screen, you can edit a number of repository-wide settings:</p>

                                    <p><strong>Name and description</strong><br/>
                                    Give your repository a name that reflects the project or topic you’re exploring. Use the description field to provide a brief overview of your repository, track the provenance of your data, or provide other contextual information.</p>

                                    <p><strong>URL</strong><br/>
                                    You can choose to associate a link to your project website or data source with your repository. If your data-driven project has a public-facing interface, include the link here!</p>

                                    <p><strong>License</strong><br/>
                                    Licenses govern the reuse of the data (and metadata) associated with your repository, should you choose to publish it. You can learn more about Creative Commons license types <a href="https://creativecommons.org/licenses/" target="_blank">here</a>. If there’s a license type you’d like to see added to these options, <a href="mailto:info@inquisite.newyorkscapes.org?subject=RepositoryLicense">please let us know</a>.</p>

                                    <p><strong>Access</strong><br/>
                                    By default, all repositories are set to “private” — i.e., viewable only by the repository owner (that’s you) and any collaborators you’ve chosen to invite — more on that in the next step. If you decide to publish your data, it will be accessible to all users in the Inquisite ecosystem. Because Inquisite will feature a public discovery portal, your repository will also be accessible by anyone visiting the site. We recommend having a license type selected prior to publishing your repository.</p>

                                    <p>And, keep in mind that we reserve the right to unpublish or remove repositories that contain copyrighted, illegal, or otherwise inappropriate material. If you have questions about data permissions, reach out to your institution’s copyright advisor, like NYU’s Scholarly Communications Librarian.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" v-if="currentPage == 'collaboration'">
            <div id="fixed-back-button" class="sticky-top">
                <router-link to="/help/getting-started">
                    <i class="fa fa-arrow-circle-o-left fa-3x"></i>
                </router-link>
            </div>
            <div class="col-sm-12">
                <div class="container">
                    <div class="row bg-header">
                        <div class="col-sm-12 text-center">
                            <h1>Working With Structured Data</h1>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-10 offset-sm-1 mt-5">
                            <h3>Collaboration Settings</h3>
                            <p>Working on a collaborative project? Want fellow researchers, students, or faculty advisors to be able to see or contribute to your data? Inquisite is designed to help facilitate collaborative data authoring and modeling.</p>

                            <img src="assets/images/inquisite-collaboration.png" class="img-fluid"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 bg-lt-gray">
                            <div class="row">
                                <div class="col-sm-10 offset-sm-1">
                                    <img src="assets/images/inquisite-collab-permissions.png" class="img-fluid float-left info-img ml-3"/>
                                    <p>When you select “Manage Collaborators” from the home screen for a given repository, you’ll be able to search the Inquisite user base for the individual you’d like to add to your repository. If your collaborator doesn’t have an Inquisite account, they’ll need to sign up before you can add them to your repository. For now, Inquisite registration is limited to users with valid @nyu.edu email addresses.</p>

                                    <p>Once you’ve selected a user, you can determine whether to grand “Edit” or “Read-only” permissions. Collaborators with editing permissions will be able to make changes to existing data, as well as add and delete data. “Read-only” collaborators can view the data in your private repository, but can’t make any changes.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" v-if="currentPage == 'uploading'">
            <div id="fixed-back-button" class="sticky-top">
                <router-link to="/help/getting-started">
                    <i class="fa fa-arrow-circle-o-left fa-3x"></i>
                </router-link>
            </div>
            <div class="col-sm-12">
                <div class="container">
                    <div class="row bg-header">
                        <div class="col-sm-12 text-center">
                            <h1>Working With Structured Data</h1>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-10 offset-sm-1 mt-5">
                            <h3>Uploading Data</h3>
                            <p>Now that your repository is set up, you’re ready to upload data. Click the “Data” button from your repository home screen to get started. Inquisite supports the following structured data types: .csv, .txt (tab-delimited), .xls, .xlsx, .geoJSON, &amp; JSON (basic).</p>

                            <img src="assets/images/inquisite-upload.png" class="img-fluid"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 bg-lt-gray">
                            <div class="row">
                                <div class="col-sm-10 offset-sm-1">
                                    <p>As soon as you click the “Submit” button after selecting a file, Inquisite will begin to parse your data — it’s automatically identifying your data types, looking for patterns, georeferencing your spatial data (if you’ve included any), and calculating summary statistics. To get the most out of Inquisite’s powerful data parsing, check out the Guide to Data Types to learn how to format your data (including geospatial data, date ranges, and controlled vocabularies) so that Inquisite can provide the most accurate schema, or data model.</p>

                                    <p>Once your data’s been processed, you’ll see the schema Inquisite has created based on your file.</p>

                                    <img src="assets/images/inquisite-schema.png" class="img-fluid"/>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-10 offset-sm-1 mt-5">
                            <p>In order to proceed, you’ll need to name your schema.</p>

                            <p>Typically, your schema’s name should describe the type of “object” that each row of your data describes. For example, when uploading a data file containing information about restaurants in Brooklyn, with each line representing a single restaurant, you might name your data model “restaurant.” In the example above, the data describes all place names occuring in Jacqueline Woodson’s novel Another Brooklyn, along with the page numbers where they occur, their geospatial attributs, and notes about context. Because each line indexes a particular place, the schema name might be “place” or “placeReference.”</p>

                            <img src="assets/images/inquisite-import-dropdown.png" class="img-fluid float-right info-img ml-3"/>

                            <p>For each field, you can choose whether to import or ignore the data in that column using the “Import Field” dropdown. If you want to omit a field from your data upload, select “Do not import.”</p>

                            <p>Inquisite automatically determines which data type best describes every field in your file. However, if you want to change the way a particular field is handled (for example, if you want to import zip codes in your file as text/string data rather than numeric/integer data), you can select a different data type from the dropdown menu. In most cases, we recommend sticking with the data type inferred by the parser to avoid errors. For more information on data types, check out the Guide to Data Types.</p>

                            <p>Finally, the last set of dropdown settings enables you to show or hide a field in search. Including a field in search results will allow you (and, if your data is published, other users) to quickly search your repository. This might be less useful on fields like unique identifiers, page numbers, and geographic coordinates.</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 bg-green">
                            <div class="row">
                                <div class="col-sm-10 offset-sm-1">
                                    <h5 class="mt-3"><strong>Schema Tip</strong></h5>

                                    <img src="assets/images/inquisite-field-details.png" class="img-fluid float-left info-img mr-3"/>

                                    <p>Have a field with a clunky name you wish were more readable? Want to add documentation about what each field means? Click the little edit symbol next to any field name to update these details.</p>

                                    <p>You can also use the “Statistics” feature to get a quick overview of the data in that field, including the total number of values, the most frequent values, and the number of unique values.</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" v-if="currentPage == 'editing'">
            <div id="fixed-back-button" class="sticky-top">
                <router-link to="/help/getting-started">
                    <i class="fa fa-arrow-circle-o-left fa-3x"></i>
                </router-link>
            </div>
            <div class="col-sm-12">
                <div class="container">
                    <div class="row bg-header">
                        <div class="col-sm-12 text-center">
                            <h1>Working With Structured Data</h1>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-10 offset-sm-1 mt-5">
                            <h3>Visualizing &amp; Editing Data</h3>
                            <p>Once you’re happy with your schema, click the “Import” button to finish uploading your data. After processing is complete, you’ll be redirected to an import summary verifying that your upload is complete. (Getting errors in your import summary? Check out the FAQ for information about “invalid data” errors, or get in touch.)</p>

                            <img src="assets/images/inquisite-result.png" class="img-fluid mb-3"/>

                            <p>Congratulations! Your data is now safely stored in a stable, flexible repository. Inquisite currently offers two primary data visualization options, as well as basic editing functionality (we recommend you do most of your data cleaning and manipulation using software or custom code optimized for data editing, prior to uploading your data to an Inquisite repository).</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 bg-lt-gray">
                            <div class="row">
                                <div class="col-sm-10 offset-sm-1">
                                    <h5>Map View</h5>
                                    <img src="assets/images/inquisite-map.png" class="img-fluid float-right info-img ml-3"/>
                                    <p>If your data contains geospatial information — such as addresses, latitude and longitude, or GeoJSON snippets — you’ll be able to visualize your repository using the “Map” tool.</p>

                                    <p>Click on “Map” from the import completion summary, or select “Map” from the “Visualize” option in the main navigation bar.</p>

                                    <p>“Map” view not showing up even though your data contains geospatial information? Ensure your data is formatted correctly by vising the Guide to Data Types.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-10 offset-sm-1 mt-5">
                            <h5>Sheet View</h5>
                            <p>The “Sheet” visualization renders your tabular data in a familiar form: a spreadsheet, or table. In addition to viewing your data, you can make changes to any data point in this view.</p>

                            <img src="assets/images/inquisite-sheet.png" class="img-fluid mb-3"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 bg-lt-gray">
                            <div class="row">
                                <div class="col-sm-10 offset-sm-1">
                                    <h5>Node View</h5>
                                    <p>Under development! The “Node” view will enable you to draw connections between various entities in your data and to view these relationships as a network graph.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" v-if="currentPage == 'exporting'">
            <div id="fixed-back-button" class="sticky-top">
                <router-link to="/help/getting-started">
                    <i class="fa fa-arrow-circle-o-left fa-3x"></i>
                </router-link>
            </div>
            <div class="col-sm-12">
                <div class="container">
                    <div class="row bg-header">
                        <div class="col-sm-12 text-center">
                            <h1>Working With Structured Data</h1>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-10 offset-sm-1 mt-5">
                            <h3>Exporting Data</h3>
                            <p>Inquisite makes it easy to export your data, whether you need it to accompany an article submission to a journal or want to explore and visualize it using another tool. For collaboratively-authored data, the export feature enables users to consolidate all users’ contributions for easy deployment outside Inquisite. Find the export feature by going to Manage > Export in the main Inquisite menu.</p>

                            <img src="assets/images/inquisite-export.png" class="img-fluid mb-3"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 bg-lt-gray">
                            <div class="row">
                                <div class="col-sm-10 offset-sm-1">
                                    <img src="assets/images/inquisite-export-file.png" class="img-fluid float-left info-img mr-3"/>
                                    <p>In order to ensure that your data retains any changes you’ve made or documentation you’ve added in Inquisite, Inquisite will export your data as a JSON (JavaScript Object Notation) file.</p>

                                    <p>Most data visualization and manipulation tools accept JSON, and its lightweight and robust format makes it perfect for storing data with variable attributes.</p>

                                    <p>To download your file, simply enter a name ending in “.json” and click the “Export” button.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer class="footer">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-5 offset-sm-1">
                        <router-link :to="previousLink" v-if="previousLink == '/help/getting-started'"><i class="fa fa-caret-left"></i> {{previousPage}}</router-link>
                        <a v-else href="" v-on:click.prevent="loadPage(previousLink)"><i class="fa fa-caret-left"></i> {{previousPage}}</a>
                    </div>
                    <div class="col-sm-5 text-right">
                        <a v-if="nextLink" href="" v-on:click.prevent="loadPage(nextLink)">{{nextPage}} <i class="fa fa-caret-right"></i></a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
	export default {
		name: 'structured-data-guide',
        data: function() {
          return {
            currentPage: null,
            pages: [
                {
                    "link": 'creating-repo',
                    "text": 'Creating a Repository'
                },{
                    "link": 'collaboration',
                    "text": 'Collaboration Settings'
                },{
                    "link": 'uploading',
                    "text": 'Uploading Data'
                },{
                    "link": 'editing',
                    "text": 'Visualizing & Editing Data'
                },{
                    "link": 'exporting',
                    "text": 'Exporting Data'
                }
            ],
            previousPage: '',
            previousLink: '',
            nextPage: '',
            nextLink: '',
          }
        },
        mounted: function(){
            this.currentPage = 'creating-repo'
            this.previousPage = 'Getting Started';
            this.previousLink = '/help/getting-started';
            this.nextPage = 'Collaboration Settings';
            this.nextLink = 'collaboration';
        },
        methods: {
            loadPage: function(page){
                var pagePos = this.pages.findIndex(i => i.link === page);
                this.currentPage = this.pages[pagePos]['link'];
                if(pagePos > 0){
                    this.previousPage = this.pages[pagePos-1]['text'];
                    this.previousLink = this.pages[pagePos-1]['link'];
                } else {
                    this.previousPage = 'Getting Started';
                    this.previousLink = '/help/getting-started';
                }
                if(pagePos < (this.pages.length - 1)){
                    this.nextPage = this.pages[pagePos+1]['text'];
                    this.nextLink = this.pages[pagePos+1]['link'];
                } else {
                    this.nextPage = null;
                    this.nextLink = null;
                }
            }
        }
    }
</script>
