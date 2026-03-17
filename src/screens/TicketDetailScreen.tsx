import React, { useMemo } from 'react';
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { changeTicketStatus } from '../store/ticketsSlice';

export function TicketDetailScreen({ route }: NativeStackScreenProps<RootStackParamList, 'TicketDetail'>) {
  const dispatch = useAppDispatch();
  const ticketId = route.params.ticketId;
  const tickets = useAppSelector((state) => state.tickets.items);

  const ticket = useMemo(() => tickets.find((item) => item.id === ticketId), [tickets, ticketId]);

  if (!ticket) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Ticket no encontrado</Text>
      </SafeAreaView>
    );
  }

  const markAsResolved = async () => {
    try {
      await dispatch(changeTicketStatus({ id: ticket.id, status: 'resolved' })).unwrap();
      Alert.alert('Éxito', 'El ticket fue actualizado.');
    } catch (error) {
      Alert.alert('Error', 'No fue posible actualizar el ticket.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{ticket.title}</Text>
        <Text style={styles.label}>Descripción</Text>
        <Text style={styles.body}>{ticket.description}</Text>

        <Text style={styles.label}>Prioridad</Text>
        <Text style={styles.body}>{ticket.priority}</Text>

        <Text style={styles.label}>Status</Text>
        <Text style={styles.body}>{ticket.status}</Text>

        <Text style={styles.label}>Asignado a</Text>
        <Text style={styles.body}>{ticket.assignee}</Text>

        <Pressable style={styles.button} onPress={markAsResolved}>
          <Text style={styles.buttonText}>Marcar como resuelto</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    color: '#111827',
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6b7280',
    marginTop: 10,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  body: {
    fontSize: 15,
    color: '#1f2937',
    lineHeight: 22,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#1f6feb',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
});
