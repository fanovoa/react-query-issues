import { useInfiniteQuery } from '@tanstack/react-query';
import { Issue, State } from '../interfaces';
import { sleep } from '../../helpers';
import { githubApi } from '../../api/githubApi';

interface Props {
    state?:State;
    labels: string[];
    page?: number;
}

interface QueryProps {
    pageParams? :number;
    queryKey: (string| Props) [];

}

const getIssues = async( { pageParams = 1 , queryKey }:QueryProps ):Promise<Issue[]> => {

    const [,, args ] = queryKey;
    const { state, labels } = args as Props;

    await sleep(2);
    
    const params = new URLSearchParams();

    if( state ) params.append('state', state );

    if(labels.length > 0){
        const labelString = labels.join(',');
        params.append('labels', labelString);
    }

    params.append('page', pageParams.toString());
    params.append('per_page', '5');


    const  { data } = await githubApi.get<Issue[]>('/issues', { params });
    return data;
}


export const useIssuesInfinite = ({ state, labels, page }: Props) => {
  

    const issuesQuery = useInfiniteQuery(
        ['issues','infinite', { state, labels, page: 1 }],
        (data) => getIssues( data ),
        {
            //getNextPageParam
        }

    );


    return {
        issuesQuery
    }
}
