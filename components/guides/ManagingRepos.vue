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
                        <h1>Creating &amp; Managing Repositories</h1>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-10 offset-sm-1 mt-5">
                        <p>Repositories are the data sandboxes at the core of Inquisite’s functionality. Use a repository to store, view, collaborate on, enrich, and publish the data associated with a project or topic.</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12 bg-lt-gray">
                        <div class="row">
                            <div class="col-sm-10 offset-sm-1">
                                <h3>Status</h3>
                                <p>By default, your Inquisite account comes pre-populated with an empty repository. You can create as many repositories as you’d like. Generally, a repository should correspond to a particular project or research or teaching inquiry — you might use a repository to store and aggregate student-authored data from a digital humanities course module over multiple semesters, to document and publish an out-of-copyright data set you’ve digitized and cleaned for your latest article, or to collect data across historical sources to track trends over time, among other things. Each repository can store data pertaining to diferent “types” of entities. For example, a data set describing historic churches in New York City (with a schema defining the “church” object) might live in a repository alongside a data set containing historical interment records of individual residents (with a schema defining the “person” object). These data sets can then be related to one another, or to other data sets in the Inquisite ecosystem, in order to pursue research questions, experiment with overlap, or simply store data for long-term stability.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col-sm-10 offset-sm-1">
                        <h3>Repository Settings</h3>
                        <img src="assets/images/inquisite-repo-settings.png" class="img-fluid float-right info-img ml-3"/>
                        <p>You can configure your repository from the home screen (“Edit”) or main menu (“Manage” > “Repository Info”). Here, you can name your repository, add a brief description, provide a link, select a license, and set access settings.</p>
                        <p><strong>URL</strong><br/>
                        This field allows you to add a link to a website afiliated with your project or research, and will be published as part of your repository’s metadata. Pleasure ensure that your repository does not link to inappropriate or illegal material.</p>
                        <p><strong>License</strong><br/>
                        The <span class="highlight">license</span> ascribed to your repository governs how others will be able to use your data. For an overview of Creative Commons licenses, please visit <a href="https://creativecommons.org/licenses/" target="_blank">this link</a>. Want to suggest that a license be added to the available options? <a href="mailto:info@inquisite.newyorkscapes.org?subject=RepositoryLicense">Please get in touch.</a></p>
                        <p><strong>Access</strong><br/>
                        By default, all new repositories are “Private” (unpublished), with their contents visible only to the repository owner and any invited collaborators. You can elect to change your access settings so that your repository is “Published” — your data will be visible to all members of the Inquisite community, as well as to anyone searching the site’s public portal. When published, your data can be downloaded and reused by other Inquisite users. </p>
                        <p>Inquisite reserves the right to remove any repositories to whose contents it is determined the repository owner does not have rights of use or publication, as well as those containing illegal or innappropriate content. If you have questions about copyright and permissions, please get in touch with the copyright advisor at your institution. Students, faculty, and staf at NYU with inquiries regarding copyright can contact the <a href="http://library.nyu.edu/people/april-hathcock/" target="_blank">Scholarly Communications Librarian</a> at the NYU Libraries.</p>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col-sm-12 bg-lt-gray">
                        <div class="row">
                            <div class="col-sm-10 offset-sm-1">
                                <h3>Creating and Deleting Repositories</h3>

                                <img src="assets/images/inquisite-repo-dropdown.png" class="img-fluid float-left info-img-lg mr-3"/>

                                <p><span class="highlight">Toggle</span> between your repositories by clicking on the current repository name in the main navigation bar. You can also <span class="highlight">create a new repository</span> from this menu item by selecting “+ NEW REPOSITORY” and naming and describing your new repository.</p>

                                <p>To <span class="highlight">delete your repository</span>, click the “Edit” button from the repository home screen and use the “Delete Repository” option in the bottom right. You can also find the repository options by clicking on “Manage” in the main navigation bar and selecting “Repository Info.” </p>

                                <img src="assets/images/inquisite-user-profile.png" class="img-fluid float-left info-img-lg mr-3"/>

                                <p>You can view all of your existing repositories and access their settings from your user profile, accessible by clicking the profile button in the top right corner of the Inquisite interface and selecting “User Profile.”</p>

                                <p>When you delete your last remaining repository, a new repository will be automatically created and set as your home screen.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col-sm-10 offset-sm-1">
                        <h3>Collaboration</h3>
                        <p>To add a collaborator to your repository, select “Manage Collaborators” from the repository home screen. From the collaboration settings screen (shown below), you can search the Inquisite community internal to NYU to find a collaborator and determine whether your collaborator should be granted “Edit” or “Read-only” permissions. Your desired collaborator will need to have an Inquisite account within the NYU environment prior to being invited to your project.</p>
                        <img src="assets/images/inquisite-collaboration.png" class="img-fluid"/>
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
