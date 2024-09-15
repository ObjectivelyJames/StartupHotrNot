import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Make sure to install react-native-vector-icons

const ExpandableSection = ({ title, children }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <View style={styles.sectionContainer}>
            <TouchableOpacity style={styles.sectionHeader} onPress={() => setExpanded(!expanded)}>
                <Text style={styles.sectionTitle}>{title}</Text>
                <Icon name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={24} color="#000" />
            </TouchableOpacity>
            {expanded && <View style={styles.sectionContent}>{children}</View>}
        </View>
    );
};

const StartupProfile = () => {
    const [teamMembers, setTeamMembers] = useState(['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown']); // State for team members input boxes
    const [socialMediaLinks, setSocialMediaLinks] = useState(['']); // State for social media input boxes

    const handleAddTeamMember = () => {
        setTeamMembers([...teamMembers, '']);
    };

    const handleRemoveTeamMember = (index) => {
        const updatedMembers = teamMembers.filter((_, i) => i !== index);
        setTeamMembers(updatedMembers);
    };

    const handleChangeTeamMember = (index, text) => {
        const updatedMembers = [...teamMembers];
        updatedMembers[index] = text;
        setTeamMembers(updatedMembers);
    };

    const handleAddSocialMedia = () => {
        setSocialMediaLinks([...socialMediaLinks, '']);
    };

    const handleRemoveSocialMedia = (index) => {
        const updatedLinks = socialMediaLinks.filter((_, i) => i !== index);
        setSocialMediaLinks(updatedLinks);
    };

    const handleChangeSocialMedia = (index, text) => {
        const updatedLinks = [...socialMediaLinks];
        updatedLinks[index] = text;
        setSocialMediaLinks(updatedLinks);
    };

    return (
        <ScrollView style={styles.container}>
            {/* Profile Picture and Name */}
            <View style={styles.profileHeader}>
                <View style={styles.profileImageContainer}>
                    <Image style={styles.profileImage} source={{ uri: 'https://via.placeholder.com/100' }} />
                    <TouchableOpacity style={styles.cameraIcon}>
                        <Icon name="camera-alt" size={20} color="#000" />
                    </TouchableOpacity>
                </View>
                <View style={styles.profileDetails}>
                    <View style={styles.profileRow}>
                        <Text style={styles.profileName}>Name</Text>
                    </View>
                    <View style={styles.profileRow}>
                        <Text style={styles.profileRole}>Designer</Text>
                        <TouchableOpacity>
                            <Icon name="edit" size={18} color="#000" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Expandable Sections */}
            <ExpandableSection title="Team Members">
                {/* Editable team members input boxes */}
                {teamMembers.map((member, index) => (
                    <View key={index} style={styles.teamMemberInputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder={`Team Member ${index + 1}`}
                            value={member}
                            onChangeText={(text) => handleChangeTeamMember(index, text)}
                        />
                        {index > 0 && (
                            <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveTeamMember(index)}>
                                <Icon name="remove-circle" size={24} color="#ff0000" />
                            </TouchableOpacity>
                        )}
                    </View>
                ))}
                <TouchableOpacity style={styles.addButton} onPress={handleAddTeamMember}>
                    <Text style={styles.addButtonText}>Add Team Member</Text>
                </TouchableOpacity>
            </ExpandableSection>

            <ExpandableSection title="Website Link">
                <TextInput style={styles.input} placeholder="Enter your website link" multiline />
            </ExpandableSection>

            <ExpandableSection title="Bio">
                <TextInput style={styles.input} placeholder="Enter your bio" multiline />
            </ExpandableSection>

            <ExpandableSection title="Industry">
                <TextInput style={styles.input} placeholder="Enter your industry" multiline />
            </ExpandableSection>

            <ExpandableSection title="Location">
                <TextInput style={styles.input} placeholder="Enter your location" multiline />
            </ExpandableSection>

            {/* Social Media Section with Dynamic Input Boxes */}
            <ExpandableSection title="Social Media">
                {socialMediaLinks.map((link, index) => (
                    <View key={index} style={styles.socialMediaInputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder={`Social Media Link ${index + 1}`}
                            value={link}
                            onChangeText={(text) => handleChangeSocialMedia(index, text)}
                        />
                        {index > 0 && (
                            <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveSocialMedia(index)}>
                                <Icon name="remove-circle" size={24} color="#ff0000" />
                            </TouchableOpacity>
                        )}
                    </View>
                ))}
                <TouchableOpacity style={styles.addButton} onPress={handleAddSocialMedia}>
                    <Text style={styles.addButtonText}>Add Social Media Link</Text>
                </TouchableOpacity>
            </ExpandableSection>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    profileImageContainer: {
        marginRight: 20,
        position: 'relative',
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#ddd',
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 5,
    },
    profileDetails: {
        flex: 1,
    },
    profileRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    profileRole: {
        fontSize: 16,
        color: '#555',
    },
    sectionContainer: {
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    sectionContent: {
        marginTop: 10,
    },
    teamMemberInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        flex: 1,
    },
    removeButton: {
        marginLeft: 10,
    },
    socialMediaInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    addButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default StartupProfile;
