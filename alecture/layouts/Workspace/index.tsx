import fetcher from '@utils/fetcher';
import React,{FC, useCallback} from 'react';
import  useSWR  from 'swr';
import axios from 'axios';
import { Redirect, Switch,Route } from 'react-router';
import { Channels, Chats, Header, MenuScroll, ProfileImg, RightMenu, WorkspaceName, Workspaces, WorkspaceWrapper } from './styles';
import gravatar from 'gravatar';
import loadable from '@loadable/component';
const Channel =loadable(()=>import('@pages/Channel')) 
const DirectMessage =loadable(()=>import('@pages/DirectMessage')) 
const Workspace:FC = ({children})=>{
    const { data, error, revalidate, mutate } = useSWR('/api/users',fetcher);
    const onLogout = useCallback(()=>{
        axios.post('http://localhost:3095/api/users/logout',null,{
            withCredentials:true
        })
        .then(()=>{
            mutate(false, false);
        })
    },[]);

    if(!data){
        return <Redirect to="/login"/>
    }
    return(
        <div>
            <Header>

            <RightMenu>
                <span>
                    <ProfileImg src={gravatar.url(data.email,{s:'28px',d:'retro'})} alt={data.email}/>
                </span>
            </RightMenu>
            </Header>
            <button onClick={onLogout}>로그아웃</button>
            <WorkspaceWrapper>
                <Workspaces>test</Workspaces>
                <Channels>
                    <WorkspaceName>Sleact</WorkspaceName>
                    <MenuScroll>menu scroll</MenuScroll>
                </Channels>
                <Chats><Switch>
                <Route path="/workspace/channel" component={Channel}/>
                <Route path="/workspace/dm" component={DirectMessage}/>
                    </Switch></Chats>
            </WorkspaceWrapper>
        </div>
    )
}

export default Workspace