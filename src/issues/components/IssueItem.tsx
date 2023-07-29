import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { Issue ,State } from '../interfaces';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { getIssueComments, getIssueInfo } from '../hooks/useIssue';

interface Props {
    issue : Issue
}


export const IssueItem:FC<Props> = ( { issue }) => {

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { user, comments, state, number } = issue;
    const { avatar_url , login  } = user;


    const prefetchData = () => {
            queryClient.prefetchQuery(
                ['issue', issue.number],
                ()=> getIssueInfo( issue.number )
            )
            queryClient.prefetchQuery(
                ['issue', issue.number,'comments'],
                ()=> getIssueComments( issue.number )
            )

    }

    const preSetData = () => {

        queryClient.setQueryData(
            ['issue', issue.number],
           issue,
        )

    }

    return (
        <div className="card mb-2 issue"
             onClick={ () => navigate(`/issues/issue/${issue.number}`)}
            //  onMouseEnter={ () => prefetchData() }
             onMouseEnter={ () => preSetData() }

        >
            <div className="card-body d-flex align-items-center">
                <div className='icon-status'>
                {
                    state === State.Open
                    ?   ( <FiInfo size={30} color="red" width={30} /> )
                    :   ( <FiCheckCircle size={30} color="green"  width={30} />  )
                }

                </div>
                

                <div className="d-flex flex-column flex-fill px-2">
                    <span>{issue.title}</span>
                    <span className="issue-subinfo">#{number} opened 2 days ago by <span className='fw-bold'>{login}</span></span>
                </div>

                <div className='d-flex align-items-center'>
                    <img src={avatar_url} alt="User Avatar" className="avatar" />
                    <span className='px-2'>{comments}</span>
                    <FiMessageSquare />
                </div>

            </div>
        </div>
    )
}
