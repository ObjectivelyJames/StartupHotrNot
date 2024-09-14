import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // You may need to install vector icons or use another icon library

const TemplateView = ({ children }) => {
  return (
    <View style={styles.container}>
     
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon}>
          <Icon name="menu" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          
        </View>
        <TouchableOpacity style={styles.headerIcon}>
          <Icon name="settings" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      
      <View style={styles.content}>
        {children}
      </View>

      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerIcon}>
          <Icon name="person-outline" size={28} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.footerIcon, styles.activeIcon]}>
          <Icon name="home" size={28} color="#ff6600" /> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon}>
          <Icon name="chat-bubble-outline" size={28} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:35,
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    width: '100%',
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerIcon: {
    padding: 10,
  },
  headerTitle: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  footer: {
    height: 60,
    width: '100%',
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  footerIcon: {
    padding: 10,
  },
  activeIcon: {
    backgroundColor: '#fff', // Example active state style
    borderRadius: 50,
    padding: 12,
  },
});

export default TemplateView;
