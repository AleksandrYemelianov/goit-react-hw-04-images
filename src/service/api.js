
const API_KEY = '36956976-ac77797dbc5715892646935b7';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 12;


export const getApi = async (value, page) => {
    return  await fetch(`${BASE_URL}?q=${value}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`);
};
