import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ticket } from '../store/ticketsSlice';

interface Props {
  ticket: Ticket;
  onPress: () => void;
}

export function TicketCard({ ticket, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{ticket.title}</Text>
        <Text style={styles.priority}>{ticket.priority.toUpperCase()}</Text>
      </View>
      <Text numberOfLines={2} style={styles.description}>{ticket.description}</Text>
      <View style={styles.footer}>
        <Text style={styles.meta}>Status: {ticket.status}</Text>
        <Text style={styles.meta}>Asignado: {ticket.assignee}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 8,
  },
  title: {
    flex: 1,
    fontWeight: '700',
    fontSize: 16,
    color: '#111827',
  },
  priority: {
    fontSize: 12,
    fontWeight: '700',
    color: '#b45309',
  },
  description: {
    color: '#4b5563',
    marginBottom: 12,
  },
  footer: {
    gap: 4,
  },
  meta: {
    fontSize: 12,
    color: '#6b7280',
  },
});
