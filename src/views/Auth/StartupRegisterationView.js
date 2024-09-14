import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    ScrollView,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import styles from '../../utils/styles';
import colors from '../../utils/colors';

const StartupRegisterationView = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [logo, setLogo] = useState('');
    const [startupBio, setStartupBio] = useState('');
    const [socialMediaLinks, setSocialMediaLinks] = useState(['']);
    const [website, setWebsite] = useState('');
    const [team, setTeam] = useState([]);
    const [funding, setFunding] = useState('');
    const [industry, setIndustry] = useState('');
    const [location, setLocation] = useState('');


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


    const handleAddTeamMember = () => {
        setTeam([...team, '']);
    };

    const handleRemoveTeamMember = (index) => {
        setSocialMediaLinks(team.filter((_, i) => i !== index));
    };

    const handleChangeTeamMember = (index, text) => {
        const updatedTeam = [...team];
        updatedTeam[index] = text;
        setTeam(updatedTeam);
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
            setLogo(result.assets[0].uri);
        }
    };

    const handleRegister = () => {
        // Handle registration logic here
        console.log('Startup Info:', {
            email,
            password,
            name,
            profileBio: startupBio,
            socialMediaLinks,
        });

        navigation.navigate('Login');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Startup Registration</Text>

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

            {logo ?
                <TouchableOpacity onPress={pickImage}>
                    <Image source={{ uri: logo }} style={styles.profilePic} />
                </TouchableOpacity> :
                <TouchableOpacity style={styles.button} onPress={pickImage}>
                    <Text style={styles.buttonText}>Select Profile Picture</Text>
                </TouchableOpacity>
            }

            <TextInput
                style={styles.input}
                placeholder="Profile Bio"
                value={startupBio}
                onChangeText={setStartupBio}
                multiline
            />

            <TextInput
                style={styles.input}
                placeholder="Website Link"
                value={website}
                onChangeText={setWebsite}
            />

            <TextInput
                style={styles.input}
                placeholder="Funding Stage"
                value={funding}
                onChangeText={setFunding}
            />

            <TextInput
                style={styles.input}
                placeholder="Industry"
                value={industry}
                onChangeText={setIndustry}
            />

            <TextInput
                style={styles.input}
                placeholder="Location"
                value={location}
                onChangeText={setLocation}
            />

            {
                team.map((link, index) => (
                    <View key={index} style={styles.socialMediaContainer}>
                        <TextInput
                            style={[styles.input, { width: '70%' }]}
                            placeholder={`Team Member ${index + 1}`}
                            value={link}
                            onChangeText={(text) => handleChangeTeamMember(index, text)}
                        />

                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: colors.error, width: '30%' }]}
                            onPress={() => handleRemoveTeamMember(index)}
                        >
                            <Text style={styles.buttonText}>Remove</Text>
                        </TouchableOpacity>

                    </View>
                ))
            }

            <TouchableOpacity style={styles.addButton} onPress={handleAddTeamMember}>
                <Text style={styles.registerButton}>Add Team Member</Text>
            </TouchableOpacity>

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


export default StartupRegisterationView;
