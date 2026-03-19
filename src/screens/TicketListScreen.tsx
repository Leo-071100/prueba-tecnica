import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FilterBar } from '../components/FilterBar';
import { TicketCard } from '../components/TicketCard';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadTickets, setSelectedStatus } from '../store/ticketsSlice';
import { SearchBar } from '@/components/SearchBar';

type SortBy = 'priority' | 'default';

export function TicketListScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'TicketList'>) {
  const dispatch = useAppDispatch();
  const { items, loading, error, selectedStatus } = useAppSelector((state) => state.tickets);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortBy>('default');

  const priorityOrder: Record<string, number> = {
    'high': 3, 
    'medium': 2,
    'low': 1
  };

  useEffect(() => {
    dispatch(loadTickets());
  }, [dispatch]);

  const filteredItems = useMemo(() => {
    let result =  items.filter((item) => {
      const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStatus && matchesSearch
    });

    if (sortBy === 'priority') {
      result = [...result].sort((a, b) => {
        const priorityA = priorityOrder[a.priority?.toLowerCase()] || 0;
        const priorityB = priorityOrder[b.priority?.toLowerCase()] || 0;

        return priorityB - priorityA;
    });
    }

    return result
  }, [items, selectedStatus, searchQuery, sortBy]);

  const renderItem = useCallback(({ item }: { item: typeof items[0] }) => {
    return (
      <TicketCard
        ticket={item}
        onPress={() => navigation.navigate('TicketDetail', { ticketId: item.id })}
      />
    );
  }, []);
  
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

      <View style={styles.searchContainer}>
        <View style={{ flex: 1 }}>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </View>

        <View>
          <Pressable 
            style={[styles.sortButton, sortBy === 'priority' && styles.sortButtonActive]}
            onPress={() => setSortBy(sortBy === 'priority' ? 'default' : 'priority')}
          >
            <Text style={[styles.sortText, sortBy === 'priority' && styles.sortTextActive]}>
              {sortBy === 'priority' ? 'Prioridad' : 'Ordenar'}
            </Text>
          </Pressable>
        </View>
      </View>

      <FilterBar
        value={selectedStatus}
        onChange={(value) => dispatch(setSelectedStatus(value))}
      />

      <FlatList
        contentContainerStyle={styles.list}
        data={filteredItems}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <View style={styles.centered}>
            <Text style={styles.error}>{error ? error : 'No hay tickets para mostrar'}</Text>
          </View>
        )}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10
  },
  sortButton: {
    justifyContent: "center",
    backgroundColor: '#F0F0F0',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 15,
    height: 50,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  sortButtonActive: {
    backgroundColor: '#007AFF',
  },
  sortText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  sortTextActive: {
    color: '#FFF',
  },
});
