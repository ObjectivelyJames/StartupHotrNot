import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, Dimensions, Linking, TouchableOpacity } from 'react-native';

const UserProfileOverview = ({ user }) => {
  // Function to handle opening URLs
  const handlePress = (url) => {
    Linking.openURL(url).catch((err) => console.error("Failed to open page", err));
  };

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={{ uri: user.image }}  // Changed to use "image" instead of "profileImage"
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Overlay with Scrollable Content */}
        <ScrollView contentContainerStyle={styles.overlayContent}>
          <View style={styles.textContainer}>
            <Text style={styles.name}>{user.name}</Text>
            {/* Display Roles Next to Each Other */}
            <Text style={styles.role}>{user.roles.join(', ')}</Text>
            
            {/* Display Bio or Description */}
            <Text style={styles.bio}>
              {(user.bio || user.description).split(' ').map((word, index) => {
                if (word.startsWith('[Twitter]')) {
                  return (
                    <Text key={index} style={styles.link} onPress={() => handlePress('https://twitter.com')}>
                      Twitter
                    </Text>
                  );
                } else if (word.startsWith('[LinkedIn]')) {
                  return (
                    <Text key={index} style={styles.link} onPress={() => handlePress('https://linkedin.com')}>
                      LinkedIn
                    </Text>
                  );
                }
                return word + ' ';
              })}
            </Text>

            {/* Location Hyperlink */}
            {user.location && (
              <TouchableOpacity onPress={() => handlePress(user.googleMapLink)}>
                <Text style={styles.location}>Location: {user.location}</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    height: height,
    justifyContent: 'flex-end', // Keep content at the bottom initially
  },
  overlayContent: {
    padding: 20,
    paddingTop: height / 2, // Start the content from the middle of the screen
  },
  textContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent background for better text readability
    padding: 20,
    borderRadius: 10,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  role: {
    fontSize: 20,
    color: '#555',
    marginBottom: 20,
  },
  bio: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  link: {
    color: '#1e90ff',
    textDecorationLine: 'underline',
  },
  location: {
    fontSize: 16,
    color: '#1e90ff',
    textDecorationLine: 'underline',
    marginTop: 20,
  },
});

export default UserProfileOverview;
