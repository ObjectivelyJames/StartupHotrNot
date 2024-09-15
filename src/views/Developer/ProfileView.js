import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Make sure to install react-native-vector-icons

const interestsArray = ['Design', 'Photography', 'Programming', 'Traveling', 'Music', 'Writing', 'Reading', 'Gaming']; // Example array of interests

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

const ProfileView = () => {
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
      <ExpandableSection title="Interest">
        {/* Dynamically generated interests from an array */}
        <View style={styles.interestsGrid}>
          {interestsArray.map((interest, index) => (
            <Text key={index} style={styles.interestItem}>
              {interest}
            </Text>
          ))}
        </View>
      </ExpandableSection>

      {/* Expandable Input Sections */}
      <ExpandableSection title="Address">
        <TextInput style={styles.input} placeholder="Enter your address" multiline />
      </ExpandableSection>

      <ExpandableSection title="Bio">
        <TextInput style={styles.input} placeholder="Enter your bio" multiline />
      </ExpandableSection>

      <ExpandableSection title="Resume">
        <TextInput style={styles.input} placeholder="Enter your resume link" multiline />
      </ExpandableSection>

      <ExpandableSection title="Social Media">
        <TextInput style={styles.input} placeholder="Enter your social media link" multiline />
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
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  interestItem: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '47%',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default ProfileView;
