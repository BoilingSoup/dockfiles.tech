export const USER_DATA_COOKIE_KEY = "user-data";
export const ENVIRONMENTS_INDEX_COOKIE_KEY = "environments-index";

// Objects to represent loading state when an OAuth login button is clicked.
export const initialOAuthBtnStates = {
  gitHub: {
    isLoading: false,
  },
  gitLab: {
    isLoading: false,
  },
};

export const gitHubOAuthLoadingState = {
  gitHub: {
    isLoading: true,
  },
  gitLab: {
    isLoading: false,
  },
};

export const gitLabOAuthLoadingState = {
  gitHub: {
    isLoading: false,
  },
  gitLab: {
    isLoading: true,
  },
};
