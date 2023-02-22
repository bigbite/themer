export const getTheme = (groupId) => {
    const res = wp.apiRequest({
        path: '/themer/v1/current-theme',
        method: 'GET',
    });
    return res;
};

export const setThemeSettings = (settings) => {
    console.log('settings', JSON.stringify(settings));
    const res = wp.apiRequest({
        path: `/themer/v1/set`,
        method: 'POST',
        data: `${JSON.stringify(settings)}`,
    });
    return res;
};