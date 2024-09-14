import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

import styles from '../../utils/styles';
import colors from '../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const UserRegistrationView = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [resumeFile, setResumeFile] = useState(null);
    const [profileBio, setProfileBio] = useState('');
    const [socialMediaLinks, setSocialMediaLinks] = useState(['']);

    const handleAddSocialMediaLink = () => {
        setSocialMediaLinks([...socialMediaLinks, '']);
    };

    const handleRemoveSocialMediaLink = (index) => {
        const updatedLinks = socialMediaLinks.filter((_, i) => i !== index);
        setSocialMediaLinks(updatedLinks);
    };

    const handleChangeSocialMediaLink = (index, text) => {
        const updatedLinks = [...socialMediaLinks];
        updatedLinks[index] = text;
        setSocialMediaLinks(updatedLinks);
    };

    const handleRegister = () => {
        // Handle registration logic here
        console.log('User Info:', {
            email,
            password,
            name,
            profilePic,
            profileBio,
            resumeFile,
            socialMediaLinks,
        });
        navigation.navigate('Login');
    };

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        if (!result.canceled) {
            console.log(result);
            setResumeFile(result.assets[0].name);
            //post result.assets[0].uri to backend
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            console.log(result);
            setProfilePic(result.assets[0].uri);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>User Registration</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                required
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                required
            />

            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
                required
            />

            <TextInput
                style={styles.input}
                placeholder="Profile Bio"
                value={profileBio}
                onChangeText={setProfileBio}
                multiline
            />

            {profilePic ?
                <TouchableOpacity onPress={pickImage}>
                    <Image source={{ uri: profilePic }} style={styles.profilePic} />
                </TouchableOpacity> :
                <TouchableOpacity style={styles.button} onPress={pickImage}>
                    <Text style={styles.buttonText}>Select Profile Picture</Text>
                </TouchableOpacity>
            }

            {
                resumeFile ?
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={pickDocument}>
                        <Text style={styles.fileText}>{resumeFile}</Text>
                        <Icon name="close" style={styles.text} />
                    </TouchableOpacity>
                    : <TouchableOpacity style={styles.button} onPress={pickDocument}>
                        <Text style={styles.buttonText}>Select Resume</Text>
                    </TouchableOpacity>
            }

            {
                socialMediaLinks.map((link, index) => (
                    <View key={index} style={styles.socialMediaContainer}>
                        <TextInput
                            style={[styles.input, { width: '70%' }]}
                            placeholder={`Social Media Link ${index + 1}`}
                            value={link}
                            onChangeText={(text) => handleChangeSocialMediaLink(index, text)}
                        />

                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: colors.error, width: '30%' }]}
                            onPress={() => handleRemoveSocialMediaLink(index)}
                        >
                            <Text style={styles.buttonText}>Remove</Text>
                        </TouchableOpacity>

                    </View>
                ))
            }

            <TouchableOpacity style={styles.addButton} onPress={handleAddSocialMediaLink}>
                <Text style={styles.registerButton}>Add Social Media Link</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
        </ScrollView >
    );
};


export default UserRegistrationView;
