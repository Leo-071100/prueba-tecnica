import React, { useEffect, useMemo } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FilterBar } from '../components/FilterBar';
import { TicketCard } from '../components/TicketCard';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadTickets, setSelectedStatus } from '../store/ticketsSlice';

const ListFeedback = ({ error }: { error: string | null }) => {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error ? error : 'No hay tickets para mostrar'}</Text>
      </View>
    )
  }

export function TicketListScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'TicketList'>) {
  const dispatch = useAppDispatch();
  const { items, loading, error, selectedStatus } = useAppSelector((state) => state.tickets);

  useEffect(() => {
    dispatch(loadTickets());
  }, [dispatch]);

  const filteredItems = useMemo(() => {
    if (selectedStatus === 'all') return items;
    return items.filter((item) => item.status === selectedStatus);
  }, [items, selectedStatus]);

  const renderItem = ({ item }: { item: typeof items[0] }) => (
    <TicketCard
      ticket={item}
      onPress={() => navigation.navigate('TicketDetail', { ticketId: item.id })}
    />
  );
  
  if (loading && items.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={styles.feedback}>Cargando tickets...</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.subtitle}>Prueba técnica React Native</Text>

      <FilterBar
        value={selectedStatus}
        onChange={(value) => dispatch(setSelectedStatus(value))}
      />

      <FlatList
        contentContainerStyle={styles.list}
        data={filteredItems}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({ item }) => renderItem({ item })}
        ListEmptyComponent={<ListFeedback error={error} />}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => dispatch(loadTickets())} />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  list: {
    padding: 16,
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
  error: {
    color: '#b91c1c',
    textAlign: 'center',
  },
});
