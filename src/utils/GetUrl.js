import config from '@root/config/config';

export const getUrl = () => {
    if (config.useMockData){
        return `${config.mockURL}`;
    } else {
        return `${config.apiBaseUrl}`;
    }
};

