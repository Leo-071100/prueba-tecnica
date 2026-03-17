import { Ticket, TicketStatus } from '../store/ticketsSlice';

const MOCK_TICKETS: Ticket[] = [
  {
    id: 1,
    title: 'Error al iniciar sesión',
    description: 'La app muestra pantalla en blanco después del login.',
    priority: 'high',
    status: 'open',
    assignee: 'Backend',
  },
  {
    id: 2,
    title: 'No llegan notificaciones push',
    description: 'Usuarios Android no reciben alertas.',
    priority: 'medium',
    status: 'in_progress',
    assignee: 'Mobile',
  },
  {
    id: 3,
    title: 'Texto desbordado en detalle',
    description: 'En pantallas pequeñas el contenido se corta.',
    priority: 'low',
    status: 'resolved',
    assignee: 'UX',
  },
  {
    id: 4,
    title: 'Crash al adjuntar imagen',
    description: 'La app se cierra al elegir una imagen grande.',
    priority: 'high',
    status: 'open',
    assignee: 'iOS',
  }
];

export async function fetchTickets(): Promise<Ticket[]> {
  await wait(900);

  return [...MOCK_TICKETS, ...MOCK_TICKETS.slice(0, 1)];
}

export async function updateTicketStatus(id: number, status: TicketStatus): Promise<Ticket> {
  await wait(500);
  const ticket = MOCK_TICKETS.find((item) => item.id === id);
  if (!ticket) {
    throw new Error('Ticket no encontrado');
  }
  ticket.status = status;
  return { ...ticket };
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
