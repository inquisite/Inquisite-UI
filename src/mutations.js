// Record login
export const login =  state => { 
  state.logged_in = true 
  state.msg = "Success!"
}

// Record logout
export const logout = state => {
  state.logged_in = false
  state.token = ''
  state.user = {}
  state.active_repo = {}
}

// Set current JWT auth token
export const setToken = function(state, access_token) { 
	window.sessionStorage.setItem('jwt', access_token); 
	state.token = access_token 
}

// Set current JWT refresh token
export const setRefresh = function(state, refresh_token) { state.refresh = refresh_token }

// User Profile Person Object
export const SET_PERSON = function(state, person) { state.person = person }

// User Prefs
export const setUserName = function(state, newName) { state.user.name = newName }
export const setUserEmail = function(state, newEmail) { state.user.email = newEmail }
export const setUserLocation = function(state, newLocation) { state.user.location = newLocation }
export const setUserTagline = function(state, newTagline) { state.user.tagline = newTagline }
export const setUserUrl = function(state, newUrl) { state.user.url = newUrl }
export const setDefaultRepo = function(state, defaultRepo) { 

    if(state.user.prefs == undefined) {
        state.user.prefs = {default_repo:defaultRepo };
    } else {
        state.user.prefs.default_repo = defaultRepo 
    }
}

// Set currently active repo
export const setActiveRepo = function(state, active_repo_id) { 
	window.sessionStorage.setItem('repo_id', active_repo_id);
	state.active_repo_id = active_repo_id;
	
	for(var i in state.user.repos) {
		console.log(state.user.repos[i]);
		if (state.user.repos[i]['id'] == active_repo_id) {
			state.active_repo  = state.user.repos[i]
			break;
		}
	}
	
}

// API mutations
export const API_FAILURE = function(state, error) { state.msg = error }
export const GET_REPOS = function(state, response) { 
	state.user.repos = response.repos; 
	console.log("set state.user.repos", response.repos);
	state.msg = response.msg 
}
export const GET_REPO_USERS = function(state, response) { 
	state.active_repo.users = response.users; 
	state.msg = response.msg 
}
export const GET_USER_INFO = function(state, response) { 

  state.user = response.person; 

  if(!('prefs' in response.person)) {
    state.user.prefs = {default_repo: {}};
  } else {
    state.user.prefs = JSON.parse(response.person.prefs);
  }

  if(!('repositories' in response.person)) {
    state.user.repos = {}
  }

} 

export const GET_PEOPLE = function(state, response) { state.users = response.people }

export const ADD_PERSON = function(state, response) { state.msg = response.msg }
export const EDIT_PERSON = function(state, response) { state.msg = response.msg /* Update store user obj? */ }

export const ADD_REPO = function(state, response) { state.msg = response.msg }
export const ADD_PERSON_REPO = function(state, response) { state.msg = response.msg }
export const DELETE_REPO = function(state, response) { state.msg = response.msg }
export const UPLOAD_REPO_DATA = function(state, response) { 
  state.msg = response.msg; 
  state.teaser = response.data;
  state.upload_row_count = response.row_count;  
  state.upload_fields = response.fieldnames;
  state.upload_subfields = response.nestednames;
}
export const REPO_DATA = function(state, response) { state.msg = response.msg; state.active_data = response.data }


