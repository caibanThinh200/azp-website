const DEVELOPMENT = {
    API_URL: process.env.REACT_APP_FURNITURE_DEV_HOST,
    HOST: process.env.REACT_APP_LOCAL,
    DESTINATION: process.env.REACT_APP_DESTINATION_API
};

const STAGING = {
    API_URL: process.env.REACT_APP_FURNITURE_HOST,
    DESTINATION: process.env.REACT_APP_DESTINATION_API
}

let currentConfig =  {}

switch(process.env.REACT_APP_ENV) {
    case "staging": {
        currentConfig = STAGING;
        break;
    }
    default: currentConfig = DEVELOPMENT
}

export default currentConfig;