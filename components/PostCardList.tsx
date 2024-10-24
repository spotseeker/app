import React  from "react";

import { FlatList } from 'react-native';
import { post} from '../scripts/post';
import PostCard from "./PostCard";



export default function PostCardList () {
    return <FlatList data={post} 
    keyExtractor={(postc) => String(postc.id)}
    renderItem={({item}) => <PostCard {...item}/>}
    
    />;
}