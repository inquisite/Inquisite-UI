<template>
<div class="row">
    <div class="col-sm-12">
        <div class="container">
            <div class="row bg-header">
                <div class="col-sm-12 text-center">
                    <h1>Getting started with Inquisite</h1>
                    <p>A guide to the basics of working with data in Inquisite</p>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-12 text-center">
                    <p>Select an option that best reflects your data to walk through Inquisite:</p>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-6 text-center">
                    <div class="card starting-card">
                        <div class="card-body bg-dk-gray">
                            <h4>I have structured data.</h4>
                            <p>Choose this option if your data is tabular (i.e. looks like a table or spreadsheet). Accepted file formats: .csv, .txt, .xls, .xlsx</p>
                        </div>
                    </div>
                </div>
                <div class="col-6 text-center">
                    <div class="card starting-card">
                        <div class="card-body bg-dk-gray">
                            <h4>How should I model my data?</h4>
                            <p>Learn about structured vs. semi-structured data to better understand what model might be right for your project.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12 bg-lt-gray text-center">
                    <h4 class="mb-4">Know what you're looking for? Jump to a topic!</h4>
                    <div class="row">
                        <div class="col-sm-6 col-lg-4">
                            <div class="card starting-section-card">
                                <router-link to="/help/about-inquisite" class="starting-card-link"></router-link>
                                <div class="card-body">
                                    <i class="fa fa-desktop fa-4x"></i>
                                </div>
                                <div class="card-footer"><small>About Inquisite</small></div>
                            </div>
                        </div>
                        <div class="col-sm-6 col-lg-4">
                            <div class="card starting-section-card">
                                <router-link to="/help/managing-repositories" class="starting-card-link"></router-link>
                                <div class="card-body">
                                    <i class="fa fa-folder-open fa-4x"></i>
                                </div>
                                <div class="card-footer"><small>Creating &amp; Managing Repositories</small></div>
                            </div>
                        </div>
                        <div class="col-sm-6 col-lg-4">
                            <div class="card starting-section-card">
                                <div class="card-body">
                                    <i class="fa fa-database fa-4x"></i>
                                </div>
                                <div class="card-footer"><small>Guide to Data Types</small></div>
                            </div>
                        </div>
                        <div class="col-sm-6 col-lg-4">
                            <div class="card starting-section-card">
                                <div class="card-body">
                                    <i class="fa fa-files-o fa-4x"></i>
                                </div>
                                <div class="card-footer"><small>Browsing, Finding &amp; Merging Data</small></div>
                            </div>
                        </div>
                        <div class="col-sm-6 col-lg-4">
                            <div class="card starting-section-card">
                                <router-link to="/help/faq" class="starting-card-link"></router-link>
                                <div class="card-body">
                                    <i class="fa fa-question-circle fa-4x"></i>
                                </div>
                                <div class="card-footer"><small>FAQ</small></div>
                            </div>
                        </div>
                        <div class="col-sm-6 col-lg-4">
                            <div class="card starting-section-card">
                                <router-link to="/help/contact" class="starting-card-link"></router-link>
                                <div class="card-body">
                                    <i class="fa fa-envelope-open-o fa-4x"></i>
                                </div>
                                <div class="card-footer"><small>Contact Us</small></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
	export default {
		name: 'getting-started',
        data: function() {
          return {}
        },
    }
</script>
