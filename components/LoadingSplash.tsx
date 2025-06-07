import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';

interface LoadingSplashProps {
  visible?: boolean;
  size?: 'small' | 'large';
  color?: string;
}

export default function LoadingSplash({ 
  visible = true, 
  size = 'large', 
  color = '#ffffff' 
}: LoadingSplashProps) {
  if (!visible) return null;

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ActivityIndicator size={size} color={color} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
