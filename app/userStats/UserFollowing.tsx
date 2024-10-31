import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ImageSourcePropType,Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from '@kolking/react-native-avatar';
import Screen from '@/components/Screen';
import CustomButton from '@/components/CustomButton';
import Img1 from '@/assets/images_app/avatar_users/Ellipse 11.png';
import Img2 from '@/assets/images_app/avatar_users/Ellipse 14.png';
import Img3 from '@/assets/images_app/avatar_users/Ellipse 14 (1).png';

type Following = {
  id: string;
  username: string;
  uri: ImageSourcePropType;
  isFollowing: boolean;
};

const UserFollowing = () => {
  const images = [Img1, Img2, Img3];

  const [followingData, setFollowingData] = useState<Following[]>([
    { id: '1', username: 'Andresjpg', uri: images[0], isFollowing: true },
    { id: '2', username: 'Yohanna33', uri: images[1], isFollowing: true },
    { id: '3', username: 'Davidbqto', uri: images[2], isFollowing: false },
  ]);

  const toggleFollow = (id: string) => {
    setFollowingData((prevData) =>
      prevData.map((user) =>
        user.id === id ? { ...user, isFollowing: !user.isFollowing } : user
      )
    );
  };

  const renderFollowing = ({ item }: { item: Following }) => (
    <View  className='flex-1 justify-start content-start' style={styles.followingItem}>
      <Avatar source={item.uri} size={40} />
      <View style={styles.userInfo}>
        <Text className="text-primary font-pbold">{item.username}</Text>
      </View>
      <CustomButton
        onPress={() => toggleFollow(item.id)}
        variant={item.isFollowing ? 'gray' : 'primary'}
        width={118}
        height={44}
      >
        <Text className="text-white font-pbold">
          {item.isFollowing ? 'Dejar de seguir' : 'Seguir'}
        </Text>
      </CustomButton>
    </View>
  );

  return (
    <SafeAreaView>
      <Screen>
        <FlatList
          data={followingData}
          keyExtractor={(item) => item.id}
          renderItem={renderFollowing}
          style={styles.followingList}
        />
      </Screen>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  followingList: {
    marginTop: Dimensions.get('window').height*(-0.70),
    paddingTop:Dimensions.get('window').height*0.2,
  },
  followingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
});

export default UserFollowing;
