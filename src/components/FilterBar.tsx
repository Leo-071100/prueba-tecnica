import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { TicketStatus } from '../store/ticketsSlice';

const options: Array<TicketStatus | 'all'> = ['all', 'open', 'in_progress', 'resolved'];

interface Props {
  value: TicketStatus | 'all';
  onChange: (value: TicketStatus | 'all') => void;
}

export function FilterBar({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <Pressable
          key={option}
          onPress={() => onChange(option)}
          style={[styles.chip, value === option && styles.chipActive]}
        >
          <Text style={[styles.text, value === option && styles.textActive]}>{option}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 8,
    flexWrap: 'wrap',
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#e9ecef',
  },
  chipActive: {
    backgroundColor: '#1f6feb',
  },
  text: {
    color: '#333',
    fontSize: 13,
    textTransform: 'capitalize',
  },
  textActive: {
    color: '#fff',
  },
});
