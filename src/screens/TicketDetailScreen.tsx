import React, { useMemo } from 'react';
import { ActivityIndicator, Alert, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { changeTicketStatus } from '../store/ticketsSlice';

export function TicketDetailScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'TicketDetail'>) {
  const dispatch = useAppDispatch();
  const ticketId = route.params.ticketId;
  const ticket = useAppSelector((state) => state.tickets.items.find((item) => item.id === ticketId));
  const isUpdating = useAppSelector((state) => state.tickets.isUptading)

  if (!ticket) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Ticket no encontrado</Text>
      </SafeAreaView>
    );
  }

   if (isUpdating) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" />
          <Text style={styles.feedback}>Actualizando ticket...</Text>
        </View>
      )
    }

  const markAsResolved = async () => {
    try {
      await dispatch(changeTicketStatus({ id: ticket.id, status: 'resolved' })).unwrap();
      Alert.alert('Éxito', 'El ticket fue actualizado.', [{ text: 'OK', onPress: () => navigation.goBack() }]);
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

        <Pressable style={ticket.status === 'resolved' ? styles.buttonDisabled : styles.button} onPress={markAsResolved} disabled={isUpdating || ticket.status === 'resolved'} >
          <Text style={styles.buttonText}>{ticket.status === 'resolved' ? 'Ticket resuelto' : 'Marcar como resuelto'}</Text>
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
  buttonDisabled: {
    backgroundColor: '#9ca3af',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  feedback: {
    marginTop: 10,
    color: '#4b5563',
    textAlign: 'center',
  },
});
