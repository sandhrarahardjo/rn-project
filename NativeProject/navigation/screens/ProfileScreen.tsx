import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './profile.styles';

interface SocialMedia {
  name: string;
  github: string;
  linkedin: string;
  instagram: string;
  email: string;
}

const EditProfileScreen = (): JSX.Element => {
  const defaultSocialMedia: SocialMedia = {
    name: '',
    github: '',
    linkedin: '',
    instagram: '',
    email: '',
  };

  const socialMediaPlatforms = [
    { key: 'name', icon: 'user' },
    { key: 'github', icon: 'github' },
    { key: 'linkedin', icon: 'linkedin' },
    { key: 'instagram', icon: 'instagram' },
    { key: 'email', icon: 'envelope' },
  ];

  const [socialMedia, setSocialMedia] = useState<SocialMedia>(defaultSocialMedia);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string>(
    'https://isobarscience-1bfd8.kxcdn.com/wp-content/uploads/2020/09/default-profile-picture1.jpg'
  );

  const [imageUrl, setImageUrl] = useState<string>(profileImage);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setProfileImage(imageUrl);
    setIsEditing(false);
  };

  const handleInputChange = (key: string, value: string) => {
    setSocialMedia({
      ...socialMedia,
      [key]: value,
    });
  };

  const _renderEditComponent = () => {
    const inputFields = [
      { key: 'name', placeholder: 'Enter your name', value: socialMedia.name },
      { key: 'github', placeholder: 'Enter your github', value: socialMedia.github },
      { key: 'linkedin', placeholder: 'Enter your linkedIn', value: socialMedia.linkedin },
      { key: 'instagram', placeholder: 'Enter your instagram', value: socialMedia.instagram },
      { key: 'email', placeholder: 'Enter your email', value: socialMedia.email },
      { key: 'imageUrl', placeholder: 'Enter image URL', value: imageUrl },
    ];

    return inputFields.map((field) => (
      <TextInput
        key={field.key}
        style={styles.input}
        placeholder={field.placeholder}
        value={field.value}
        onChangeText={(text) => {
          if (field.key === 'imageUrl') {
            setImageUrl(text);
          } else {
            handleInputChange(field.key, text);
          }
        }}
      />
    ));
  };

  const _renderViewComponent = () => (
    <>
      {socialMediaPlatforms.map((platform) => (
        <View style={styles.row} key={platform.key}>
          <Icon name={platform.icon} size={20} color='black' />
          <Text style={styles[platform.key as keyof SocialMedia]}>
            {socialMedia[platform.key as keyof SocialMedia]}
          </Text>
        </View>
      ))}
    </>
  );
  
  return (
    <View style={styles.container}>
      <Image source={{ uri: profileImage }} style={styles.profileImage} />
      <Text style={styles.header}>Profile</Text>
      {isEditing ? _renderEditComponent() : _renderViewComponent()}
      {isEditing ? (
        <Button title='Save' onPress={handleSaveProfile} />
      ) : (
        <Button title='Edit Profile' onPress={handleEditProfile} />
      )}
    </View>
  );
};

export default EditProfileScreen;