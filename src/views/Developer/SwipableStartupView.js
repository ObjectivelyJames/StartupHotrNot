import React, { useState } from 'react';
import { SafeAreaView, View, Text, Button, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../utils/colors';
// Sample data for projects
const projectsData = [
    {
        id: 1,
        name: 'Project One',
        image: 'https://images.unsplash.com/photo-1591154669695-5f2a8d20c089?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Replace with actual image URL
        roles: ['Frontend Developer', 'Backend Developer', 'Designer'],
        description: 'This is the first project description. It includes details about the project and its objectives.',
    },
    {
        id: 2,
        name: 'Project Two',
        image: 'https://plus.unsplash.com/premium_photo-1683134105531-42032fc66937?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Replace with actual image URL
        roles: ['Data Scientist', 'Mobile Developer', 'Tester'],
        description: 'This is the second project description. It focuses on data analysis and mobile development.',
    },
    {
        id: 3,
        name: 'Project Three',
        image: 'https://plus.unsplash.com/premium_photo-1681487916420-8f50a06eb60e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Replace with actual image URL
        roles: ['Full Stack Developer', 'DevOps Engineer'],
        description: 'This is the third project description. It requires expertise in full stack development and DevOps.',
    },
    {
        id: 4,
        name: 'Project Four',
        image: 'https://plus.unsplash.com/premium_photo-1683141154082-324d296f3c66?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        roles: ['UX/UI Designer', 'Product Manager'],
        description: 'The fourth project is centered around designing a user-friendly interface for a new app.',
    },
    {
        id: 5,
        name: 'Project Five',
        image: 'https://plus.unsplash.com/premium_photo-1685086785054-d047cdc0e525?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        roles: ['Cybersecurity Expert', 'Network Engineer'],
        description: 'This project involves setting up and securing a robust network infrastructure for a corporate client.',
    },
    {
        id: 6,
        name: 'Project Six',
        image: 'https://plus.unsplash.com/premium_photo-1663045746070-119bcb8d5a7d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        roles: ['Machine Learning Engineer', 'Data Analyst'],
        description: 'An advanced project focused on developing machine learning models for predictive analytics.',
    },
    {
        id: 7,
        name: 'Project Seven',
        image: 'https://plus.unsplash.com/premium_photo-1681490220097-cf6f188196e4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        roles: ['Blockchain Developer', 'Smart Contract Auditor'],
        description: 'This project is about developing and auditing smart contracts for a blockchain-based application.',
    },
    {
        id: 8,
        name: 'Project Eight',
        image: 'https://plus.unsplash.com/premium_photo-1725371216087-ed2b2574b864?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        roles: ['Cloud Engineer', 'System Administrator'],
        description: 'A project focused on cloud migration and setting up scalable cloud architecture using AWS and Azure.',
    },
    {
        id: 9,
        name: 'Project Nine',
        image: 'https://plus.unsplash.com/premium_photo-1725609131641-3bbeaee9c31c?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        roles: ['iOS Developer', 'Android Developer'],
        description: 'This project involves creating a cross-platform mobile application with seamless user experience.',
    },
    {
        id: 10,
        name: 'Project Ten',
        image: 'https://plus.unsplash.com/premium_photo-1679177184014-16746957e4cc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        roles: ['SEO Specialist', 'Content Writer'],
        description: 'A digital marketing project focused on SEO optimization and content creation for an e-commerce platform.',
    },
    // Add more projects as needed
];

const ProjectCard = ({ project }) => (
    <View style={styles.card}>
        <Image source={{ uri: project.image }} style={styles.projectImage} />
        <View style={styles.cardContent}>
            <Text style={styles.projectName}>{project.name}</Text>
            <Text style={styles.projectRoles}>
                Roles: {project.roles.join(', ')}
            </Text>
            <Text style={styles.projectDescription}>{project.description}</Text>
            <TouchableOpacity style={styles.button} onPress={() => console.log("Details")}>
                <Text style={styles.buttonText}>Go to Details</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const ProjectSwiper = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <SafeAreaView style={styles.container}>
            <Swiper
                cards={projectsData}
                renderCard={(project) => <ProjectCard project={project} />}
                onSwiped={(cardIndex) => setCurrentIndex(cardIndex + 1)}
                onSwipedAll={() => {
                    console.log('All projects swiped!');
                }}
                cardIndex={currentIndex}
                stackSize={2}
                backgroundColor={colors.white}
                overlayLabels={{
                    left: {
                        element: (
                            <View style={styles.overlayLabel}>
                                <Icon name="thumb-down" size={50} color={colors.error} />
                            </View>
                        ), style: {
                            label: {
                                color: 'red',
                                fontSize: 24,
                            },
                            wrapper: {
                                flexDirection: 'column',
                                alignItems: 'flex-end',
                                justifyContent: 'flex-start',
                                marginTop: 28,
                                marginLeft: -28,
                            },
                        },
                    },
                    right: {
                        element: (
                            <View style={styles.overlayLabel}>
                                <Icon name="thumb-up" size={50} color={colors.success} />
                            </View>
                        ), style: {
                            label: {
                                color: 'green',
                                fontSize: 24,
                            },
                            wrapper: {
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                                marginTop: 28,
                                marginLeft: 28,
                            },
                        },
                    },
                }}
                animateOverlayLabelsOpacity
                animateCardOpacity
                disableTopSwipe
                disableBottomSwipe
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        flex: 0.7,
        borderRadius: 8,
        shadowRadius: 25,
        shadowColor: colors.black,
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 5 },
        backgroundColor: colors.white,
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: Dimensions.get('window').height * 0.6, // Adjust height as needed
        width: Dimensions.get('window').width * 0.85,
    },
    projectImage: {
        width: '100%',
        height: 300, // Adjust height as needed
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    cardContent: {
        padding: 20,
        width: '100%', // Ensures content takes full width
        alignItems: 'flex-start', // Aligns text to the left
    },
    projectName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    projectRoles: {
        fontSize: 16,
        color: colors.gray1,
        marginBottom: 20,
    },
    projectDescription: {
        fontSize: 14,
        color: colors.gray3,
        textAlign: 'left',
        marginBottom: 10,
    }, button: {
        height: 50,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        padding: 10,
        margin: 5,
    },
    buttonText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: 'bold',
    },

});

export default ProjectSwiper;
