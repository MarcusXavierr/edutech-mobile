import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph, Button, Chip } from 'react-native-paper';

type Lesson = {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  onPress?: () => void;
};

type Props = {
  lessons: Lesson[];
  isCategory?: boolean;
};

export default function LessonsCarousel({ lessons, isCategory = false }: Props) {
  return (
    <View style={styles.container}>
      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Title>{item.title}</Title>
              <Paragraph>{item.description}</Paragraph>
              <View style={styles.infoRow}>
                <Chip style={styles.chip}>{item.category}</Chip>
                <Paragraph style={styles.duration}>📘 {item.duration}</Paragraph>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button mode="outlined" onPress={item.onPress}>
                {isCategory ? "Saiba mais" : "Ver mais"}
              </Button>
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 16 },
  card: { marginVertical: 8, marginHorizontal: 4 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  chip: { backgroundColor: '#E0F7FA' },
  duration: { color: '#555' },
});