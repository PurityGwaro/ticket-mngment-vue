import { v4 as uuid } from 'uuid'
import { useAuth } from './useAuth'

export function useTickets() {
  const { currentUser } = useAuth()

  const createTicket = (ticketData, user = currentUser.value) => {
    if (!user) {
      throw new Error('You must be logged in to create a ticket')
    }

    const newTicket = {
      id: uuid(),
      ...ticketData,
      userId: user.id,
      status: ticketData.status || 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const tickets = JSON.parse(localStorage.getItem('tickets')) || []
    localStorage.setItem('tickets', JSON.stringify([...tickets, newTicket]))

    return newTicket
  }

  const getTickets = (user = currentUser.value) => {
    const tickets = JSON.parse(localStorage.getItem('tickets')) || []
    return tickets.filter(ticket => ticket.userId === user.id)
  }

  const updateTicket = (ticketId, updatedData) => {
    const tickets = JSON.parse(localStorage.getItem('tickets')) || []
    const updatedTickets = tickets.map(ticket =>
      ticket.id === ticketId ? { ...ticket, ...updatedData, updatedAt: new Date().toISOString() } : ticket
    )
    localStorage.setItem('tickets', JSON.stringify(updatedTickets))
    return updatedTickets.find(ticket => ticket.id === ticketId)
  }

  const deleteTicket = (ticketId) => {
    const tickets = JSON.parse(localStorage.getItem('tickets')) || []
    const updatedTickets = tickets.filter(ticket => ticket.id !== ticketId)
    localStorage.setItem('tickets', JSON.stringify(updatedTickets))
    return updatedTickets
  }

  const getTicketById = (ticketId) => {
    const tickets = JSON.parse(localStorage.getItem('tickets')) || []
    return tickets.find(ticket => ticket.id === ticketId)
  }

  const getAllTicketsByStatus = (status, userId) => {
    const tickets = JSON.parse(localStorage.getItem('tickets')) || []
    return tickets.filter(ticket => ticket.status === status && ticket.userId === userId)
  }

  return {
    createTicket,
    getTickets,
    updateTicket,
    deleteTicket,
    getTicketById,
    getAllTicketsByStatus
  }
}
