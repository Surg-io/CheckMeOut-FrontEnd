import config from '@root/config/config';

export const getUrl = () => {
    if (config.useMockData){
        url = `${config.mockURL}`;
    } else {
        url = `${config.apiBaseUrl}`;
    }
};

