import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TicketListScreen } from '../screens/TicketListScreen';
import { TicketDetailScreen } from '../screens/TicketDetailScreen';

export type RootStackParamList = {
  TicketList: undefined;
  TicketDetail: { ticketId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TicketList" component={TicketListScreen} options={{ title: 'Tickets' }} />
      <Stack.Screen name="TicketDetail" component={TicketDetailScreen} options={{ title: 'Detalle' }} />
    </Stack.Navigator>
  );
}
