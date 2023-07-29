import axios from 'axios';


export const githubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization: 'Bearer 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'
    },
});


